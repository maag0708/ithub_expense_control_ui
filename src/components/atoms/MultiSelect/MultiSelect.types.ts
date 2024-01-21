import { FormFieldOptions } from "../../../types/form";

export interface MultiSelectProps {
  value: any[];
  options: FormFieldOptions[];
  maxSelectedLabels?: number;
  placeholder?: string;
  display?: "comma" | "chip" | undefined;
  onChange?: (e: any) => void;
  template?: React.ReactNode;
  className?: string;
}
