import { Accordion, AccordionTab } from "primereact/accordion";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import ServiceDetailForm from "../../components/molecules/Services/ServiceDetailForm/ServiceDetailForm";
import ServiceDetailTable from "../../components/molecules/Services/ServiceDetailTable/ServiceDetailTable";
import ServiceForm from "../../components/molecules/Services/ServiceForm/ServiceForm";
import { IService, IServiceDetail } from "../../models/IService";
import {
  deleteServiceDetail,
  getServiceById,
  getServiceDetailById,
} from "../../services/services.service";
import { useDispatch } from "react-redux";
import { setNotification } from "../../state/notificationSlice";
import { Button } from "primereact/button";

const ServiceCreatePage = () => {
  const { invoiceNumber } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [service, setService] = useState<IService | null>(null);
  const [serviceDetails, setServiceDetails] = useState<IServiceDetail[]>([]);
  const [detail, setDetail] = useState<IServiceDetail | null>(null);

  const getServiceData = useCallback(async () => {
    try {
      if (!invoiceNumber || invoiceNumber === "create") return;
      setLoading(true);
      const service = await getServiceById(invoiceNumber).finally(() =>
        setLoading(false)
      );
      if (!service) return;

      setService(service);
    } catch (e) {
      dispatch(
        setNotification({
          message: "Error al obtener el Folio",
          severity: "error",
          summary: "Error al obtener el Folio",
        })
      );
      navigate("/services");
      console.log(e);
    }
  }, [invoiceNumber, dispatch, navigate]);

  const getServiceDetails = useCallback(async () => {
    try {
      console.log({ invoiceNumber });
      if (!invoiceNumber || invoiceNumber === "create") return;
      setLoadingDetail(true);
      const details = await getServiceDetailById(invoiceNumber).finally(() =>
        setLoadingDetail(false)
      );
      setDetail(null);
      setServiceDetails(details);
    } catch (e) {
      console.log(e);
    }
  }, [invoiceNumber]);

  useEffect(() => {
    getServiceData();
    getServiceDetails();
  }, [invoiceNumber, getServiceData, getServiceDetails]);

  const onDeleteDetail = async (detail: IServiceDetail) => {
    //TODO: Delete detail
    console.log(detail);

    setLoadingDetail(true);
    deleteServiceDetail(detail.id)
      .then(() => {
        dispatch(
          setNotification({
            message: "Detalle eliminado correctamente",
            severity: "success",
            summary: "Detalle eliminado",
          })
        );
        getServiceDetails();
      })
      .catch(() => {
        dispatch(
          setNotification({
            message: "Error al eliminar el detalle",
            severity: "error",
            summary: "Error al eliminar",
          })
        );
      })
      .finally(() => {
        setLoadingDetail(false);
      });
    
  };

  const handleCloseService = () => {
    console.log("Close service");
    navigate("/services/create");
    window.location.reload();
  };

  const handleEditDetail = (detail: IServiceDetail) => {
    setDetail(detail);
  }

  const CardHeader = ({ icon, text }: { icon: string; text: string }) => (
    <div className="mx-2 flex justify-content-start align-items-center gap-3">
      <i
        className={`pi pi-${icon} text-lg`}
        style={{ color: "var(--primary-color)" }}
      />
      <h2 className="text-lg font-normal text-primary">{text}</h2>
    </div>
  );

  return (
    <Layout
      title="Crear Folio"
      back="/services"
      header={
        <>
          <div className="flex flex-column align-items-center justify-content-center w-full lg:flex-row lg:justify-content-end gap-2">
            <Button
              label="Cerrar Folio"
              icon="pi pi-times"
              className="p-button-primary w-full lg:w-auto px-4"
              onClick={handleCloseService}
            />
          </div>
        </>
      }
    >
      <div className="flex flex-column gap-2 h-full overflow-scroll">
        <Accordion
          multiple
          activeIndex={[0, 1]}
          className="flex-column lg:flex-row gap-3"
        >
          <AccordionTab
            header={<CardHeader icon="pi pi-file" text="Encabezado" />}
            className="border-round-xl bg-blue-50 w-full"
          >
            {loading ? (
              <div className="flex justify-content-center align-items-center w-full h-full">
                <i className="pi pi-spin pi-spinner text-5xl text-primary" />
              </div>
            ) : (
              <ServiceForm
                values={service}
                invoiceNumber={invoiceNumber}
                getDetails={getServiceData}
              />
            )}
          </AccordionTab>

          <AccordionTab
            header={<CardHeader icon="pi pi-file" text="Detalles" />}
            className="border-round-xl bg-blue-50 w-full"
          >
            {loadingDetail ? (
              <div className="flex justify-content-center align-items-center w-full h-full">
                <i className="pi pi-spin pi-spinner text-5xl text-primary" />
              </div>
            ) : (
              <ServiceDetailForm
                getServiceDetails={getServiceDetails}
                invoiceNumber={invoiceNumber}
                detail={detail}
                onReset={getServiceDetails}
              />
            )}
          </AccordionTab>
        </Accordion>
        <ServiceDetailTable
          items={serviceDetails}
          loading={loadingDetail}
          onEdit={handleEditDetail}
          onDelete={onDeleteDetail}
        />
      </div>
    </Layout>
  );
};

export default ServiceCreatePage;
