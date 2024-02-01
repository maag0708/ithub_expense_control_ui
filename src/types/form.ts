import { InputProps } from "../components/atoms/Input/InputText.types";
import { SelectProps } from "../components/atoms/Select/Select.types";
import { MonthProps } from "../components/atoms/Month/Month.types";
import { CalendarProps } from "../components/atoms/Calendar/Calendar.types";

export interface Form {
  title: string;
  fields: (InputProps | CalendarProps | SelectProps | MonthProps)[] ;
  buttons: FormButton[];
}

export interface FormFieldOptions {
  id: number;
  name: string;
  identifier: string;
  accountID?: number;
  serviceTypeID?: number;
}

export interface FormButton {
  label: string;
  type?: "submit" | "reset" | "button" | undefined;
  icon?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}
