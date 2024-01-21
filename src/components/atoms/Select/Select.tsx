import React from "react";
import { Dropdown } from "primereact/dropdown";
import { SelectProps } from "./Select.types";

const Select: React.FC<SelectProps> = ({
  name,
  label,
  placeholder,
  value,
  disabled,
  required,
  handleChange,
  handleBlur,
  iconPosition = "left",
  icon,
  touched,
  error,
  size = "medium",
  className,
  options,
  optionLabel = "name",
  optionValue = "id",
  clearIcon,
  autoFocus,
}) => {
  return (
    <div className={`${className} flex flex-column`}>
      <span
        className={`p-float-label ${
          icon != undefined ? `p-input-icon-${iconPosition}` : ""
        }`}
      >
        {icon && <i className={icon}></i>}
        <Dropdown
          id={name}
          name={name}
          autoFocus={autoFocus}
          required={required}
          placeholder={placeholder}
          className={`w-full ${touched && error ? "p-invalid" : ""} ${
            (size == "small" ? "p-inputtext-sm" : "") ||
            (size == "medium" ? "" : "") ||
            (size == "large" ? "p-inputtext-lg" : "")
          }`}
          value={value}
          defaultChecked={true}
          disabled={disabled}
          onChange={handleChange}
          onBlur={handleBlur}
          options={options}
          optionLabel={optionLabel}
          optionValue={optionValue}
          showClear={clearIcon}
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

export default Select;
