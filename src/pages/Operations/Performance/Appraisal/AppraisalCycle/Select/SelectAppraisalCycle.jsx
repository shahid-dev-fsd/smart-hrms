import React, { useState } from "react";
import CustomEmptyModal from "../../../../../../components/CustomEmptyModal";

import Card from "./Card";

export default function SelectAppraisalCycle({ open, onClose, onSubmit }) {
  const [
    yearlyAppraisalWithHikeDetailsModal,
    setYearlyAppraisalWithHikeDetailsModal,
  ] = useState(false);
  const [
    yearlyAppraisalWithSelfAndMultiRaterModal,
    setYearlyAppraisalWithSelfAndMultiRaterModal,
  ] = useState(false);
  const [
    yearlyAppraisalWithSelfAndReviewModal,
    setYearlyAppraisalWithSelfAndReviewModal,
  ] = useState(false);

  const yearlyAppraisalWithHikeDetailsData = {
    review_parameters: {
      self_appraisal: ["Goals", "KRA"],
      manager_review: ["Goals", "KRA", "Review Questions"],
    },
    reviewer: ["1 level(s) of Reporting To"],
    ratings: ["Stars", "One decimal in score"],
    hike: {
      hike_appraiser: ["Reporting Manager"],
      others: ["Hike Approval is disabled"],
    },
  };
  const yearlyAppraisalWithSelfAndMultiRaterDetailsData = {
    review_parameters: {
      self_appraisal: ["Goals", "KRA"],
      multi_rater: ["KRA", "Review Questions"],
      manager_review: ["Goals", "KRA", "Review Questions"],
    },
    reviewer: ["1 level(s) of Reporting To"],
    ratings: ["Stars", "One decimal in score"],
  };
  const yearlyAppraisalWithSelfAndReviewDetailsData = {
    review_parameters: {
      self_appraisal: ["Goals", "KRA"],
      manager_review: ["Goals", "KRA", "Review Questions"],
    },
    reviewer: ["1 level(s) of Reporting To"],
    ratings: ["Stars", "One decimal in score"],
  };

  const renderModalContent = (data) => {
    const renderSection = (title, content) => {
      if (!content) return null;

      const formattedTitle = title
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      return (
        <div className="w-full flex flex-col gap-3">
          <h2 className="text-lg font-semibold">{formattedTitle}</h2>
          <ul className="list-disc pl-6">
            {Array.isArray(content) ? (
              content.map((item, index) => <li key={index}>{item}</li>)
            ) : typeof content === "object" ? (
              Object.entries(content).map(([key, value]) => (
                <li key={key}>
                  <strong>
                    {key
                      .split("_")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </strong>{" "}
                  -{" "}
                  {Array.isArray(value)
                    ? value.join(", ")
                    : JSON.stringify(value)}
                </li>
              ))
            ) : (
              <li>{content}</li>
            )}
          </ul>
        </div>
      );
    };

    return (
      <div className="w-full flex flex-col gap-6 justify-center items-center">
        <div className="w-full text-xl">
          <h1>{data.title}</h1>
        </div>
        {Object.entries(data).map(([key, value]) => {
          if (key === "title") return null;

          return renderSection(key.replace(/_/g, " "), value);
        })}
      </div>
    );
  };

  return (
    <div>
      <CustomEmptyModal open={open} onClose={onClose} isScrollable={true}>
        <div className="w-full h-full flex flex-col gap-3">
          <div className="w-full flex flex-col gap-6 justify-center items-center">
            <div className="w-full text-xl">
              <h1>Select Template</h1>
            </div>
          </div>
          <div className="flex flex-col gap-3 border border-neutral-700 rounded-lg p-3 bg-orange-300 bg-opacity-5">
            <h1 className="text-orange-400">Select appraisal template</h1>
            <h1>
              Choose a suitable template for the appraisal you are going to
              setup
            </h1>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 justify-between items-center">
            <Card
              type={"create"}
              title={"Create New Appraisal Cycle"}
              content={
                "Create an appraisal process that is tailored to your organization's unique needs without pre-existing templates"
              }
              handleCreate={() => {}}
            />
            <Card
              type={"select"}
              title={"Yearly Appraisal with Hike"}
              plane={[
                { title: "Self Appraisal", isAvailable: true },
                { title: "Manager Review", isAvailable: false },
              ]}
              handleView={() => {
                setYearlyAppraisalWithHikeDetailsModal(true);
              }}
            />
            <Card
              type={"select"}
              title={"Yearly Appraisal with Self and Multi-Rater"}
              plane={[
                { title: "Self Appraisal", isAvailable: true },
                { title: "Multi-Rater", isAvailable: true },
                { title: "Manager Review", isAvailable: false },
              ]}
              handleView={() => {
                setYearlyAppraisalWithSelfAndMultiRaterModal(true);
              }}
            />
            <Card
              type={"select"}
              title={"Yearly Appraisal with Self and Review"}
              plane={[
                { title: "Self Appraisal", isAvailable: true },
                { title: "Multi-Rater", isAvailable: true },
                { title: "Manager Review", isAvailable: false },
              ]}
              handleView={() => {
                setYearlyAppraisalWithSelfAndReviewModal(true);
              }}
            />
          </div>
        </div>
      </CustomEmptyModal>

      <CustomEmptyModal
        open={yearlyAppraisalWithHikeDetailsModal}
        onClose={() => {
          setYearlyAppraisalWithHikeDetailsModal(false);
        }}
        isSmall={true}
      >
        {renderModalContent({
          ...yearlyAppraisalWithHikeDetailsData,
          title: "Yearly Appraisal With Hike",
        })}
      </CustomEmptyModal>

      <CustomEmptyModal
        open={yearlyAppraisalWithSelfAndMultiRaterModal}
        onClose={() => {
          setYearlyAppraisalWithSelfAndMultiRaterModal(false);
        }}
        isSmall={true}
      >
        {renderModalContent({
          ...yearlyAppraisalWithSelfAndMultiRaterDetailsData,
          title: "Yearly Appraisal with Self and Multi-Rater",
        })}
      </CustomEmptyModal>

      <CustomEmptyModal
        open={yearlyAppraisalWithSelfAndReviewModal}
        onClose={() => {
          setYearlyAppraisalWithSelfAndReviewModal(false);
        }}
        isSmall={true}
      >
        {renderModalContent({
          ...yearlyAppraisalWithSelfAndReviewDetailsData,
          title: "Yearly Appraisal with Self and Review",
        })}
      </CustomEmptyModal>
    </div>
  );
}
