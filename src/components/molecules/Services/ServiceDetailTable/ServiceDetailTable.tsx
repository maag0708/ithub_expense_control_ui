import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { DataTableFilterMeta } from "primereact/datatable";
import React, { useCallback, useEffect, useState } from "react";
import { IServiceDetail } from "../../../../models/IService";
import { TableHeader } from "../../../../types/table";
import Table from "../../../atoms/Table/Table";
import { ServiceDetailTableProps } from "./ServiceDetailTable.types";
import { ColumnFilterElementTemplateOptions } from "primereact/column";
import MultiSelect from "../../../atoms/MultiSelect/MultiSelect";
import { MultiSelectChangeEvent } from "primereact/multiselect";
import { FormFieldOptions } from "../../../../types/form";
import { getCatalogById } from "../../../../services/catalog.service";
import { CatalogType } from "../../../../types/catalog";

const ServiceDetailTable: React.FC<ServiceDetailTableProps> = ({
  items,
  loading,
  onEdit,
  onDelete,
}) => {
  const [conceptCatalog, setConceptCatalog] = useState<FormFieldOptions[]>([]);
  const getConceptCatalog = useCallback(async () => {
    const concept = await getCatalogById(CatalogType.CONCEPT);
    setConceptCatalog(concept.data);
  }, []);

  const [accountCatalog, setAccountCatalog] = useState<FormFieldOptions[]>([]);
  const getAccountCatalog = useCallback(async () => {
    const weeks = await getCatalogById(CatalogType.ACCOUNT);
    if (!weeks) return;
    setAccountCatalog(weeks.data);
  }, []);

  const [serviceTypeCatalog, setServiceTypeCatalog] = useState<
    FormFieldOptions[]
  >([]);
  const getServiceTypeCatalog = useCallback(async () => {
    const weeks = await getCatalogById(CatalogType.SERVICETYPE);
    if (!weeks) return;
    setServiceTypeCatalog(weeks.data);
  }, []);

  const [vendorCatalog, setVendorCatalog] = useState<FormFieldOptions[]>([]);
  const getVendorCatalog = useCallback(async () => {
    const weeks = await getCatalogById(CatalogType.VENDOR);
    if (!weeks) return;
    setVendorCatalog(weeks.data);
  }, []);

  const defaultFilters: DataTableFilterMeta = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    conceptID: { value: null, matchMode: FilterMatchMode.IN },
    partsNumber: { value: null, matchMode: FilterMatchMode.CONTAINS },
    amount: { value: null, matchMode: FilterMatchMode.CONTAINS },
    accountID: { value: null, matchMode: FilterMatchMode.IN },
    serviceTypeID: { value: null, matchMode: FilterMatchMode.IN },
    vendorID: { value: null, matchMode: FilterMatchMode.IN },
  };

  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);

  const catalogFilter = (filter:any)=>{
    console.log({defaultFilters});
    console.log({filter});
    setFilters(filter);
  }

  const suppliedCell = (rowData: IServiceDetail) => (
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

  useEffect(() => {
    getConceptCatalog();
    getAccountCatalog();
    getServiceTypeCatalog();
    getVendorCatalog();
  }, [
    getConceptCatalog,
    getAccountCatalog,
    getServiceTypeCatalog,
    getVendorCatalog,
    items,
  ]);

  const conceptCatalogCatalogFilter = (
    options: ColumnFilterElementTemplateOptions
  ) => (
    <MultiSelect
      value={options.value}
      options={conceptCatalog}
      display="chip"
      onChange={(e: MultiSelectChangeEvent) => options.filterCallback(e.value)}
      placeholder="Any"
      className="p-column-filter"
    />
  );

  const conceptCell = (rowData: IServiceDetail) => (
    <div className="flex justify-content-center align-items-center">
      {
        conceptCatalog.find((item) => item.id === Number(rowData.conceptID))
          ?.name
      }
    </div>
  );

  const accountCatalogFilter = (
    options: ColumnFilterElementTemplateOptions
  ) => (
    <MultiSelect
      value={options.value}
      options={accountCatalog}
      display="chip"
      onChange={(e: MultiSelectChangeEvent) => options.filterCallback(e.value)}
      placeholder="Any"
      className="p-column-filter"
    />
  );

  const accountCell = (rowData: IServiceDetail) => (
    <div className="flex justify-content-center align-items-center">
      {
        accountCatalog.find((item) => item.id === Number(rowData.accountID))
          ?.name
      }
    </div>
  );

  const serviceTypeCatalogFilter = (
    options: ColumnFilterElementTemplateOptions
  ) => (
    <MultiSelect
      value={options.value}
      options={serviceTypeCatalog}
      display="chip"
      onChange={(e: MultiSelectChangeEvent) => options.filterCallback(e.value)}
      placeholder="Any"
      className="p-column-filter"
    />
  );

  const serviceTypeCell = (rowData: IServiceDetail) => (
    <div className="flex justify-content-center align-items-center">
      {
        serviceTypeCatalog.find(
          (item) => item.id === Number(rowData.serviceTypeID)
        )?.name
      }
    </div>
  );

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

  const vendorCell = (rowData: IServiceDetail) => (
    <div className="flex justify-content-center align-items-center">
      {vendorCatalog.find((item) => item.id === Number(rowData.vendorID))?.name}
    </div>
  );

  const headers: TableHeader[] = [
    {
      field: "conceptID",
      header: "Concepto",
      body: conceptCell,
      filter: true,
      filterConfig: {
        showFilterMatchModes: false,
        isGlobalFilter: true,
        filterField: "conceptID",
        filterPlaceholder: "Buscar por catálogo de conceptos",
        filterElementTemplate: conceptCatalogCatalogFilter,
      },
    },
    { field: "partsNumber", header: "No. de Partes", filter: true},
    { field: "amount", header: "Cantidad", filter: true},
    {
      field: "accountID",
      header: "Cuenta",
      body: accountCell,
      filter: true,
      filterConfig: {
        showFilterMatchModes: false,
        filterField: "accountID",
        filterPlaceholder: "Buscar por catálogo de cuentas",
        filterElementTemplate: accountCatalogFilter,
      },
    },
    {
      field: "serviceTypeID",
      header: "Tipo de Mantenimiento",
      body: serviceTypeCell,
      filter: true,
      filterConfig: {
        showFilterMatchModes: false,
        filterField: "serviceTypeID",
        filterPlaceholder: "Buscar por catálogo de tipos de mantenimiento",
        filterElementTemplate: serviceTypeCatalogFilter,
      },
    },
    {
      field: "vendorID",
      header: "Proveedor",
      body: vendorCell,
      filter: true,
      filterConfig: {
        showFilterMatchModes: false,
        filterField: "vendorID",
        filterPlaceholder: "Buscar por catálogo de proveedores",
        filterElementTemplate: vendorCatalogFilter,
      },
    },
    { field: "supplied", header: "Acciones", body: suppliedCell },
  ];

  return (
      <Table
        data={items}
        loading={loading}
        headers={headers}
        className="max-h-6rem md:max-h-10rem"
        filters={filters}
        setFilters={catalogFilter}
        defaultFilters={defaultFilters}
      />
  );
};

export default ServiceDetailTable;
