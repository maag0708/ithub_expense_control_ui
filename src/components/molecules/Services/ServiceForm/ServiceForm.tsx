import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { IServiceForm } from "../../../../models/IService";
import {
  getCatalogById,
  getFromCatalog,
  getIdFromCatalog,
} from "../../../../services/catalog.service";
import { getWeekNumberFromDate } from "../../../../services/date.service";
import { addService } from "../../../../services/services.service";
import { setNotification } from "../../../../state/notificationSlice";
import { selectVendorId } from "../../../../state/userSlice";
import { CatalogType } from "../../../../types/catalog";
import { FormFieldOptions } from "../../../../types/form";
import Input from "../../../atoms/Input/InputText";
import Select from "../../../atoms/Select/Select";
import FormControl from "../../../atoms/inputContainer/inputContainer";
import { ServiceFormProps } from "./ServiceForm.types";
const ServiceForm: React.FC<ServiceFormProps> = ({
  invoiceNumber,
  getDetails,
  values,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const vendorID = useSelector(selectVendorId);
  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 30);
  const [loading, setLoading] = useState(false);
  const [weekCatalog, setWeekCatalog] = useState<FormFieldOptions[]>([]);
  const [subsidiaryCatalog, setSubsidiaryCatalog] = useState<
    FormFieldOptions[]
  >([]);
  const [vendorCatalog, setVendorCatalog] = useState<FormFieldOptions[]>([]);
  const getWeekCatalog = useCallback(async () => {
    const weeks = await getCatalogById(CatalogType.WEEK);
    if (!weeks) return;
    setWeekCatalog(weeks.data);
  }, []);

  const getSubsidiaryCatalog = useCallback(async () => {
    const subsidiaries = await getCatalogById(CatalogType.SUBSIDIARY);
    if (!subsidiaries) return;
    setSubsidiaryCatalog(subsidiaries.data);
  }, []);

  const getVendorCatalog = useCallback(async () => {
    const vendors = await getCatalogById(CatalogType.VENDOR);
    if (!vendors) return;
    setVendorCatalog(vendors.data);
  }, []);

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
    vehicleNumber: values?.vehicleNumber ?? "",
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
    vehicleNumber: Yup.string().required("El numero de vehiculo es requerido"),
  });
  useEffect(() => {
    getWeekCatalog();
    getSubsidiaryCatalog();
    getVendorCatalog();
  }, [getWeekCatalog, getSubsidiaryCatalog, getVendorCatalog]);

  const inputClassName = "my-3 col-12 lg:col-6";
  const dynanicFormClassName = `formgrid grid`;
  const buttonClassName = "flex-1 mx-2";

  const onSubmit = async (values: IServiceForm) => {
    // setLoading(true);
    if (
      invoiceNumber === undefined ||
      invoiceNumber === null ||
      invoiceNumber === "" ||
      invoiceNumber === "create"
    ) {
      console.log("Creating service");
      console.log(values);
      let vendor;

      if (!vendorID) {
        console.log("VendorID not found");
        vendor =
          getIdFromCatalog(vendorCatalog, values.vendorID)?.toString() ?? "";
        console.log(vendor);
      } else {
        vendor =
          getFromCatalog(vendorCatalog, Number(vendorID))?.id?.toString() ?? "";
      }

      if (!vendor) return;

      const payload = {
        ...values,
        vendorID: vendor,
        weekID: getIdFromCatalog(weekCatalog, values.weekID)?.toString() ?? "",
        subsidiaryID:
          getIdFromCatalog(
            subsidiaryCatalog,
            values.subsidiaryID
          )?.toString() ?? "",
      };
      console.log(payload);

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
      .catch((err) => {
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

      const payload = {
        ...values,
        vendorID: "2",
        weekID: getIdFromCatalog(weekCatalog, values.weekID)?.toString() ?? "",
        subsidiaryID:
          getIdFromCatalog(
            subsidiaryCatalog,
            values.subsidiaryID
          )?.toString() ?? "",
      };

      dispatch(
        setNotification({
          message: "Folio actualizado correctamente",
          severity: "info",
          summary: "Actualizado correctamente",
        })
      );
      //TODO: Update service
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
        isValid,
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

          <Input
            name="vehicleNumber"
            label="Placas"
            type={"text"}
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={values.vehicleNumber}
            error={errors.vehicleNumber}
            touched={touched.vehicleNumber}
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
