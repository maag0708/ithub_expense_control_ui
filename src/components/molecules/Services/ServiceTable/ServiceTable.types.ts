import { IService } from "../../../../models/IService";

export interface ServiceTableProps {
    items: IService[];
    loading: boolean;
    onEdit: (item:IService) => void;
    onDelete: (item:IService) => void;
}
