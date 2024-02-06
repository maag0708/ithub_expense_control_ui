import React from "react";
import { MultiSelectProps } from "./MultiSelect.types";
import { MultiSelect as PiMultiSelect } from "primereact/multiselect";

const MultiSelect: React.FC<MultiSelectProps> = ({
  value,
  options,
  placeholder,
  display,
  maxSelectedLabels = 3,
  template,
  className,
  onChange,
}) => {
  return (
    <PiMultiSelect
      value={value}
      onChange={onChange}
      options={options}
      optionLabel="name"
      optionValue="name"
      itemTemplate={template}
      display={display}
      placeholder={placeholder}
      maxSelectedLabels={maxSelectedLabels}
      className={className}
    />
  );
};

export default MultiSelect;
