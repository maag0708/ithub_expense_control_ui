import { IServiceDetail } from "../../../../models/IService";

export interface ServiceDetailFormProps {
    invoiceNumber: string | undefined;
    detail?: IServiceDetail | null;
    getServiceDetails: () => void;
    onReset: () => void;
}   
