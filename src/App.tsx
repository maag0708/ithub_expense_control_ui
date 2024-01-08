import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/hocs/ProtectedRoute/ProtectedRoute";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";

const App = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomePage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default App;
