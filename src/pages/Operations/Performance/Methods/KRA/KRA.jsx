import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
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

export default function KRA() {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const isMenuopen = Boolean(menuAnchor);

  const [kraLibraryModal, setKRALibraryModal] = useState(false);
  const [kraTagModal, setKRATagModal] = useState(false);
  const [kraTagFormData, setKRATagFormData] = useState({
    designation: [],
    kra: [], // Holds the selected KRAs with weightage
  });

  // Sample designations
  const designations = [
    { label: "All Designations", value: "allDesignations" },
    { label: "Designation 1", value: "designation_1" },
    { label: "Designation 2", value: "designation_2" },
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

  const [kraLibrarySearch, setKRALibrarySearch] = useState({
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

  const kraLibraryData = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    title: `KRA Title ${index + 1}`,
    description: `Description ${index + 1}`,
  }));
  const userSpecificKRALibraryData = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    title: `User Specific Title ${index + 1}`,
    description: `Description ${index + 1}`,
  }));
  const allKRALibraryData = {
    kra: kraLibraryData,
    userSpecificKRA: userSpecificKRALibraryData,
  };
  const [selectedKRAType, setSelectedKRAType] = useState("kra");
  const [selectedKRA, setSelectedKRA] = useState(null);
  const [kraLibraryFormData, setKRALibraryFormData] = useState({
    kra: [],
    userSpecificKRA: [],
  });
  const [editKRAModal, setEditKRAModal] = useState(false);
  const [editKRAFields, setEditKRAFields] = useState([
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
    setEditKRAFields([
      {
        type: "text",
        name: "title",
        label: "Title",
        defaultValue: selectedKRA?.title || "",
      },
      {
        type: "textarea",
        name: "description",
        label: "Description",
        defaultValue: selectedKRA?.description || "",
      },
    ]);
    console.log(editKRAFields);
  }, [selectedKRA]);

  const [deleteKRAModal, setDeleteKRAModal] = useState(false);

  // Handle "Select All" checkbox
  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      // Select all KRAs for the current type
      setKRALibraryFormData((prevState) => ({
        ...prevState,
        [selectedKRAType]: allKRALibraryData[selectedKRAType].map(
          (item) => item.id
        ),
      }));
    } else {
      // Deselect all KRAs for the current type
      setKRALibraryFormData((prevState) => ({
        ...prevState,
        [selectedKRAType]: [],
      }));
    }
  };

  // Handle individual card selection
  const handleCardSelect = (id) => {
    setKRALibraryFormData((prevState) => {
      const selectedKRAs = prevState[selectedKRAType];
      const isSelected = selectedKRAs.includes(id);

      if (isSelected) {
        // Deselect the KRA
        return {
          ...prevState,
          [selectedKRAType]: selectedKRAs.filter((item) => item !== id),
        };
      } else {
        // Select the KRA
        return {
          ...prevState,
          [selectedKRAType]: [...selectedKRAs, id],
        };
      }
    });
  };

  // Handle KRA type change
  const handleKRATypeChange = (event) => {
    const newType = event.target.value;
    setSelectedKRAType(newType);
    // Reset the selected KRAs for the previous type
    setKRALibraryFormData((prevState) => ({
      ...prevState,
      [selectedKRAType]: [],
    }));
  };

  const [exportKRAModal, setExportKRAModal] = useState(false);
  const [exportFormData, setExportFormData] = useState({ format: "xls" });

  // Calculate total KRA count for the current type
  const totalKRACount = kraLibraryFormData[selectedKRAType].length;

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
              setKRATagModal(true);
            }}
            variant="contained"
          >
            Tag KRA
          </Button>
          <Button
            onClick={() => {
              setKRALibraryModal(true);
            }}
            variant="contained"
          >
            KRA Library
          </Button>
        </div>
      </div>

      <div className="w-1/2 min-h-[30rem] flex flex-col gap-3 justify-center items-center text-center">
        <h1>No KRA have been tagged</h1>
        <h1>
          KRA are your employees' primary areas of job responsibility or focus.
          Add KRA and tag them to departments, designations, and locations,
          which pre-sets KRA for your employees based on applicability.
        </h1>
        <Button
          variant="contained"
          onClick={() => {
            setKRATagModal(true);
          }}
        >
          Tag KRA
        </Button>
      </div>

      {/* Add KRA Modal */}
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

      {/* Tag KRA Modal */}
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
              <Autocomplete
                multiple
                options={designations}
                getOptionLabel={(option) => option.label}
                onChange={(event, value) => {
                  const allDesignationOption = {
                    label: "All Designations",
                    value: "allDesignations",
                  };
                  const isAllSelected = value.some(
                    (option) => option.value === "allDesignations"
                  );

                  if (isAllSelected) {
                    setKRATagFormData((prevState) => ({
                      ...prevState,
                      designation: [allDesignationOption.value],
                    }));
                  } else {
                    setKRATagFormData((prevState) => ({
                      ...prevState,
                      designation: value.map((option) => option.value),
                    }));
                  }
                }}
                value={designations.filter((option) =>
                  kraTagFormData.designation.includes(option.value)
                )}
                disableCloseOnSelect
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label={"Designation"}
                    placeholder={"Designation"}
                  />
                )}
              />
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

      <CustomEmptyModal
        open={kraLibraryModal}
        onClose={() => {
          setKRALibraryModal(false);
        }}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            console.log("Selected KRAs:", kraLibraryFormData);
          }}
        >
          <div className="w-full flex flex-col gap-6 justify-center items-center">
            <div className="w-full">
              <FormControl sx={{ width: "100%" }}>
                <InputLabel>KRA</InputLabel>
                <Select
                  label="KRA"
                  value={selectedKRAType}
                  onChange={handleKRATypeChange}
                >
                  <MenuItem value={"kra"}>KRA</MenuItem>
                  <MenuItem value={"userSpecificKRA"}>
                    User Specific KRA
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="w-full flex flex-row justify-between items-center">
              <div className="flex flex-row gap-3 justify-center items-center">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          kraLibraryFormData[selectedKRAType].length ===
                          allKRALibraryData[selectedKRAType].length
                        }
                        onChange={handleSelectAll}
                      />
                    }
                    label="Select All"
                  />
                </FormGroup>
                <h1>Total KRA Count : {totalKRACount}</h1>
                {totalKRACount != 0 ? (
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
                    setAddKRAModal(true);
                  }}
                  variant="contained"
                >
                  Add KRA
                </Button>
                {kraLibrarySearch.isSearch && (
                  <TextField
                    sx={{ padding: 0, margin: 0 }}
                    variant="outlined"
                    placeholder="Search KRA"
                    value={kraLibrarySearch.searchQuery}
                    onChange={(event) =>
                      setKRALibrarySearch((prev) => ({
                        ...prev,
                        searchQuery: event.target.value,
                      }))
                    }
                    size="small"
                  />
                )}
                <IconButton
                  onClick={() => {
                    setKRALibrarySearch((prev) => ({
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
                        setExportKRAModal(true);
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
              {allKRALibraryData[selectedKRAType].map(
                ({ id, title, description }) => (
                  <Card
                    key={id}
                    id={id}
                    title={title}
                    description={description}
                    checked={kraLibraryFormData[selectedKRAType].includes(id)}
                    handleSelect={handleCardSelect}
                    handleKRADelete={() => {
                      setSelectedKRA({ id, title, description });
                      setDeleteKRAModal(true);
                    }}
                    handleKRAEdit={({ id, title, description }) => {
                      setSelectedKRA({ id, title, description });
                      setEditKRAModal(true);
                    }}
                    handleAdd={(id, title, description) => {
                      setKRALibraryFormData((prevState) => ({
                        ...prevState,
                        [selectedKRAType]: [...prevState[selectedKRAType], id],
                      }));
                    }}
                    handleDelete={(id) => {
                      setKRALibraryFormData((prevState) => ({
                        ...prevState,
                        [selectedKRAType]: prevState[selectedKRAType].filter(
                          (item) => item !== id
                        ),
                      }));
                    }}
                  />
                )
              )}
            </div>
          </div>
        </form>
      </CustomEmptyModal>

      <CustomEmptyModal
        open={exportKRAModal}
        onClose={() => {
          setExportKRAModal(false);
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
                setExportKRAModal(false);
              }}
              variant="contained"
            >
              Export
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setExportKRAModal(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </CustomEmptyModal>

      <CustomModal
        key={selectedKRA?.id || "new"}
        title={"Edit KRA Tag"}
        fields={editKRAFields}
        open={editKRAModal}
        onClose={() => {
          setEditKRAModal(false);
        }}
        onSubmit={(formData, setFormData) => {
          console.log("Edit KRA Form Data :- ", formData);
          setFormData({});
          setEditKRAModal(false);
        }}
      />

      <CustomEmptyModal
        open={deleteKRAModal}
        onClose={() => {
          setSelectedKRA({});
          setDeleteKRAModal(false);
        }}
        isSmall={true}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(selectedKRA);
            setDeleteKRAModal(false);
          }}
        >
          <div className="w-full flex flex-col gap-6 p-4 justify-center items-center">
            <div className="flex flex-col gap-3 justify-center items-center">
              <h1>Delete KRA</h1>
              <h1>
                Are you sure, you want to delete this {selectedKRA?.title} ?
              </h1>
            </div>
            <div className="w-full flex flex-row gap-6 justify-center items-center">
              <Button type="submit" variant="contained">
                Confirm
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setSelectedKRA({});
                  setDeleteKRAModal(false);
                }}
              >
                Cancle
              </Button>
            </div>
          </div>
        </form>
      </CustomEmptyModal>
    </div>
  );
}
