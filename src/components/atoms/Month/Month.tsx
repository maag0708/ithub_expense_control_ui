import React from "react";
import { MonthProps } from "./Month.types";
import { Calendar as PiCalendar } from 'primereact/calendar';

const Month: React.FC<MonthProps> = ({
  name,
  label,
  value = new Date(),
  handleChange,
  handleBlur,
  disabled,
  required,
  placeholder,
  className,
  size = "medium",
  touched,
  autoFocus,
  error,
}) => {
  return (
    <div className={`${className} flex flex-column`}>
      <span className={`p-float-label`}>
        <PiCalendar
          id={name}
          autoFocus={autoFocus}
          name={name}
          disabled={disabled}
          value={value}
          required={required}
          placeholder={placeholder}
          className={`w-full ${touched && error ? "p-invalid" : ""} ${
            (size == "small" ? "p-inputtext-sm" : "") ||
            (size == "medium" ? "" : "") ||
            (size == "large" ? "p-inputtext-lg" : "")
          }`}
          view="month"
          onChange={handleChange}
          onBlur={handleBlur}
          dateFormat={"mm/yy"}
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

export default Month;
