import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useAccountCatalog } from "../../../catalogs/accountCatalog";
import { useConceptCatalog } from "../../../catalogs/conceptCatalog";
import { useServiceTypeCatalog } from "../../../catalogs/serviceTypeCatalog";
import { IServiceDetail } from "../../../../models/IService";
import { addServiceDetail } from "../../../../services/services.service";
import { setNotification } from "../../../../state/notificationSlice";
import Input from "../../../atoms/Input/InputText";
import Select from "../../../atoms/Select/Select";
import { ServiceDetailFormProps } from "./ServiceDetailForm.types";
import { dynanicFormClassName, inputClassName } from "../../../../styles/const";

const ServiceDetailForm: React.FC<ServiceDetailFormProps> = ({
  invoiceNumber,
  detail,
  getServiceDetails,
  onReset,
}) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const { conceptCatalog } = useConceptCatalog();
  const { accountCatalog } = useAccountCatalog();
  const { serviceTypeCatalog } = useServiceTypeCatalog();

  const [initialValues, setInitualValues] = useState<IServiceDetail>({
    id: detail?.id ?? 0,
    orderID: detail?.orderID ?? "",
    concept: detail?.concept ?? "",
    partsNumber: detail?.partsNumber ?? "",
    amount: detail?.amount ?? "",
    account: detail?.account ?? "",
    serviceType: detail?.serviceType ?? "",
  });

  const validationSchema = Yup.object({
    partsNumber: Yup.number()
      .required("La cantidad total son requeridas")
      .min(1, "La cantidad total deben ser mayor a 1"),
    amount: Yup.number()
      .required("El precio unitario es requerido")
      .min(1, "El precio unitario debe ser mayor a 1"),
    account: Yup.string().required("La cuenta es requerida"),
    serviceType: Yup.string().required("El tipo de mantenimiento es requerido"),
  });

  useEffect(() => {
    const concept = conceptCatalog.find((c) => c.name === detail?.concept);
    setInitualValues({
      id: detail?.id ?? 0,
      orderID: detail?.orderID ?? "",
      concept: concept?.name.toString() ?? "",
      partsNumber: detail?.partsNumber ?? "",
      amount: detail?.amount ?? "",
      account: detail?.account ?? "",
      serviceType: detail?.serviceType ?? "",
    });
  }, [detail, conceptCatalog]);

  const onSubmit = (values: IServiceDetail) => {
    try {
      setLoading(true);

      const payload = [
        {
          ...values,
          orderID: invoiceNumber,
          conceptID: conceptCatalog.find((c) => c.name === values.concept)?.id,
          accountID: accountCatalog.find((c) => c.name === values.account)?.id,
          serviceTypeID: serviceTypeCatalog.find(
            (c) => c.name === values.serviceType
          )?.id,
        },
      ];

      console.log(payload);

      addServiceDetail(payload, invoiceNumber ?? "")
        .then(() => {
          dispatch(
            setNotification({
              message: "Detalle creado correctamente",
              severity: "success",
              summary: "Detalle creado",
            })
          );
        })
        .catch(() => {
          dispatch(
            setNotification({
              message: "Error al guardar el detalle",
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
    <>
      {invoiceNumber === undefined ||
      invoiceNumber === null ||
      invoiceNumber === "" ||
      invoiceNumber === "create" ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            No se ha seleccionado una factura
          </h2>
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount={true}
          onSubmit={onSubmit}
          enableReinitialize={true}
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
              <Select
                name="concept"
                label="Concepto"
                options={conceptCatalog}
                optionLabel="name"
                optionValue="name"
                handleChange={(e: any) => {
                  setFieldValue("concept", e.target.value);
                  const value = conceptCatalog.find(
                    (c) => c.name === e.target.value
                  );
                  console.log(value);
                  setFieldValue(
                    "account",
                    accountCatalog.find((c) => c.id === value?.accountID)?.name
                  );
                  setFieldValue(
                    "serviceType",
                    serviceTypeCatalog.find(
                      (c) => c.id === value?.serviceTypeID
                    )?.name
                  );
                }}
                handleBlur={handleBlur}
                value={values.concept}
                error={errors.concept}
                touched={touched.concept}
                className={"my-3 col-12"}
              />

              <Input
                name="partsNumber"
                label="Cantidad Total"
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
                label="Precio Unitario"
                type={"number"}
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.amount}
                error={errors.amount}
                touched={touched.amount}
                className={inputClassName}
                hint={
                  Number(values.partsNumber) * Number(values.amount) > 0
                    ? "El total es: " +
                      Number(values.partsNumber) * Number(values.amount)
                    : ""
                }
              />

              <Input
                name="account"
                label="Cuenta"
                type="text"
                disabled={true}
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.account}
                error={errors.account}
                touched={touched.account}
                className={inputClassName}
              />

              <Input
                name="serviceType"
                type="text"
                label="Tipo de Mantenimiento"
                disabled={true}
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.serviceType}
                error={errors.serviceType}
                touched={touched.serviceType}
                className={inputClassName}
              />
              <div className="flex flex-column md:flex-row justify-content-center align-items-center w-full gap-2">
                <Button
                  label="Guardar"
                  type="submit"
                  className="p-button-primary w-full mx-2"
                  disabled={!isValid || loading}
                />
                <Button
                  label="Cancelar"
                  className="p-button-danger w-full mx-2"
                  onClick={onReset}
                />
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default ServiceDetailForm;
