export interface IService {
  id: number;
  serviceDate: string;
  invoiceNumber: string;
  month: string;
  week: string;
  invoiceDate: string;
  invoice: string;
  subsidiary: string;
  vehicleNumber: string;
  vendor: string;
  status: boolean;
  total?: number;
  count?: number;
}

export interface IServiceDetail {
  id: number;
  orderID: string;
  concept: string;
  partsNumber: string;
  amount: string;
  account: string;
  serviceType: string;
}

export interface IServiceForm {
  serviceDate: string;
  invoiceNumber: string;
  month: string;
  weekID: string;
  invoiceDate: string;
  invoice: string;
  subsidiaryID: string;
  vendorID: string;
  vehicleNumber: string;
  status: boolean;
  total?: number;
  count?: number;
}
