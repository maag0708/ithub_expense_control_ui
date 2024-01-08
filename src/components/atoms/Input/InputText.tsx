import React from "react";

import { InputText as PiInput } from "primereact/inputtext";

import { InputProps } from "./InputText.types";

const Input: React.FC<InputProps> = ({
  name,
  label,
  placeholder,
  type,
  value,
  disabled,
  handleChange,
  handleBlur,
  iconPosition = "left",
  icon,
  touched,
  error,
  size = "medium",
  style
}) => {
  return (
    <div className="flex flex-column gap-1">
      <span
        className={`p-float-label flex flex-column ${
          icon && `p-input-icon-${iconPosition}`
        }`}
      >
        {icon && <i className={icon}></i>}
        <PiInput
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className={`${style} ${touched && error && "p-invalid"} ${
            (size == "small" && "p-inputtext-sm") ||
            (size == "medium" && "") ||
            (size == "large" && "p-inputtext-lg")
          }`}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <label className="text-sm font-semibold" htmlFor={name}>{label ? label : name}</label>
      </span>
      {touched && error ? (
        <small id={name} className="text-left p-error">
          {error}
        </small>
      ) : null}
    </div>
  );
};

export default Input;
