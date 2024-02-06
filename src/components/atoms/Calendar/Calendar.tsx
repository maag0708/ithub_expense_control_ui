import React from "react";
import { CalendarProps } from "./Calendar.types";
import { Calendar as PiCalendar } from "primereact/calendar";

const Calendar: React.FC<CalendarProps> = ({
  name,
  label,
  value,
  handleChange,
  handleBlur,
  disabled,
  showIcon,
  dateFormat = "dd/mm/yy",
  required,
  placeholder,
  className,
  size = "medium",
  touched,
  autoFocus,
  view = "date",
  error,
}) => {
  return (
    <div className={`${className} flex flex-column`}>
      <span className={`p-float-label`}>
        <PiCalendar
          inputId={label}
          id={label}
          autoFocus={autoFocus}
          name={name}
          disabled={disabled}
          value={value}
          required={required}
          view={view}
          placeholder={placeholder}
          className={`w-full ${touched && error ? "p-invalid" : ""} ${
            (size == "small" ? "p-inputtext-sm" : "") ||
            (size == "medium" ? "" : "") ||
            (size == "large" ? "p-inputtext-lg" : "")
          }`}
          onChange={handleChange}
          onBlur={handleBlur}
          showIcon={showIcon}
          dateFormat={dateFormat}
        />
        <label className="text-sm font-semibold" htmlFor={name}>
          {label ? label : name}
        </label>
      </span>
      {touched && error ? (
        <span id={name} className="text-left p-error text-sm">
          {error}
        </span>
      ) : null}
    </div>
  );
};

export default Calendar;
