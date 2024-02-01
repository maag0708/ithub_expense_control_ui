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
  getIdFromCatalog,
} from "../../../../services/catalog.service";
import { addService } from "../../../../services/services.service";
import { setNotification } from "../../../../state/notificationSlice";
import { selectVendorId } from "../../../../state/userSlice";
import { CatalogType } from "../../../../types/catalog";
import { FormFieldOptions } from "../../../../types/form";
import Input from "../../../atoms/Input/InputText";
import Select from "../../../atoms/Select/Select";
import FormControl from "../../../atoms/inputContainer/inputContainer";
import { ServiceFormProps } from "./ServiceForm.types";
import { getWeekNumberFromDate } from "../../../../services/date.service";
const ServiceForm: React.FC<ServiceFormProps> = ({
  invoiceNumber,
  getDetails,
  values,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const vendorID = useSelector(selectVendorId);
  const [loading, setLoading] = useState(false);
  const [weekCatalog, setWeekCatalog] = useState<FormFieldOptions[]>([]);
  

  const [subsidiaryCatalog, setSubsidiaryCatalog] = useState<
    FormFieldOptions[]
  >([]);
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

  const [initialValues] = useState<IServiceForm>({
    serviceDate: values?.serviceDate
      ? values.serviceDate.toString()
      : new Date().toISOString(),
    invoiceNumber: values?.invoiceNumber ?? "",
    month: values?.month ? values.month.toString() : new Date().toISOString(),
    weekID: values?.week ?? "Week",
    invoiceDate: values?.invoiceDate
      ? values.invoiceDate.toString()
      : new Date().toISOString(),
    invoice: values?.invoice ?? "",
    subsidiaryID: values?.subsidiary ?? "",
    vehicleNumber: values?.vehicleNumber ?? "",
    status: values?.status ?? false,
  });

  const validationSchema = Yup.object({
    serviceDate: Yup.date().required("La fecha de servicio es requerida"),
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
  }, [getWeekCatalog, getSubsidiaryCatalog]);

  const inputClassName = "my-3 col-12 lg:col-6";
  const dynanicFormClassName = `formgrid grid`;
  const buttonClassName = "flex-1 mx-2";

  const onSubmit = async (values: IServiceForm) => {
    setLoading(true);
    if (
      invoiceNumber === undefined ||
      invoiceNumber === null ||
      invoiceNumber === "" ||
      invoiceNumber === "create"
    ) {
      const payload = {
        ...values,
        weekID: getIdFromCatalog(weekCatalog, values.weekID)?.toString() ?? "",
        subsidiaryID:
          getIdFromCatalog(
            subsidiaryCatalog,
            values.subsidiaryID
          )?.toString() ?? "",
        vendorID: Number(vendorID),
      };
      console.log(payload);
      await addService(payload)
        .then((res) => {
          navigate(`/services/${res.id}`);
          dispatch(
            setNotification({
              message: "Servicio creado correctamente",
              severity: "success",
              summary: "Servicio creado",
            })
          );
        })
        .catch((err) => {
          dispatch(
            setNotification({
              message: "Error al crear el servicio",
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
          message: "Servicio actualizado correctamente",
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
            label="Fecha de servicio"
            error={errors.serviceDate}
            touched={touched.serviceDate}
            className={inputClassName}
          >
            <Calendar
              name="serviceDate"
              value={new Date(values.serviceDate)}
              onChange={(e: any) => {
                handleChange(e);
                setFieldValue("month", new Date(e.target.value).toISOString());
                const weekNumber = getWeekNumberFromDate(
                  new Date(e.target.value)
                );
                const week = weekCatalog.find((w) => w.id === weekNumber + 1);
                setFieldValue("weekID", week?.name);
                console.log(weekNumber);
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

          <Button
            label="Guardar"
            loading={loading}
            className={buttonClassName}
            type="submit"
          />
        </Form>
      )}
    </Formik>
  );
};

export default ServiceForm;
