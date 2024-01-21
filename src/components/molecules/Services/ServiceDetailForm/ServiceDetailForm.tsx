import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { IServiceDetail } from "../../../../models/IService";
import { getCatalogById } from "../../../../services/catalog.service";
import { addServiceDetail } from "../../../../services/services.service";
import { setNotification } from "../../../../state/notificationSlice";
import { CatalogType } from "../../../../types/catalog";
import { FormFieldOptions } from "../../../../types/form";
import Input from "../../../atoms/Input/InputText";
import Select from "../../../atoms/Select/Select";
import { ServiceDetailFormProps } from "./ServiceDetailForm.types";
import FormControl from "../../../atoms/inputContainer/inputContainer";
import { Calendar } from "primereact/calendar";

const ServiceDetailForm: React.FC<ServiceDetailFormProps> = ({
  invoiceNumber,
  detail,
  getServiceDetails,
  onReset,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [conceptCatalog, setConceptCatalog] = useState<FormFieldOptions[]>([]);
  const getConceptCatalog = useCallback(async () => {
    const concept = await getCatalogById(CatalogType.CONCEPT);
    setConceptCatalog(concept.data);
  }, []);

  const [accountCatalog, setAccountCatalog] = useState<FormFieldOptions[]>([]);
  const getAccountCatalog = useCallback(async () => {
    const weeks = await getCatalogById(CatalogType.ACCOUNT);
    if (!weeks) return;
    setAccountCatalog(weeks.data);
  }, []);

  const [serviceTypeCatalog, setServiceTypeCatalog] = useState<
    FormFieldOptions[]
  >([]);
  const getServiceTypeCatalog = useCallback(async () => {
    const weeks = await getCatalogById(CatalogType.SERVICETYPE);
    if (!weeks) return;
    setServiceTypeCatalog(weeks.data);
  }, []);

  const [vendorCatalog, setVendorCatalog] = useState<FormFieldOptions[]>([]);
  const getVendorCatalog = useCallback(async () => {
    const weeks = await getCatalogById(CatalogType.VENDOR);
    if (!weeks) return;
    setVendorCatalog(weeks.data);
  }, []);

  const [initialValues, setInitualValues] = useState<IServiceDetail>({
    orderID: detail?.orderID ?? "",
    conceptID: detail?.conceptID ?? "",
    partsNumber: detail?.partsNumber ?? "",
    amount: detail?.amount ?? "",
    accountID: detail?.accountID ?? "",
    serviceTypeID: detail?.serviceTypeID ?? "",
    vendorID: detail?.vendorID ?? "",
    invoiceDate: detail?.invoiceDate
      ? detail.invoiceDate.toString()
      : new Date().toISOString(),
  });

  const validationSchema = Yup.object({
    conceptID: Yup.string().required("El concepto es requerido"),
    //valida que sea mayor a 0
    partsNumber: Yup.number()
      .required("Las piezas son requeridas")
      .min(1, "Las piezas deben ser mayor a 1"),
    amount: Yup.number()
      .required("El monto es requerido")
      .min(1, "El monto debe ser mayor a 1"),
    accountID: Yup.string().required("La cuenta es requerida"),
    serviceTypeID: Yup.string().required(
      "El tipo de mantenimiento es requerido"
    ),
    vendorID: Yup.string().required("El proveedor es requerido"),
    invoiceDate: Yup.date().required("El mes de factura es requerido"),
  });

  const inputClassName = "my-3 col-12 lg:col-6";
  const dynanicFormClassName = `formgrid grid`;

  useEffect(() => {
    getConceptCatalog();
    getAccountCatalog();
    getServiceTypeCatalog();
    getVendorCatalog();
  }, [
    getConceptCatalog,
    getAccountCatalog,
    getServiceTypeCatalog,
    getVendorCatalog,
  ]);

  useEffect(() => {
    setInitualValues(detail ?? initialValues);
  }, [detail, initialValues]);

  const onSubmit = (values: IServiceDetail) => {
    try {
      setLoading(true);
      console.log({ invoiceNumber });
      console.log({ values });
      values.orderID = invoiceNumber ?? "";
      addServiceDetail([{ ...values }], values.orderID)
        .then((response) => {
          console.log(response);
          dispatch(
            setNotification({
              message: "Detalle creado correctamente",
              severity: "success",
              summary: "Detalle creado",
            })
          );
        })
        .catch((error) => {
          console.log(error);
          dispatch(
            setNotification({
              message: "Error al guardar el detalle 2222222222222",
              severity: "error",
              summary: "Error al guardar",
            })
          );
        })
        .finally(() => {
          getServiceDetails();
          setLoading(false);
        });

      /*
      if (values.orderID === "") {
        values.orderID = invoiceNumber ?? "";
      
      } else {
        updateServiceDetail(values).finally(() => {
          setLoading(false);
        });
        getServiceDetails();
        dispatch(
          setNotification({
            message: "Detalle actualizado correctamente",
            severity: "info",
            summary: "Detalle actualizado",
          })
        );
      }
*/
    } catch (error) {
      console.log(error);
      dispatch(
        setNotification({
          message: "Error al guardar el detalle",
          severity: "error",
          summary: "Error al guardar",
        })
      );
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount={true}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {({ values, handleChange, handleBlur, errors, touched, isValid }) => (
        <Form className={dynanicFormClassName}>
          <Select
            name="conceptID"
            label="Concepto"
            options={conceptCatalog}
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={values.conceptID}
            error={errors.conceptID}
            touched={touched.conceptID}
            className={"my-3 col-12"}
          />

          <Input
            name="partsNumber"
            label="Piezas"
            type={"number"}
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={values.partsNumber}
            error={errors.partsNumber}
            touched={touched.partsNumber}
            className={inputClassName}
          />

          <Input
            name="amount"
            label="Monto"
            type={"number"}
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={values.amount}
            error={errors.amount}
            touched={touched.amount}
            className={inputClassName}
          />

          <Select
            name="accountID"
            label="Cuenta"
            options={accountCatalog}
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={values.accountID}
            error={errors.accountID}
            touched={touched.accountID}
            className={inputClassName}
          />

          <Select
            name="serviceTypeID"
            label="Tipo de Mantenimiento"
            options={serviceTypeCatalog}
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={values.serviceTypeID}
            error={errors.serviceTypeID}
            touched={touched.serviceTypeID}
            className={inputClassName}
          />

          <Select
            name="vendorID"
            label="Proveedor"
            options={vendorCatalog}
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={values.vendorID}
            error={errors.vendorID}
            touched={touched.vendorID}
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
              onChange={handleChange}
              onBlur={handleBlur}
              showIcon={true}
              view="month"
              dateFormat="mm/yy"
              className="w-full"
            />
          </FormControl>

          <Button
            label="Guardar"
            type="submit"
            className="p-button-primary flex-1 mx-2"
            disabled={!isValid || loading}
          />
          <Button
            label="Cancelar"
            className="p-button-danger flex-1 mx-2"
            onClick={onReset}
          />
        </Form>
      )}
    </Formik>
  );
};

export default ServiceDetailForm;
