import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import CustomEmptyModal from "../../../../../components/CustomEmptyModal";

export default function Competency() {
  const [exportCompetencyModal, setExportCompetencyModal] = useState(false);
  const [exportEmployeeWiseCompetencyModal, setExportEmployeeWiseCompetencyModal] =
    useState(false);
  const [exportCompetencyFormData, setExportCompetencyFormData] = useState({ format: "xls" });
  const [exportCompetencyEmployeeWiseFormData, setExportCompetencyEmployeeWiseFormData] =
    useState({ format: "xls" });

  return (
    <div className="w-full min-h-[30rem] flex flex-row gap-6 justify-center items-center ">
      <div className="flex flex-col p-3 gap-3 justify-center items-center border border-neutral-700 rounded-lg">
        <h1>Competency details</h1>
        <h1>All Competency data will be exported and available to download</h1>
        <Button
          className="w-fit"
          onClick={() => {
            setExportCompetencyModal(true);
          }}
          variant="outlined"
        >
          Export
        </Button>
      </div>
      <div className="flex flex-col p-3 gap-3 justify-center items-center border border-neutral-700 rounded-lg">
        <h1>Employee-wise Competency details</h1>
        <h1>
          Employee name with their Competency will be exported and available to
          download
        </h1>
        <Button
          className="w-fit"
          onClick={() => {
            setExportCompetencyModal(true);
          }}
          variant="outlined"
        >
          Export
        </Button>
      </div>

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
                  defaultValue={exportCompetencyFormData.format}
                  onChange={(event) => {
                    setExportCompetencyFormData({
                      ...exportCompetencyFormData,
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
                console.log(exportCompetencyFormData);
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
              Cancle
            </Button>
          </div>
        </div>
      </CustomEmptyModal>

      <CustomEmptyModal
        open={exportEmployeeWiseCompetencyModal}
        onClose={() => {
          setExportEmployeeWiseCompetencyModal(false);
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
                  defaultValue={exportCompetencyEmployeeWiseFormData.format}
                  onChange={(event) => {
                    setExportCompetencyEmployeeWiseFormData({
                      ...exportCompetencyEmployeeWiseFormData,
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
                console.log(setExportCompetencyEmployeeWiseFormData);
                setExportEmployeeWiseCompetencyModal(false);
              }}
              variant="contained"
            >
              Export
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setExportEmployeeWiseCompetencyModal(false);
              }}
            >
              Cancle
            </Button>
          </div>
        </div>
      </CustomEmptyModal>
    </div>
  );
}
