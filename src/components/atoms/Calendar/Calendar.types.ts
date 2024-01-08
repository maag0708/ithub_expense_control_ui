import { HandleBlur, HandleChange } from "../../../types/formik";

export interface CalendarProps {
  name: string;
  value: Date;
  handleChange: HandleChange;
  handleBlur: HandleBlur;
  disabled?: boolean;
  showIcon?: boolean;
  dateFormat?:string;
}
