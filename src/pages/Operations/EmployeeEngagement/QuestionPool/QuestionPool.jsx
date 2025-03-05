import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import { IoFilter } from "react-icons/io5";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import axios from "axios";

import CustomTable from "../../../../components/CustomTable";
import CustomModal from "../../../../components/CustomModal";

export default function QuestionPool() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [totalRows, setTotalRows] = useState(0);
  const [sorting, setSorting] = useState([{ id: "id", desc: false }]);
  const [rowSelection, setRowSelection] = useState({});
  const fetchData = async (pageIndex, pageSize, sorting) => {
    const sortField = sorting[0]?.id || "id";
    const sortDirection = sorting[0]?.desc ? "desc" : "asc";

    const response = await axios.get(`https://reqres.in/api/users`, {
      params: {
        page: pageIndex + 1,
        per_page: pageSize,
        sort: sortField,
        direction: sortDirection,
      },
    });
    setData(response.data.data);
    setTotalRows(response.data.total);
  };
  useEffect(() => {
    fetchData(pagination.pageIndex, pagination.pageSize, sorting);
  }, [pagination.pageIndex, pagination.pageSize, sorting]);
  const columns = [
    { accessorKey: "question", header: "Question", enableSorting: false },
    {
      accessorKey: "questionType",
      header: "Question Type",
      enableSorting: false,
    },
    { accessorKey: "actions", header: "Actions", enableSorting: false },
  ];
  const renderRowSelection = (table) => {
    return (
      <div>
        {Object.keys(rowSelection).length > 0 && (
          <Button variant="contained" color="error" onClick={() => {}}>
            Delete
          </Button>
        )}
      </div>
    );
  };
  const renderActions = (row) => {
    return (
      <>
        <IconButton>
          <MdOutlineEdit />
        </IconButton>
        <IconButton>
          <MdDeleteOutline />
        </IconButton>
      </>
    );
  };

  const [filterModal, setFilterModal] = useState(false);
  const filterFields = [
    { type: "text", name: "questionName", label: "Question Name" },
    {
      type: "multipleSelect",
      name: "questionType",
      label: "Question Type",
      options: [
        {
          label: "Question Type 1",
          value: "question_type_1",
        },
        {
          label: "Question Type 2",
          value: "question_type_2",
        },
      ],
    },
  ];

  return (
    <div className="w-full flex flex-col gap-3 pb-3 justify-center items-center ">
      <div className="w-full flex flex-row justify-end items-center gap-3">
        <Button
          onClick={() => {
            // setCompetencyTagModal(true);
          }}
          variant="contained"
        >
          Add Question
        </Button>
        <IconButton onClick={() => setFilterModal(true)}>
          <IoFilter />
        </IconButton>
      </div>

      <div className="w-full min-h-full flex flex-col gap-3 justify-center items-center text-center">
        <CustomTable
          columns={columns}
          renderRowSelection={renderRowSelection}
          data={data}
          loading={loading}
          error={error}
          sorting={sorting}
          renderActions={renderActions}
          setSorting={setSorting}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
          pagination={pagination}
          setPagination={setPagination}
          totalRows={totalRows}
          setTotalRows={setTotalRows}
          isBulkSelect={true}
        />
      </div>

      <CustomModal
        title={"Filter"}
        fields={filterFields}
        open={filterModal}
        onClose={() => {
          setFilterModal(false);
        }}
        onSubmit={(formData, setFormData) => {
          console.log("Filter Form Data :- ", formData);
        }}
      />
    </div>
  );
}
