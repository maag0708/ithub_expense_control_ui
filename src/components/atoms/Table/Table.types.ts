import { DataTableFilterMeta } from "primereact/datatable";
import { TableHeader } from "../../../types/table";

export interface TableProps {
  data: any[];
  headers: TableHeader[];
  filters: DataTableFilterMeta;
  defaultFilters: DataTableFilterMeta;
  setFilters: (filters: DataTableFilterMeta) => void;
  loading?: boolean;
  paginator?: boolean;
  rows?: number;
  className?: string;
  rowsPerPage?: number[];
  scrollable?: boolean;
  scrollHeight?: string;
}
