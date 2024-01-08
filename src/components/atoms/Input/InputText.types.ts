import { HandleBlur, HandleChange } from "../../../types/formik";
import { InputTypes } from "../../../types/html";

export interface InputProps {
  name: string;
  label?: string;
  type: InputTypes;
  placeholder?: string;
  value: string;
  handleChange: HandleChange;
  handleBlur: HandleBlur;
  disabled?: boolean;
  iconPosition?: 'right' | 'left';
  size?: 'small' | 'medium' | 'large';
  icon?: string;
  touched?: boolean;
  error?: string;
  style?: string;
}
