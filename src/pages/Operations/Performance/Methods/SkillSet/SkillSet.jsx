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

export default function SkillSet() {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const isMenuopen = Boolean(menuAnchor);

  const [skillSetLibraryModal, setSkillSetLibraryModal] = useState(false);
  const [skillSetTagModal, setSkillSetTagModal] = useState(false);
  const [skillSetTagFormData, setSkillSetTagFormData] = useState({
    designation: "", // Single designation selected
    skillSet: [], // Holds the selected SkillSets with weightage
  });

  // Sample designations
  const designations = [
    { label: "All Designations", value: "allDesignations" },
    { label: "Designation 1", value: "designation_1" },
    { label: "Designation 2", value: "designation_2" },
  ];

  // Sample Skill Set data
  const [skillSet, setSkillSet] = useState(
    Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      title: `Demo ${index + 1}`,
    }))
  );

  // Add Skill Set Modal
  const [addSkillSetModal, setAddSkillSetModal] = useState(false);
  const addSkillSetFields = [
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

  const [skillSetLibrarySearch, setSkillSetLibrarySearch] = useState({
    isSearch: false,
    searchQuery: "",
  });

  // Add Skill Set to the list
  const handleAddSkillSet = (newSkillSet) => {
    setSkillSet((prevSkillSet) => [
      ...prevSkillSet,
      {
        id: prevSkillSet.length + 1,
        title: newSkillSet.title,
      },
    ]);
  };

  // Add Skill Set to the selected list
  const handleAddSelectedSkillSet = (id, title) => {
    setSkillSetTagFormData((prevState) => {
      // Check if the Skill Set is already in the selected list
      const isAlreadyAdded = prevState.skillSet.some((item) => item.id === id);
      if (isAlreadyAdded) {
        return prevState; // Do not add duplicate
      }
      return {
        ...prevState,
        skillSet: [...prevState.skillSet, { id, title, weightage: 0 }], // Add new Skill Set with weightage
      };
    });
  };

  // Remove Skill Set from the selected list
  const handleRemoveSelectedSkillSet = (id) => {
    setSkillSetTagFormData((prevState) => ({
      ...prevState,
      skillSet: prevState.skillSet.filter((item) => item.id !== id),
    }));
  };

  // Update Skill Set weightage
  const handleUpdateWeightage = (id, value) => {
    setSkillSetTagFormData((prevState) => ({
      ...prevState,
      skillSet: prevState.skillSet.map((item) =>
        item.id === id ? { ...item, weightage: value } : item
      ),
    }));
  };

  // Handle "Choose Skill Set" checkbox change
  const handleChooseSkillSetChange = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      // Add all SkillSets to the selected list
      setSkillSetTagFormData((prevState) => ({
        ...prevState,
        skillSet: skillSet.map((item) => ({
          id: item.id,
          title: item.title,
          weightage: 0,
        })),
      }));
    } else {
      // Remove all SkillSets from the selected list
      setSkillSetTagFormData((prevState) => ({
        ...prevState,
        skillSet: [],
      }));
    }
  };

  // Filter SkillSets based on search query
  const filterSkillSets = (list, query) => {
    return list.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  const skillSetLibraryData = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    title: `Skill Set Title ${index + 1}`,
    description: `Description ${index + 1}`,
  }));
  const [skillSetFormData, setSkillSetFormData] = useState([]);
  const [selectedSkillSet, setSelectedSkillSet] = useState(null);
  const [deleteSkillSetModal, setDeleteSkillSetModal] = useState(false);
  const [editSkillSetModal, setEditSkillSetModal] = useState(false);
  const [editSkillSetFields, setEditSkillSetFields] = useState([
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
    setEditSkillSetFields([
      {
        type: "text",
        name: "title",
        label: "Title",
        defaultValue: selectedSkillSet?.title || "",
      },
      {
        type: "textarea",
        name: "description",
        label: "Description",
        defaultValue: selectedSkillSet?.description || "",
      },
    ]);
    console.log(editSkillSetFields);
  }, [selectedSkillSet]);

  // Handle "Select All" checkbox
  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      // Select all SkillSets
      setSkillSetFormData(skillSetLibraryData.map((item) => item.id));
    } else {
      // Deselect all SkillSets
      setSkillSetFormData([]);
    }
  };

  // Handle individual card selection
  const handleCardSelect = (id) => {
    setSkillSetFormData((prevState) => {
      const isSelected = prevState.includes(id);
      if (isSelected) {
        return prevState.filter((item) => item !== id);
      } else {
        return [...prevState, id];
      }
    });
  };

  const [exportSkillSetModal, setExportSkillSetModal] = useState(false);
  const [exportFormData, setExportFormData] = useState({ format: "xls" });

  // Calculate total Skill Set count
  const totalSkillSetCount = skillSetFormData.length;

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
              setSkillSetTagModal(true);
            }}
            variant="contained"
          >
            Tag Skill Set
          </Button>
          <Button
            onClick={() => {
              setSkillSetLibraryModal(true);
            }}
            variant="contained"
          >
            Skill Set Library
          </Button>
        </div>
      </div>

      <div className="w-1/2 min-h-[30rem] flex flex-col gap-3 justify-center items-center text-center">
        <h1>No Skill Set have been tagged</h1>
        <h1>
          Skill are the abilities required to perform certain tasks or functions
          within an employee's role. Add Skill and tag them to domains,
          designations, and departments, which pre-sets Skill for your employees
          based on applicability.
        </h1>
        <Button
          variant="contained"
          onClick={() => {
            setSkillSetTagModal(true);
          }}
        >
          Tag Skill Set
        </Button>
      </div>

      {/* Add Skill Set Modal */}
      <CustomModal
        fields={addSkillSetFields}
        open={addSkillSetModal}
        onClose={() => {
          setAddSkillSetModal(false);
        }}
        onSubmit={(formData, setFormData) => {
          handleAddSkillSet(formData);
          setFormData({});
          setAddSkillSetModal(false);
        }}
      />

      {/* Tag Skill Set Modal */}
      <CustomEmptyModal
        open={skillSetTagModal}
        onClose={() => {
          setSkillSetTagModal(false);
        }}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            console.log("Selected SkillSets:", skillSetTagFormData.skillSet);
          }}
        >
          <div className="w-full flex flex-col gap-6 justify-center items-center">
            <div className="w-full text-xl">
              <h1>Tag Skill Set</h1>
            </div>
            <div className="w-full">
              <FormControl fullWidth>
                <InputLabel>Designation</InputLabel>
                <Select
                  label="Designation"
                  value={skillSetTagFormData.designation}
                  onChange={(event) =>
                    setSkillSetTagFormData((prevState) => ({
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
                      skillSetTagFormData.skillSet.length === skillSet.length
                    } // Checked if all SkillSets are selected
                    onChange={handleChooseSkillSetChange} // Handle "Choose Skill Set" checkbox
                  />
                  <h1>Choose Skill Set</h1>
                </div>
                <div className="flex flex-row gap-1 justify-center items-center">
                  {addSearch.isSearch && (
                    <TextField
                      sx={{ padding: 0, margin: 0 }}
                      variant="outlined"
                      placeholder="Search Skill Set"
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
                      setAddSkillSetModal(true);
                    }}
                  >
                    Add Skill Set
                  </Button>
                </div>
              </div>
              <div className="w-full h-full flex flex-col gap-2 overflow-auto py-2">
                {filterSkillSets(skillSet, addSearch.searchQuery).map(
                  ({ id, title }, index) => (
                    <Card
                      type="add"
                      key={index}
                      id={id}
                      title={title}
                      checked={skillSetTagFormData.skillSet.some(
                        (item) => item.id === id
                      )} // Reflect checked state
                      handleAdd={handleAddSelectedSkillSet}
                      handleDelete={handleRemoveSelectedSkillSet}
                    />
                  )
                )}
              </div>
            </div>
            <div className="w-full h-72 flex flex-col gap-2 border border-neutral-700 rounded-lg p-3">
              <div className="flex flex-row justify-between items-center border border-neutral-700 rounded-lg p-2">
                <h1>Skill Set</h1>
                <h1>Weightage</h1>
                <div className="flex flex-row gap-1 justify-center items-center">
                  {editSearch.isSearch && (
                    <TextField
                      sx={{ padding: 0, margin: 0 }}
                      variant="outlined"
                      placeholder="Search Skill Set"
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
                {filterSkillSets(
                  skillSetTagFormData.skillSet,
                  editSearch.searchQuery
                ).map(({ id, title, weightage }, index) => (
                  <Card
                    type="edit"
                    key={index}
                    id={id}
                    title={title}
                    weightage={weightage}
                    handleWeightage={handleUpdateWeightage}
                    handleDelete={handleRemoveSelectedSkillSet}
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
                onClick={() => setSkillSetTagModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </CustomEmptyModal>

      <CustomEmptyModal
        open={skillSetLibraryModal}
        onClose={() => {
          setSkillSetLibraryModal(false);
        }}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            console.log("Selected SkillSets:", skillSetFormData);
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
                          skillSetFormData.length === skillSetLibraryData.length
                        }
                        onChange={handleSelectAll}
                      />
                    }
                    label="Select All"
                  />
                </FormGroup>
                <h1>Total Skill Set Count : {totalSkillSetCount}</h1>
                {totalSkillSetCount != 0 ? (
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
                    setAddSkillSetModal(true);
                  }}
                  variant="contained"
                >
                  Add Skill Set
                </Button>
                {skillSetLibrarySearch.isSearch && (
                  <TextField
                    sx={{ padding: 0, margin: 0 }}
                    variant="outlined"
                    placeholder="Search Skill Set"
                    value={skillSetLibrarySearch.searchQuery}
                    onChange={(event) =>
                      setSkillSetLibrarySearch((prev) => ({
                        ...prev,
                        searchQuery: event.target.value,
                      }))
                    }
                    size="small"
                  />
                )}
                <IconButton
                  onClick={() => {
                    setSkillSetLibrarySearch((prev) => ({
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
                        setExportSkillSetModal(true);
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
              {skillSetLibraryData.map(({ id, title, description }) => (
                <Card
                  type="kraLibrary"
                  key={id}
                  id={id}
                  title={title}
                  description={description}
                  checked={skillSetFormData.includes(id)}
                  handleAdd={handleCardSelect}
                  handleDelete={(id) => {
                    setSkillSetFormData((prevState) =>
                      prevState.filter((item) => item !== id)
                    );
                  }}
                  handleSkillSetDelete={() => {
                    setSelectedSkillSet({ id, title, description });
                    setDeleteSkillSetModal(true);
                  }}
                  handleSkillSetEdit={() => {
                    setSelectedSkillSet({ id, title, description });
                    setEditSkillSetModal(true);
                  }}
                />
              ))}
            </div>
          </div>
        </form>
      </CustomEmptyModal>

      <CustomEmptyModal
        open={exportSkillSetModal}
        onClose={() => {
          setExportSkillSetModal(false);
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
                setExportSkillSetModal(false);
              }}
              variant="contained"
            >
              Export
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setExportSkillSetModal(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </CustomEmptyModal>

      <CustomEmptyModal
        open={deleteSkillSetModal}
        onClose={() => {
          setSelectedSkillSet({});
          setDeleteSkillSetModal(false);
        }}
        isSmall={true}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(selectedSkillSet);
            setDeleteSkillSetModal(false);
          }}
        >
          <div className="w-full flex flex-col gap-6 p-4 justify-center items-center">
            <div className="flex flex-col gap-3 justify-center items-center">
              <h1>Delete Skill Set</h1>
              <h1>
                Are you sure, you want to delete this {selectedSkillSet?.title}{" "}
                ?
              </h1>
            </div>
            <div className="w-full flex flex-row gap-6 justify-center items-center">
              <Button type="submit" variant="contained">
                Confirm
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setSelectedSkillSet({});
                  setDeleteSkillSetModal(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </CustomEmptyModal>

      <CustomModal
        key={selectedSkillSet?.id || "new"}
        title={"Edit Skill Set Tag"}
        fields={editSkillSetFields}
        open={editSkillSetModal}
        onClose={() => {
          setEditSkillSetModal(false);
        }}
        onSubmit={(formData, setFormData) => {
          console.log("Edit Skill Set Form Data :- ", formData);
          setFormData({});
          setEditSkillSetModal(false);
        }}
      />
    </div>
  );
}
