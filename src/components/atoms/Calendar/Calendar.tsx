import React from "react";
import { CalendarProps } from "./Calendar.types";
import { Calendar as PiCalendar } from "primereact/calendar";

const Calendar: React.FC<CalendarProps> = ({
  name,
  value,
  handleChange,
  handleBlur,
  disabled,
  showIcon,
  dateFormat
}) => {
  return (
    <PiCalendar
      name={name}
      disabled={disabled}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      showIcon={showIcon}
      dateFormat={dateFormat}
    />
  );
};

export default Calendar;
