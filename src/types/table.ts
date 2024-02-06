import { ColumnFilterApplyTemplateOptions, ColumnFilterClearTemplateOptions, ColumnFilterFooterTemplateOptions } from "primereact/column";

export interface TableHeader {
  field: string;
  header: string;
  filter?: boolean;
  dataType?: 'text' | 'numeric' | 'date' | 'checkbox' | string | undefined;
  template?: React.ReactNode;
  filterConfig?: TableFilterOptions;
  body?: (rowData: any) => React.ReactNode;
  hidden?: boolean;
}

export interface TableFilterOptions {
  filterPlaceholder?: string;
  isGlobalFilter?: boolean;
  showFilterMatchModes?: boolean;
  filterField?: string;
  filterElementTemplate?: React.ReactNode | ((options: any) => React.ReactNode);
  filterApplyTemplate?:  React.ReactNode | ((options: ColumnFilterApplyTemplateOptions) => React.ReactNode);
  filterClearTemplate?: React.ReactNode | ((options: ColumnFilterClearTemplateOptions) => React.ReactNode);
  filterFooterTemplate?: React.ReactNode | ((options: ColumnFilterFooterTemplateOptions) => React.ReactNode);
}
