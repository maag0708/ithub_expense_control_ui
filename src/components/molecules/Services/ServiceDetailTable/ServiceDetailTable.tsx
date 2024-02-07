import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { ColumnFilterElementTemplateOptions } from "primereact/column";
import { DataTableFilterMeta } from "primereact/datatable";
import { MultiSelectChangeEvent } from "primereact/multiselect";
import React, { useCallback, useEffect, useState } from "react";
import { IServiceDetail } from "../../../../models/IService";
import { getCatalogById } from "../../../../services/catalog.service";
import { CatalogType } from "../../../../types/catalog";
import { FormFieldOptions } from "../../../../types/form";
import { TableHeader } from "../../../../types/table";
import MultiSelect from "../../../atoms/MultiSelect/MultiSelect";
import Table from "../../../atoms/Table/Table";
import { ServiceDetailTableProps } from "./ServiceDetailTable.types";

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

  const defaultFilters: DataTableFilterMeta = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    concept: { value: null, matchMode: FilterMatchMode.IN },
    partsNumber: { value: null, matchMode: FilterMatchMode.CONTAINS },
    amount: { value: null, matchMode: FilterMatchMode.CONTAINS },
    account: { value: null, matchMode: FilterMatchMode.IN },
    serviceType: { value: null, matchMode: FilterMatchMode.IN },
  };

  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);

  const catalogFilter = (filter: any) => {
    console.log({ defaultFilters });
    console.log({ filter });
    setFilters(filter);
  };

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
  }, [getConceptCatalog, getAccountCatalog, getServiceTypeCatalog, items]);

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

  const headers: TableHeader[] = [
    {
      field: "concept",
      header: "Concepto",
      filter: true,
      filterConfig: {
        showFilterMatchModes: false,
        isGlobalFilter: true,
        filterField: "concept",
        filterPlaceholder: "Buscar por catálogo de conceptos",
        filterElementTemplate: conceptCatalogCatalogFilter,
      },
    },
    {
      field: "partsNumber",
      header: "No. de Partes",
      filter: true,
      filterConfig: {
        showFilterMatchModes: false,
      },
    },
    { field: "amount", header: "Cantidad", filter: true, filterConfig: {
      showFilterMatchModes: false,
    }, },
    {
      field: "account",
      header: "Cuenta",
      filter: true,
      filterConfig: {
        showFilterMatchModes: false,
        filterField: "account",
        filterPlaceholder: "Buscar por catálogo de cuentas",
        filterElementTemplate: accountCatalogFilter,
      },
    },
    {
      field: "serviceType",
      header: "Tipo de Mantenimiento",
      filter: true,
      filterConfig: {
        showFilterMatchModes: false,
        filterField: "serviceType",
        filterPlaceholder: "Buscar por catálogo de tipos de mantenimiento",
        filterElementTemplate: serviceTypeCatalogFilter,
      },
    },
    { field: "supplied", header: "Acciones", body: suppliedCell },
  ];

  return (
    <Table
      data={loading ? [] : items}
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
