import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { ColumnFilterElementTemplateOptions } from "primereact/column";
import { DataTableFilterMeta } from "primereact/datatable";
import { MultiSelectChangeEvent } from "primereact/multiselect";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IService } from "../../../../models/IService";
import { TableHeader } from "../../../../types/table";
import MultiSelect from "../../../atoms/MultiSelect/MultiSelect";
import Table from "../../../atoms/Table/Table";
import { useSubsidiaryCatalog } from "../../../catalogs/subsidiaryCatalog";
import { useVehicleCatalog } from "../../../catalogs/vehicleCatalog";
import { useVendorCatalog } from "../../../catalogs/vendorCatalog";
import { useWeekCatalog } from "../../../catalogs/weekCatalog";
import { InvoiceTableProps } from "./InvoiceTable.types";

const InvoiceTable: React.FC<InvoiceTableProps> = ({
  invoices,
  updateInvoiceStatus,
  onDelete,
  loading,
}) => {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState<IService[]>([]);

  const { subsidiaryCatalog } = useSubsidiaryCatalog();
  const { weekCatalog } = useWeekCatalog();
  const { vehicleCatalog } = useVehicleCatalog();
  const { vendorCatalog } = useVendorCatalog();

  const defaultFilters: DataTableFilterMeta = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    invoiceNumber: { value: null, matchMode: FilterMatchMode.CONTAINS },
    invoice: { value: null, matchMode: FilterMatchMode.CONTAINS },
    invoiceDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
    month: { value: null, matchMode: FilterMatchMode.CONTAINS },
    serviceDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    total: { value: null, matchMode: FilterMatchMode.CONTAINS },
    count: { value: null, matchMode: FilterMatchMode.CONTAINS },

    vendor: { value: null, matchMode: FilterMatchMode.IN },
    subsidiary: { value: null, matchMode: FilterMatchMode.IN },
    vehicleNumber: { value: null, matchMode: FilterMatchMode.IN },
    week: { value: null, matchMode: FilterMatchMode.IN },
  };
  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);

  const onEdit = (data: IService) => {
    navigate(`/services/${data.id}`);
  };

  const suppliedCell = (rowData: IService) => (
    <div className="flex justify-content-evenly gap-2">
      <Button
        type="button"
        className="p-button-primary"
        icon="pi pi-pencil"
        outlined
        onClick={() => onEdit(rowData)}
      />
      <Button
        type="button"
        className="p-button-danger"
        icon="pi pi-trash"
        outlined
        onClick={() => onDelete(rowData)}
      />
    </div>
  );

  const subsidiaryCatalogFilter = (
    options: ColumnFilterElementTemplateOptions
  ) => (
    <MultiSelect
      value={options.value}
      options={subsidiaryCatalog}
      display="chip"
      onChange={(e: MultiSelectChangeEvent) => options.filterCallback(e.value)}
      placeholder="Any"
      className="p-column-filter"
    />
  );

  const weekCatalogFilter = (options: ColumnFilterElementTemplateOptions) => (
    <MultiSelect
      value={options.value}
      options={weekCatalog}
      display="chip"
      onChange={(e: MultiSelectChangeEvent) => options.filterCallback(e.value)}
      placeholder="Any"
      className="p-column-filter"
    />
  );

  const vehicleNumberFilterTemplate = (
    options: ColumnFilterElementTemplateOptions
  ) => {
    return (
      <MultiSelect
        value={options.value}
        options={vehicleCatalog}
        display="chip"
        onChange={(e: MultiSelectChangeEvent) =>
          options.filterCallback(e.value)
        }
        placeholder="Any"
        className="p-column-filter"
      />
    );
  };

  const vendorCatalogFilter = (options: ColumnFilterElementTemplateOptions) => (
    <MultiSelect
      value={options.value}
      options={vendorCatalog}
      display="chip"
      onChange={(e: MultiSelectChangeEvent) => options.filterCallback(e.value)}
      placeholder="Any"
      className="p-column-filter"
    />
  );

  const booleanCell = (rowData: IService) => (
    <div className="flex justify-content-center align-items-center">
      <i
        className={`pi pi-${rowData.status ? "check" : "times"}-circle`}
        style={{ color: rowData.status ? "green" : "red", fontSize: "1.5rem" }}
      ></i>
    </div>
  );

  const dateCell = (rowData: any, field: string) => (
    <div className="flex justify-content-center align-items-center">
      {new Date(rowData[field] ?? "").toLocaleDateString("en-GB")}
    </div>
  );

  const monthCell = (rowData: IService) => (
    <div className="flex justify-content-center align-items-center">
      {new Date(rowData.invoiceDate ?? "").toLocaleDateString("default", {
        month: "numeric",
        year: "numeric",
      })}
    </div>
  );

  const verifiedFilterTemplate = (
    options: ColumnFilterElementTemplateOptions
  ) => {
    return (
      <div className="flex align-items-center gap-2 w-full">
        <label htmlFor="verified-filter" className="font-bold">
          Estatus
        </label>
        <TriStateCheckbox
          id="verified-filter"
          value={options.value}
          onChange={(e: any) => options.filterCallback(e.value)}
        />
      </div>
    );
  };

  const headers: TableHeader[] = [
    {
      field: "invoiceNumber",
      header: "Número de factura",
      filter: true,
      filterConfig: {
        filterPlaceholder: "Buscar por número de factura",
        isGlobalFilter: true,
        showFilterMatchModes: false,
      },
    },
    {
      field: "invoice",
      header: "Folios",
      filter: true,
      filterConfig: {
        showFilterMatchModes: false,
      },
    },
    {
      field: "subsidiary",
      header: "Sucursal",
      filter: true,
      filterConfig: {
        showFilterMatchModes: false,
        filterField: "subsidiary",
        filterPlaceholder: "Buscar por catálogo de sucursales",
        filterElementTemplate: subsidiaryCatalogFilter,
      },
    },
    {
      field: "invoiceDate",
      header: "Fecha Factura",
      body: (rowData: IService) => dateCell(rowData, "invoiceDate"),
      filter: true,
      filterConfig: {
        showFilterMatchModes: false,
      },
    },
    {
      field: "month",
      header: "Mes Factura",
      body: monthCell,
      filter: true,
      filterConfig: {
        showFilterMatchModes: false,
      },
    },
    {
      field: "serviceDate",
      header: "Fecha Folio",
      body: (rowData: IService) => dateCell(rowData, "serviceDate"),
      filter: true,
      filterConfig: {
        showFilterMatchModes: false,
      },
    },
    {
      field: "status",
      header: "Estatus",
      dataType: "boolean",
      filter: true,
      body: booleanCell,
      filterConfig: {
        showFilterMatchModes: false,
        filterField: "status",
        filterPlaceholder: "Buscar por catálogo de estatus",
        filterElementTemplate: verifiedFilterTemplate,
      },
    },
    {
      field: "vendor",
      header: "Proveedor",
      filter: true,
      filterConfig: {
        showFilterMatchModes: false,
        filterField: "vendor",
        filterPlaceholder: "Buscar por catálogo de proveedores",
        filterElementTemplate: vendorCatalogFilter,
      },
    },
    {
      field: "vehicleNumber",
      header: "Placas",
      filter: true,
      filterConfig: {
        showFilterMatchModes: false,
        filterField: "vehicleNumber",
        filterPlaceholder: "Buscar por catálogo de placas",
        filterElementTemplate: vehicleNumberFilterTemplate,
      },
    },
    {
      field: "total",
      header: "Total",
      filter: true,
      filterConfig: {
        showFilterMatchModes: false,
      },
    },
    {
      field: "count",
      header: "Total de detalles",
      filter: true,
      filterConfig: {
        showFilterMatchModes: false,
      },
    },
    {
      field: "week",
      header: "Semana",
      filter: true,
      filterConfig: {
        showFilterMatchModes: false,
        filterField: "week",
        filterPlaceholder: "Buscar por catálogo de semanas",
        filterElementTemplate: weekCatalogFilter,
      },
    },
    {
      field: "actions",
      header: "Acciones",
      filter: false,
      body: suppliedCell,
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
      checkable={true}
      scrollHeight="calc(100vh - 260px)"
      loading={loading}
      selectedRows={selectedRows}
      setSelectedRows={setSelectedRows}
      headerTemplate={
        <>
          <Button
            label="Aprobar"
            type="button"
            className="p-button-info"
            icon="pi pi-check"
            disabled={selectedRows.length === 0}
            onClick={() => {
              setSelectedRows([]);
              updateInvoiceStatus(
                selectedRows.map((item: IService) => item.id)
              );
            }}
            outlined
          />
        </>
      }
    />
  );
};

export default InvoiceTable;
