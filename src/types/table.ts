import { ColumnFilterApplyTemplateOptions, ColumnFilterClearTemplateOptions, ColumnFilterElementTemplateOptions, ColumnFilterFooterTemplateOptions } from "primereact/column";

export interface TableHeader {
  field: string;
  header: string;
  filter?: boolean;
  dataType?: 'text' | 'numeric' | 'date' | 'checkbox' | string | undefined;
  template?: React.ReactNode;
  filterConfig?: TableFilterOptions;
  body?: (rowData: any) => React.ReactNode;
}

export interface TableFilterOptions {
  filterPlaceholder?: string;
  isGlobalFilter?: boolean;
  showFilterMatchModes?: boolean;
  filterField?: string;
  filterElementTemplate?: React.ReactNode | ((options: ColumnFilterElementTemplateOptions) => React.ReactNode);
  filterApplyTemplate?:  React.ReactNode | ((options: ColumnFilterApplyTemplateOptions) => React.ReactNode);
  filterClearTemplate?: React.ReactNode | ((options: ColumnFilterClearTemplateOptions) => React.ReactNode);
  filterFooterTemplate?: React.ReactNode | ((options: ColumnFilterFooterTemplateOptions) => React.ReactNode);
}
