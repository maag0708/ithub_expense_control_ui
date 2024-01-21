import { IService } from "../../../../models/IService";

export interface ServiceFormProps {
    invoiceNumber: string | undefined;
    values:IService | null;
    getDetails: () => void;
    onCancel?: () => void;
}
