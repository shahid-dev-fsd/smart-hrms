import React, { useEffect, useState } from "react";
import { Button, Tab, Tabs } from "@mui/material";
import Pending from "./Pending";
import HighPriority from "./HighPriority";
import Completed from "./Completed";
import Overdue from "./Overdue";
import AllTasks from "./AllTasks";
import FormView from "./FormView";
import dayjs from "dayjs";
import CustomModal from "../../../components/CustomModal";
import axios from "axios";

export default function Task() {
  const [switchScreen, setSwitchScreen] = useState({
    primary: "pending",
  });
  const primaryTabs = [
    {
      label: "Pending",
      value: "pending",
    },
    {
      label: "High Priority",
      value: "highPriority",
    },
    {
      label: "Completed",
      value: "completed",
    },
    {
      label: "Overdue",
      value: "overdue",
    },
    {
      label: "All Tasks",
      value: "allTasks",
    },
    {
      label: "Form View",
      value: "formView",
    },
  ];

  const [statusAndPriority, setStatusAndPriority] = useState({
    status: [],
    priority: [],
  });
  const fetchStatusAndPriority = async () => {
    const allStatus = await axios.get(`/hr/status-list`, {
      params: {
        isPagination: false,
      },
    });
    const allPriority = await axios.get(`/hr/priority-list`, {
      params: {
        isPagination: false,
      },
    });
    const restructuredStatus =
      allStatus?.data?.docs.map((status) => ({
        label: status.name,
        value: status._id,
      })) || [];
    const restructuredPriority =
      allPriority?.data?.docs.map((priority) => ({
        label: priority.name,
        value: priority._id,
      })) || [];

    setStatusAndPriority({
      status:
        restructuredStatus.length > 0
          ? restructuredStatus
          : [{ label: "Select", value: "select" }],
      priority:
        restructuredPriority.length > 0
          ? restructuredPriority
          : [{ label: "Select", value: "select" }],
    });
  };
  useEffect(() => {
    fetchStatusAndPriority();
  }, []);

  useEffect(() => {
    console.log(statusAndPriority);
  }, [statusAndPriority]);

  const [addTaskModal, setAddTaskModal] = useState(false);
  const addTaskModalFields = [
    {
      type: "autocomplete",
      name: "ownerId",
      label: "Task Owner",
      options: [
        { label: "Task Owner 1", value: "675001532eb4b02bfda8100c" },
        { label: "Task Owner 2", value: "675001532eb4b02bfda8100c" },
      ],
      defaultValue: "675001532eb4b02bfda8100c",
    },
    {
      type: "text",
      label: "Task Name",
      name: "name",
      defaultValue: "Hello",
    },
    {
      type: "textarea",
      label: "Description",
      name: "description",
      defaultValue: "Hello",
    },
    {
      type: "datePicker",
      label: "Start Date",
      name: "startDate",
      defaultValue: dayjs("2023-10-01"),
    },
    {
      type: "datePicker",
      label: "Due Date",
      name: "dueDate",
      defaultValue: dayjs("2023-10-01"),
    },
    {
      type: "dateTimePicker",
      label: "Reminder",
      name: "reminderDateTime",
      defaultValue: dayjs("2023-10-01"),
    },
    {
      type: "select",
      name: "priorityId",
      label: "Priority",
      options: statusAndPriority.priority,
      defaultValue: statusAndPriority.priority[0]?.value,
    },
    {
      type: "select",
      name: "statusId",
      label: "Status",
      options: statusAndPriority.status,
      defaultValue: statusAndPriority.status[0]?.value,
    },
  ];
  const handleAddTaskFormSubmit = async (data) => {
    const formattedData = {
      ...data,
      startDate: dayjs(data.startDate).format("MM/DD/YYYY"),
      endDate: dayjs(data.endDate).format("MM/DD/YYYY"),
      dueDate: dayjs(data.dueDate).format("MM/DD/YYYY"),
    };
    try {
      const response = await axios.post(`/hr/task`, formattedData);
      if (response.success === true) {
        
      }
    } catch (error) {}
    console.log("Add Form :- ", formattedData);
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex flex-row justify-between items-center">
        <Tabs
          value={switchScreen.primary}
          onChange={(event, newValue) => {
            setSwitchScreen({ ...switchScreen, primary: newValue });
          }}
        >
          {primaryTabs.map((tab, index) => (
            <Tab key={index} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
        <Button
          variant="contained"
          onClick={() => {
            setAddTaskModal(true);
          }}
        >
          Add Task
        </Button>
      </div>
      {switchScreen.primary === "pending" ? (
        <>
          <Pending />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "highPriority" ? (
        <>
          <HighPriority />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "completed" ? (
        <>
          <Completed />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "overdue" ? (
        <>
          <Overdue />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "allTasks" ? (
        <>
          <AllTasks />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "formView" ? (
        <>
          <FormView />
        </>
      ) : (
        <></>
      )}

      <CustomModal
        title="Add Task"
        fields={addTaskModalFields}
        open={addTaskModal}
        onClose={() => {
          setAddTaskModal(false);
        }}
        onSubmit={handleAddTaskFormSubmit}
        isScrollable={true}
        isCustomSubmitButtom={true}
        customSubmitButton={
          <div className="w-full flex flex-row justify-between items-center">
            <Button variant="contained" type="submit">
              Submit
            </Button>
            <Button variant="contained">Submit And New</Button>
            <Button
              variant="outlined"
              onClick={() => {
                setAddTaskModal(false);
              }}
            >
              Cancle
            </Button>
          </div>
        }
      />
    </div>
  );
}
