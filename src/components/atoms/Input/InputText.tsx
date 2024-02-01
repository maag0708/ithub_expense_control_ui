import React from "react";

import { InputText as PiInput } from "primereact/inputtext";

import { InputProps } from "./InputText.types";

const Input: React.FC<InputProps> = ({
  name,
  label,
  placeholder,
  type,
  value,
  disabled = false,
  required,
  handleChange,
  handleBlur,
  iconPosition = "left",
  icon,
  touched,
  error,
  autoFocus,
  size = "medium",
  className,
  hint,
}) => {
  return (
    <div className={`${className} flex flex-column`}>
      <span
        className={`p-float-label ${
          icon != undefined ? `p-input-icon-${iconPosition}` : ""
        }`}
      >
        {icon && <i className={icon}></i>}
        <PiInput
          id={name}
          name={name}
          type={type}
          keyfilter={type == "number" ? "num" : undefined}
          autoFocus={autoFocus}
          required={required}
          placeholder={placeholder}
          className={`w-full ${touched && error ? "p-invalid" : ""} ${
            (size == "small" ? "p-inputtext-sm" : "") ||
            (size == "medium" ? "" : "") ||
            (size == "large" ? "p-inputtext-lg" : "")
          }`}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <label className="text-sm font-semibold" htmlFor={name}>
          {label ? label : name}
        </label>
      </span>
      {hint && (
        <div id={name} className="text-right">
          <small>{hint}</small>
        </div>
      )}

      {touched && error ? (
        <span id={name} className="text-left p-error text-sm">
          {error}
        </span>
      ) : null}
    </div>
  );
};

export default Input;
