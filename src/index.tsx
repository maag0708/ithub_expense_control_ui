import ReactDOM from "react-dom/client";
import "./index.css";
import { HashRouter } from "react-router-dom";

import AppProvider from "./components/providers/AppProvider/AppProvider";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <HashRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </HashRouter>
);
