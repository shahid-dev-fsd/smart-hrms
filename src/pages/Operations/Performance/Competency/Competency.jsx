import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Checkbox,
  IconButton,
} from "@mui/material";
import CustomModal from "../../../../components/CustomModal";
import CustomEmptyModal from "../../../../components/CustomEmptyModal";
import { IoIosSearch } from "react-icons/io";
import Card from "./Card";
import { IoFilter } from "react-icons/io5";
import axios from "axios";
import { LiaTrashAlt } from "react-icons/lia";
import CustomTable from "../../../../components/CustomTable";

export default function Competency() {
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
    { accessorKey: "id", header: "Employee ID", enableSorting: false },
    { accessorKey: "competency", header: "Competency", enableSorting: false },
    { accessorKey: "weightage", header: "Weightage", enableSorting: false },
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

  const [competencyTagModal, setCompetencyTagModal] = useState(false);
  const [competencyTagFormData, setCompetencyTagFormData] = useState({
    employee: "", // Single employee selected
    competency: [], // Holds the selected Competencies with weightage
  });

  const [filterModal, setFilterModal] = useState(false);
  const filterFields = [
    {
      type: "multipleSelect",
      name: "employees",
      label: "Employees",
      options: [
        {
          label: "Employee 1",
          value: "employee_1",
        },
        {
          label: "Employee 2",
          value: "employee_2",
        },
      ],
    },
    {
      type: "select",
      name: "from",
      label: "From",
      options: [
        {
          label: "0",
          value: "0",
        },
        {
          label: "1",
          value: "1",
        },
      ],
    },
    {
      type: "select",
      name: "to",
      label: "To",
      options: [
        {
          label: "0",
          value: "0",
        },
        {
          label: "1",
          value: "1",
        },
      ],
    },
  ];

  // Sample employees
  const employees = [
    { label: "Employee 1", value: "employee_1" },
    { label: "Employee 2", value: "employee_2" },
  ];

  // Sample Competency data
  const [competency, setCompetency] = useState(
    Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      title: `Demo ${index + 1}`,
    }))
  );

  // Add Competency Modal
  const [addCompetencyModal, setAddCompetencyModal] = useState(false);
  const addCompetencyFields = [
    {
      type: "text",
      name: "title",
      label: "Title",
      defaultValue: "",
    },
    {
      type: "textarea",
      name: "description",
      label: "Description",
      defaultValue: "",
    },
  ];

  // Search State
  const [addSearch, setAddSearch] = useState({
    isSearch: false,
    searchQuery: "",
  });

  const [editSearch, setEditSearch] = useState({
    isSearch: false,
    searchQuery: "",
  });

  // Add Competency to the list
  const handleAddCompetency = (newCompetency) => {
    setCompetency((prevCompetency) => [
      ...prevCompetency,
      {
        id: prevCompetency.length + 1,
        title: newCompetency.title,
      },
    ]);
  };

  // Add Competency to the selected list
  const handleAddSelectedCompetency = (id, title) => {
    setCompetencyTagFormData((prevState) => {
      // Check if the Competency is already in the selected list
      const isAlreadyAdded = prevState.competency.some(
        (item) => item.id === id
      );
      if (isAlreadyAdded) {
        return prevState; // Do not add duplicate
      }
      return {
        ...prevState,
        competency: [...prevState.competency, { id, title, weightage: 0 }], // Add new Competency with weightage
      };
    });
  };

  // Remove Competency from the selected list
  const handleRemoveSelectedCompetency = (id) => {
    setCompetencyTagFormData((prevState) => ({
      ...prevState,
      competency: prevState.competency.filter((item) => item.id !== id),
    }));
  };

  // Update Competency weightage
  const handleUpdateWeightage = (id, value) => {
    setCompetencyTagFormData((prevState) => ({
      ...prevState,
      competency: prevState.competency.map((item) =>
        item.id === id ? { ...item, weightage: value } : item
      ),
    }));
  };

  // Handle "Choose Competency" checkbox change
  const handleChooseCompetencyChange = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      // Add all Competencies to the selected list
      setCompetencyTagFormData((prevState) => ({
        ...prevState,
        competency: competency.map((item) => ({
          id: item.id,
          title: item.title,
          weightage: 0,
        })),
      }));
    } else {
      // Remove all Competencies from the selected list
      setCompetencyTagFormData((prevState) => ({
        ...prevState,
        competency: [],
      }));
    }
  };

  // Filter Competencies based on search query
  const filterCompetencies = (list, query) => {
    return list.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <div className="w-full flex flex-col gap-3 pb-3 justify-center items-center ">
      <div className="w-full flex flex-row justify-end items-center gap-3">
        <Button
          onClick={() => {
            setCompetencyTagModal(true);
          }}
          variant="contained"
        >
          Tag Competency
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
        fields={addCompetencyFields}
        open={addCompetencyModal}
        onClose={() => {
          setAddCompetencyModal(false);
        }}
        onSubmit={(formData, setFormData) => {
          handleAddCompetency(formData);
          setFormData({});
          setAddCompetencyModal(false);
        }}
      />

      <CustomEmptyModal
        open={competencyTagModal}
        onClose={() => {
          setCompetencyTagModal(false);
        }}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            console.log(
              "Selected Competencies:",
              competencyTagFormData.competency
            );
          }}
        >
          <div className="w-full flex flex-col gap-6 justify-center items-center">
            <div className="w-full text-xl">
              <h1>Tag Competency</h1>
            </div>
            <div className="w-full">
              <FormControl fullWidth>
                <InputLabel>Employee</InputLabel>
                <Select
                  label="Employee"
                  value={competencyTagFormData.employee}
                  onChange={(event) =>
                    setCompetencyTagFormData((prevState) => ({
                      ...prevState,
                      employee: event.target.value,
                    }))
                  }
                >
                  {employees.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="w-full h-72 flex flex-col gap-2 border border-neutral-700 rounded-lg p-3">
              <div className="flex flex-row justify-between items-center border border-neutral-700 rounded-lg p-2">
                <div className="flex flex-row gap-1 items-center">
                  <Checkbox
                    checked={
                      competencyTagFormData.competency.length ===
                      competency.length
                    } // Checked if all Competencies are selected
                    onChange={handleChooseCompetencyChange} // Handle "Choose Competency" checkbox
                  />
                  <h1>Choose Competency</h1>
                </div>
                <div className="flex flex-row gap-1 justify-center items-center">
                  {addSearch.isSearch && (
                    <TextField
                      sx={{ padding: 0, margin: 0 }}
                      variant="outlined"
                      placeholder="Search Competency"
                      value={addSearch.searchQuery}
                      onChange={(event) =>
                        setAddSearch((prev) => ({
                          ...prev,
                          searchQuery: event.target.value,
                        }))
                      }
                      size="small"
                    />
                  )}
                  <IconButton
                    onClick={() => {
                      setAddSearch((prev) => ({
                        ...prev,
                        isSearch: !prev.isSearch,
                        searchQuery: "",
                      }));
                    }}
                  >
                    <IoIosSearch />
                  </IconButton>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setAddCompetencyModal(true);
                    }}
                  >
                    Add Competency
                  </Button>
                </div>
              </div>
              <div className="w-full h-full flex flex-col gap-2 overflow-auto py-2">
                {filterCompetencies(competency, addSearch.searchQuery).map(
                  ({ id, title }, index) => (
                    <Card
                      type="add"
                      key={index}
                      id={id}
                      title={title}
                      checked={competencyTagFormData.competency.some(
                        (item) => item.id === id
                      )} // Reflect checked state
                      handleAdd={handleAddSelectedCompetency}
                      handleDelete={handleRemoveSelectedCompetency}
                    />
                  )
                )}
              </div>
            </div>
            <div className="w-full h-72 flex flex-col gap-2 border border-neutral-700 rounded-lg p-3">
              <div className="flex flex-row justify-between items-center border border-neutral-700 rounded-lg p-2">
                <h1>Competency</h1>
                <h1>Weightage</h1>
                <div className="flex flex-row gap-1 justify-center items-center">
                  {editSearch.isSearch && (
                    <TextField
                      sx={{ padding: 0, margin: 0 }}
                      variant="outlined"
                      placeholder="Search Competency"
                      value={editSearch.searchQuery}
                      onChange={(event) =>
                        setEditSearch((prev) => ({
                          ...prev,
                          searchQuery: event.target.value,
                        }))
                      }
                      size="small"
                    />
                  )}
                  <IconButton
                    onClick={() => {
                      setEditSearch((prev) => ({
                        ...prev,
                        isSearch: !prev.isSearch,
                        searchQuery: "",
                      }));
                    }}
                  >
                    <IoIosSearch />
                  </IconButton>
                </div>
              </div>
              <div className="w-full h-full flex flex-col gap-2 overflow-auto py-2">
                {filterCompetencies(
                  competencyTagFormData.competency,
                  editSearch.searchQuery
                ).map(({ id, title, weightage }, index) => (
                  <Card
                    type="edit"
                    key={index}
                    id={id}
                    title={title}
                    weightage={weightage}
                    handleWeightage={handleUpdateWeightage}
                    handleDelete={handleRemoveSelectedCompetency}
                  />
                ))}
              </div>
            </div>
            <div className="w-full flex flex-row gap-3 justify-between items-center">
              <Button variant="contained" type="submit">
                Submit
              </Button>
              <Button
                variant="outlined"
                onClick={() => setCompetencyTagModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </CustomEmptyModal>

      <CustomModal
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
