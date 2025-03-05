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
  FormGroup,
  FormControlLabel,
  Menu,
  RadioGroup,
  Radio,
} from "@mui/material";
import CustomModal from "../../../../../components/CustomModal";
import CustomEmptyModal from "../../../../../components/CustomEmptyModal";
import { IoIosSearch } from "react-icons/io";
import { CiExport, CiImport } from "react-icons/ci";
import Card from "./Card";
import { HiDotsHorizontal } from "react-icons/hi";

export default function Competency() {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const isMenuopen = Boolean(menuAnchor);

  const [competencyLibraryModal, setCompetencyLibraryModal] = useState(false);
  const [competencyTagModal, setCompetencyTagModal] = useState(false);
  const [competencyTagFormData, setCompetencyTagFormData] = useState({
    designation: "", // Single designation selected
    competency: [], // Holds the selected Competencies with weightage
  });

  // Sample designations
  const designations = [
    { label: "All Designations", value: "allDesignations" },
    { label: "Designation 1", value: "designation_1" },
    { label: "Designation 2", value: "designation_2" },
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

  const [competencyLibrarySearch, setCompetencyLibrarySearch] = useState({
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

  const competencyLibraryData = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    title: `Competency Title ${index + 1}`,
    description: `Description ${index + 1}`,
  }));
  const [competencyFormData, setCompetencyFormData] = useState([]);
  const [selectedCompetency, setSelectedCompetency] = useState(null);
  const [deleteCompetencyModal, setDeleteCompetencyModal] = useState(false);
  const [editCompetencyModal, setEditCompetencyModal] = useState(false);
  const [editCompetencyFields, setEditCompetencyFields] = useState([
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
  ]);
  useEffect(() => {
    setEditCompetencyFields([
      {
        type: "text",
        name: "title",
        label: "Title",
        defaultValue: selectedCompetency?.title || "",
      },
      {
        type: "textarea",
        name: "description",
        label: "Description",
        defaultValue: selectedCompetency?.description || "",
      },
    ]);
    console.log(editCompetencyFields);
  }, [selectedCompetency]);

  // Handle "Select All" checkbox
  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      // Select all Competencies
      setCompetencyFormData(competencyLibraryData.map((item) => item.id));
    } else {
      // Deselect all Competencies
      setCompetencyFormData([]);
    }
  };

  // Handle individual card selection
  const handleCardSelect = (id) => {
    setCompetencyFormData((prevState) => {
      const isSelected = prevState.includes(id);
      if (isSelected) {
        return prevState.filter((item) => item !== id);
      } else {
        return [...prevState, id];
      }
    });
  };

  const [exportCompetencyModal, setExportCompetencyModal] = useState(false);
  const [exportFormData, setExportFormData] = useState({ format: "xls" });

  // Calculate total Competency count
  const totalCompetencyCount = competencyFormData.length;

  return (
    <div className="w-full flex flex-col gap-3 pb-3 justify-center items-center ">
      <div className="w-full flex flex-row justify-between items-center gap-3">
        <div>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Data</InputLabel>
            <Select label="Data" onChange={(event) => {}}>
              <MenuItem value={"department"}>Department</MenuItem>
              <MenuItem value={"location"}>Location</MenuItem>
              <MenuItem value={"designation"}>Designation</MenuItem>
              <MenuItem value={"designationAndDepartment"}>
                Designation & Department
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="flex flex-row justify-center items-center gap-3">
          <Button
            onClick={() => {
              setCompetencyTagModal(true);
            }}
            variant="contained"
          >
            Tag Competency
          </Button>
          <Button
            onClick={() => {
              setCompetencyLibraryModal(true);
            }}
            variant="contained"
          >
            Competency Library
          </Button>
        </div>
      </div>

      <div className="w-1/2 min-h-[30rem] flex flex-col gap-3 justify-center items-center text-center">
        <h1>No Competency have been tagged</h1>
        <h1>
          Competency are knowledge, skills, abilities, and personal attributes
          that contribute to an employee's performance in a role. Add Competency
          and tag them to departments, designations, roles, and locations, which
          pre-sets Competency for your employees based on applicability.
        </h1>
        <Button
          variant="contained"
          onClick={() => {
            setCompetencyTagModal(true);
          }}
        >
          Tag Competency
        </Button>
      </div>

      {/* Add Competency Modal */}
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

      {/* Tag Competency Modal */}
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
                <InputLabel>Designation</InputLabel>
                <Select
                  label="Designation"
                  value={competencyTagFormData.designation}
                  onChange={(event) =>
                    setCompetencyTagFormData((prevState) => ({
                      ...prevState,
                      designation: event.target.value,
                    }))
                  }
                >
                  {designations.map((option) => (
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

      <CustomEmptyModal
        open={competencyLibraryModal}
        onClose={() => {
          setCompetencyLibraryModal(false);
        }}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            console.log("Selected Competencies:", competencyFormData);
          }}
        >
          <div className="w-full flex flex-col gap-6 justify-center items-center">
            <div className="w-full flex flex-row justify-between items-center">
              <div className="flex flex-row gap-3 justify-center items-center">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          competencyFormData.length ===
                          competencyLibraryData.length
                        }
                        onChange={handleSelectAll}
                      />
                    }
                    label="Select All"
                  />
                </FormGroup>
                <h1>Total Competency Count : {totalCompetencyCount}</h1>
                {totalCompetencyCount != 0 ? (
                  <>
                    <Button variant="contained" color="error">
                      Delete
                    </Button>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="flex flex-row gap-3 justify-center items-center">
                <Button
                  onClick={() => {
                    setAddCompetencyModal(true);
                  }}
                  variant="contained"
                >
                  Add Competency
                </Button>
                {competencyLibrarySearch.isSearch && (
                  <TextField
                    sx={{ padding: 0, margin: 0 }}
                    variant="outlined"
                    placeholder="Search Competency"
                    value={competencyLibrarySearch.searchQuery}
                    onChange={(event) =>
                      setCompetencyLibrarySearch((prev) => ({
                        ...prev,
                        searchQuery: event.target.value,
                      }))
                    }
                    size="small"
                  />
                )}
                <IconButton
                  onClick={() => {
                    setCompetencyLibrarySearch((prev) => ({
                      ...prev,
                      isSearch: !prev.isSearch,
                      searchQuery: "",
                    }));
                  }}
                >
                  <IoIosSearch />
                </IconButton>
                <div>
                  <IconButton
                    id="basic-button"
                    aria-controls={isMenuopen ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={isMenuopen ? "true" : undefined}
                    onClick={(event) => {
                      setMenuAnchor(event.currentTarget);
                    }}
                  >
                    <HiDotsHorizontal className="text-2xl" />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={menuAnchor}
                    open={isMenuopen}
                    onClose={() => {
                      setMenuAnchor(null);
                    }}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem>
                      <div className="flex flex-row gap-3 justify-between items-center">
                        <CiImport className="text-2xl" />
                        <h1>Import</h1>
                      </div>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setExportCompetencyModal(true);
                      }}
                    >
                      <div className="flex flex-row gap-3 justify-between items-center">
                        <CiExport className="text-2xl" />
                        <h1>Export</h1>
                      </div>
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            </div>
            <div className="h-72 w-full flex flex-col gap-3 overflow-scroll ">
              {competencyLibraryData.map(({ id, title, description }) => (
                <Card
                  type="kraLibrary"
                  key={id}
                  id={id}
                  title={title}
                  description={description}
                  checked={competencyFormData.includes(id)}
                  handleAdd={handleCardSelect}
                  handleDelete={(id) => {
                    setCompetencyFormData((prevState) =>
                      prevState.filter((item) => item !== id)
                    );
                  }}
                  handleCompetencyDelete={() => {
                    setSelectedCompetency({ id, title, description });
                    setDeleteCompetencyModal(true);
                  }}
                  handleCompetencyEdit={() => {
                    setSelectedCompetency({ id, title, description });
                    setEditCompetencyModal(true);
                  }}
                />
              ))}
            </div>
          </div>
        </form>
      </CustomEmptyModal>

      <CustomEmptyModal
        open={exportCompetencyModal}
        onClose={() => {
          setExportCompetencyModal(false);
        }}
        isSmall={true}
      >
        <div className="w-full flex flex-col gap-6 p-4 justify-center items-center">
          <div className="flex flex-col gap-3 justify-center items-center">
            <h1>Export As</h1>
            <h1>Choose the file format to export</h1>
            <div>
              <FormControl>
                <RadioGroup
                  defaultValue={exportFormData.format}
                  onChange={(event) => {
                    setExportFormData({
                      ...exportFormData,
                      format: event.target.value,
                    });
                  }}
                  className="flex gap-3"
                  sx={{ flexDirection: "row" }}
                >
                  <FormControlLabel
                    value="xls"
                    control={<Radio />}
                    label="XLS"
                  />
                  <FormControlLabel
                    value="xlsx"
                    control={<Radio />}
                    label="XLSX"
                  />
                  <FormControlLabel
                    value="csv"
                    control={<Radio />}
                    label="CSV"
                  />
                  <FormControlLabel
                    value="tsv"
                    control={<Radio />}
                    label="TSV"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div className="w-full flex flex-row gap-6 justify-center items-center">
            <Button
              onClick={() => {
                console.log(exportFormData);
                setExportCompetencyModal(false);
              }}
              variant="contained"
            >
              Export
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setExportCompetencyModal(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </CustomEmptyModal>

      <CustomEmptyModal
        open={deleteCompetencyModal}
        onClose={() => {
          setSelectedCompetency({});
          setDeleteCompetencyModal(false);
        }}
        isSmall={true}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(selectedCompetency);
            setDeleteCompetencyModal(false);
          }}
        >
          <div className="w-full flex flex-col gap-6 p-4 justify-center items-center">
            <div className="flex flex-col gap-3 justify-center items-center">
              <h1>Delete Competency</h1>
              <h1>
                Are you sure, you want to delete this{" "}
                {selectedCompetency?.title} ?
              </h1>
            </div>
            <div className="w-full flex flex-row gap-6 justify-center items-center">
              <Button type="submit" variant="contained">
                Confirm
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setSelectedCompetency({});
                  setDeleteCompetencyModal(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </CustomEmptyModal>

      <CustomModal
        key={selectedCompetency?.id || "new"}
        title={"Edit Competency Tag"}
        fields={editCompetencyFields}
        open={editCompetencyModal}
        onClose={() => {
          setEditCompetencyModal(false);
        }}
        onSubmit={(formData, setFormData) => {
          console.log("Edit Competency Form Data :- ", formData);
          setFormData({});
          setEditCompetencyModal(false);
        }}
      />
    </div>
  );
}
