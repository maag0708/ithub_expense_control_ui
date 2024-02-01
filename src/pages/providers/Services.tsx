import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import ServiceHeader from "../../components/molecules/Services/ServiceHeader/ServiceHeader";
import ServiceTable from "../../components/molecules/Services/ServiceTable/ServiceTable";
import { IService } from "../../models/IService";
import { getAllServicesByDateRange } from "../../services/services.service";
import { exportToXLSX } from "../../services/xlsx.service";
import { setNotification } from "../../state/notificationSlice";

const ServicePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [services, setServices] = useState<IService[]>([]);

  const exportData = () => {
    console.log("Export data");
    console.log(services);
    exportToXLSX(services, "Servicios");
  };

  const createService = () => {
    navigate(`/services/create`);
  };

  const onEdit = (data: IService) => {
    console.log(data);
    navigate(`/services/${data.id}`);
  };

  const getByDateRange = useCallback(
    async (startDate: string, endDate: string) => {
      setLoading(true);
      getAllServicesByDateRange(startDate, endDate)
        .then((res) => {
          if (res.length === 0) {
            dispatch(
              setNotification({
                severity: "info",
                summary: "No se encontraron servicios",
                message:
                  "No se encontraron servicios en el rango de fechas seleccionado",
              })
            );
          }
          setServices(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    []
  );

  const onDatesChange = (dates: Date[]) => {
    if (dates && dates.length === 2) {
      const startDate = dates[0].toISOString().split("T")[0];
      const endDate = dates[1].toISOString().split("T")[0];
      getByDateRange(startDate, endDate);
    }
  };

  return (
    <>
      <Layout
        title="Servicios"
        header={
          <ServiceHeader
            exportData={exportData}
            createService={createService}
            onDatesChange={onDatesChange}
          />
        }
      >
        <ServiceTable items={services} loading={loading} onEdit={onEdit} />
      </Layout>
    </>
  );
};

export default ServicePage;
