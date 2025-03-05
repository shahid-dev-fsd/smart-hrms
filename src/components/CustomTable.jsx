import React, { useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";

export default function CustomTable({
  columns,
  data,
  renderActions,
  loading,
  error,
  sorting,
  setSorting,
  rowSelection,
  setRowSelection,
  pagination,
  setPagination,
  totalRows,
  onRowClick = (row) => {},
  renderRowSelection = (table) => {},
  isBulkSelect = false,
  isPagination = true,
}) {
  const updatedColumns = useMemo(() => {
    return columns.map((col) => {
      if (col.accessorKey === "actions") {
        return {
          ...col,
          Cell: ({ row }) => renderActions(row),
        };
      }
      return col;
    });
  }, [columns, renderActions]);

  return (
    <div className="w-full h-full">
      {isPagination ? (
        <MaterialReactTable
          columns={updatedColumns}
          data={data}
          enableRowSelection={isBulkSelect}
          onRowSelectionChange={isBulkSelect ? setRowSelection : undefined}
          manualPagination
          manualSorting
          rowCount={totalRows}
          onPaginationChange={setPagination}
          onSortingChange={setSorting}
          state={{
            pagination,
            sorting,
            rowSelection: isBulkSelect ? rowSelection : {},
          }}
          enableSortingRemoval={false}
          enableColumnFilters
          enableColumnFilterModes={false}
          enableGlobalFilter={false}
          enableColumnActions={true}
          enableDensityToggle={false}
          enableFullScreenToggle={true}
          enableHiding={true}
          enableStickyHeader
          // enableColumnResizing
          muiTablePaperProps={{
            elevation: 3,
            sx: {
              height: "100%",
              display: "flex",
              flexDirection: "column",
            },
          }}
          muiTableContainerProps={{
            sx: {
              flex: 1,
              overflow: "auto",
            },
          }}
          muiTableBodyCellProps={({ column, row }) => ({
            onClick: (e) => {
              if (column.id !== "actions") {
                onRowClick(row);
              }
            },
            sx: {
              cursor: column.id === "actions" ? "default" : "pointer",
            },
          })}
          renderTopToolbarCustomActions={({ table }) =>
            renderRowSelection(table)
          }
        />
      ) : (
        <MaterialReactTable
          columns={updatedColumns}
          data={data}
          enablePagination={false}
          enableSortingRemoval={false}
          enableColumnFilterModes={false}
          enableGlobalFilter={false}
          enableColumnFilters={false}
          enableColumnActions={false}
          enableDensityToggle={false}
          enableFullScreenToggle={true}
          enableHiding={true}
          enableStickyHeader
          // enableColumnResizing
          muiTablePaperProps={{
            elevation: 3,
            sx: {
              height: "100%",
              display: "flex",
              flexDirection: "column",
            },
          }}
          muiTableContainerProps={{
            sx: {
              flex: 1,
              overflow: "auto",
            },
          }}
          muiTableBodyCellProps={({ column, row }) => ({
            onClick: (e) => {
              if (column.id !== "actions") {
                onRowClick(row);
              }
            },
            sx: {
              cursor: column.id === "actions" ? "default" : "pointer",
            },
          })}
          renderTopToolbarCustomActions={({ table }) =>
            renderRowSelection(table)
          }
        />
      )}
    </div>
  );
}
