import { Form } from "formik";
import { Button } from "primereact/button";
import React from "react";
import Calendar from "../../../atoms/Calendar/Calendar";
import Input from "../../../atoms/Input/InputText";
import Month from "../../../atoms/Month/Month";
import Select from "../../../atoms/Select/Select";
import { DynamicFormProps } from "./DynamicForm.types";

const DynamicForm: React.FC<DynamicFormProps> = ({
  form,
  className,
}) => {
  const switchInput = (field: any) => {
    switch (field.type) {
      case "select":
        return (
          <Select
            key={field.name}
            name={field.name}
            label={field.label}
            size={field.size}
            required={field.required}
            placeholder={field.placeholder}
            value={field.value}
            className={field.className}
            handleBlur={field.handleBlur}
            handleChange={field.handleChange}
            disabled={field.disabled}
            touched={field.touched}
            error={field.error}
            options={field?.options ?? []}
            optionLabel={field.optionLabel ?? "value"}
            optionValue={field.optionValue}
            clearIcon={field.clearIcon}
          />
        );
      case "date":
        return (
          <Calendar
            key={field.name}
            autoFocus={field.autoFocus}
            name={field.name}
            label={field.label}
            size={field.size}
            required={field.required}
            placeholder={field.placeholder}
            value={new Date(field.value)}
            className={field.className}
            handleBlur={field.handleBlur}
            handleChange={field.handleChange}
            disabled={field.disabled}
            touched={field.touched}
            error={field.error}
          />
        );
      case "month":
        return (
          <Month
            key={field.name}
            autoFocus={field.autoFocus}
            name={field.name}
            label={field.label}
            size={field.size}
            required={field.required}
            placeholder={field.placeholder}
            value={new Date(field.value)}
            className={field.className}
            handleBlur={field.handleBlur}
            handleChange={field.handleChange}
            disabled={field.disabled}
            touched={field.touched}
            error={field.error}
          />
        );
      default:
        return (
          <Input
            key={field.name}
            name={field.name}
            label={field.label}
            type={field.type}
            size={field.size}
            required={field.required}
            placeholder={field.placeholder}
            value={field.value}
            className={field.className}
            handleBlur={field.handleBlur}
            handleChange={field.handleChange}
            disabled={field.disabled}
            touched={field.touched}
            error={field.error}
          />
        );
    }
  };

  return (
    <Form className={className}>
      {form.fields.map((field) => switchInput(field))}
      {form.buttons.map((button) => (
        <Button
          key={button.label}
          label={button.label}
          type={button.type}
          disabled={button.disabled}
          className={button.className}
          onClick={button.onClick}
        />
      ))}
    </Form>
  );
};

export default DynamicForm;
