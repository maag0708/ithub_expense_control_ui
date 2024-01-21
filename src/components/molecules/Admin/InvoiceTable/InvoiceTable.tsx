import React, { useState } from "react";
import { InvoiceTableProps } from "./InvoiceTable.types";
import { DataTableFilterMeta } from "primereact/datatable";
import { FilterMatchMode } from "primereact/api";
import { TableHeader } from "../../../../types/table";
import Table from "../../../atoms/Table/Table";

const InvoiceTable: React.FC<InvoiceTableProps> = ({ invoices }) => {
  const defaultFilters: DataTableFilterMeta = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    invoiceNumber: { value: null, matchMode: FilterMatchMode.CONTAINS },
    month: { value: null, matchMode: FilterMatchMode.IN },
    folio: { value: null, matchMode: FilterMatchMode.CONTAINS },
    serviceCatalog: { value: null, matchMode: FilterMatchMode.IN },
    sucursal: { value: null, matchMode: FilterMatchMode.CONTAINS },
    plates: { value: null, matchMode: FilterMatchMode.CONTAINS },
  };

  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);

  const headers: TableHeader[] = [
    {
      field: "invoiceNumber",
      header: "Número de factura",
      filter: true,
      filterConfig: {
        filterPlaceholder: "Buscar por número de factura",
        isGlobalFilter: true,
      },
    },
    {
      field: "folio",
      header: "Folio",
      filter: true,
    },
    {
      field: "sucursal",
      header: "Sucursal",
      filter: true,
    },
    {
      field: "plates",
      header: "Placas",
      filter: true,
    },
  ];

  return (
    <Table
      headers={headers}
      data={invoices}
      filters={filters}
      setFilters={setFilters}
      defaultFilters={defaultFilters}
      paginator={true}
    />
  );
};

export default InvoiceTable;
