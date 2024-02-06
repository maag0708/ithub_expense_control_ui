import { IService } from "../../../../models/IService";

export interface InvoiceTableProps {
  invoices: IService[];
  updateInvoiceStatus: (invoices: number[]) => void;
  loading: boolean;
  onDelete: (data: IService) => void;
}
