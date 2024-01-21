import { Navigate } from "react-router-dom";

const MissingRoute = ({ path = "/" }: { path: string }) => {
  return <Navigate to={{ pathname: path }} />;
};

export default MissingRoute;
