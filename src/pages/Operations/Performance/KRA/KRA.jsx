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

export default function KRA() {
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
    { accessorKey: "kra", header: "KRA", enableSorting: false },
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

  const [kraTagModal, setKRATagModal] = useState(false);
  const [kraTagFormData, setKRATagFormData] = useState({
    employee: "", // Single employee selected
    kra: [], // Holds the selected KRAs with weightage
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

  // Sample KRA data
  const [kra, setKRA] = useState(
    Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      title: `Demo ${index + 1}`,
    }))
  );

  // Add KRA Modal
  const [addKRAModal, setAddKRAModal] = useState(false);
  const addKRAFields = [
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

  // Add KRA to the list
  const handleAddKRA = (newKRA) => {
    setKRA((prevKRA) => [
      ...prevKRA,
      {
        id: prevKRA.length + 1,
        title: newKRA.title,
      },
    ]);
  };

  // Add KRA to the selected list
  const handleAddSelectedKRA = (id, title) => {
    setKRATagFormData((prevState) => {
      // Check if the KRA is already in the selected list
      const isAlreadyAdded = prevState.kra.some((item) => item.id === id);
      if (isAlreadyAdded) {
        return prevState; // Do not add duplicate
      }
      return {
        ...prevState,
        kra: [...prevState.kra, { id, title, weightage: 0 }], // Add new KRA with weightage
      };
    });
  };

  // Remove KRA from the selected list
  const handleRemoveSelectedKRA = (id) => {
    setKRATagFormData((prevState) => ({
      ...prevState,
      kra: prevState.kra.filter((item) => item.id !== id),
    }));
  };

  // Update KRA weightage
  const handleUpdateWeightage = (id, value) => {
    setKRATagFormData((prevState) => ({
      ...prevState,
      kra: prevState.kra.map((item) =>
        item.id === id ? { ...item, weightage: value } : item
      ),
    }));
  };

  // Handle "Choose KRA" checkbox change
  const handleChooseKRAChange = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      // Add all KRAs to the selected list
      setKRATagFormData((prevState) => ({
        ...prevState,
        kra: kra.map((item) => ({
          id: item.id,
          title: item.title,
          weightage: 0,
        })),
      }));
    } else {
      // Remove all KRAs from the selected list
      setKRATagFormData((prevState) => ({
        ...prevState,
        kra: [],
      }));
    }
  };

  // Filter KRAs based on search query
  const filterKRAs = (list, query) => {
    return list.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <div className="w-full flex flex-col gap-3 pb-3 justify-center items-center ">
      <div className="w-full flex flex-row justify-end items-center gap-3">
        <Button
          onClick={() => {
            setKRATagModal(true);
          }}
          variant="contained"
        >
          Tag KRA
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
        fields={addKRAFields}
        open={addKRAModal}
        onClose={() => {
          setAddKRAModal(false);
        }}
        onSubmit={(formData, setFormData) => {
          handleAddKRA(formData);
          setFormData({});
          setAddKRAModal(false);
        }}
      />

      <CustomEmptyModal
        open={kraTagModal}
        onClose={() => {
          setKRATagModal(false);
        }}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            console.log("Selected KRAs:", kraTagFormData.kra);
          }}
        >
          <div className="w-full flex flex-col gap-6 justify-center items-center">
            <div className="w-full text-xl">
              <h1>Tag KRA</h1>
            </div>
            <div className="w-full">
              <FormControl fullWidth>
                <InputLabel>Employee</InputLabel>
                <Select
                  label="Employee"
                  value={kraTagFormData.employee}
                  onChange={(event) =>
                    setKRATagFormData((prevState) => ({
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
                    checked={kraTagFormData.kra.length === kra.length} // Checked if all KRAs are selected
                    onChange={handleChooseKRAChange} // Handle "Choose KRA" checkbox
                  />
                  <h1>Choose KRA</h1>
                </div>
                <div className="flex flex-row gap-1 justify-center items-center">
                  {addSearch.isSearch && (
                    <TextField
                      sx={{ padding: 0, margin: 0 }}
                      variant="outlined"
                      placeholder="Search KRA"
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
                      setAddKRAModal(true);
                    }}
                  >
                    Add KRA
                  </Button>
                </div>
              </div>
              <div className="w-full h-full flex flex-col gap-2 overflow-auto py-2">
                {filterKRAs(kra, addSearch.searchQuery).map(
                  ({ id, title }, index) => (
                    <Card
                      type="add"
                      key={index}
                      id={id}
                      title={title}
                      checked={kraTagFormData.kra.some(
                        (item) => item.id === id
                      )} // Reflect checked state
                      handleAdd={handleAddSelectedKRA}
                      handleDelete={handleRemoveSelectedKRA}
                    />
                  )
                )}
              </div>
            </div>
            <div className="w-full h-72 flex flex-col gap-2 border border-neutral-700 rounded-lg p-3">
              <div className="flex flex-row justify-between items-center border border-neutral-700 rounded-lg p-2">
                <h1>KRA</h1>
                <h1>Weightage</h1>
                <div className="flex flex-row gap-1 justify-center items-center">
                  {editSearch.isSearch && (
                    <TextField
                      sx={{ padding: 0, margin: 0 }}
                      variant="outlined"
                      placeholder="Search KRA"
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
                {filterKRAs(kraTagFormData.kra, editSearch.searchQuery).map(
                  ({ id, title, weightage }, index) => (
                    <Card
                      type="edit"
                      key={index}
                      id={id}
                      title={title}
                      weightage={weightage}
                      handleWeightage={handleUpdateWeightage}
                      handleDelete={handleRemoveSelectedKRA}
                    />
                  )
                )}
              </div>
            </div>
            <div className="w-full flex flex-row gap-3 justify-between items-center">
              <Button variant="contained" type="submit">
                Submit
              </Button>
              <Button variant="outlined" onClick={() => setKRATagModal(false)}>
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
