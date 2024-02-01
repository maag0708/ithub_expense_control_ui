import { useCallback, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import InvoiceTable from "../../components/molecules/Admin/InvoiceTable/InvoiceTable";
import { IService } from "../../models/IService";
import { getAllServices, updateStatus } from "../../services/services.service";
import { useDispatch } from "react-redux";
import { setNotification } from "../../state/notificationSlice";

const InvoicePage = () => {
  const dispatch = useDispatch();
  const [invoices, setInvoices] = useState<IService[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getAllInvoices = useCallback(() => {
    console.log("getAllInvoices");
    setLoading(true);
    getAllServices()
      .then((res) => {
        console.log(res);
        setInvoices(res);
      })
      .catch((err) => {
        console.log(err);
        return [];
      })
      .finally(() => setLoading(false));
  }, []);

  const updateInvoiceStatus = (ids: number[]) => {
    console.log("updateInvoiceStatus");
    console.log({ids});
    setLoading(true);
    updateStatus(ids)
      .then((res) => {
        console.log(res);
        dispatch(
          setNotification({
            message: "Se actualizó el estatus de las facturas",
            severity: "success",
            summary: "Estatus actualizado",
          })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          setNotification({
            message: "Ocurrió un error al actualizar el estatus",
            severity: "error",
            summary: "Error al actualizar",
          })
        );
      })
      .finally(() => {
        console.log("finally");
        getAllInvoices();
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllInvoices();
  }, [getAllInvoices]);

  return (
    <Layout title="Costos">
      <>
        <InvoiceTable
          loading={loading}
          invoices={invoices}
          updateInvoiceStatus={updateInvoiceStatus}
        />
      </>
    </Layout>
  );
};

export default InvoicePage;
