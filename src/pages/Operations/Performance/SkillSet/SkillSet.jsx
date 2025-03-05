import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import CustomEmptyModal from "../../../../components/CustomEmptyModal";
import CustomModal from "../../../../components/CustomModal";
import Card from "./Card";
import { camelCaseToNormalString } from "../../../../utilities/text";
import CustomTable from "../../../../components/CustomTable";
import axios from "axios";
import { IoFilter } from "react-icons/io5";

export default function SkillSet() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [totalRows, setTotalRows] = useState(0);
  const [sorting, setSorting] = useState([{ id: "id", desc: false }]);
  const [rowSelection, setRowSelection] = useState({});

  const fetchData = async (pageIndex, pageSize, sorting) => {
    const sortField = sorting[0]?.id || "id";
    const sortDirection = sorting[0]?.desc ? "desc" : "asc";

    const response = await axios.get(`https://reqres.in/api/users`, {
      params: {
        page: pageIndex + 1,
        per_page: pageSize,
        sort: sortField,
        direction: sortDirection,
      },
    });
    setData(response.data.data);
    setTotalRows(response.data.total);
  };
  useEffect(() => {
    fetchData(pagination.pageIndex, pagination.pageSize, sorting);
  }, [pagination.pageIndex, pagination.pageSize, sorting]);
  const columns = [
    { accessorKey: "id", header: "Employee ID", enableSorting: false },
    { accessorKey: "skill", header: "Skill", enableSorting: false },
    { accessorKey: "level", header: "Level", enableSorting: false },
    { accessorKey: "weightage", header: "Weightage", enableSorting: false },
  ];
  const renderRowSelection = (table) => {
    return (
      <div>
        {Object.keys(rowSelection).length > 0 && (
          <Button variant="contained" color="error" onClick={() => {}}>
            Delete
          </Button>
        )}
      </div>
    );
  };

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

  const [filterModal, setFilterModal] = useState(false);
  const filterFields = [
    {
      type: "multipleSelect",
      name: "employees",
      label: "Employees",
      options: [
        {
          label: "Employee 1",
          value: "employee_1",
        },
        {
          label: "Employee 2",
          value: "employee_2",
        },
      ],
    },
    {
      type: "select",
      name: "from",
      label: "From",
      options: [
        {
          label: "0",
          value: "0",
        },
        {
          label: "1",
          value: "1",
        },
      ],
    },
    {
      type: "select",
      name: "to",
      label: "To",
      options: [
        {
          label: "0",
          value: "0",
        },
        {
          label: "1",
          value: "1",
        },
      ],
    },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
      <div className="w-full flex flex-row gap-3 justify-end items-center">
        <Button
          onClick={() => {
            setAddTagSkillSet(true);
          }}
          variant="contained"
        >
          Tag Skill Set
        </Button>
        <IconButton onClick={() => setFilterModal(true)}>
          <IoFilter />
        </IconButton>
      </div>

      <div className="w-full min-h-[30rem]">
        <CustomTable
          columns={columns}
          renderRowSelection={renderRowSelection}
          data={data}
          loading={loading}
          error={error}
          sorting={sorting}
          setSorting={setSorting}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
          pagination={pagination}
          setPagination={setPagination}
          totalRows={totalRows}
          setTotalRows={setTotalRows}
          isBulkSelect={true}
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
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </CustomEmptyModal>

      <CustomModal
        fields={filterFields}
        open={filterModal}
        onClose={() => {
          setFilterModal(false);
        }}
        onSubmit={(formData, setFormData) => {
          console.log("Filter Form Data :- ", formData);
        }}
      />
    </div>
  );
}
