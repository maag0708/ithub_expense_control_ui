import { FormFieldOptions } from "../../../types/form";
import { HandleBlur, HandleChange } from "../../../types/formik";

export interface SelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  value: any;
  handleChange: HandleChange;
  handleBlur: HandleBlur;
  disabled?: boolean;
  iconPosition?: "right" | "left";
  size?: "small" | "medium" | "large";
  icon?: string;
  touched?: boolean;
  error?: string;
  className?: string;
  required?: boolean;
  options: FormFieldOptions[];
  optionLabel?: string;
  optionValue?: string;
  clearIcon?: boolean;
  autoFocus?: boolean;
}
