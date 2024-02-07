import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useSubsidiaryCatalog } from "../../../catalogs/subsidiaryCatalog";
import { useVendorCatalog } from "../../../catalogs/vendorCatalog";
import { useWeekCatalog } from "../../../catalogs/weekCatalog";
import { IServiceForm } from "../../../../models/IService";
import {
  getFromCatalog,
  getIdFromCatalog,
} from "../../../../services/catalog.service";
import { getWeekNumberFromDate } from "../../../../services/date.service";
import { addService } from "../../../../services/services.service";
import { setNotification } from "../../../../state/notificationSlice";
import { selectVendorId } from "../../../../state/userSlice";
import Input from "../../../atoms/Input/InputText";
import Select from "../../../atoms/Select/Select";
import FormControl from "../../../atoms/inputContainer/inputContainer";
import { ServiceFormProps } from "./ServiceForm.types";
import { useVehicleCatalog } from "../../../catalogs/vehicleCatalog";
import { buttonClassName, dynanicFormClassName, inputClassName } from "../../../../styles/const";
const ServiceForm: React.FC<ServiceFormProps> = ({
  invoiceNumber,
  values,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const vendorID = useSelector(selectVendorId);
  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 30);
  const [loading, setLoading] = useState(false);
  const { vendorCatalog } = useVendorCatalog();
  const { weekCatalog } = useWeekCatalog();
  const { subsidiaryCatalog } = useSubsidiaryCatalog();
  const {vehicleCatalog} = useVehicleCatalog();

  const [initialValues] = useState<IServiceForm>({
    serviceDate: values?.serviceDate
      ? values.serviceDate.toString()
      : new Date().toISOString(),
    invoiceNumber: values?.invoiceNumber ?? "",
    month: values?.month ? values.month.toString() : new Date().toISOString(),
    weekID: values?.week ?? "",
    invoiceDate: values?.invoiceDate
      ? values.invoiceDate.toString()
      : new Date().toISOString(),
    invoice: values?.invoice ?? "",
    subsidiaryID: values?.subsidiary ?? "",
    vehicleNumberID: values?.vehicleNumber ?? "",
    status: values?.status ?? false,
    vendorID: values?.vendor ?? "",
  });

  const validationSchema = Yup.object({
    serviceDate: Yup.date().required("La fecha de Folio es requerida"),
    invoiceNumber: Yup.string().required("El numero de factura es requerido"),
    month: Yup.date().required("El mes es requerido"),
    weekID: Yup.string().required("La semana es requerida"),
    invoiceDate: Yup.date().required("La fecha de factura es requerida"),
    invoice: Yup.string().required("El folio es requerido"),
    subsidiaryID: Yup.string().required("La sucursal es requerida"),
    vehicleNumberID: Yup.string().required("El numero de vehiculo es requerido"),
  });


  const onSubmit = async (values: IServiceForm) => {
    setLoading(true);
    if (
      invoiceNumber === undefined ||
      invoiceNumber === null ||
      invoiceNumber === "" ||
      invoiceNumber === "create"
    ) {
      let vendor;

      if (!vendorID) {
        vendor =
          getIdFromCatalog(vendorCatalog, values.vendorID)?.toString() ?? "";
      } else {
        vendor =
          getFromCatalog(vendorCatalog, Number(vendorID))?.id?.toString() ?? "";
      }

      if (!vendor) return;

      const payload = {
        ...values,
        vendorID: vendor,
        vehicleNumberID: getIdFromCatalog(vehicleCatalog, values.vehicleNumberID)?.toString() ?? "",
        weekID: getIdFromCatalog(weekCatalog, values.weekID)?.toString() ?? "",
        subsidiaryID:
          getIdFromCatalog(
            subsidiaryCatalog,
            values.subsidiaryID
          )?.toString() ?? "",
      };

      await addService(payload)
        .then((res) => {
          navigate(`/services/${res.id}`);
          dispatch(
            setNotification({
              message: "Folio creado correctamente",
              severity: "success",
              summary: "Folio creado",
            })
          );
        })
        .catch(() => {
          dispatch(
            setNotification({
              message: "Error al crear el Folio",
              severity: "error",
              summary: "Error al crear",
            })
          );
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);

      dispatch(
        setNotification({
          message: "Folio actualizado correctamente",
          severity: "info",
          summary: "Actualizado correctamente",
        })
      );
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize={true}
      validateOnMount={true}
      onSubmit={onSubmit}
    >
      {({
        values,
        handleChange,
        handleBlur,
        errors,
        touched,
        setFieldValue,
      }) => (
        <Form className={dynanicFormClassName}>
          <FormControl
            name="serviceDate"
            label="Fecha de Folio"
            error={errors.serviceDate}
            touched={touched.serviceDate}
            className={inputClassName}
          >
            <Calendar
              name="serviceDate"
              value={new Date(values.serviceDate)}
              minDate={minDate}
              onChange={(e: any) => {
                handleChange(e);
                setFieldValue("month", new Date(e.target.value).toISOString());
                const weekNumber = getWeekNumberFromDate(
                  new Date(e.target.value)
                );
                const week = weekCatalog.find((w) => w.id === weekNumber + 1);
                setFieldValue("weekID", week?.name);
              }}
              onBlur={handleBlur}
              className="w-full"
              showIcon={true}
              dateFormat="dd/mm/yy"
            />
          </FormControl>

          <Input
            name="invoiceNumber"
            label="Numero de factura"
            type={"text"}
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={values.invoiceNumber}
            error={errors.invoiceNumber}
            touched={touched.invoiceNumber}
            className={inputClassName}
          />

          <FormControl
            name="month"
            label="Mes"
            error={errors.month}
            touched={touched.month}
            className={inputClassName}
          >
            <Calendar
              name="month"
              disabled={true}
              value={new Date(values.month)}
              onChange={handleChange}
              className="w-full"
              onBlur={handleBlur}
              view="month"
              dateFormat="mm/yy"
            />
          </FormControl>

          <Select
            name="weekID"
            label="Semana"
            options={weekCatalog}
            value={values.weekID}
            optionLabel="name"
            optionValue="name"
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.weekID}
            touched={touched.weekID}
            className={inputClassName}
          />

          <FormControl
            name="invoiceDate"
            label="Fecha de factura"
            error={errors.invoiceDate}
            touched={touched.invoiceDate}
            className={inputClassName}
          >
            <Calendar
              name="invoiceDate"
              value={new Date(values.invoiceDate)}
              className="w-full"
              onChange={handleChange}
              minDate={minDate}
              onBlur={handleBlur}
              showIcon={true}
              dateFormat="dd/mm/yy"
            />
          </FormControl>

          <Input
            name="invoice"
            label="Folio"
            type={"text"}
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={values.invoice}
            error={errors.invoice}
            touched={touched.invoice}
            className={inputClassName}
          />

          <Select
            name="subsidiaryID"
            label="Sucursal"
            optionLabel="name"
            optionValue="name"
            options={subsidiaryCatalog}
            value={values.subsidiaryID}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.subsidiaryID}
            touched={touched.subsidiaryID}
            className={inputClassName}
          />

          <Select
            name="vehicleNumberID"
            label="Placas"
            optionLabel="name"
            optionValue="name"
            options={vehicleCatalog}
            value={values.vehicleNumberID}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.vehicleNumberID}
            touched={touched.vehicleNumberID}
            className={inputClassName}
          />

       
          {!vendorID && (
            <Select
              name="vendorID"
              label="Proveedor"
              optionValue="name"
              options={vendorCatalog}
              value={values.vendorID}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.vendorID}
              touched={touched.vendorID}
              className={inputClassName}
            />
          )}

          <div className="flex flex-column md:flex-row justify-content-center align-items-center w-full gap-2">
            <Button
              label="Guardar"
              loading={loading}
              className={buttonClassName}
              type="submit"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ServiceForm;
