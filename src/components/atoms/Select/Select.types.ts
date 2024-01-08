import { HandleBlur, HandleChange } from "../../../types/formik";

export interface SelectProps  {
    name:string;
    value:any;
    options: any[];
    optionLabel:string;
    handleChange: HandleChange;
    handleBlur: HandleBlur;
    placeholder?:string;
    optionValue?:string
    disabled?: boolean;
    clearIcon?: boolean;
}