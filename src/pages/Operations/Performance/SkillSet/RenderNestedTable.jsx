import React, { useMemo } from "react";
import { IconButton } from "@mui/material";
import { LiaTrashAlt } from "react-icons/lia";
import { MaterialReactTable } from "material-react-table";

const RenderNestedTable = ({ data }) => {
  const nestedColumns = [
    { accessorKey: "level", header: "Level" },
    { accessorKey: "supportDocument", header: "Support Document" },
    { accessorKey: "reason", header: "Reason" },
    { accessorKey: "weightage", header: "Weightage" },
    { accessorKey: "addAndUpdatedOn", header: "Add/Updated On" },
    {
      accessorKey: "actions",
      header: "Actions",
    },
  ];

  const renderActions = (row) => (
    <IconButton>
      <LiaTrashAlt />
    </IconButton>
  );

  const updatedNestedColumns = useMemo(() => {
    return nestedColumns.map((col) => {
      if (col.accessorKey === "actions") {
        return {
          ...col,
          Cell: ({ row }) => renderActions(row),
        };
      }
      return col;
    });
  }, [nestedColumns, renderActions]);

  return (
    <div>
      <MaterialReactTable
        columns={updatedNestedColumns}
        data={data}
        enablePagination={false}
        enableSorting={false}
        enableColumnFilters={false}
        enableGlobalFilter={false}
        enableFullScreenToggle={false}
        enableDensityToggle={false}
        enableHiding={false}
        enableTopToolbar={false}
        enableBottomToolbar={false}
        enableSortingRemoval={false}
        enableColumnFilterModes={false}
        enableColumnActions={false}
      />
    </div>
  );
};

export default RenderNestedTable;
