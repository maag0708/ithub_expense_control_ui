import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import { IService } from "../../../../models/IService";
import { getCatalogById } from "../../../../services/catalog.service";
import { CatalogType } from "../../../../types/catalog";
import { FormFieldOptions } from "../../../../types/form";
import Input from "../../../atoms/Input/InputText";
import Select from "../../../atoms/Select/Select";
import { ServiceFormProps } from "./ServiceForm.types";
import { addService } from "../../../../services/services.service";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNotification } from "../../../../state/notificationSlice";
import FormControl from "../../../atoms/inputContainer/inputContainer";
import { Calendar } from "primereact/calendar";
const ServiceForm: React.FC<ServiceFormProps> = ({
  invoiceNumber,
  getDetails,
  values,
}) => {
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
  const [initialValues, setInitialValues] = useState<IService>({
    id: values?.id ?? 0,
    serviceDate: values?.serviceDate
      ? values.serviceDate.toString()
      : new Date().toISOString(),
    invoiceNumber: values?.invoiceNumber ?? "",
    month: values?.month ? values.month.toString() : new Date().toISOString(),
    weekID: values?.weekID ?? "",
    invoiceDate: values?.invoiceDate
      ? values.invoiceDate.toString()
      : new Date().toISOString(),
    invoice: values?.invoice ?? "",
    subsidiaryID: values?.subsidiaryID ?? "",
    vehicleNumer: values?.vehicleNumer ?? "",
    status: values?.status ?? false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    serviceDate: Yup.date().required("La fecha de servicio es requerida"),
    invoiceNumber: Yup.string().required("El numero de factura es requerido"),
    month: Yup.date().required("El mes es requerido"),
    weekID: Yup.string().required("La semana es requerida"),
    invoiceDate: Yup.date().required("La fecha de factura es requerida"),
    invoice: Yup.string().required("El folio es requerido"),
    subsidiaryID: Yup.string().required("La sucursal es requerida"),
    vehicleNumer: Yup.string().required("El numero de vehiculo es requerido"),
  });

  useEffect(() => {
    setInitialValues(values ?? initialValues);
  }, [values, initialValues]);

  useEffect(() => {
    getWeekCatalog();
    getSubsidiaryCatalog();
  }, [getWeekCatalog, getSubsidiaryCatalog]);

  const inputClassName = "my-3 col-12 lg:col-6";
  const dynanicFormClassName = `formgrid grid`;
  const buttonClassName = "flex-1 mx-2";

  const onSubmit = async (values: IService) => {
    setLoading(true);
    if (
      invoiceNumber === undefined ||
      invoiceNumber === null ||
      invoiceNumber === "" ||
      invoiceNumber === "create"
    ) {
      await addService(values)
      .then((res) => {
        navigate(`/services/${res.id}`);
      })
      .finally(() => {

        dispatch(
          setNotification({
            message: "Servicio creado correctamente",
            severity: "success",
            summary: "Servicio creado",
          })
        );
        setLoading(false);
      });
    } else {
      setLoading(false);

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
      {({ values, handleChange, handleBlur, errors, touched, isValid }) => (
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
              onChange={handleChange}
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
              value={new Date(values.month)}
              onChange={handleChange}
              className="w-full"
              onBlur={handleBlur}
              showIcon={true}
              view="month"
              dateFormat="mm/yy"
            />
          </FormControl>

          <Select
            name="weekID"
            label="Semana"
            options={weekCatalog}
            value={values.weekID}
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
            options={subsidiaryCatalog}
            value={values.subsidiaryID}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.subsidiaryID}
            touched={touched.subsidiaryID}
            className={inputClassName}
          />

          <Input
            name="vehicleNumer"
            label="Numero de vehiculo"
            type={"text"}
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={values.vehicleNumer}
            error={errors.vehicleNumer}
            touched={touched.vehicleNumer}
            className={inputClassName}
          />

          <Button
            label="Guardar"
            disabled={!isValid}
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
