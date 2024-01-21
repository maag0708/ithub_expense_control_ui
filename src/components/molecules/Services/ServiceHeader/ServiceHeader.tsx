import { Button } from "primereact/button";
import React from "react";
import { ServiceHeaderProps } from "./ServiceHeader.types";

const ServiceHeader: React.FC<ServiceHeaderProps> = ({
  exportData,
  createService,
}) => {
  return (
    <div className="flex flex-column justify-content-center w-full lg:flex-row lg:justify-content-end gap-2">
      <Button
        label="Exportar"
        icon="pi pi-file-pdf"
        className="p-button-success"
        raised
        outlined
        onClick={exportData}
      />
      <Button
        label="Nuevo Servicio"
        icon="pi pi-plus"
        className="p-button-primary"
        onClick={createService}
      />
    </div>
  );
};

export default ServiceHeader;
