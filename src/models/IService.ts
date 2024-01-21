export interface IService {
    id?: number;
    serviceDate: string;
    invoiceNumber: string;
    month: string;
    weekID: string;
    invoiceDate: string;
    invoice: string;
    subsidiaryID: string;
    vehicleNumer: string;
    status: boolean;
}

export interface IServiceDetail {
    orderID: string;
    conceptID: string;
    partsNumber: string;
    amount: string;
    accountID: string;
    serviceTypeID: string;
    vendorID: string;
    invoiceDate: string;
}