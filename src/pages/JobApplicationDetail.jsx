import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Download } from "@mui/icons-material";
import { env } from "../utilities/function";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import view from "./ReceivedApp/viewicon.png";
import profile from "./ReceivedApp/profile.png";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Modal from "@mui/material/Modal";
import { useMessage } from "../components/Header";
import useModal from "../hooks/useModal";
import { FetchImage, ServerImage } from "../components/Images";
import useLoader from "../hooks/useLoader";
import SendInterview from "../components/SendInterview";
import ViewOfferLetter from "../components/ViewOfferLetter";
import Agreements from "./Agreements";
import ViewAgreements from "../components/ViewAgreements";
import AddEmployeeByOffer from "../components/addEmployeeByOffer";

const JobApplicationDetail = () => {
  const id = useParams().id;
  const [jobApplication, setJobApplication] = useState({});
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const { showError, showSuccess } = useMessage();
  const { loaderState, start, end, circular } = useLoader();
  const {
    modalState: resetState,
    closeModal: closeReset,
    openModal: openReset,
  } = useModal();
  const {
    modalState: viewOfferLetter,
    closeModal: closeOfferLetter,
    openModal: openOfferLetter,
  } = useModal();

  const {
    modalState: addEmployeeState,
    closeModal: closeAddEmployee,
    openModal: openAddEmployee,
  } = useModal();

  const {
    modalState: sendAgreement,
    closeModal: closeAgreement,
    openModal: openAgreement,
  } = useModal();

  const {
    modalState: viewAgreement,
    closeModal: closeViewAgreement,
    openModal: openViewAgreement,
  } = useModal();
  const {
    modalState: sendInterviewState,
    closeModal: closeSendInterview,
    openModal: openSendInterview,
  } = useModal();

  const fetchJobApplication = useCallback(
    async function () {
      setLoading(true);
      try {
        const response = await axios.get(`/hr/job-application/${id}`);
        const jobDetail = response.data.application;
        console.log("jobDetail", jobDetail)
        jobDetail.isOfferLetterSend = response.data.isOfferLetterSend;
        jobDetail.isInterviewCompleted = response.data.isInterviewCompleted;
        jobDetail.interviewScore = response.data.interviewScore;
        jobDetail.interviewTimeTaken = response.data.interviewTimeTaken;
        jobDetail.isAgreementSigned = response.data.isAgreementSigned;
        jobDetail.isOfferLetterSigned = response.data.isOfferLetterSigned;
        jobDetail.candidateSign = response.data.candidateSign;
        jobDetail.isEmployee = response.data.isEmployee;
        setJobApplication(jobDetail);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    },
    [id]
  );

  const resetApplication = useCallback(
    async function () {
      setResetLoading(true);
      try {
        const response = await axios.patch(`/hr/job-application/reset/${id}`);

        const { success, errors } = response.data;
        if (!success) return showError(errors);
        showSuccess("Application reset!");
        fetchJobApplication();
      } catch (e) {
        console.log(e);
      } finally {
        closeReset();
        setResetLoading(false);
      }
    },
    [fetchJobApplication, id, showError, showSuccess, closeReset]
  );

  async function downloadResume() {
    try {
      showSuccess("File is being downloaded");
      const res = await axios.get(
        `${env("SERVER")}/download/${jobApplication.resume}`,
        {
          responseType: "blob", // important
        }
      );

      const blob = new Blob([res.data]);

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", jobApplication.resume); //or any other extension
      document.body.appendChild(link);
      link.click();
      showSuccess("File is downloaded successfully");
    } catch (e) {
      if (e.response && e.response.status === 404)
        return showError("File not found");
      console.log(e);
    } finally {
    }
  }

  useEffect(() => {
    fetchJobApplication();
  }, [fetchJobApplication]);

  const linkedinAccount = jobApplication.linkedinAccount;
  const fsize = { xs: "8px", md: "14px" };
  return (
    <div >
      <div className="container mx-auto overscroll-auto overflow-hidden px-5 md:px-8 pb-10 md:pb-0">
        <div className="flex items-center justify-between p-4">
          <div>
            <h1 className="text-sm md:text-3xl text-zinc-400">
              Job Application Details
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {!loading ? (
              <>
                {jobApplication.step === 0 &&
                  jobApplication.status === "Pending" ? (
                  <Grid item>
                    <Button
                      sx={{ fontSize: fsize }}
                      LinkComponent={Link}
                      onClick={openSendInterview}
                      variant="contained"
                      className="text-white font-bold  md:text-[14px] py-1 md:py-2 px-2 md:px-4 rounded bg-sky-500 hover:bg-sky-700"
                    >
                      Schedule Interview
                    </Button>
                  </Grid>
                ) : null}
                {jobApplication.step === 1 && (
                  <Grid item>
                    <Button
                      sx={{ fontSize: fsize }}
                      className="text-white font-bold text-[8px] md:text-[14px] py-1 md:py-2 px-2 md:px-4 rounded bg-sky-500 hover:bg-sky-700"
                      LinkComponent={Link}
                      to={`/jobApplicationDetail/offer-letter/${jobApplication._id}`}
                      disabled={!jobApplication.isInterviewCompleted}
                      variant="contained"
                    >
                      Send Offer Letter
                    </Button>
                  </Grid>
                )}
                {jobApplication.step === 2 && (
                  <Grid item>
                    <Button
                      sx={{ fontSize: fsize }}
                      className="text-white font-bold text-[8px] md:text-[14px] py-1 md:py-2 px-2 md:px-4 rounded bg-sky-500 hover:bg-sky-700"
                      variant="contained"
                      disabled={!jobApplication.isOfferLetterSigned}
                      onClick={openAgreement}
                    >
                      Send Agreements
                    </Button>
                  </Grid>
                )}
                {jobApplication.step === 3 && !jobApplication.isEmployee && (
                  <Grid item>
                    <Button
                      sx={{ fontSize: fsize }}
                      className="text-white font-bold text-[8px] md:text-[14px] py-1 md:py-2 px-2 md:px-4 rounded bg-sky-500 hover:bg-sky-700"
                      disabled={!jobApplication.isAgreementSigned}
                      variant="contained"
                      onClick={openAddEmployee}
                    >
                      Add Employee
                    </Button>{" "}
                  </Grid>
                )}
                {jobApplication.isEmployee && (
                  <Grid item>
                    <Button
                      sx={{ fontSize: fsize }}
                      className="text-white font-bold text-[8px] md:text-[14px] py-1 md:py-2 px-2 md:px-4 rounded bg-sky-500 hover:bg-sky-700"
                      variant="contained"
                      LinkComponent={Link}
                      to={`/performance/${jobApplication.userId}`}
                    >
                      View Employee
                    </Button>{" "}
                  </Grid>
                )}
              </>
            ) : null}
            <InfoOutlinedIcon />
          </div>
        </div>
        <div className="flex flex-col md:flex-row p-4 items-start justify-start">
          <div className="w-full md:w-1/3 flex flex-col gap-2 p-4">

            <div className="flex justify-start md:justify-start">
              {jobApplication && jobApplication.photo ? (
                <Box maxWidth='130px'>
                  <FetchImage name={jobApplication.photo} />
                </Box>
                // <Box maxWidth='130px'>
                //   <ServerImage src={jobApplication.photo ?? ""}    alt="Profile"  className=" w-[50%] md:w-full max-w-[200px] h-[50%]"  />
                // </Box>
              ) : (
                <CircularProgress />
              )}

            </div>
            <div className="w-full">
              <h1 className="text-blue-500 text-xs md:text-[22px]">
                {jobApplication.fullName}
              </h1>
              <p className="text-[10px] md:text-[16px]">
                {jobApplication.jobTitle}
              </p>
              {jobApplication.step !== 4 &&
                <Button
                  sx={{ fontSize: fsize, mt: 2 }}
                  className="text-white font-bold text-[8px] md:text-[14px] py-1 md:py-2 px-2 md:px-4 rounded bg-sky-500 hover:bg-sky-700"
                  variant="contained"
                  onClick={openReset}>
                  Reset Application
                </Button>
              }
              {" "}
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-2 w-full md:w-2/3">
            <div className="w-full flex flex-row items-center justify-start gap-10">
              {" "}
              <div className="w-1/2">
                <h1 className="text-neutral-500 text-[12px] md:text-[20px]">
                  Full Name:
                </h1>
              </div>
              <div className="w-1/2">
                <p className="text-[12px] md:text-[20px]">
                  {" "}
                  {jobApplication.fullName}
                </p>
              </div>
            </div>

            <div className="w-full flex flex-row items-center justify-start gap-10">
              <div className="w-1/2">
                <h1 className="text-neutral-500 text-[12px] md:text-[20px]">
                  Resume:
                </h1>
              </div>
              <div className="w-1/2">
                <button
                  onClick={downloadResume}
                  className="flex items-center text-blue-500 font-semibold text-[8px] md:text-[10px] py-1 md:py-1 px-2 md:px-3 border border-blue-500 rounded hover:bg-blue-100"
                >
                  <SaveAltIcon className="w-2 h-2 md:w-4 md:h-4 mr-2" />
                  Download
                </button>
              </div>
            </div>
            <div className="flex flex-row items-center justify-start gap-10">
              <div className="w-1/2">
                <h1 className="text-neutral-500 text-[12px] md:text-[20px]">
                  Job Title:
                </h1>
              </div>
              <div className="w-1/2">
                <p className="text-[12px] md:text-[20px]">
                  {" "}
                  {jobApplication.jobTitle}
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-start gap-10">
              <div className="w-1/2">
                <h1 className="text-neutral-500 text-[12px] md:text-[20px]">
                  Years of Experience:
                </h1>
              </div>
              <div className="w-1/2">
                <Button
                  className="text-neutral-500 p-0 m-0"
                  LinkComponent={Link}
                  sx={{ minWidth: "12px" }}
                  to={`/receivedapplications?experience=${jobApplication.experience}`}
                  disabled={!jobApplication.experience}
                >
                  <p className="text-[12px] md:text-[20px]">
                    {" "}
                    {jobApplication.experience}
                  </p>
                </Button>

              </div>
            </div>
            <div className="w-full flex flex-row items-center justify-start gap-10">
              <div className="w-1/2">
                <h1 className="text-neutral-500 text-[12px] md:text-[20px]">
                  Email:
                </h1>
              </div>
              <div className="w-1/2">
                <p className="text-[10px] md:text-[20px]">
                  {jobApplication.email}
                </p>
              </div>
            </div>

            <div className="flex flex-row items-center justify-start gap-10">
              <div className="w-1/2">
                <h1 className="text-neutral-500 text-[12px] md:text-[20px]">
                  Phone:
                </h1>
              </div>
              <div className="w-1/2">
                <p className="text-[12px] md:text-[20px]">
                  {" "}
                  {jobApplication.countryCode} <a href={`tel: ${jobApplication.phone}`}>{jobApplication.phone}</a> 
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-start gap-10">
              <div className="w-1/2">
                <h1 className="text-neutral-500 text-[12px] md:text-[20px]">
                  LinkedIn Account:
                </h1>
              </div>
              <div className="w-1/2">
                <Link to={linkedinAccount} target="_blank">
                  <button
                    disabled={!jobApplication.linkedinAccount}
                    className="flex  items-center text-white font-bold text-[10px] md:text-[12px] py-1 md:py-1 px-2 md:px-3 rounded bg-sky-500 hover:bg-sky-700"
                  >
                    <LinkedInIcon
                      fontSize="small"
                      className="text-white mr-2"
                    />
                    LinkedIn Profile
                  </button>
                </Link>
              </div>
            </div>

            <div className="flex flex-row items-center justify-start gap-10">
              <div className="w-1/2">
                <h1 className="text-neutral-500 text-[12px] md:text-[20px]">
                  Offer Letter:
                </h1>
              </div>
              <div className="w-1/2">
                <button
                  onClick={openOfferLetter}
                  disabled={!jobApplication.isOfferLetterSigned}
                  className="flex items-center text-blue-500 font-semibold text-[9px] md:text-[10px] py-1 md:py-2 px-2 md:px-4 border border-blue-500 rounded hover:bg-blue-100"
                >
                  <img src={view} alt="view" className="w-4 h-4 mr-2" />
                  View
                </button>
              </div>
            </div>
            <div className="flex flex-row items-center justify-start gap-10">
              <div className="w-1/2">
                <h1 className="text-neutral-500 text-[12px] md:text-[20px]">
                  Agreements:
                </h1>
              </div>
              <div className="w-1/2">
                <button
                  onClick={openViewAgreement}
                  disabled={!jobApplication.isAgreementSigned}
                  className="flex items-center text-blue-500 font-semibold text-[9px] md:text-[10px] py-1 md:py-2 px-2 md:px-4 border border-blue-500 rounded hover:bg-blue-100"
                >
                  <img src={view} alt="view" className="w-4 h-4 mr-2" />
                  View
                </button>
              </div>
            </div>
            <div className="flex flex-row items-center justify-start gap-10">
              <div className="w-1/2">
                <h1 className="text-neutral-500 text-[12px] md:text-[20px]">
                  Applied at:
                </h1>
              </div>
              <div className="w-1/2">
                <p className="text-[12px] md:text-[20px]">
                  {" "}
                  {new Date(jobApplication.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-start gap-10">
              <div className="w-1/2">
                <h1 className="text-neutral-500 text-[12px] md:text-[20px]">
                  Candidate Sign:
                </h1>
              </div>
              <div className="w-1/2">
                <p className="text-[12px] md:text-[20px]">
                  {" "}
                  {jobApplication.candidateSign
                    ? jobApplication.candidateSign.sign
                    : "Not Done"}{" "}
                  {jobApplication.candidateSign &&
                    new Date(jobApplication.candidateSign.time).toLocaleString(
                      "en-IN"
                    )}
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-start gap-10">
              <div className="w-1/2">
                <h1 className="text-neutral-500 text-[12px] md:text-[20px]">
                  Interview Score:
                </h1>
              </div>
              <div className="w-1/2">
                <p className="text-blue-500 text-[12px] md:text-[20px]">
                  {" "}
                  {jobApplication.interviewScore}%
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-start gap-10">
              <div className="w-1/2">
                <h1 className="text-neutral-500 text-[12px] md:text-[20px]">
                  Interview Time:
                </h1>
              </div>
              <div className="w-1/2">
                <p className="text-blue-500 text-[12px] md:text-[20px]">
                  {" "}
                  {jobApplication.interviewTimeTaken}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={addEmployeeState}
        onClose={closeAddEmployee}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <>
          <AddEmployeeByOffer
            closeModal={closeAddEmployee}
            userId={jobApplication.userId}
            jobId={jobApplication._id}
            refetch={fetchJobApplication}
          />
        </>
      </Modal>
      <Modal
        open={sendInterviewState}
        onClose={closeSendInterview}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <>
          <SendInterview
            oid={jobApplication?._id}
            jobId={jobApplication.jobId}
            closeModal={closeSendInterview}
            userId={jobApplication.userId}
            refresh={fetchJobApplication}
          />
        </>
      </Modal>

      <Modal
        open={resetState}
        onClose={closeReset}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" mb={4}>
            Do you really want to reset this application ?
          </Typography>
          <Box sx={{ float: "right" }}>
            <Button variant="outlined" onClick={closeReset} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={resetApplication}
              disabled={resetLoading}
              endIcon={
                resetLoading && (
                  <CircularProgress
                    color="inherit"
                    sx={{
                      width: "20px !important",
                      height: "20px !important",
                    }}
                  />
                )
              }
            >
              Reset
            </Button>
          </Box>
        </Card>
      </Modal>
      {/* offer letter */}
      <Modal
        open={viewOfferLetter}
        onClose={closeOfferLetter}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px",
            borderRadius: "8px",
            maxWidth: "1200px",
            width: "100%",
            px: 4,
            py: 3,
            mx: 2,
            maxHeight: "85vh",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <ViewOfferLetter applicationId={jobApplication._id} />
        </Card>
      </Modal>

      {/* Agreement */}
      <Modal open={sendAgreement} onClose={closeAgreement}>
        <Agreements
          closeModal={closeAgreement}
          jobApplicationId={jobApplication._id}
          jobId={jobApplication.jobId}
          refetch={fetchJobApplication}
        />
      </Modal>
      {/* View Agreement */}
      <Modal
        open={viewAgreement}
        onClose={closeViewAgreement}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <ViewAgreements
          closeModal={closeViewAgreement}
          agreements={jobApplication.agreements}
        />
      </Modal>
    </div>
  );
};

export default JobApplicationDetail;
