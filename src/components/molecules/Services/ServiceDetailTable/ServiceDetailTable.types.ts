import { IServiceDetail } from "../../../../models/IService";

export interface ServiceDetailTableProps {
    items: IServiceDetail[];
    loading: boolean;
    onEdit(serviceDetail: IServiceDetail): void;
    onDelete(serviceDetail: IServiceDetail): void;
}
