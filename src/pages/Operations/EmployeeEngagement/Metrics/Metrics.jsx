import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CustomModal from "../../../../components/CustomModal";
import Card from "./Card";

export default function Metrics() {
  const [selectedMetric, setSelectedMetric] = useState({});

  const [addMetricModal, setAddMetricModal] = useState(false);
  const addMetricFields = [
    {
      type: "text",
      name: "metricName",
      label: "Metric name",
      defaultValue: "",
      required: true,
    },
    {
      type: "switch",
      title: "Make Metric Active",
      name: "isActive",
      label: "Activation",
      defaultValue: true,
    },
  ];

  const [editMetricModal, setEditMetricModal] = useState(false);
  const editMetricFields = [
    {
      type: "text",
      name: "metricName",
      label: "Metric name",
      defaultValue: selectedMetric.title || "",
      required: true,
    },
    {
      type: "switch",
      title: "Make Metric Active",
      name: "isActive",
      label: "Activation",
      defaultValue: selectedMetric.isActive || false,
    },
  ];

  const [deleteMetricDialog, setDeleteMetricDialog] = useState(false);

  const [metricsData, setMetricsData] = useState({
    default: Array.from({ length: 5 }, (_, index) => ({
      id: index + 1,
      title: `Default ${index + 1}`,
      isActive: true,
    })),
    custom: Array.from({ length: 5 }, (_, index) => ({
      id: index + 1,
      title: `Custom ${index + 1}`,
      isActive: false,
    })),
  });
  const handleEditMetric = (formData) => {
    setMetricsData((prevMetricsData) => {
      const updatedCustomMetrics = prevMetricsData.custom.map((metric) =>
        metric.id === selectedMetric.id
          ? {
              ...metric,
              title: formData.metricName,
              isActive: formData.isActive,
            }
          : metric
      );
      return { ...prevMetricsData, custom: updatedCustomMetrics };
    });
    setSelectedMetric({});
    setEditMetricModal(false);
  };

  return (
    <div className="w-full flex flex-col gap-3 pb-3 justify-center items-center ">
      <div className="w-full flex flex-row justify-end items-center gap-3">
        <Button
          onClick={() => {
            setAddMetricModal(true);
          }}
          variant="contained"
        >
          Add Metrics
        </Button>
      </div>
      <div className="w-full h-full flex flex-col gap-3">
        <div className="w-full h-full flex flex-col gap-3">
          <h1>Default</h1>
          <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {metricsData.default && metricsData.default.length != 0 && (
              <>
                {metricsData.default.map(({ id, title, isActive }, index) => {
                  return (
                    <Card
                      type="default"
                      key={index}
                      id={id}
                      title={title}
                      isActive={isActive}
                      handleActive={() => {}}
                      handleEdit={() => {}}
                      handleDelete={() => {}}
                    />
                  );
                })}
              </>
            )}
          </div>
        </div>
        <div className="w-full h-full flex flex-col gap-3">
          <h1>Custom</h1>
          <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {metricsData.custom && metricsData.custom.length != 0 && (
              <>
                {metricsData.custom.map(({ id, title, isActive }, index) => {
                  return (
                    <Card
                      type="custom"
                      key={index}
                      id={id}
                      title={title}
                      isActive={isActive}
                      handleActive={() => {}}
                      handleEdit={(data) => {
                        setSelectedMetric(data);
                        setEditMetricModal(true);
                      }}
                      handleDelete={(data) => {
                        setSelectedMetric(data);
                        setDeleteMetricDialog(true);
                      }}
                    />
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>

      <CustomModal
        title={"Add Metric"}
        fields={addMetricFields}
        open={addMetricModal}
        onClose={() => {
          setAddMetricModal(false);
        }}
        onSubmit={(formData, setFormData) => {
          console.log("Add Metric Form Data  :- ", formData);
        }}
      />
      <CustomModal
        title={"Edit Metric"}
        fields={editMetricFields}
        open={editMetricModal}
        onClose={() => {
          setSelectedMetric({});
          setEditMetricModal(false);
        }}
        onSubmit={handleEditMetric}
      />

      <Dialog
        open={deleteMetricDialog}
        onClose={() => setDeleteMetricDialog(false)}
      >
        <DialogTitle>Delete Metric {selectedMetric?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the metric
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => setDeleteMetricDialog(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setMetricsData((prevMetricsData) => ({
                ...prevMetricsData,
                custom: prevMetricsData.custom.filter(
                  (metric) => metric.id !== selectedMetric.id
                ),
              }));
              setDeleteMetricDialog(false);
            }}
            color="error"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
