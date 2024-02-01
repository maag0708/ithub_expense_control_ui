import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import React, { useEffect, useState } from "react";
import { ServiceHeaderProps } from "./ServiceHeader.types";
import { getStartAndEndDateOfWeek } from "../../../../services/date.service";

const ServiceHeader: React.FC<ServiceHeaderProps> = ({
  exportData,
  createService,
  onDatesChange,
}) => {
  const [dates, setDates] = useState<Nullable<(Date | null)[]>>(null);

  useEffect(() => {
    const { start, end } = getStartAndEndDateOfWeek(new Date());
    setDates([start, end]);
    onDatesChange([start, end]);
  }, []);

  return (
    <div className="flex flex-column align-items-center justify-content-center w-full lg:flex-row lg:justify-content-end gap-2">
      <Calendar
        value={dates}
        className="w-full lg:w-auto"
        onChange={(e) => setDates(e.value)}
        selectionMode="range"
        readOnlyInput
        showIcon
/>
      <Button
        icon="pi pi-search"
        className="p-button-primary w-full lg:w-1"
        raised
        outlined
        onClick={() => onDatesChange(dates)}
      />
      <Button
        label="Exportar"
        icon="pi pi-file-pdf"
        className="p-button-success w-full lg:w-auto"
        raised
        outlined
        onClick={exportData}
      />
      <Button
        label="Servicio"
        icon="pi pi-plus"
        className="p-button-primary w-full lg:w-auto"
        onClick={createService}
      />
    </div>
  );
};

export default ServiceHeader;
