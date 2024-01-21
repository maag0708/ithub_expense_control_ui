import { Route } from "react-router-dom";
import ServicePage from "../pages/providers/Services";
import ServiceDetailsPage from "../pages/providers/ServiceDetails";

const ServiceRoutes = () => (
  <>
    <Route index element={<ServicePage />} />
    <Route path=":id" element={<ServiceDetailsPage />} />
  </>
);
export default ServiceRoutes;
