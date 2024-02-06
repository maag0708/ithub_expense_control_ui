import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import React, { useState } from "react";
import { ServiceHeaderProps } from "./ServiceHeader.types";

const ServiceHeader: React.FC<ServiceHeaderProps> = ({
  exportData,
  createService,
  onDatesChange,
}) => {
  const [dates, setDates] = useState<Nullable<(Date | null)[]>>(null);

  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 30);

  return (
    <div className="flex flex-column align-items-center justify-content-center w-full lg:flex-row lg:justify-content-end gap-2">
      <Calendar
        value={dates}
        className="w-full lg:w-18rem"
        onChange={(e) => setDates(e.value)}
        selectionMode="range"
        minDate={minDate}
        dateFormat="dd/mm/yy"
        readOnlyInput
        showIcon
      />
      <Button
        icon="pi pi-search"
        className="p-button-primary w-full lg:w-3rem"
        raised
        outlined
        onClick={() => onDatesChange(dates)}
      />

      <Button
        label="Exportar excel"
        icon="pi pi-file-excel"
        className="p-button-success w-full lg:w-12rem"
        raised
        outlined
        onClick={exportData}
      />
      <Button
        label="Nuevo Folio"
        icon="pi pi-plus"
        className="p-button-primary w-full lg:w-12rem"
        onClick={createService}
      />
    </div>
  );
};

export default ServiceHeader;
