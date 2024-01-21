import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppProvider from "./components/providers/AppProvider/AppProvider";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
);
