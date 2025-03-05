import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import CustomEmptyModal from "../../../../../components/CustomEmptyModal";

export default function KRA() {
  const [exportKRAModal, setExportKRAModal] = useState(false);
  const [exportEmployeeWiseKRAModal, setExportEmployeeWiseKRAModal] =
    useState(false);
  const [exportKRAFormData, setExportKRAFormData] = useState({ format: "xls" });
  const [exportKRAEmployeeWiseFormData, setExportKRAEmployeeWiseFormData] =
    useState({ format: "xls" });

  return (
    <div className="w-full min-h-[30rem] flex flex-row gap-6 justify-center items-center ">
      <div className="flex flex-col p-3 gap-3 justify-center items-center border border-neutral-700 rounded-lg">
        <h1>KRA details</h1>
        <h1>All KRA data will be exported and available to download</h1>
        <Button
          className="w-fit"
          onClick={() => {
            setExportKRAModal(true);
          }}
          variant="outlined"
        >
          Export
        </Button>
      </div>
      <div className="flex flex-col p-3 gap-3 justify-center items-center border border-neutral-700 rounded-lg">
        <h1>Employee-wise KRA details</h1>
        <h1>
          Employee name with their KRA will be exported and available to
          download
        </h1>
        <Button
          className="w-fit"
          onClick={() => {
            setExportKRAModal(true);
          }}
          variant="outlined"
        >
          Export
        </Button>
      </div>

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
                  defaultValue={exportKRAFormData.format}
                  onChange={(event) => {
                    setExportKRAFormData({
                      ...exportKRAFormData,
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
                console.log(exportKRAFormData);
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
              Cancle
            </Button>
          </div>
        </div>
      </CustomEmptyModal>

      <CustomEmptyModal
        open={exportEmployeeWiseKRAModal}
        onClose={() => {
          setExportEmployeeWiseKRAModal(false);
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
                  defaultValue={exportKRAEmployeeWiseFormData.format}
                  onChange={(event) => {
                    setExportKRAEmployeeWiseFormData({
                      ...exportKRAEmployeeWiseFormData,
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
                console.log(setExportKRAEmployeeWiseFormData);
                setExportEmployeeWiseKRAModal(false);
              }}
              variant="contained"
            >
              Export
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setExportEmployeeWiseKRAModal(false);
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
