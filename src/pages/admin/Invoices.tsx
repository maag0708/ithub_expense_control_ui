import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import InvoiceTable from "../../components/molecules/Admin/InvoiceTable/InvoiceTable";
import ServiceHeader from "../../components/molecules/Services/ServiceHeader/ServiceHeader";
import { IService } from "../../models/IService";
import {
  deleteService,
  getAllServicesByDateRange,
  updateStatus,
} from "../../services/services.service";
import { exportToXLSX } from "../../services/xlsx.service";
import { setNotification } from "../../state/notificationSlice";

const InvoicePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState<IService[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [dates, setDates] = useState<string[]>(["", ""]);
  const exportData = () => {
    console.log("Export data");
    console.log(invoices);
    exportToXLSX(invoices, "Folios");
  };

  const createService = () => {
    navigate(`/services/create`);
  };

  const getByDateRange = useCallback(
    async (startDate: string, endDate: string) => {
      setLoading(true);
      getAllServicesByDateRange(startDate, endDate, 0)
        .then((res) => {
          if (res.length === 0) {
            dispatch(
              setNotification({
                severity: "info",
                summary: "No se encontraron Folios",
                message:
                  "No se encontraron Folios en el rango de fechas seleccionado",
              })
            );
          }
          setInvoices(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [dispatch]
  );

  const onDatesChange = (dates: Date[]) => {
    if (dates && dates.length === 2) {
      const startDate = dates[0].toISOString().split("T")[0];
      const endDate = dates[1].toISOString().split("T")[0];
      setDates([startDate, endDate]);
      getByDateRange(startDate, endDate);
    }
  };

  const updateInvoiceStatus = (ids: number[]) => {
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
        getByDateRange(dates[0], dates[1]);
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
      });
  };

  const onDeleted = (data: IService) => {
    setLoading(true);
    deleteService(data.id)
      .then(() => {
        dispatch(
          setNotification({
            severity: "success",
            summary: "Folio eliminado",
            message: `El folio ${data.invoiceNumber} ha sido eliminado`,
          })
        );
        getByDateRange(dates[0], dates[1]);
      })
      .catch(() => {
        dispatch(
          setNotification({
            severity: "error",
            summary: "Error al eliminar el folio",
            message: `Ocurrió un error al eliminar el folio ${data.invoiceNumber}`,
          })
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Layout
      title="Costos"
      header={
        <ServiceHeader
          exportData={exportData}
          createService={createService}
          onDatesChange={onDatesChange}
        />
      }
    >
      <>
        <InvoiceTable
          loading={loading}
          onDelete={onDeleted}
          invoices={invoices}
          updateInvoiceStatus={updateInvoiceStatus}
        />
      </>
    </Layout>
  );
};

export default InvoicePage;
