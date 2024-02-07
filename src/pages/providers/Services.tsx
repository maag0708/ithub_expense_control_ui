import { pdf } from "@react-pdf/renderer";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import ServiceHeader from "../../components/molecules/Services/ServiceHeader/ServiceHeader";
import ServiceTable from "../../components/molecules/Services/ServiceTable/ServiceTable";
import PdfTemplate from "../../components/pdf/invoicePdfTemplate";
import { IService } from "../../models/IService";
import {
  deleteService,
  getAllServicesByDateRange,
} from "../../services/services.service";
import { exportToXLSX } from "../../services/xlsx.service";
import { setNotification } from "../../state/notificationSlice";
import { selectUserName, selectVendorId } from "../../state/userSlice";

const ServicePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [services, setServices] = useState<IService[]>([]);
  const vendorID = useSelector(selectVendorId);
  const name = useSelector(selectUserName);
  const [dates, setDates] = useState<string[]>(["", ""]);

  const createService = () => {
    navigate(`/services/create`);
  };

  const onEdit = (data: IService) => {
    navigate(`/services/${data.id}`);
  };

  const getByDateRange = useCallback(
    async (startDate: string, endDate: string) => {
      setLoading(true);
      getAllServicesByDateRange(startDate, endDate, Number(vendorID ?? "0"))
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
          setServices(res);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [dispatch, vendorID]
  );

  const onDatesChange = (dates: Date[]) => {
    if (dates && dates.length === 2) {
      const startDate = dates[0].toISOString().split("T")[0];
      const endDate = dates[1].toISOString().split("T")[0];
      setDates([startDate, endDate]);
      getByDateRange(startDate, endDate);
    }
  };

  const onDelete = (data: IService) => {
    console.log("Delete", data);
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

  const exportToExcel = () => {
    if (services.length === 0) {
      dispatch(
        setNotification({
          severity: "info",
          summary: "No hay datos",
          message: "No hay datos para exportar a Excel",
        })
      );
      return;
    }
    exportToXLSX(services, `Folios_${name}_${new Date().getTime()}`);
  };

  const exportToPdf = async () => {
    const blob = await pdf(
      <PdfTemplate data={services} vendor={name ?? ""} />
    ).toBlob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `Folios_${name}${new Date().getTime()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Layout
        title="Folios"
        header={
          <ServiceHeader
            exportToExcel={exportToExcel}
            exportToPdf={exportToPdf}
            createService={createService}
            onDatesChange={onDatesChange}
          />
        }
      >
        <ServiceTable
          items={services}
          loading={loading}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </Layout>
    </>
  );
};

export default ServicePage;
