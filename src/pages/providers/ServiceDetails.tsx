import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { IServiceDetail } from "../../models/IService";
import { getServiceDetailById } from "../../services/services.service";

const ServiceDetailsPage = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [details, setDetails] = useState<IServiceDetail[]>([]);
  const onSubmit = (values: IServiceDetail) => {
    console.log(values);
  };

  const onCancel = () => {
    console.log("Cancel");
  };

  const getDetails = async () => {
    setLoading(true);
    const details = await getServiceDetailById(id ?? "").finally(() =>
      setLoading(false)
    );
    console.log(details);
    setDetails(details);
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <Layout title={`Detalle de la factura: ${id}`} back="/services">
   <></>
    </Layout>
  );
};

export default ServiceDetailsPage;
