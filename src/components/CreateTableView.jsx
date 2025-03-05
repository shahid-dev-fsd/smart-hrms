import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  Autocomplete,
  TextField,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Radio,
  RadioGroup,
  FormLabel,
  IconButton,
  Menu,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CustomEmptyModal from "./CustomEmptyModal";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Card = ({ title, key, index, selected, onClick, onDelete, onSave }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  useEffect(() => {
    setNewTitle(title);
  }, [title]);

  return (
    <div
      className={`w-full h-fit p-2 flex gap-3 flex-row justify-between items-center border border-neutral-700 rounded-md ${
        selected ? "bg-neutral-700" : ""
      }`}
    >
      <div className="w-full" onClick={onClick}>
        {isEdit ? (
          <TextField
            sx={{ margin: 0 }}
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            label="Edit"
            variant="outlined"
            fullWidth
          />
        ) : (
          <h1>{title}</h1>
        )}
      </div>
      <div className="flex flex-row gap-1 items-center">
        {isEdit ? (
          <Button
            onClick={() => {
              if (newTitle.length === 0) {
                setIsEdit(false);
                return;
              }
              onSave(newTitle);
              setIsEdit(false);
            }}
            variant="outlined"
          >
            Save
          </Button>
        ) : (
          <IconButton
            onClick={() => {
              setIsEdit(true);
            }}
          >
            <MdOutlineEdit />
          </IconButton>
        )}
        <IconButton onClick={onDelete}>
          <MdDeleteOutline />
        </IconButton>
      </div>
    </div>
  );
};

