import React, { useState } from "react";
import {
  Avatar,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { HiDotsHorizontal } from "react-icons/hi";
import { CiExport } from "react-icons/ci";
import { VscHistory } from "react-icons/vsc";
import CustomModal from "../../../../../components/CustomModal";
import CustomEmptyModal from "../../../../../components/CustomEmptyModal";

import Card from "./Card";

export default function KRA() {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const isMenuopen = Boolean(menuAnchor);

  const [addCompetencyModal, setAddCompetencyModal] = useState(false);
  const fields = [
    {
      type: "select",
      name: "user",
      label: "User",
      options: [
        { label: "User 1", value: "user_1" },
        { label: "User 2", value: "user_2" },
      ],
      custom: (formData, setFormData, field, index, handleChange) => {
        if (formData.user != 0) {
          return (
            <div>
              <TextField
                label={"Weightage"}
                name={"weightage"}
                placeholder={"Weightage"}
                value={formData.weightage || 0}
                onChange={(event) => {
                  const value = event.target.value;
                  const limit = 999;
                  if (
                    value === "" ||
                    (Number(value) <= limit && Number(value) >= 0)
                  ) {
                    setFormData((prev) => ({
                      ...prev,
                      weightage: value === "" ? "" : Number(value),
                    }));
                  }
                }}
                fullWidth
                margin="normal"
                type="number"
                inputProps={{
                  min: 0,
                  max: 999,
                }}
              />
            </div>
          );
        }
      },
    },
  ];

  const [exportKRAModal, setExportKRAModal] = useState(false);
  const [appraisalCompetencyModal, setAppraisalCompetencyModal] =
    useState(false);

  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedCompetency, setSelectedCompetency] = useState(null);
  const [exportFormData, setExportFormData] = useState({ format: "xls" });

  const kraData = Array.from({ length: 500 }, (_, index) => ({
    id: index + 1,
    title: "Hello World",
    description: "Hello World",
    weightage: index + 1,
  }));

  return (
    <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
      <div className="w-full flex flex-row gap-3 justify-end items-center">
        <div>
          <Button
            variant="contained"
            onClick={() => {
              setAddCompetencyModal(true);
            }}
          >
            Tag Competency
          </Button>
        </div>
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
            <MenuItem
              onClick={() => {
                setAppraisalCompetencyModal(true);
              }}
            >
              <div className="flex flex-row gap-3 justify-between items-center">
                <VscHistory className="text-2xl" />
                <h1>Appraisal KRA</h1>
              </div>
            </MenuItem>
          </Menu>
        </div>
      </div>
      <div
        style={{ height: "calc(100dvh - 420px)" }}
        className="w-full overflow-scroll"
      >
        {kraData.map(({ id, title, description, weightage }, index) => {
          return (
            <Card
              key={parseInt(index)}
              id={id}
              title={title}
              description={description}
              weightage={weightage}
              handleDelete={(id) => {
                setSelectedCompetency({ id, title, description, weightage });
                setDeleteModal(true);
              }}
            />
          );
        })}
      </div>

      <CustomModal
        fields={fields}
        open={addCompetencyModal}
        onClose={() => {
          setAddCompetencyModal(false);
        }}
        onSubmit={(formData, setFormData) => {
          console.log("Add Competency Data :- ", formData);
          setFormData({});
        }}
      />

      <CustomEmptyModal
        open={deleteModal}
        onClose={() => {
          setSelectedCompetency({});
          setDeleteModal(false);
        }}
        isSmall={true}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(selectedCompetency);
            setDeleteModal(false);
          }}
        >
          <div className="w-full flex flex-col gap-6 p-4 justify-center items-center">
            <div className="flex flex-col gap-3 justify-center items-center">
              <h1>Delete KRA</h1>
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
                  setDeleteModal(false);
                }}
              >
                Cancle
              </Button>
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
              Cancle
            </Button>
          </div>
        </div>
      </CustomEmptyModal>

      <CustomEmptyModal
        open={appraisalCompetencyModal}
        onClose={() => {
          setAppraisalCompetencyModal(false);
        }}
      >
        <div className="w-full flex flex-col gap-6 justify-center items-center">
          <div className="w-full">
            <h1>Appraisal KRA View</h1>
          </div>
          <div className="w-full flex justify-center items-center">
            <h1>No History found</h1>
          </div>
          <div className="w-full flex flex-row gap-6 justify-center items-center">
            <Button
              variant="outlined"
              onClick={() => {
                setAppraisalCompetencyModal(false);
              }}
            >
              Close
            </Button>
          </div>
        </div>
      </CustomEmptyModal>
    </div>
  );
}
