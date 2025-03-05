import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import { HiDotsHorizontal } from "react-icons/hi";
import { LiaTrashAlt } from "react-icons/lia";
import { MdUpgrade } from "react-icons/md";
import { MaterialReactTable } from "material-react-table";
import CustomEmptyModal from "../../../../../components/CustomEmptyModal";
import RenderNestedTable from "./RenderNestedTable";
import Card from "./Card";
import { camelCaseToNormalString } from "../../../../../utilities/text";
import { CiExport } from "react-icons/ci";

export default function SkillSet() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [totalRows, setTotalRows] = useState(0);
  const [sorting, setSorting] = useState([{ id: "id", desc: false }]);
  const [rowSelection, setRowSelection] = useState({});

  const demoData = [
    {
      id: 1,
      level: "Level 1",
      name: "Skill 1",
      weightage: "10%",
      addAndUpdatedOn: "2023-10-01",
      levels: [
        {
          id: 1,
          level: "Nested Level 1",
          supportDocument: "Doc 1",
          reason: "Reason 1",
          weightage: "5%",
          addAndUpdatedOn: "2023-10-01",
        },
        {
          id: 1,
          level: "Nested Level 2",
          supportDocument: "Doc 2",
          reason: "Reason 2",
          weightage: "5%",
          addAndUpdatedOn: "2023-10-02",
        },
      ],
    },
    {
      id: 2,
      level: "Level 2",
      name: "Skill 2",
      weightage: "20%",
      addAndUpdatedOn: "2023-10-02",
      levels: [
        {
          id: 1,
          level: "Nested Level 1",
          supportDocument: "Doc 3",
          reason: "Reason 3",
          weightage: "10%",
          addAndUpdatedOn: "2023-10-03",
        },
        {
          id: 1,
          level: "Nested Level 2",
          supportDocument: "Doc 4",
          reason: "Reason 4",
          weightage: "10%",
          addAndUpdatedOn: "2023-10-04",
        },
      ],
    },
  ];
  useEffect(() => {
    setData(demoData);
    setTotalRows(demoData.length);
  }, []);
  const columns = [
    {
      accessorKey: "id",
      header: "Score",
      enableSorting: true,
    },
    {
      accessorKey: "name",
      header: "Name",
      enableSorting: true,
    },
    { accessorKey: "weightage", header: "Weightage", enableSorting: true },
    {
      accessorKey: "addAndUpdatedOn",
      header: "Add/Updated on",
      enableSorting: true,
    },
    {
      accessorKey: "actions",
      header: "Actions",
      enableSorting: false,
    },
  ];
  const renderActions = (row) => (
    <div className="flex flex-row gap-2">
      <IconButton>
        <MdUpgrade />
      </IconButton>
      <IconButton>
        <LiaTrashAlt />
      </IconButton>
    </div>
  );
  const renderDetailPanel = ({ row }) => {
    return (
      <div>
        <RenderNestedTable data={row.original.levels} />
      </div>
    );
  };
  const updatedColumns = useMemo(() => {
    return columns.map((col) => {
      if (col.accessorKey === "actions") {
        return {
          ...col,
          Cell: ({ row }) => renderActions(row),
        };
      }
      return col;
    });
  }, [columns, renderActions]);

  const [addTagSkillSet, setAddTagSkillSet] = useState(false);
  const [addTagSkillSetFormData, setAddTagSkillSetFormData] = useState({
    domain: "allDomain",
  });

  const domains = {
    otherDomain: [
      {
        id: 1,
        level: 1,
        name: "Other Domain 1",
        isNameChecked: true,
      },
      {
        id: 2,
        level: 1,
        name: "Other Domain 2",
        isNameChecked: true,
      },
    ],
    xyzDomain: [
      {
        id: 3,
        level: 1,
        name: "XYZ Domain 1",
        isNameChecked: true,
      },
      {
        id: 4,
        level: 1,
        name: "XYZ Domain 2",
        isNameChecked: true,
      },
    ],
    abcDomain: [
      {
        id: 5,
        level: 1,
        name: "ABC Domain 1",
        isNameChecked: true,
      },
      {
        id: 6,
        level: 1,
        name: "ABC Domain 2",
        isNameChecked: true,
      },
    ],
  };
  const filteredDomains = useMemo(() => {
    if (addTagSkillSetFormData.domain === "allDomain") {
      return Object.entries(domains).flatMap(([domainKey, domainItems]) => [
        { isHeading: true, domain: domainKey },
        ...domainItems,
      ]);
    } else {
      return domains[addTagSkillSetFormData.domain] || [];
    }
  }, [addTagSkillSetFormData.domain]);

  const [exportSkillSetModal, setExportSkillSetModal] = useState(false);
  const [exportFormData, setExportFormData] = useState({ format: "xls" });

  const [menuAnchor, setMenuAnchor] = useState(null);
  const isMenuopen = Boolean(menuAnchor);

  return (
    <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
      <div className="w-full flex flex-row gap-3 justify-between items-center">
        <div className="flex flex-row gap-3 justify-center items-center text-nowrap">
          <div>
            <h1>Low Potential :</h1>
          </div>
          <div className="w-40 bg-gray-200 rounded-full h-1">
            <div
              className="bg-neutral-700 h-1 rounded-full"
              style={{ width: `${30}%` }}
            />
          </div>
          <div>
            <h1>30%</h1>
          </div>
        </div>
        <div className="flex flex-row gap-3 justify-center items-center">
          <div>
            <Button
              onClick={() => {
                setAddTagSkillSet(true);
              }}
              variant="contained"
            >
              Tag Skill Set
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
                  setExportSkillSetModal(true);
                }}
              >
                <div className="flex flex-row gap-3 justify-between items-center">
                  <CiExport className="text-2xl" />
                  <h1>Export Skill Set</h1>
                </div>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
      <div className="w-full h-[60dvh]">
        <MaterialReactTable
          columns={updatedColumns}
          data={data}
          manualPagination
          manualSorting
          rowCount={totalRows}
          onPaginationChange={setPagination}
          onSortingChange={setSorting}
          state={{
            pagination,
            sorting,
            rowSelection: rowSelection,
          }}
          enableSortingRemoval={false}
          enableColumnFilters
          enableColumnFilterModes={false}
          enableGlobalFilter={false}
          enableColumnActions={true}
          enableDensityToggle={false}
          enableFullScreenToggle={true}
          enableHiding={true}
          enableStickyHeader
          enableColumnResizing
          renderDetailPanel={renderDetailPanel}
        />
      </div>

      <CustomEmptyModal
        open={addTagSkillSet}
        onClose={() => {
          setAddTagSkillSet(false);
        }}
        isScrollable={true}
      >
        <form onSubmit={() => {}}>
          <div className="w-full flex flex-col gap-6 justify-center items-center">
            <div className="w-full text-xl">
              <h1>Tag Skill</h1>
            </div>
            <div className="w-full">
              <FormControl fullWidth>
                <InputLabel>Domain</InputLabel>
                <Select
                  value={addTagSkillSetFormData.domain}
                  label="Domain"
                  onChange={(event) => {
                    setAddTagSkillSetFormData((prev) => ({
                      ...prev,
                      domain: event.target.value,
                    }));
                  }}
                >
                  <MenuItem value={"allDomain"}>All Domain</MenuItem>
                  <MenuItem value={"otherDomain"}>Other Domain</MenuItem>
                  <MenuItem value={"xyzDomain"}>XYZ Domain</MenuItem>
                  <MenuItem value={"abcDomain"}>ABC Domain</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="w-full">
              {filteredDomains.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {filteredDomains.map((item, index) =>
                    item.isHeading ? (
                      <div key={index} className="text-lg font-bold mt-4">
                        {camelCaseToNormalString(item.domain)}
                      </div>
                    ) : (
                      <Card
                        key={index}
                        id={item.id}
                        level={item.level}
                        name={item.name}
                        checked={item.isNameChecked}
                      />
                    )
                  )}
                </div>
              ) : (
                <div>No domains found</div>
              )}
            </div>
            <div className="w-full flex flex-row justify-between items-center">
              <Button type="submit" variant="contained">
                Submit
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setAddTagSkillSet(false);
                }}
              >
                Cancle
              </Button>
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
              Cancle
            </Button>
          </div>
        </div>
      </CustomEmptyModal>
    </div>
  );
}
