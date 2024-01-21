import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/hocs/ProtectedRoute/ProtectedRoute";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import InvoicePage from "./pages/admin/Invoices";
import ServiceCreatePage from "./pages/providers/ServiceCreate";
import ServicePage from "./pages/providers/Services";
import { selectUser, setUser } from "./state/userSlice";
import { User } from "./types/user";
import { getLocalStorage } from "./utils/localStorage";

const App = () => {

  const dispatch = useDispatch();
  const userState = useSelector(selectUser);

  useEffect(() => {
    const getUserData = async () => {
      const user: User = await getLocalStorage('user');

      dispatch(setUser(user));
    };

    if (!userState) {
      getUserData();
    }
  }, []);

  return (
    <Routes>
    <Route element={<ProtectedRoute />}>
      <Route index element={<HomePage />} />
      <Route path="invoices" element={<InvoicePage />} />
      <Route path="services">
        <Route index element={<ServicePage />} />
        <Route path=":invoiceNumber" element={<ServiceCreatePage />} />
      </Route>
    </Route>
    <Route path="login" element={<LoginPage />} />
  </Routes>
  )
};

export default App;
