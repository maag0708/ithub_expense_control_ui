import React from "react";
import { inputContainerProps } from "./inputContainer.types";

const FormControl: React.FC<inputContainerProps> = ({
    label,
    name,
    touched,
    error,
    className,
    children

}) => {
  return (
    <div className={`${className} flex flex-column`}>
      <span className={`p-float-label`}>
       {children}
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

export default FormControl;
