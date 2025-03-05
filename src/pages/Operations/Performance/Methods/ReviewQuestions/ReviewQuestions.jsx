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

export default function ReviewQuestions() {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const isMenuopen = Boolean(menuAnchor);

  const [reviewQuestionsLibraryModal, setReviewQuestionsLibraryModal] =
    useState(false);
  const [reviewQuestionsTagModal, setReviewQuestionsTagModal] = useState(false);
  const [reviewQuestionsTagFormData, setReviewQuestionsTagFormData] = useState({
    designation: [],
    reviewQuestions: [], // Holds the selected Review Questions without weightage
  });

  // Sample designations
  const designations = [
    { label: "All Designations", value: "allDesignations" },
    { label: "Designation 1", value: "designation_1" },
    { label: "Designation 2", value: "designation_2" },
  ];

  // Sample Review Questions data
  const [reviewQuestions, setReviewQuestions] = useState(
    Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      question: `Demo ${index + 1}`,
    }))
  );

  // Add Review Questions Modal
  const [addReviewQuestionsModal, setAddReviewQuestionsModal] = useState(false);
  const addReviewQuestionsFields = [
    {
      type: "textarea",
      name: "question",
      label: "Question",
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

  const [reviewQuestionsLibrarySearch, setReviewQuestionsLibrarySearch] =
    useState({
      isSearch: false,
      searchQuery: "",
    });

  // Add Review Questions to the list
  const handleAddReviewQuestions = (newReviewQuestions) => {
    setReviewQuestions((prevReviewQuestions) => [
      ...prevReviewQuestions,
      {
        id: prevReviewQuestions.length + 1,
        question: newReviewQuestions.question,
      },
    ]);
  };

  // Add Review Questions to the selected list
  const handleAddSelectedReviewQuestions = (id, question) => {
    setReviewQuestionsTagFormData((prevState) => {
      // Check if the Review Questions is already in the selected list
      const isAlreadyAdded = prevState.reviewQuestions.some(
        (item) => item.id === id
      );
      if (isAlreadyAdded) {
        return prevState; // Do not add duplicate
      }
      return {
        ...prevState,
        reviewQuestions: [
          ...prevState.reviewQuestions,
          { id, question }, // Add new Review Questions without weightage
        ],
      };
    });
  };

  // Remove Review Questions from the selected list
  const handleRemoveSelectedReviewQuestions = (id) => {
    setReviewQuestionsTagFormData((prevState) => ({
      ...prevState,
      reviewQuestions: prevState.reviewQuestions.filter(
        (item) => item.id !== id
      ),
    }));
  };

  // Handle "Choose Review Questions" checkbox change
  const handleChooseReviewQuestionsChange = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      // Add all Review Questions to the selected list
      setReviewQuestionsTagFormData((prevState) => ({
        ...prevState,
        reviewQuestions: reviewQuestions.map((item) => ({
          id: item.id,
          question: item.question,
        })),
      }));
    } else {
      // Remove all Review Questions from the selected list
      setReviewQuestionsTagFormData((prevState) => ({
        ...prevState,
        reviewQuestions: [],
      }));
    }
  };

  // Filter Review Questions based on search query
  const filterReviewQuestions = (list, query) => {
    return list.filter((item) =>
      item.question.toLowerCase().includes(query.toLowerCase())
    );
  };

  const reviewQuestionsLibraryData = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    question: `Review Questions Title ${index + 1}`,
    description: `Description ${index + 1}`,
  }));
  const userSpecificReviewQuestionsLibraryData = Array.from(
    { length: 20 },
    (_, index) => ({
      id: index + 1,
      question: `User Specific Title ${index + 1}`,
      description: `Description ${index + 1}`,
    })
  );
  const allReviewQuestionsLibraryData = {
    reviewQuestions: reviewQuestionsLibraryData,
    userSpecificReviewQuestions: userSpecificReviewQuestionsLibraryData,
  };
  const [selectedReviewQuestionsType, setSelectedReviewQuestionsType] =
    useState("reviewQuestions");
  const [selectedReviewQuestions, setSelectedReviewQuestions] = useState(null);
  const [reviewQuestionsLibraryFormData, setReviewQuestionsLibraryFormData] =
    useState({
      reviewQuestions: [],
      userSpecificReviewQuestions: [],
    });
  const [editReviewQuestionsModal, setEditReviewQuestionsModal] =
    useState(false);
  const [editReviewQuestionsFields, setEditReviewQuestionsFields] = useState([
    {
      type: "text",
      name: "question",
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
    setEditReviewQuestionsFields([
      {
        type: "text",
        name: "question",
        label: "Title",
        defaultValue: selectedReviewQuestions?.question || "",
      },
      {
        type: "textarea",
        name: "description",
        label: "Description",
        defaultValue: selectedReviewQuestions?.description || "",
      },
    ]);
    console.log(editReviewQuestionsFields);
  }, [selectedReviewQuestions]);

  const [deleteReviewQuestionsModal, setDeleteReviewQuestionsModal] =
    useState(false);

  // Handle "Select All" checkbox
  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      // Select all Review Questions for the current type
      setReviewQuestionsLibraryFormData((prevState) => ({
        ...prevState,
        [selectedReviewQuestionsType]: allReviewQuestionsLibraryData[
          selectedReviewQuestionsType
        ].map((item) => item.id),
      }));
    } else {
      // Deselect all Review Questions for the current type
      setReviewQuestionsLibraryFormData((prevState) => ({
        ...prevState,
        [selectedReviewQuestionsType]: [],
      }));
    }
  };

  // Handle individual card selection
  const handleCardSelect = (id) => {
    setReviewQuestionsLibraryFormData((prevState) => {
      const selectedReviewQuestions = prevState[selectedReviewQuestionsType];
      const isSelected = selectedReviewQuestions.includes(id);

      if (isSelected) {
        // Deselect the Review Questions
        return {
          ...prevState,
          [selectedReviewQuestionsType]: selectedReviewQuestions.filter(
            (item) => item !== id
          ),
        };
      } else {
        // Select the Review Questions
        return {
          ...prevState,
          [selectedReviewQuestionsType]: [...selectedReviewQuestions, id],
        };
      }
    });
  };

  // Handle Review Questions type change
  const handleReviewQuestionsTypeChange = (event) => {
    const newType = event.target.value;
    setSelectedReviewQuestionsType(newType);
    // Reset the selected Review Questions for the previous type
    setReviewQuestionsLibraryFormData((prevState) => ({
      ...prevState,
      [selectedReviewQuestionsType]: [],
    }));
  };

  const [exportReviewQuestionsModal, setExportReviewQuestionsModal] =
    useState(false);
  const [exportFormData, setExportFormData] = useState({ format: "xls" });

  // Calculate total Review Questions count for the current type
  const totalReviewQuestionsCount =
    reviewQuestionsLibraryFormData[selectedReviewQuestionsType].length;

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
              setReviewQuestionsTagModal(true);
            }}
            variant="contained"
          >
            Tag Review Questions
          </Button>
          <Button
            onClick={() => {
              setReviewQuestionsLibraryModal(true);
            }}
            variant="contained"
          >
            Review Questions Library
          </Button>
        </div>
      </div>

      <div className="w-1/2 min-h-[30rem] flex flex-col gap-3 justify-center items-center text-center">
        <h1>No Review Questions have been tagged</h1>
        <h1>
          Add Review Questions and tag them to designation, department, role,
          and location to gather employee performance-related feedback from
          other employees and self.
        </h1>
        <Button
          variant="contained"
          onClick={() => {
            setReviewQuestionsTagModal(true);
          }}
        >
          Tag Review Questions
        </Button>
      </div>

      {/* Add Review Questions Modal */}
      <CustomModal
        fields={addReviewQuestionsFields}
        open={addReviewQuestionsModal}
        onClose={() => {
          setAddReviewQuestionsModal(false);
        }}
        onSubmit={(formData, setFormData) => {
          handleAddReviewQuestions(formData);
          setFormData({});
          setAddReviewQuestionsModal(false);
        }}
      />

      {/* Tag Review Questions Modal */}
      <CustomEmptyModal
        open={reviewQuestionsTagModal}
        onClose={() => {
          setReviewQuestionsTagModal(false);
        }}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            console.log(
              "Selected Review Questions:",
              reviewQuestionsTagFormData.reviewQuestions
            );
          }}
        >
          <div className="w-full flex flex-col gap-6 justify-center items-center">
            <div className="w-full text-xl">
              <h1>Tag Review Questions</h1>
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
                    setReviewQuestionsTagFormData((prevState) => ({
                      ...prevState,
                      designation: [allDesignationOption.value],
                    }));
                  } else {
                    setReviewQuestionsTagFormData((prevState) => ({
                      ...prevState,
                      designation: value.map((option) => option.value),
                    }));
                  }
                }}
                value={designations.filter((option) =>
                  reviewQuestionsTagFormData.designation.includes(option.value)
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
                    checked={
                      reviewQuestionsTagFormData.reviewQuestions.length ===
                      reviewQuestions.length
                    } // Checked if all Review Questions are selected
                    onChange={handleChooseReviewQuestionsChange} // Handle "Choose Review Questions" checkbox
                  />
                  <h1>Choose Review Questions</h1>
                </div>
                <div className="flex flex-row gap-1 justify-center items-center">
                  {addSearch.isSearch && (
                    <TextField
                      sx={{ padding: 0, margin: 0 }}
                      variant="outlined"
                      placeholder="Search Review Questions"
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
                      setAddReviewQuestionsModal(true);
                    }}
                  >
                    Add Review Questions
                  </Button>
                </div>
              </div>
              <div className="w-full h-full flex flex-col gap-2 overflow-auto py-2">
                {filterReviewQuestions(
                  reviewQuestions,
                  addSearch.searchQuery
                ).map(({ id, question }, index) => (
                  <Card
                    type="add"
                    key={index}
                    id={id}
                    title={question}
                    checked={reviewQuestionsTagFormData.reviewQuestions.some(
                      (item) => item.id === id
                    )} // Reflect checked state
                    handleAdd={handleAddSelectedReviewQuestions}
                    handleDelete={handleRemoveSelectedReviewQuestions}
                  />
                ))}
              </div>
            </div>
            <div className="w-full h-72 flex flex-col gap-2 border border-neutral-700 rounded-lg p-3">
              <div className="flex flex-row justify-between items-center border border-neutral-700 rounded-lg p-2">
                <h1>Review Questions</h1>
                <div className="flex flex-row gap-1 justify-center items-center">
                  {editSearch.isSearch && (
                    <TextField
                      sx={{ padding: 0, margin: 0 }}
                      variant="outlined"
                      placeholder="Search Review Questions"
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
                {filterReviewQuestions(
                  reviewQuestionsTagFormData.reviewQuestions,
                  editSearch.searchQuery
                ).map(({ id, question }, index) => (
                  <Card
                    type="edit"
                    key={index}
                    id={id}
                    title={question}
                    handleDelete={handleRemoveSelectedReviewQuestions}
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
                onClick={() => setReviewQuestionsTagModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </CustomEmptyModal>

      <CustomEmptyModal
        open={reviewQuestionsLibraryModal}
        onClose={() => {
          setReviewQuestionsLibraryModal(false);
        }}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            console.log(
              "Selected Review Questions:",
              reviewQuestionsLibraryFormData
            );
          }}
        >
          <div className="w-full flex flex-col gap-6 justify-center items-center">
            <div className="w-full">
              <FormControl sx={{ width: "100%" }}>
                <InputLabel>Review Questions</InputLabel>
                <Select
                  label="Review Questions"
                  value={selectedReviewQuestionsType}
                  onChange={handleReviewQuestionsTypeChange}
                >
                  <MenuItem value={"reviewQuestions"}>
                    Review Questions
                  </MenuItem>
                  <MenuItem value={"userSpecificReviewQuestions"}>
                    User Specific Review Questions
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
                          reviewQuestionsLibraryFormData[
                            selectedReviewQuestionsType
                          ].length ===
                          allReviewQuestionsLibraryData[
                            selectedReviewQuestionsType
                          ].length
                        }
                        onChange={handleSelectAll}
                      />
                    }
                    label="Select All"
                  />
                </FormGroup>
                <h1>
                  Total Review Questions Count : {totalReviewQuestionsCount}
                </h1>
                {totalReviewQuestionsCount != 0 ? (
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
                    setAddReviewQuestionsModal(true);
                  }}
                  variant="contained"
                >
                  Add Review Questions
                </Button>
                {reviewQuestionsLibrarySearch.isSearch && (
                  <TextField
                    sx={{ padding: 0, margin: 0 }}
                    variant="outlined"
                    placeholder="Search Review Questions"
                    value={reviewQuestionsLibrarySearch.searchQuery}
                    onChange={(event) =>
                      setReviewQuestionsLibrarySearch((prev) => ({
                        ...prev,
                        searchQuery: event.target.value,
                      }))
                    }
                    size="small"
                  />
                )}
                <IconButton
                  onClick={() => {
                    setReviewQuestionsLibrarySearch((prev) => ({
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
                        setExportReviewQuestionsModal(true);
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
              {allReviewQuestionsLibraryData[selectedReviewQuestionsType].map(
                ({ id, question, description }) => (
                  <Card
                    key={id}
                    id={id}
                    title={question}
                    description={description}
                    checked={reviewQuestionsLibraryFormData[
                      selectedReviewQuestionsType
                    ].includes(id)}
                    handleSelect={handleCardSelect}
                    handleReviewQuestionsDelete={() => {
                      setSelectedReviewQuestions({ id, question, description });
                      setDeleteReviewQuestionsModal(true);
                    }}
                    handleReviewQuestionsEdit={({
                      id,
                      question,
                      description,
                    }) => {
                      setSelectedReviewQuestions({ id, question, description });
                      setEditReviewQuestionsModal(true);
                    }}
                    handleAdd={(id, question, description) => {
                      setReviewQuestionsLibraryFormData((prevState) => ({
                        ...prevState,
                        [selectedReviewQuestionsType]: [
                          ...prevState[selectedReviewQuestionsType],
                          id,
                        ],
                      }));
                    }}
                    handleDelete={(id) => {
                      setReviewQuestionsLibraryFormData((prevState) => ({
                        ...prevState,
                        [selectedReviewQuestionsType]: prevState[
                          selectedReviewQuestionsType
                        ].filter((item) => item !== id),
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
        open={exportReviewQuestionsModal}
        onClose={() => {
          setExportReviewQuestionsModal(false);
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
                setExportReviewQuestionsModal(false);
              }}
              variant="contained"
            >
              Export
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setExportReviewQuestionsModal(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </CustomEmptyModal>

      <CustomModal
        key={selectedReviewQuestions?.id || "new"}
        title={"Edit Review Questions Tag"}
        fields={editReviewQuestionsFields}
        open={editReviewQuestionsModal}
        onClose={() => {
          setEditReviewQuestionsModal(false);
        }}
        onSubmit={(formData, setFormData) => {
          console.log("Edit Review Questions Form Data :- ", formData);
          setFormData({});
          setEditReviewQuestionsModal(false);
        }}
      />

      <CustomEmptyModal
        open={deleteReviewQuestionsModal}
        onClose={() => {
          setSelectedReviewQuestions({});
          setDeleteReviewQuestionsModal(false);
        }}
        isSmall={true}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(selectedReviewQuestions);
            setDeleteReviewQuestionsModal(false);
          }}
        >
          <div className="w-full flex flex-col gap-6 p-4 justify-center items-center">
            <div className="flex flex-col gap-3 justify-center items-center">
              <h1>Delete Review Questions</h1>
              <h1>
                Are you sure, you want to delete this{" "}
                {selectedReviewQuestions?.question} ?
              </h1>
            </div>
            <div className="w-full flex flex-row gap-6 justify-center items-center">
              <Button type="submit" variant="contained">
                Confirm
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setSelectedReviewQuestions({});
                  setDeleteReviewQuestionsModal(false);
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
