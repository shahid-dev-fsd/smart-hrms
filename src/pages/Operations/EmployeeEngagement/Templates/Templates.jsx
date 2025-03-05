import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import CustomEmptyModal from "../../../../components/CustomEmptyModal";
import Card from "./Card";
import ViewTemplate from "./ViewTemplate";
import AddTemplate from "./AddTemplate";

export default function Templates() {
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [selectedTemplateModal, setSelectedTemplateModal] = useState(false);
  const [addTemplateModal, setAddTemplateModal] = useState(true);

  const [templatesData, setTemplatesData] = useState({
    default: Array.from({ length: 5 }, (_, index) => ({
      id: index + 1,
      title: `Default Question ${index + 1}`,
      questions: [
        {
          type: "single",
          id: index + 1,
          question: "Question " + (index + 1),
          options: [
            { id: 1, title: "Option 1" },
            { id: 2, title: "Option 2" },
            { id: 3, title: "Option 3" },
          ],
          metric: { metricID: index + 1, metricName: "Metric " + (index + 1) },
        },
        {
          type: "multiple",
          id: index + 1,
          question: "Question " + (index + 1),
          options: [
            { id: 1, title: "Option 1" },
            { id: 2, title: "Option 2" },
            { id: 3, title: "Option 3" },
          ],
          metric: { metricID: index + 1, metricName: "Metric " + (index + 1) },
        },
        {
          type: "comment",
          id: index + 1,
          question: "Question " + (index + 1),
          metric: { metricID: index + 1, metricName: "Metric " + (index + 1) },
        },
        {
          type: "date",
          id: index + 1,
          question: "Question " + (index + 1),
          metric: { metricID: index + 1, metricName: "Metric " + (index + 1) },
        },
        {
          type: "nps",
          id: index + 1,
          question: "Question " + (index + 1),
          metric: { metricID: index + 1, metricName: "Metric " + (index + 1) },
          minscore_text: "Not at all likely",
          maxscore_text: "Extremely likely",
        },
        {
          type: "star",
          id: index + 1,
          question: "Question " + (index + 1),
          metric: { metricID: index + 1, metricName: "Metric " + (index + 1) },
          max_count: 5,
        },
        {
          type: "ratingScale",
          id: index + 1,
          question: "Question " + (index + 1),
          metric: { metricID: index + 1, metricName: "Metric " + (index + 1) },
          max_count: 5,
          scale_type: "custom",
          scale_view: "button",
          icon_type: "emoji",
          customLabels: [
            { label: "Very Bad" },
            { label: "Bad" },
            { label: "Neutral" },
            { label: "Good" },
            { label: "Very Good" },
          ],
          advance: {
            enable_comment: false,
            comment_mandatory: false,
            score_is: null,
            equal_to: null,
            is_mandatory: false,
          },
        },
      ],
      backgroundImage:
        "https://www.freevector.com/uploads/vector/preview/83035/vecteezybackground-line_and_wave-background_no_text-HS1022_generated.jpg",
    })),
    custom: Array.from({ length: 5 }, (_, index) => ({
      id: index + 1,
      title: `Custom Question ${index + 1}`,
      questions: [
        {
          type: "single",
          id: index + 1,
          question: "Question " + (index + 1),
          options: [
            { id: 1, title: "Option 1" },
            { id: 2, title: "Option 2" },
            { id: 3, title: "Option 3" },
          ],
          metric: { metricID: index + 1, metricName: "Metric " + (index + 1) },
        },
        {
          type: "multiple",
          id: index + 1,
          question: "Question " + (index + 1),
          options: [
            { id: 1, title: "Option 1" },
            { id: 2, title: "Option 2" },
            { id: 3, title: "Option 3" },
          ],
          metric: { metricID: index + 1, metricName: "Metric " + (index + 1) },
        },
        {
          type: "comment",
          id: index + 1,
          question: "Question " + (index + 1),
          metric: { metricID: index + 1, metricName: "Metric " + (index + 1) },
        },
        {
          type: "date",
          id: index + 1,
          question: "Question " + (index + 1),
          metric: { metricID: index + 1, metricName: "Metric " + (index + 1) },
        },
        {
          type: "nps",
          id: index + 1,
          question: "Question " + (index + 1),
          metric: { metricID: index + 1, metricName: "Metric " + (index + 1) },
          minscore_text: "Not at all likely",
          maxscore_text: "Extremely likely",
        },
        {
          type: "star",
          id: index + 1,
          question: "Question " + (index + 1),
          metric: { metricID: index + 1, metricName: "Metric " + (index + 1) },
          max_count: 5,
        },
        {
          type: "ratingScale",
          id: index + 1,
          question: "Question " + (index + 1),
          metric: { metricID: index + 1, metricName: "Metric " + (index + 1) },
          max_count: 7,
          scale_view: "button",
          scale_type: "agreement_scale",
        },
      ],
      backgroundImage:
        "https://www.freevector.com/uploads/vector/preview/83035/vecteezybackground-line_and_wave-background_no_text-HS1022_generated.jpg",
    })),
  });

  return (
    <div className="w-full flex flex-col gap-3 pb-3 justify-center items-center">
      <div className="w-full flex flex-row justify-end items-center gap-3">
        <Button
          onClick={() => {
            setAddTemplateModal(true);
          }}
          variant="contained"
        >
          Add Template
        </Button>
      </div>
      <div className="w-full h-[40rem] flex flex-col gap-3 overflow-auto">
        <div className="w-full flex flex-col gap-3">
          <h1>Default Template</h1>
          <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {templatesData.default && templatesData.default?.length != 0 && (
              <>
                {templatesData.default.map((template, index) => (
                  <Card
                    key={index}
                    type="default"
                    data={template}
                    handleSelect={(data) => {
                      setSelectedTemplate(data);
                      setSelectedTemplateModal(true);
                    }}
                    handleEdit={(data) => {
                      setSelectedTemplate(data);
                    }}
                    handleDelete={(data) => {
                      setSelectedTemplate(data);
                    }}
                  />
                ))}
              </>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col gap-3">
          <h1>Custom Template</h1>
          <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {templatesData.custom && templatesData.custom?.length != 0 && (
              <>
                {templatesData.custom.map((template, index) => (
                  <Card
                    key={index}
                    type="custom"
                    data={template}
                    handleSelect={(data) => {
                      setSelectedTemplate(data);
                      setSelectedTemplateModal(true);
                    }}
                    handleEdit={(data) => {
                      setSelectedTemplate(data);
                    }}
                    handleDelete={(data) => {
                      setSelectedTemplate(data);
                    }}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      <ViewTemplate
        selectedTemplate={selectedTemplate}
        open={selectedTemplateModal}
        onClose={() => {
          setSelectedTemplate({});
          setSelectedTemplateModal(false);
        }}
      />

      <AddTemplate
        open={addTemplateModal}
        onClose={() => {
          setAddTemplateModal(false);
        }}
      />
    </div>
  );
}
