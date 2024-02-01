import React, { useCallback, useEffect, useState } from "react";
import { ServiceTableProps } from "./ServiceTable.types";
import { ColumnFilterElementTemplateOptions } from "primereact/column";
import MultiSelect from "../../../atoms/MultiSelect/MultiSelect";
import { MultiSelectChangeEvent } from "primereact/multiselect";
import { TableHeader } from "../../../../types/table";
import Table from "../../../atoms/Table/Table";
import { DataTableFilterMeta } from "primereact/datatable";
import { FilterMatchMode } from "primereact/api";
import { getCatalogById } from "../../../../services/catalog.service";
import { FormFieldOptions } from "../../../../types/form";
import { Button } from "primereact/button";
import { IService } from "../../../../models/IService";
import { CatalogType } from "../../../../types/catalog";

const ServiceTable: React.FC<ServiceTableProps> = ({
  items,
  loading,
  onEdit,
}) => {
  const [subsidiaryCatalog, setSubsidiaryCatalog] = useState<
    FormFieldOptions[]
  >([]);
  const getSubsidiaryCatalog = useCallback(async () => {
    const subsidiary = await getCatalogById(CatalogType.SUBSIDIARY);
    setSubsidiaryCatalog(subsidiary.data);
  }, []);

  const [weekCatalog, setWeekCatalog] = useState<FormFieldOptions[]>([]);
  const getWeekCatalog = useCallback(async () => {
    const week = await getCatalogById(CatalogType.WEEK);
    setWeekCatalog(week.data);
  }, []);

  const defaultFilters: DataTableFilterMeta = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    invoiceNumber: { value: null, matchMode: FilterMatchMode.CONTAINS },
    invoice: { value: null, matchMode: FilterMatchMode.CONTAINS },
    subsidiary: { value: null, matchMode: FilterMatchMode.IN },
    invoiceDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
    month: { value: null, matchMode: FilterMatchMode.CONTAINS },
    serviceDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
    vendor: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.CONTAINS },
    vehicleNumber: { value: null, matchMode: FilterMatchMode.CONTAINS },
    total: { value: null, matchMode: FilterMatchMode.CONTAINS },
    count: { value: null, matchMode: FilterMatchMode.CONTAINS },
    week: { value: null, matchMode: FilterMatchMode.IN },
  };

  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);

  useEffect(() => {
    getSubsidiaryCatalog();
    getWeekCatalog();
  }, [getSubsidiaryCatalog, getWeekCatalog]);

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

  const suppliedCell = (rowData: IService) => (
    <div className="flex justify-content-evenly gap-2">
      <Button
        type="button"
        className="p-button-primary"
        icon="pi pi-pencil"
        disabled={rowData.status}
        outlined
        onClick={() => onEdit(rowData)}
      />
      <Button
        type="button"
        className="p-button-danger"
        icon="pi pi-trash"
        disabled={rowData.status}
        outlined
        onClick={() => onEdit(rowData)}
      />
    </div>
  );

  const booleanCell = (rowData: IService) => (
    <div className="flex justify-content-center align-items-center">
      <i
        className={`pi pi-${rowData.status ? "check" : "times"}-circle`}
        style={{ color: rowData.status ? "green" : "red", fontSize: "1.5rem" }}
      ></i>
    </div>
  );

  const invoiceDateCell = (rowData: IService) => (
    <div className="flex justify-content-center align-items-center">
      {new Date(rowData.invoiceDate ?? "").toLocaleDateString()}
    </div>
  );

  const serviceDateCell = (rowData: IService) => (
    <div className="flex justify-content-center align-items-center">
      {new Date(rowData.serviceDate ?? "").toLocaleDateString()}
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
      field: "invoice",
      header: "Servicios",
      filter: true,
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
      header: "Fecha de factura",
      body: invoiceDateCell,
      filter: true,
    },
    {
      field: "month",
      header: "Mes de factura",
      body: monthCell,
      filter: true,
    },
    {
      field: "serviceDate",
      header: "Fecha de servicio",
      body: serviceDateCell,
      filter: true,
    },
    {
      field: "status",
      header: "Estatus",
      filter: true,
      body: booleanCell,
    },
    {
      field: "vendor",
      header: "Proveedor",
      filter: true,
    },
    {
      field: "vehicleNumber",
      header: "Placas",
      filter: true,
    },
    {
      field: "total",
      header: "Total",
      filter: true,
    },
    {
      field: "count",
      header: "Total de detalles",
      filter: true,
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
      data={items}
      scrollable={true}
      scrollHeight="calc(100vh - 260px)"
      loading={loading}
      headers={headers}
      filters={filters}
      setFilters={setFilters}
      defaultFilters={defaultFilters}
    />
  );
};

export default ServiceTable;
