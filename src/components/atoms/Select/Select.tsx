import React from "react";
import { Dropdown } from "primereact/dropdown";
import { SelectProps } from "./Select.types";

const Select: React.FC<SelectProps> = ({
  name,
  value,
  placeholder,
  options,
  optionLabel,
  optionValue,
  handleChange,
  handleBlur,
  disabled,
  clearIcon
}) => {
  return (
    <Dropdown
      name={name}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      options={options}
      disabled={disabled}
      optionLabel={optionLabel}
      optionValue={optionValue}
      showClear={clearIcon}
      placeholder={placeholder}
      className="w-full md:w-14rem"
    />
  );
};

export default Select;
