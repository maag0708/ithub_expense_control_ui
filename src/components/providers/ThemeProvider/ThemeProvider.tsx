import { PrimeReactProvider} from "primereact/api";

import "../../../primereact-theme/theme/mira/theme.scss" 
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";


import React from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return <PrimeReactProvider>{children}</PrimeReactProvider>;
};

export default ThemeProvider;