export default function CreateTableView({
  open,
  onClose,
  forWhom,
  form,
  setForm,
  columns,
  specifics,
  criterias,
  criteriasOptions,
  criteriasRelationships,
}) {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedCards, setSelectedCards] = useState([]);
  const [criteriaMenuOpen, setCriteriaMenuOpen] = useState(false);
  const [activeCriteriaIndex, setActiveCriteriaIndex] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [nameError, setNameError] = useState(false); // State to track name error
  const [columnsError, setColumnsError] = useState(false); // State to track select_columns error
  const [permissionError, setPermissionError] = useState(false); // State to track permission error
  const [criteriaErrors, setCriteriaErrors] = useState({}); // State to track criteria errors

  const userId = "2323";

  const handleCriteriaSelect = (value, index) => {
    const updatedCriterias = [...form.criterias];
    updatedCriterias[index].column = value.key + "." + value.name;
    updatedCriterias[index].title = value.title;
    updatedCriterias[index].value = "";

    const criteriaOptions = criteriasOptions.find(
      (criteria) => criteria.key === value.key
    );

    if (criteriaOptions && criteriaOptions.options.length > 0) {
      updatedCriterias[index].condition = criteriaOptions.options[0].name;
    }

    setForm((prevForm) => ({
      ...prevForm,
      criterias: updatedCriterias,
    }));

    setActiveCriteriaIndex(index);
    setCriteriaMenuOpen(false);
    setAnchorEl(null);
  };

  const handleAddCriteria = () => {
    const newCriteria = {
      relationship: criteriasRelationships[0]?.name || null,
      column: null,
      title: "",
      condition: null,
      value: null,
    };

    setForm((prevForm) => ({
      ...prevForm,
      criterias: [...prevForm.criterias, newCriteria],
    }));
  };

  const handleDeleteCriteria = (index) => {
    if (index === 0) {
      const updatedCriterias = [...form.criterias];
      updatedCriterias[0] = {
        relationship: null,
        column: null,
        title: "",
        condition: null,
        value: null,
      };
      setForm((prevForm) => ({
        ...prevForm,
        criterias: updatedCriterias,
      }));
    } else {
      const updatedCriterias = form.criterias.filter((_, i) => i !== index);
      setForm((prevForm) => ({
        ...prevForm,
        criterias: updatedCriterias,
      }));
    }
  };

  const handleDeleteColumn = (key) => {
    setForm((prevForm) => ({
      ...prevForm,
      select_columns: prevForm.select_columns.filter((col) => col.key !== key),
    }));
  };

  const handleEditColumnTitle = (key, newTitle) => {
    setForm((prevForm) => ({
      ...prevForm,
      select_columns: prevForm.select_columns.map((col) =>
        col.key === key ? { ...col, title: newTitle } : col
      ),
    }));
  };

  const handleViewPermissionChange = (event) => {
    const { value } = event.target;

    let updatedPermission = {};

    if (value === "onlyMe") {
      updatedPermission = { users: [userId] };
    } else if (value === "allEmployees") {
      updatedPermission = { users: ["all"] };
    } else if (value === "shareWithSpecific") {
      updatedPermission = {};
    }

    setForm((prevForm) => ({
      ...prevForm,
      viewPermission: value,
      permission: updatedPermission,
    }));
  };

  const handleSpecificsChange = (label, selectedOptions) => {
    const updatedPermission = { ...form.permission };
    const ids = selectedOptions.map((option) => option.id);

    switch (label) {
      case "User":
        if (ids.length === 0) {
          delete updatedPermission.users;
        } else {
          updatedPermission.users = ids;
        }
        break;
      case "Department":
        if (ids.length === 0) {
          delete updatedPermission.departments;
        } else {
          updatedPermission.departments = ids;
        }
        break;
      case "Role":
        if (ids.length === 0) {
          delete updatedPermission.roles;
        } else {
          updatedPermission.roles = ids;
        }
        break;
      case "Locations":
        if (ids.length === 0) {
          delete updatedPermission.locations;
        } else {
          updatedPermission.locations = ids;
        }
        break;
      default:
        break;
    }

    setForm((prevForm) => ({
      ...prevForm,
      permission: updatedPermission,
    }));

    setPermissionError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the name is empty
    if (!form.name || form.name.trim() === "") {
      setNameError(true); // Set error state to true
      return; // Prevent form submission
    }

    // Check if select_columns is empty
    if (!form.select_columns || form.select_columns.length === 0) {
      setColumnsError(true); // Set error state to true
      return; // Prevent form submission
    }

    // Check if permission is valid
    if (form.viewPermission === "shareWithSpecific") {
      const { permission } = form;
      if (
        !permission.users &&
        !permission.departments &&
        !permission.roles &&
        !permission.locations
      ) {
        setPermissionError(true); // Set error state to true
        return; // Prevent form submission
      }
    }

    // Validate criteria values
    const errors = {};
    form.criterias.forEach((criteria, index) => {
      const criteriaKey = criteria.column?.split(".")[0];
      const criteriaOption = criteriasOptions.find(
        (option) => option.key === criteriaKey
      );

      if (criteriaOption && criteriaOption.type !== "none" && !criteria.value) {
        errors[index] = "Value is required";
      }
    });

    if (Object.keys(errors).length > 0) {
      setCriteriaErrors(errors);
      return; // Prevent form submission
    }

    // Reset error states
    setNameError(false);
    setColumnsError(false);
    setPermissionError(false);
    setCriteriaErrors({});

    onClose();
    // If name, select_columns, and permission are valid, proceed with form submission
    console.log("Create Table View Form :- ", form);
  };

  // Function to reset error for a specific criteria index
  const resetCriteriaError = (index) => {
    setCriteriaErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[index];
      return updatedErrors;
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <CustomEmptyModal isScrollable={true} open={open} onClose={onClose}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Box
              sx={{ backgroundColor: "background.default" }}
              className="w-full min-h-14 flex items-center z-50 sticky top-0 left-0 py-2"
            >
              <div>
                <h1 className="text-xl">Create View</h1>
              </div>
            </Box>

            <div className="w-full">
              <TextField
                sx={{ width: "100%" }}
                label="Specify View Name"
                variant="outlined"
                error={nameError} // Set error state
                helperText={nameError ? "View name is required" : ""} // Display error message
                onChange={(event) => {
                  setForm((prevForm) => ({
                    ...prevForm,
                    name: event.target.value,
                  }));
                  setNameError(false); // Reset error state when user starts typing
                }}
              />
            </div>
            <div>
              <FormGroup>
                <FormControlLabel
                  onChange={(event) => {
                    setForm((prevForm) => ({
                      ...prevForm,
                      default: event.target.checked,
                    }));
                  }}
                  control={<Checkbox />}
                  label="Set as default view"
                />
              </FormGroup>
            </div>
            <div className="flex flex-col gap-3">
              <FormControl>
                <FormLabel>View Permission</FormLabel>
                <RadioGroup
                  onChange={handleViewPermissionChange}
                  value={form.viewPermission}
                >
                  <FormControlLabel
                    value="onlyMe"
                    control={<Radio />}
                    label="Only to me"
                  />
                  <FormControlLabel
                    value="allEmployees"
                    control={<Radio />}
                    label="Allow all employees to access this custom view"
                  />
                  <FormControlLabel
                    value="shareWithSpecific"
                    control={<Radio />}
                    label="Share this view to specific users, departments, roles or locations"
                  />
                </RadioGroup>
              </FormControl>

              {permissionError && (
                <Typography color="error" variant="body2">
                  Please select at least one Input Filed
                </Typography>
              )}

              <div>
                {form.viewPermission === "shareWithSpecific" && (
                  <>
                    {specifics.map((item, index) => (
                      <Accordion key={index}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls={`panel${index}-content`}
                          id={`panel${index}-header`}
                        >
                          <Typography component="span">{item.label}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Autocomplete
                            multiple
                            options={item.options}
                            getOptionLabel={(option) => option.title}
                            onChange={(event, value) => {
                              handleSpecificsChange(item.label, value);
                            }}
                            disableCloseOnSelect
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                label={item.label}
                                placeholder={item.label}
                              />
                            )}
                          />
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h1>Select Columns</h1>
              <div className="w-full flex flex-row gap-3">
                <div className="h-[25rem] w-full border border-neutral-700 rounded-md p-3 overflow-scroll">
                  {columns.map((item, index) => (
                    <Accordion key={index}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index}-content`}
                        id={`panel${index}-header`}
                      >
                        <Typography component="span">{item.label}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Autocomplete
                          multiple
                          options={item.options}
                          getOptionLabel={(option) => option.title}
                          onChange={(event, value) => {
                            setSelectedOptions((prev) => ({
                              ...prev,
                              [item.label]: value,
                            }));
                          }}
                          disableCloseOnSelect
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label={item.label}
                              placeholder={item.label}
                            />
                          )}
                        />
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </div>
                <div className="h-full flex flex-col gap-3 justify-center items-center">
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setColumnsError(false);
                      const selectedColumn = columns.find(
                        (col) => col.key === forWhom
                      );

                      if (selectedColumn) {
                        const newSelectColumns = selectedColumn.options
                          .filter(
                            (option) =>
                              !form.select_columns.some(
                                (col) =>
                                  col.key ===
                                  `${selectedColumn.key}.${option.name}`
                              )
                          )
                          .map((option) => ({
                            title: option.title,
                            key: `${selectedColumn.key}.${option.name}`,
                          }));

                        setForm((prevForm) => ({
                          ...prevForm,
                          select_columns: [
                            ...prevForm.select_columns,
                            ...newSelectColumns,
                          ],
                        }));
                      }
                    }}
                  >
                    {">>"}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setColumnsError(false);
                      const newSelectColumns = [];
                      Object.entries(selectedOptions).forEach(
                        ([label, options]) => {
                          const column = columns.find(
                            (col) => col.label === label
                          );

                          if (column) {
                            options.forEach((option) => {
                              const newColumn = {
                                title: option.title,
                                key: `${column.key}.${option.name}`,
                              };
                              if (
                                !form.select_columns.some(
                                  (col) => col.key === newColumn.key
                                )
                              ) {
                                newSelectColumns.push(newColumn);
                              }
                            });
                          }
                        }
                      );
                      setForm((prevForm) => ({
                        ...prevForm,
                        select_columns: [
                          ...prevForm.select_columns,
                          ...newSelectColumns,
                        ],
                      }));
                    }}
                  >
                    {">"}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      const updatedSelectColumns = form.select_columns.filter(
                        (col) => !selectedCards.includes(col.key)
                      );
                      setForm((prevForm) => ({
                        ...prevForm,
                        select_columns: updatedSelectColumns,
                      }));
                      setSelectedCards([]);
                      if (updatedSelectColumns.length === 0) {
                        setColumnsError(true); // Set error state to true
                      } else {
                        setColumnsError(false); // Reset error state
                      }
                    }}
                  >
                    {"<"}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      const updatedSelectColumns = form.select_columns.filter(
                        (col) => !col.key.includes(forWhom)
                      );

                      setForm((prevForm) => ({
                        ...prevForm,
                        select_columns: updatedSelectColumns,
                      }));

                      if (updatedSelectColumns.length === 0) {
                        setColumnsError(true); // Set error state to true
                      } else {
                        setColumnsError(false); // Reset error state
                      }
                    }}
                  >
                    {"<<"}
                  </Button>
                </div>

                <div className="w-full flex flex-col gap-3 justify-center items-center">
                  <div className="h-[25rem] w-full border flex flex-col gap-3 border-neutral-700 rounded-md p-3 overflow-scroll">
                    {form?.select_columns &&
                    form.select_columns.length !== 0 ? (
                      <>
                        {form.select_columns.map(({ title, key }, index) => {
                          return (
                            <Card
                              key={key}
                              title={title}
                              index={index}
                              selected={selectedCards.includes(key)}
                              onClick={() => {
                                setSelectedCards((prev) =>
                                  prev.includes(key)
                                    ? prev.filter((k) => k !== key)
                                    : [...prev, key]
                                );
                              }}
                              onDelete={() => handleDeleteColumn(key)}
                              onSave={(newTitle) =>
                                handleEditColumnTitle(key, newTitle)
                              }
                            />
                          );
                        })}
                      </>
                    ) : (
                      <>
                        <div className="h-full w-full flex justify-center items-center">
                          <h1>No fields present</h1>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="h-4">
                    {columnsError && (
                      <Typography color="error" variant="body2">
                        At least one column must be selected.
                      </Typography>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div>
                <h1>Criteria</h1>
              </div>
              <div>
                {form?.criterias && form.criterias.length !== 0 ? (
                  <>
                    {form.criterias.map(
                      (
                        { relationship, column, condition, value, title },
                        index
                      ) => {
                        const criteriaKey = column?.split(".")[0];
                        const criteria = criteriasOptions.find(
                          (criteria) => criteria.key === criteriaKey
                        );

                        const selectedOption = criteria?.options.find(
                          (option) => option.name === condition
                        );

                        const type = selectedOption?.type;

                        const renderValueInput = () => {
                          switch (type) {
                            case "text":
                              return (
                                <TextField
                                  label="Value"
                                  variant="outlined"
                                  value={value || ""}
                                  onChange={(event) => {
                                    const updatedCriterias = [
                                      ...form.criterias,
                                    ];
                                    updatedCriterias[index].value =
                                      event.target.value;
                                    setForm((prevForm) => ({
                                      ...prevForm,
                                      criterias: updatedCriterias,
                                    }));
                                    resetCriteriaError(index);
                                  }}
                                  error={!!criteriaErrors[index]}
                                  helperText={criteriaErrors[index]}
                                />
                              );

                            case "select":
                              if (selectedOption?.multiple) {
                                return (
                                  <Autocomplete
                                    multiple
                                    disableCloseOnSelect
                                    value={
                                      value
                                        ? selectedOption.options.filter(
                                            (option) =>
                                              value.includes(option.name)
                                          )
                                        : []
                                    }
                                    options={selectedOption?.options || []}
                                    getOptionLabel={(option) => option.title}
                                    onChange={(event, newValue) => {
                                      const updatedCriterias = [
                                        ...form.criterias,
                                      ];
                                      updatedCriterias[index].value =
                                        newValue.map((v) => v.name);
                                      setForm((prevForm) => ({
                                        ...prevForm,
                                        criterias: updatedCriterias,
                                      }));
                                      resetCriteriaError(index);
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Select Value"
                                        error={!!criteriaErrors[index]}
                                        helperText={criteriaErrors[index]}
                                      />
                                    )}
                                  />
                                );
                              } else {
                                return (
                                  <Autocomplete
                                    disablePortal
                                    value={
                                      selectedOption?.options.find(
                                        (option) => option.name === value
                                      ) || null
                                    }
                                    options={selectedOption?.options || []}
                                    getOptionLabel={(option) => option.title}
                                    onChange={(event, newValue) => {
                                      const updatedCriterias = [
                                        ...form.criterias,
                                      ];
                                      updatedCriterias[index].value =
                                        newValue?.name || null;
                                      setForm((prevForm) => ({
                                        ...prevForm,
                                        criterias: updatedCriterias,
                                      }));
                                      resetCriteriaError(index);
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Select Value"
                                        error={!!criteriaErrors[index]}
                                        helperText={criteriaErrors[index]}
                                      />
                                    )}
                                  />
                                );
                              }

                            case "datetime":
                              return (
                                <DateTimePicker
                                  label="Select Date and Time"
                                  value={value || null}
                                  onChange={(newValue) => {
                                    const updatedCriterias = [
                                      ...form.criterias,
                                    ];
                                    updatedCriterias[index].value = newValue;
                                    setForm((prevForm) => ({
                                      ...prevForm,
                                      criterias: updatedCriterias,
                                    }));
                                    resetCriteriaError(index);
                                  }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      error={!!criteriaErrors[index]}
                                      helperText={criteriaErrors[index]}
                                    />
                                  )}
                                />
                              );

                            case "none":
                              if (value !== "none") {
                                const updatedCriterias = [...form.criterias];
                                updatedCriterias[index].value = "none";
                                setForm((prevForm) => ({
                                  ...prevForm,
                                  criterias: updatedCriterias,
                                }));
                              }
                              return null;

                            default:
                              return null;
                          }
                        };
                        return (
                          <div
                            key={index}
                            className="w-full flex flex-row gap-3 justify-between items-center"
                          >
                            <div className="w-5 h-5 p-5 flex justify-center items-center bg-neutral-800 rounded-full text-xl">
                              {parseInt(index + 1)}
                            </div>
                            {index > 0 && (
                              <div className="w-full">
                                <Autocomplete
                                  disablePortal
                                  value={
                                    criteria?.options.find(
                                      (option) => option.name === condition
                                    ) || null
                                  }
                                  options={selectedOption?.options || []}
                                  getOptionLabel={(option) => option.title}
                                  onChange={(event, value) => {
                                    const updatedCriterias = [
                                      ...form.criterias,
                                    ];
                                    updatedCriterias[index].condition =
                                      value?.name;
                                    updatedCriterias[index].value = null;
                                    setForm((prevForm) => ({
                                      ...prevForm,
                                      criterias: updatedCriterias,
                                    }));
                                  }}
                                  renderInput={(params) => (
                                    <TextField {...params} label="Options" />
                                  )}
                                />
                              </div>
                            )}
                            {index === 0 && <div className="w-full"></div>}
                            <div className="w-full">
                              <TextField
                                label="Criteria"
                                variant="outlined"
                                value={title || "None"}
                                onClick={(event) => {
                                  setActiveCriteriaIndex(index);
                                  setAnchorEl(event.currentTarget);
                                  setCriteriaMenuOpen(true);
                                }}
                              />
                            </div>
                            <div className="w-full">
                              <Autocomplete
                                disablePortal
                                value={
                                  criteria?.options.find(
                                    (option) => option.name === condition
                                  ) || null
                                }
                                options={criteria?.options || []}
                                getOptionLabel={(option) => option.title}
                                onChange={(event, value) => {
                                  const updatedCriterias = [...form.criterias];
                                  updatedCriterias[index].condition =
                                    value?.name;
                                  updatedCriterias[index].value = null;
                                  setForm((prevForm) => ({
                                    ...prevForm,
                                    criterias: updatedCriterias,
                                  }));
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} label="Options" />
                                )}
                              />
                            </div>
                            <div className="w-full">{renderValueInput()}</div>
                            <div>
                              <IconButton
                                onClick={() => handleDeleteCriteria(index)}
                              >
                                <MdDeleteOutline />
                              </IconButton>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div>
                <Button variant="outlined" onClick={handleAddCriteria}>
                  Add Criteria
                </Button>
              </div>
            </div>
            <Box
              sx={{ backgroundColor: "background.default" }}
              className="w-full min-h-14 flex items-center z-50 sticky bottom-0 left-0 py-2"
            >
              <div className="flex flex-row gap-3 justify-between items-center">
                <Button variant="contained" type="submit">
                  Submit
                </Button>
                <Button variant="outlined" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </Box>
          </form>
        </CustomEmptyModal>
        <Menu
          open={criteriaMenuOpen}
          onClose={() => {
            setCriteriaMenuOpen(false);
            setAnchorEl(null);
          }}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          transformOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <div className="w-96 p-3">
            {criterias.map((item, index) => (
              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                >
                  <Typography component="span">{item.label}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Autocomplete
                    options={item.options}
                    getOptionLabel={(option) => option.title}
                    onChange={(event, value) => {
                      handleCriteriaSelect(value, activeCriteriaIndex);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label={item.label}
                        placeholder={item.label}
                      />
                    )}
                  />
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </Menu>
      </div>
    </LocalizationProvider>
  );
}
