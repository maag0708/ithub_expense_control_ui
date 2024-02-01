import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { TableProps } from "./Table.types";

const Table: React.FC<TableProps> = ({
  headers,
  data,
  loading,
  paginator = true,
  rows = 10,
  defaultFilters,
  rowsPerPage = [5, 10, 15],
  filters,
  className,
  setFilters,
  scrollable = false,
  scrollHeight,
  checkable = false,
  selectedRows,
  setSelectedRows,
  headerTemplate,
}) => {
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const _filters: any = { ...filters };
    _filters["global"].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const initFilters = () => {
    setFilters(defaultFilters);
    setGlobalFilterValue("");
  };

  useEffect(() => {
    initFilters();
  }, []);

  const clearFilter = () => {
    initFilters();
  };

  const renderHeader = () => {
    return (
      <div className="flex flex-column md:flex-row w-full justify-content-center md:justify-content-between gap-2">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          className="p-button-info"
          label="Clear"
          outlined
          onClick={clearFilter}
        />
        <>{headerTemplate}</>
      </div>
    );
  };

  const header = renderHeader();

  return (
      <DataTable
        value={data}
        rows={rows}
        paginator={paginator}
        rowsPerPageOptions={rowsPerPage}
        stripedRows
        className={className}
        header={header}
        size="small"
        filters={filters}
        loading={loading}
        globalFilter={globalFilterValue}
        globalFilterFields={headers.map((header) =>
          header.filterConfig?.isGlobalFilter ? header.field : ""
        )}
        scrollable={scrollable}
        scrollHeight={scrollHeight}
        selectionMode={checkable ? "checkbox" : null}
        selection={selectedRows || []}
        onSelectionChange={(e: any) =>
          setSelectedRows && setSelectedRows(e.value)
        }
      >
        {checkable && (
          <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
        )}
        {headers.map((header) => (
          <Column
            key={header.field}
            field={header.field}
            header={header.header}
            filter={header.filter}
            body={header.body}
            dataType={header.dataType}
            filterElement={header.filterConfig?.filterElementTemplate}
            filterApply={header.filterConfig?.filterApplyTemplate}
            filterClear={header.filterConfig?.filterClearTemplate}
            filterFooter={header.filterConfig?.filterFooterTemplate}
            showFilterMatchModes={header.filterConfig?.showFilterMatchModes}
            filterField={header.filterConfig?.filterField}
          />
        ))}
      </DataTable>
  );
};

export default Table;
