import React, { useState } from "react";
import {
  Button,
  MenuItem,
  Select,
  Stepper,
  Step,
  StepLabel,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tabs,
  Tab,
} from "@mui/material";
import Card from "./Card";
import CustomEmptyModal from "../../../../../components/CustomEmptyModal";
import {
  ExcelFileReader,
  CSVFileReader,
  getFileExtension,
  getFileSize,
} from "../../../../../utilities/fileReader";
import CustomTable from "../../../../../components/CustomTable";
import { CloudUploadIcon } from "lucide-react";

// Helper function for fuzzy matching
const fuzzyMatch = (str1, str2) => {
  const normalize = (str) => str.toLowerCase().replace(/\s+/g, "");
  const normalizedStr1 = normalize(str1);
  const normalizedStr2 = normalize(str2);
  return (
    normalizedStr1.includes(normalizedStr2) ||
    normalizedStr2.includes(normalizedStr1)
  );
};

export default function SkillLevels() {
  const [exportModal, setExportModal] = useState(false);
  const [importedData, setImportedData] = useState({});
  const [columnMapping, setColumnMapping] = useState({});
  const [mappedData, setMappedData] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [mapDetailsTab, setMapDetailsTab] = useState("all");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmDialogAction, setConfirmDialogAction] = useState(null);
  const [importSummaryTab, setImportSummaryTab] = useState("added");

  const importColumns = [
    { accessorKey: "employeeID", header: "Employee ID", enableSorting: false },
    { accessorKey: "kra", header: "Kra", enableSorting: false },
    { accessorKey: "weightage", header: "Weightage", enableSorting: false },
  ];

  // Helper function to find duplicate employee IDs
  const findDuplicates = (data) => {
    const employeeIDCount = {};
    data.forEach((row) => {
      const employeeID = row.employeeID;
      employeeIDCount[employeeID] = (employeeIDCount[employeeID] || 0) + 1;
    });

    const duplicates = Object.keys(employeeIDCount).filter(
      (id) => employeeIDCount[id] > 1
    );
    return duplicates;
  };

  // Filter data based on employee ID duplication
  const filterData = (data) => {
    const duplicates = findDuplicates(data);

    const addedRecords = data.filter(
      (row) => !duplicates.includes(row.employeeID)
    );
    const updatedRecords = data.filter((row) =>
      duplicates.includes(row.employeeID)
    );
    const skippedRecords = data.filter((row) =>
      duplicates.includes(row.employeeID)
    );
    const recordErrors = data.filter((row) =>
      duplicates.includes(row.employeeID)
    );

    return {
      addedRecords,
      updatedRecords,
      skippedRecords,
      recordErrors,
    };
  };

  const { addedRecords, updatedRecords, skippedRecords, recordErrors } =
    filterData(mappedData);

  const handleColumnMapping = (e, field) => {
    const columnIndex = e.target.value;
    setColumnMapping((prevMapping) => ({
      ...prevMapping,
      [field]: columnIndex,
    }));
  };

  const applyMapping = () => {
    const newMappedData = importedData.data.map((row) => {
      const mappedRow = {};
      Object.keys(columnMapping).forEach((field) => {
        mappedRow[field] = row[columnMapping[field]];
      });
      return mappedRow;
    });
    setMappedData(newMappedData);
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (
        !importedData ||
        !importedData.data ||
        importedData.data.length === 0
      ) {
        setSnackbarMessage("Please upload a file before proceeding.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }
    }
    if (activeStep === 1) {
      const isAnyColumnUnmapped = Object.values(columnMapping).some(
        (value) => value === "select"
      );
      if (isAnyColumnUnmapped) {
        setSnackbarMessage("Please map all columns before proceeding.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }
      const allMapped = importColumns.every(
        (column) => columnMapping[column.accessorKey] !== undefined
      );
      if (!allMapped) {
        setSnackbarMessage("Please map all columns before proceeding.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }
      applyMapping();
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const steps = ["Upload File", "Map Details", "Verify", "Import Summary"];

  const handleFileChange = async (event) => {
    const extensions = ["xls", "xlsx", "csv"];
    const maxFileSizeMB = 5;

    try {
      const extension = getFileExtension(event);
      const fileSizeMB = getFileSize(event);

      if (fileSizeMB > maxFileSizeMB) {
        setSnackbarMessage(
          "File size exceeds the limit of 5MB. Please upload a smaller file."
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }

      if (!extensions.includes(extension)) {
        setSnackbarMessage(
          "Unsupported file type. Please upload a .xls, .xlsx, or .csv file."
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }

      let data;
      if (extension === "xls" || extension === "xlsx") {
        data = await ExcelFileReader(event);
      } else if (extension === "csv") {
        data = await CSVFileReader(event);
      }

      setImportedData(data);
      setActiveStep(1);
    } catch (error) {
      console.error("Error reading file:", error);
      setSnackbarMessage(
        "An error occurred while reading the file. Please try again."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleResetFields = () => {
    setConfirmDialogAction("reset");
    setConfirmDialogOpen(true);
  };

  const handleAutoMapFields = () => {
    setConfirmDialogAction("autoMap");
    setConfirmDialogOpen(true);
  };

  const handleConfirmDialogClose = (confirmed) => {
    if (confirmed) {
      if (confirmDialogAction === "reset") {
        setColumnMapping({});
      } else if (confirmDialogAction === "autoMap") {
        const autoMappedColumns = {};
        importColumns.forEach((column) => {
          const headerIndex = importedData.header.findIndex((header) =>
            fuzzyMatch(header, column.header)
          );
          if (headerIndex !== -1) {
            autoMappedColumns[column.accessorKey] = headerIndex;
          }
        });
        setColumnMapping(autoMappedColumns);
      }
    }
    setConfirmDialogOpen(false);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="w-full h-[30rem] flex flex-col gap-3 p-16 justify-center items-center border border-neutral-600 rounded-md text-white">
            <div className="flex flex-col justify-center items-center">
              <h1>Upload Excel File ( XLS / XLSX / CSV ) Only</h1>
            </div>
            <div>
              <input
                accept=".xlsx, .xls, .csv"
                style={{ display: "none" }}
                id="contained-button-file"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Excel File
                </Button>
              </label>
            </div>
          </div>
        );
      case 1:
        const mappedColumns = importColumns.filter(
          (column) => columnMapping[column.accessorKey] !== undefined
        );
        const unmappedColumns = importColumns.filter(
          (column) => columnMapping[column.accessorKey] === undefined
        );

        return (
          <div className="h-[30rem] flex flex-col gap-3 p-3 border border-neutral-600 rounded-md overflow-auto">
            <div className="flex flex-row gap-3 justify-between items-center">
              <div className="flex flex-row gap-3">
                <Button
                  variant={`${
                    mapDetailsTab === "all" ? "contained" : "outlined"
                  }`}
                  onClick={() => {
                    setMapDetailsTab("all");
                  }}
                >
                  All
                </Button>
                <Button
                  variant={`${
                    mapDetailsTab === "mapped" ? "contained" : "outlined"
                  }`}
                  onClick={() => {
                    setMapDetailsTab("mapped");
                  }}
                >
                  Mapped ({mappedColumns.length})
                </Button>
                <Button
                  variant={`${
                    mapDetailsTab === "unmapped" ? "contained" : "outlined"
                  }`}
                  onClick={() => {
                    setMapDetailsTab("unmapped");
                  }}
                >
                  Unmapped ({unmappedColumns.length})
                </Button>
              </div>
              <div className="flex flex-row gap-3">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleResetFields}
                >
                  Reset Fields
                </Button>
                <Button variant="outlined" onClick={handleAutoMapFields}>
                  Auto Map Fields
                </Button>
              </div>
            </div>
            {mapDetailsTab === "all" ? (
              <>
                {importColumns.map((column) => (
                  <div
                    key={column.accessorKey}
                    className="flex gap-2 rounded-md bg-neutral-700 p-3"
                  >
                    <div className="w-40 flex justify-start items-center">
                      <label className="text-white">{column.header}</label>
                    </div>
                    <Select
                      value={columnMapping[column.accessorKey] ?? ""}
                      onChange={(e) =>
                        handleColumnMapping(e, column.accessorKey)
                      }
                      displayEmpty
                      fullWidth
                      variant="outlined"
                      sx={{ backgroundColor: "transparent" }}
                      required
                    >
                      <MenuItem value="select">Select Column</MenuItem>
                      {importedData?.header?.map((header, index) => (
                        <MenuItem key={index} value={index}>
                          {header}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                ))}
              </>
            ) : mapDetailsTab === "mapped" ? (
              <>
                {mappedColumns.map((column) => (
                  <div
                    key={column.accessorKey}
                    className="flex gap-2 rounded-md bg-neutral-700 p-3"
                  >
                    <div className="w-40 flex justify-start items-center">
                      <label className="text-white">{column.header}</label>
                    </div>
                    <Select
                      value={columnMapping[column.accessorKey] ?? ""}
                      onChange={(e) =>
                        handleColumnMapping(e, column.accessorKey)
                      }
                      displayEmpty
                      fullWidth
                      variant="outlined"
                      sx={{ backgroundColor: "transparent" }}
                      required
                    >
                      <MenuItem value="select">Select Column</MenuItem>
                      {importedData?.header?.map((header, index) => (
                        <MenuItem key={index} value={index}>
                          {header}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                ))}
              </>
            ) : (
              <>
                {unmappedColumns.map((column) => (
                  <div
                    key={column.accessorKey}
                    className="flex gap-2 rounded-md bg-neutral-700 p-3"
                  >
                    <div className="w-40 flex justify-start items-center">
                      <label className="text-white">{column.header}</label>
                    </div>
                    <Select
                      value={columnMapping[column.accessorKey] ?? ""}
                      onChange={(e) =>
                        handleColumnMapping(e, column.accessorKey)
                      }
                      displayEmpty
                      fullWidth
                      variant="outlined"
                      sx={{ backgroundColor: "transparent" }}
                      required
                    >
                      <MenuItem value="select">Select Column</MenuItem>
                      {importedData?.header?.map((header, index) => (
                        <MenuItem key={index} value={index}>
                          {header}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                ))}
              </>
            )}
          </div>
        );
      case 2:
        return (
          <div className="w-full h-[30rem] p-3 border border-neutral-600 rounded-md">
            <CustomTable
              columns={importColumns}
              data={mappedData.slice(0, 5)}
              isPagination={false}
            />
          </div>
        );
      case 3:
        return (
          <div className="w-full h-[30rem] p-3 border border-neutral-600 rounded-md overflow-auto">
            <Tabs
              value={importSummaryTab}
              onChange={(e, newValue) => setImportSummaryTab(newValue)}
              variant="fullWidth"
            >
              <Tab
                label={`Added Records (${addedRecords.length})`}
                value="added"
              />
              <Tab
                label={`Updated Records (${updatedRecords.length})`}
                value="updated"
              />
              <Tab
                label={`Skipped Records (${skippedRecords.length})`}
                value="skipped"
              />
              <Tab
                label={`Record Errors (${recordErrors.length})`}
                value="errors"
              />
            </Tabs>
            {importSummaryTab === "added" && (
              <CustomTable
                columns={importColumns}
                data={addedRecords}
                isPagination={false}
              />
            )}
            {importSummaryTab === "updated" && (
              <CustomTable
                columns={importColumns}
                data={updatedRecords}
                isPagination={false}
              />
            )}
            {importSummaryTab === "skipped" && (
              <CustomTable
                columns={importColumns}
                data={skippedRecords}
                isPagination={false}
              />
            )}
            {importSummaryTab === "errors" && (
              <CustomTable
                columns={importColumns}
                data={recordErrors}
                isPagination={false}
              />
            )}
          </div>
        );
      default:
        return "Unknown step";
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div className="w-full flex flex-col gap-3 pb-3 justify-center items-center ">
      <div className="w-full flex flex-row justify-end items-center gap-3">
        <Button
          onClick={() => {
            setExportModal(true);
          }}
          variant="contained"
        >
          Import
        </Button>
      </div>
      <div className="w-full h-full flex flex-row justify-center items-center overflow-auto">
        <div className="h-full flex flex-col justify-between gap-3 border border-neutral-700 rounded-lg p-3">
          <Card
            title={"Supported Formats"}
            para={"XLS, XLSX & CSV File Formats."}
          />
          <Card
            title={"Important "}
            para={
              "Please ensure that your file size does not exceed 5 MB. In the case of XLS files, only MS Excel 97 - 2003 formats are supported. The first row in the given file will be considered as field names. Unexpected errors may occur if the XLS file contains any special controls like combo filters or images embedded in it. Duplicate Records if found will be handled during the import."
            }
          />
          <Card
            title={"Date Values (For CSV File Formats)"}
            para={
              "Date values should be in the same format as specified in the Company Details page under Display Settings. Other date formats will be ignored."
            }
          />
        </div>
      </div>
      <div>
        <CustomEmptyModal
          open={exportModal}
          onClose={() => {
            setExportModal(false);
          }}
          isScrollable={false}
        >
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {getStepContent(activeStep)}
            <div className="flex justify-between mt-3">
              <Button
                variant="contained"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={activeStep === steps.length - 1}
              >
                Next
              </Button>
            </div>
          </div>
        </CustomEmptyModal>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Dialog
        open={confirmDialogOpen}
        onClose={() => handleConfirmDialogClose(false)}
      >
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {confirmDialogAction === "reset"
              ? "Are you sure you want to reset all fields?"
              : "Are you sure you want to auto-map all fields?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleConfirmDialogClose(false)}>
            Cancel
          </Button>
          <Button onClick={() => handleConfirmDialogClose(true)}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
