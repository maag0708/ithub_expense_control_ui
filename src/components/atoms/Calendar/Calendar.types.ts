import { HandleBlur, HandleChange } from "../../../types/formik";
export interface CalendarProps {
  name: string;
  value: Date;
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
  showIcon?: boolean;
  dateFormat?: string;
  autoFocus?: boolean;
  selectionMode?: string;
  view?: "date" | "month" | "year" | undefined;
}
