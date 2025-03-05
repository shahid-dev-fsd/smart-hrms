import React, { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import { IoFilter } from "react-icons/io5";
import CustomModal from "../../../components/CustomModal";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddressProofTableView from "./AddressProofTableView";
import BonafideLetterTableView from "./BonafideLetterTableView";
import ExitDetailsTableView from "./ExitDetailsTableView";
import ExperienceLetterTableView from "./ExperienceLetterTableView";
import TravelExpenseTableView from "./TravelExpenseTableView";
import TravelRequestTableView from "./TravelRequestTableView";

export default function RecycleBin() {
  const [tableView, setTabelView] = useState("addressProof");
  const [filterModal, setFilterModal] = useState(false);
  const fields = [
    {
      field: "employeeID",
      label: "EmployeeID",
    },
    {
      field: "dateOfRequest",
      label: "Date of Request",
    },
    {
      field: "changeInPresentAddress",
      label: "Is there any change in Present Address",
    },
    {
      field: "reasonForRequest",
      label: "Reason for Request",
    },
    {
      field: "otherReason",
      label: "Enter the Reason for Request (If 'Others' is chosen)",
    },
    {
      field: "newPresentAddress",
      label: "New Present Address",
    },
  ];
  const [filterFormValues, setFilterFormValues] = useState({
    filterFields: [],
  });
  const handleFilterValueChange = (field, condition, value) => {
    setFilterFormValues((prev) => ({
      ...prev,
      filterFields: prev.filterFields.map((item) =>
        item.field === field ? { ...item, condition, value } : item
      ),
    }));
  };
  const handleCheckboxChange = (field) => (event) => {
    const checkedFields = filterFormValues.filterFields;
    if (event.target.checked) {
      setFilterFormValues((prev) => ({
        ...prev,
        filterFields: [...checkedFields, { field, condition: "is", value: "" }],
      }));
    } else {
      setFilterFormValues((prev) => ({
        ...prev,
        filterFields: checkedFields.filter((item) => item.field !== field),
      }));
    }
  };
  const handleFilterFormSubmit = (e) => {
    e.preventDefault();
    console.log("Filter Data :- ", filterFormValues);
    setFilterModal(false);
  };

  return (
    <div className="w-full min-h-80 flex flex-col">
      <div className="w-full flex gap-3 justify-end items-center">
        <FormControl sx={{ width: "200px" }}>
          <InputLabel>Table View</InputLabel>
          <Select
            value={tableView}
            onChange={(event) => {
              setTabelView(event.target.value);
            }}
            label="Table View"
          >
            <MenuItem value={"addressProof"}>Address Proof</MenuItem>
            <MenuItem value={"bonafideLetter"}>Bonafide Letter</MenuItem>
            <MenuItem value={"exitDetails"}>Exit Details</MenuItem>
            <MenuItem value={"experienceLetter"}>Experience Letter</MenuItem>
            <MenuItem value={"travelExpense"}>Travel Expense</MenuItem>
            <MenuItem value={"travelRequest"}>Travel Request</MenuItem>
          </Select>
        </FormControl>
        <IconButton
          onClick={() => {
            setFilterModal(true);
          }}
          title="Filter"
        >
          <IoFilter />
        </IconButton>
      </div>
      <div>
        {tableView === "addressProof" ? (
          <>
            <AddressProofTableView />
          </>
        ) : (
          <></>
        )}
        {tableView === "bonafideLetter" ? (
          <>
            <BonafideLetterTableView />
          </>
        ) : (
          <></>
        )}
        {tableView === "exitDetails" ? (
          <>
            <ExitDetailsTableView />
          </>
        ) : (
          <></>
        )}
        {tableView === "experienceLetter" ? (
          <>
            <ExperienceLetterTableView />
          </>
        ) : (
          <></>
        )}
        {tableView === "travelExpense" ? (
          <>
            <TravelExpenseTableView />
          </>
        ) : (
          <></>
        )}
        {tableView === "travelRequest" ? (
          <>
            <TravelRequestTableView />
          </>
        ) : (
          <></>
        )}
      </div>
      <CustomModal
        title="Filter"
        open={filterModal}
        onClose={() => setFilterModal(false)}
        onSubmit={handleFilterFormSubmit}
        isScrollable={true}
      >
        <form onSubmit={handleFilterFormSubmit} className="flex flex-col gap-3">
          <div>
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography component="span">Field</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex flex-col gap-3">
                  {fields.map((field, index) => (
                    <div key={index}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={handleCheckboxChange(field.field)}
                              checked={filterFormValues.filterFields.some(
                                (item) => item.field === field.field
                              )}
                            />
                          }
                          label={field.label}
                        />
                      </FormGroup>

                      {filterFormValues.filterFields
                        .filter((item) => item.field === field.field)
                        .map((filter, idx) => (
                          <div className="flex flex-col gap-3" key={idx}>
                            <FormControl sx={{ width: "100%" }}>
                              <InputLabel id={`filter-${index}`}>
                                Condition
                              </InputLabel>
                              <Select
                                labelId={`filter-${index}`}
                                id={`filter-${index}`}
                                label="Condition"
                                value={filter.condition}
                                onChange={(e) =>
                                  handleFilterValueChange(
                                    field.field,
                                    e.target.value,
                                    filter.value
                                  )
                                }
                              >
                                <MenuItem value={"is"}>Is</MenuItem>
                                <MenuItem value={"isNot"}>Is Not</MenuItem>
                                <MenuItem value={"startWith"}>
                                  Start With
                                </MenuItem>
                                <MenuItem value={"endWith"}>End With</MenuItem>
                                <MenuItem value={"contains"}>Contains</MenuItem>
                                <MenuItem value={"notContains"}>
                                  Not Contains
                                </MenuItem>
                                <MenuItem value={"Like"}>Like</MenuItem>
                                <MenuItem value={"isEmpty"}>Is Empty</MenuItem>
                                <MenuItem value={"isNotEmpty"}>
                                  Is Not Empty
                                </MenuItem>
                              </Select>
                            </FormControl>
                            <TextField
                              sx={{ width: "100%" }}
                              variant="outlined"
                              label="Value"
                              placeholder="Value"
                              value={filter.value}
                              onChange={(e) =>
                                handleFilterValueChange(
                                  field.field,
                                  filter.condition,
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="w-full flex gap-2 flex-row justify-between items-center">
            <Button type="submit" variant="contained">
              Apply
            </Button>
            <Button
              onClick={() => {
                setFilterModal(false);
              }}
              variant="outlined"
            >
              Reset
            </Button>
          </div>
        </form>
      </CustomModal>
    </div>
  );
}
