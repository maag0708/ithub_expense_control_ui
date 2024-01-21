import { Button } from "primereact/button";
import React from "react";
import { ServiceHeaderProps } from "./ServiceHeader.types";

const ServiceHeader: React.FC<ServiceHeaderProps> = ({
  exportData,
  createService,
}) => {
  return (
    <>
      <Button
        label="Exportar"
        icon="pi pi-file-pdf"
        className="p-button-primary"
        onClick={exportData}
        text
      />
      <Button
        label="Nuevo Servicio"
        icon="pi pi-plus"
        className="p-button-primary"
        onClick={createService}
      />
    </>
  );
};

export default ServiceHeader;
