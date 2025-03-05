import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import CustomEmptyModal from "../../../../../components/CustomEmptyModal";

export default function SkillSet() {
  const [exportSkillSetModal, setExportSkillSetModal] = useState(false);
  const [exportEmployeeWiseSkillSetModal, setExportEmployeeWiseSkillSetModal] =
    useState(false);
  const [exportSkillSetFormData, setExportSkillSetFormData] = useState({
    format: "xls",
  });
  const [
    exportSkillSetEmployeeWiseFormData,
    setExportSkillSetEmployeeWiseFormData,
  ] = useState({ format: "xls" });

  return (
    <div className="w-full min-h-[30rem] flex flex-row gap-6 justify-center items-center">
      <div className="flex flex-col p-3 gap-3 justify-center items-center border border-neutral-700 rounded-lg">
        <h1>Skill Set details</h1>
        <h1>All Skill Set data will be exported and available to download</h1>
        <Button
          className="w-fit"
          onClick={() => {
            setExportSkillSetModal(true);
          }}
          variant="outlined"
        >
          Export
        </Button>
      </div>
      <div className="flex flex-col p-3 gap-3 justify-center items-center border border-neutral-700 rounded-lg">
        <h1>Employee-wise Skill Set details</h1>
        <h1>
          Employee name with their Skill Set will be exported and available to
          download
        </h1>
        <Button
          className="w-fit"
          onClick={() => {
            setExportSkillSetModal(true);
          }}
          variant="outlined"
        >
          Export
        </Button>
      </div>

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
                  defaultValue={exportSkillSetFormData.format}
                  onChange={(event) => {
                    setExportSkillSetFormData({
                      ...exportSkillSetFormData,
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
                console.log(exportSkillSetFormData);
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
              Cancle
            </Button>
          </div>
        </div>
      </CustomEmptyModal>

      <CustomEmptyModal
        open={exportEmployeeWiseSkillSetModal}
        onClose={() => {
          setExportEmployeeWiseSkillSetModal(false);
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
                  defaultValue={exportSkillSetEmployeeWiseFormData.format}
                  onChange={(event) => {
                    setExportSkillSetEmployeeWiseFormData({
                      ...exportSkillSetEmployeeWiseFormData,
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
                console.log(setExportSkillSetEmployeeWiseFormData);
                setExportEmployeeWiseSkillSetModal(false);
              }}
              variant="contained"
            >
              Export
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setExportEmployeeWiseSkillSetModal(false);
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
