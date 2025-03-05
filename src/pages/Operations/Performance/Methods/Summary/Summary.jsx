import React, { useEffect, useState } from "react";
import { Button, Checkbox } from "@mui/material";
import CustomModal from "../../../../../components/CustomModal";
import CustomTable from "../../../../../components/CustomTable";
import axios from "axios";

export default function Summary() {
  const [addQuestionModal, setAddQuestionModal] = useState(false);

  const addQuestionFields = [
    {
      type: "textarea",
      name: "question",
      label: "Question",
    },
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    const response = await axios.get(`https://reqres.in/api/users`, {
      params: {
        page: 1,
        per_page: 10,
      },
    });
    setData(response.data.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const questionsTableColumns = [
    { accessorKey: "questions", header: "Questions", enableSorting: false },
    { accessorKey: "actions", header: "Status", enableSorting: false },
  ];
  const renderActions = (row) => (
    <>
      <Checkbox defaultChecked />
    </>
  );

  return (
    <div className="w-full flex flex-col gap-3 pb-3 justify-center items-center ">
      <div className="w-full flex flex-row justify-end items-center gap-3">
        <Button
          onClick={() => {
            setAddQuestionModal(true);
          }}
          variant="contained"
        >
          Add Question
        </Button>
      </div>
      <div className="w-full h-[30rem]">
        <CustomTable
          columns={questionsTableColumns}
          renderActions={renderActions}
          data={data}
          loading={loading}
          error={error}
          isPagination={false}
        />
      </div>
      <CustomModal
        fields={addQuestionFields}
        open={addQuestionModal}
        onClose={() => {
          setAddQuestionModal(false);
        }}
        onSubmit={(data) => {
          console.log("Add Question Form Data :- ", data);
        }}
      />
    </div>
  );
}
