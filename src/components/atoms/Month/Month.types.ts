import { HandleBlur, HandleChange } from "../../../types/formik";

export interface MonthProps {
  name: string;
  value: Date | null;
  handleChange: HandleChange;
  handleBlur: HandleBlur;
  label?: string;
  placeholder?: string;
  size?: "small" | "medium" | "large";
  touched?: boolean;
  error?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
}
