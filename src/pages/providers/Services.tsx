import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import ServiceHeader from "../../components/molecules/Services/ServiceHeader/ServiceHeader";
import ServiceTable from "../../components/molecules/Services/ServiceTable/ServiceTable";
import { IService } from "../../models/IService";
import { addService, getAllServices } from "../../services/services.service";

const ServicePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [services, setServices] = useState<IService[]>([]);

  const exportData = () => {
    console.log("Export data");
  };

  const createService = () => {
    navigate(`/services/create`);
  };

  const onEdit = (data: IService) => {
    console.log(data);
    navigate(`/services/${data.id}`);
  };

  const getAll = async () => {
    setLoading(true);
    const res = await getAllServices().finally(() => setLoading(false));
    setServices(res);
    console.log(res);
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <Layout
        title="Servicios"
        header={
          <ServiceHeader
            exportData={exportData}
            createService={createService}
          />
        }
      >
        <ServiceTable items={services} loading={loading} onEdit={onEdit} />
      </Layout>
    </>
  );
};

export default ServicePage;
