import React, { useCallback, useEffect, useMemo, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  DialogActions,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Pagination,
  Skeleton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import useQueryState from "../../hooks/useQueryState";
import { useMessage } from "../../components/Header";
import axios from "axios";
import { Select } from "../../components/Select";
import Search from "../../components/Search";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddLabels from "../../components/AddLabels";
import { Link } from "react-router-dom";
import CircularProgress from "../../hooks/useForm/components/CircularProgress";
import { Form, Submit, useForm } from "../../hooks/useForm/useForm";
import { Input } from "../../hooks/useForm/inputs";
import Matrics from "../../components/Matrics";
import noRecord from '../../assets/initalScreen/recievedApplication.svg'
const Applications = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [jobApplications, setJobApplications] = useState(null);

  console.log("rendering ReceivedApplication");

  const [filters, setFilters] = useQueryState({
    search: "",
    sortBy: "createdAt",
    interviewSent: "",
    interviewed: "",
    offerSent: "",
    offerSigned: "",
    agreementSent: "",
    agreementSigned: "",
    employed: "",
    terminated: "",
    searchBy: "fullName",
    direction: -1,
  });

  const [selectedApplication, setSelectedApplication] = useState({});
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [pageLimit, setPageLimit] = useState(0);
  const [labels, setLabels] = useState(null);

  // const [anchorEl, setAnchorEl] = React.useState(null);

  // const handleClick = (event) => {
  //     setAnchorEl(event.currentTarget);
  // };

  // const handleCloseChip = () => {
  //     setAnchorEl(null);
  // };

  // const openChip = Boolean(anchorEl);

  const { showSuccess, showError } = useMessage();
  // const navigate = useNavigate();

  const fetchJobsApplication = useCallback(async () => {
    setJobApplications(null);

    try {
      const response = await axios.get(
        `/hr/job-application?searchBy=${filters.searchBy}&search=${filters.search}&sortBy=${filters.sortBy}&direction=${filters.direction}&page=${pageNo}&interviewSent=${filters.interviewSent}&interviewed=${filters.interviewed}&offerSent=${filters.offerSent}&offerSigned=${filters.offerSigned}&agreementSent=${filters.agreementSent}&agreementSigned=${filters.agreementSigned}&employed=${filters.employed}&terminated=${filters.terminated}`
      );
      const jobLists = response.data.applications;
      setJobApplications(jobLists);
      setPageLimit(response.data.pageData.totalPages);
    } catch (e) {
      console.log(e);
    }
  }, [
    setJobApplications,
    pageNo,
    filters.searchBy,
    filters.search,
    filters.sortBy,
    filters.agreementSent,
    filters.agreementSigned,
    filters.employed,
    filters.interviewSent,
    filters.interviewed,
    filters.offerSent,
    filters.offerSigned,
    filters.direction,
    filters.terminated,
  ]);

  const handleDeleteClick = (application) => {
    setSelectedApplication(application);
    setConfirmDeleteDialogOpen(true);
  };

  const fetchLabel = useCallback(
    async function () {
      try {
        const response = await axios.get(`hr/lists/application_status`);
        const Labels = response.data.list.items;

        setLabels(Labels);
      } catch (e) {
        console.log(e);
      }
    },
    [setLabels]
  );

  const handleConfirmDelete = () => {
    setDeleteLoading(true);
    axios
      .delete(`/hr/job-application/${selectedApplication._id}`)
      .then(() => {
        showSuccess("Application deleted successfully");
        // Close the confirmation dialog
        setConfirmDeleteDialogOpen(false);
        setDeleteLoading(false);
        // Refresh the application list (you can call fetchJobsApplication again)
        fetchJobsApplication();
      })
      .catch((error) => {
        // Handle error (e.g., show an error message)
        console.error("Error deleting application:", error);

        showError(
          "Cannot delete the application as offerLetter is sent already"
        );
        // Close the confirmation dialog
        setDeleteLoading(false);
        setConfirmDeleteDialogOpen(false);
      });
  };

  const handleCancelDelete = () => {
    setSelectedApplication({});
    setConfirmDeleteDialogOpen(false);
    setDeleteLoading(false);
  };

  const selectFilters = (filterName) => {
    setFilters(filterName, filters[filterName] ? "" : "1");
  };

  const handleDelete = useCallback(
    async function (statusId, ApplicationId) {
      try {
        const res = await axios.delete(
          `hr/job-application/status/${ApplicationId}?status=${statusId}`
        );
        const { success, errors } = res.data;

        if (!success) return showError(errors);

        showSuccess("label Delete successfully");
        fetchJobsApplication();
      } catch (e) {
        console.log(e);
      }
    },
    [showSuccess, showError, fetchJobsApplication]
  );

  useEffect(() => {
    fetchLabel();
    fetchJobsApplication();
  }, [fetchJobsApplication, fetchLabel]);

  return (
    <>
      <Box mt={3}>
        <Grid container spacing={4} display="flex" alignItems="center">
          <Grid item xs>
            <Typography variant="h5">Received Applications</Typography>
          </Grid>
          <Grid item display="flex" alignItems="center">
            <Box>
              <Button onClick={handleOpen} variant="contained">
                Add Label
              </Button>
            </Box>
            <Box sx={{ ml: 2 }}>
              <Tooltip title="info" placement="top">
                <IconButton disableRipple variant="navIcon" sx={{ mr: 0 }}>
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box mt={3} mb={5}>
        <Matrics filters={filters} selectFilters={selectFilters} />
      </Box>

      <Grid
        container
        mb={3}
        mt={2}
        columnSpacing={1.5}
        minHeight="36px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item>
          <Select
            displayEmpty
            onChange={(e) => {
              setFilters("sortBy", e.target.value);
              setFilters("direction", 1);
            }}
            value={filters.sortBy === "createdAt" ? "" : filters.sortBy}
            filter={filters.sortBy === "createdAt" ? "" : filters.sortBy}
            clear={() => {
              setFilters("sortBy", "createdAt");
              setFilters("direction", -1);
            }}
            renderValue={(v) => {
              if (filters.sortBy === "createdAt") return "Sort";
              return v;
            }}
          >
            <MenuItem value="fullName">Name</MenuItem>
            <MenuItem value="jobTitle">Job Title</MenuItem>
          </Select>
        </Grid>

        <Grid item>
          <Search
            placeholder="sashank"
            onChange={(e) => {
              const value = e.target.value;
              !(value.trim() === " ") && setFilters("search", value);
            }}
          />
        </Grid>
      </Grid>
{ jobApplications && jobApplications?.length == 0 ?
      <div className="flex flex-col items-center justify-center  text-center">
      <div><img src={noRecord} alt="No Record" className="mb-1"
      style={{maxWidth:'70%' , margin:'auto'}}
      /></div>
      <div><h1 className="text-2xl font-bold mb-2" style={{fontSize:'36px'}}>No Job  list Available</h1></div>
      <div><p className='mb-[50px]'> You have not listed any availble job for application Click on add job now<br /> to start creating opportunites.</p></div>
  </div>
:
<Box>
<Grid container spacing={2} my={1.5}>
        {jobApplications ? (
          jobApplications?.map((jobApplication) => {
            const appliedDate = new Date(
              jobApplication.createdAt
            ).toLocaleDateString("en-IN");

            return (
              <Grid item xl={3} md={4} sm={6} xs={12}>
                <Card
                  // onClick={() =>
                  //     navigate(
                  //         `/jobApplicationDetail/${jobApplication._id}`
                  //     )
                  // }
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                    cursor: "pointer",
                    minHeight: "200px",
                    backgroundImage: "none",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      p: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Box
                        sx={{
                          borderLeftWidth: "5px",
                          borderLeftColor: "primary.main",
                          borderLeftStyle: "solid",
                          height: "40px",
                          width: "5px",
                          position: "absolute",

                          left: 1,
                        }}
                      ></Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          px: 1,
                          ml: 1,
                          py: 0.3,
                          backgroundColor: "#E3DBFA",
                          borderRadius: "12px",
                        }}
                      >
                        {appliedDate}
                      </Typography>
                      {jobApplication.status && (
                        <Chip
                          variant="outlined"
                          size="small"
                          label={jobApplication.status}
                          sx={{ ml: 1, my: 1 }}
                        />
                      )}
                    </Box>
                    <Box>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(jobApplication);
                        }}
                      >
                        <DeleteOutlineOutlinedIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      textTransform: "capitalize",
                      px: 2,
                    }}
                  >
                    <Typography
                      color="text.secondary"
                      sx={{
                        fontSize: "23px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",

                        maxWidth: "300px",
                      }}
                    >
                      {jobApplication.fullName}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      textTransform: "capitalize",
                      px: 2,
                      flexGrow: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",

                        maxWidth: "300px",
                        mb: 1,
                      }}
                    >
                      {jobApplication.jobTitle}
                    </Typography>

                    <Box sx={{ my: 1 }}>
                      {jobApplication.isInterviewDone ? (
                        <Chip
                          variant="outlined"
                          size="small"
                          label="Interviewed"
                          sx={{ mr: 1 }}
                        />
                      ) : (
                        jobApplication.step === 1 && (
                          <Chip
                            variant="outlined"
                            size="small"
                            label="Interview sent"
                            sx={{ mr: 1 }}
                          />
                        )
                      )}

                      {jobApplication.isOfferLetterSigned ? (
                        <Chip
                          variant="outlined"
                          size="small"
                          label="Offer Signed"
                          sx={{ mr: 1 }}
                        />
                      ) : (
                        jobApplication.step === 2 && (
                          <Chip
                            variant="outlined"
                            size="small"
                            label="Offer sent"
                            sx={{ mr: 1 }}
                          />
                        )
                      )}

                      {jobApplication.isAgreementSigned ? (
                        <Chip
                          variant="outlined"
                          size="small"
                          label="Agreements Signed"
                          sx={{ mr: 1, my: 1 }}
                        />
                      ) : (
                        jobApplication.step === 3 && (
                          <Chip
                            variant="outlined"
                            size="small"
                            label="Agreements sent"
                            sx={{ mr: 1, my: 1 }}
                          />
                        )
                      )}
                      {jobApplication.isEmployee && (
                        <Chip
                          variant="outlined"
                          size="small"
                          label="Employed"
                          sx={{ mr: 1, my: 1 }}
                        />
                      )}

                      {jobApplication.label &&
                        labels
                          ?.filter((label) =>
                            jobApplication.label.find(
                              (status) => status.status === label._id
                            )
                          )
                          .map((label) => (
                            // <Tooltip title='Click to see more'>
                            <Chip
                              variant="outlined"
                              size="small"
                              label={label.value}
                              onDelete={() =>
                                handleDelete(label._id, jobApplication._id)
                              }
                            />
                            // </Tooltip>
                          ))}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      px: 2,
                      mt: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: "background.box",
                    }}
                  >
                    <Box>
                      <AddLabels
                        labels={labels}
                        id={jobApplication._id}
                        fetchLabel={fetchLabel}
                        // status={status?.value}
                        fetchJobsApplication={fetchJobsApplication}
                      />
                    </Box>

                    <Box>
                      <Link to={`/jobApplicationDetail/${jobApplication._id}`}>
                        <Button
                          size="small"
                          variant="contained"
                          sx={{
                            borderRadius: "12px",
                          }}
                        >
                          Details
                        </Button>
                      </Link>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            );
          })
        ) : (
          <>
            {Array(12)
              .fill(0)
              .map((el, i) => (
                <Grid item xl={3} md={4} sm={6} xs={12} key={i}>
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    height="200px"
                    sx={{
                      borderRadius: "4px",
                    }}
                  />
                </Grid>
              ))}
          </>
        )}
      </Grid>
      <Pagination
        page={pageNo}
        onChange={(_, newPage) => setPageNo(newPage)}
        color="primary"
        count={pageLimit}
        sx={{ float: "right", my: 3 }}
      />
</Box>
    

      }
      <Modal
        open={confirmDeleteDialogOpen}
        onClose={handleCancelDelete}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Card sx={{ maxWidth: "600px", width: "100%", py: 2, px: 1 }}>
          <CardContent>
            {selectedApplication.step >= 1 ? (
              <Typography variant="subtitle01" fontWeight={500} mb={4}>
                You cannot delete this application as the Offer letter has
                already been sent to the applicant
              </Typography>
            ) : (
              <Typography variant="subtitle01" fontWeight={500} mb={4}>
                Are you sure you want to delete the application of{" "}
                {selectedApplication?.fullName || "this applicant"}?
              </Typography>
            )}
          </CardContent>

          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button
              onClick={handleCancelDelete}
              color="primary"
              style={{ color: "white" }}
            >
              {selectedApplication.step >= 1 ? "Close" : "Cancel"}
            </Button>
            {selectedApplication.step >= 1 ? null : (
              <Button
                variant="contained"
                onClick={handleConfirmDelete}
                disabled={deleteLoading}
                endIcon={
                  deleteLoading && (
                    <CircularProgress size="20px" sx={{ color: "inherit" }} />
                  )
                }
                style={{ backgroundColor: "#ff2121" }}
                autoFocus
              >
                Delete
              </Button>
            )}
          </CardActions>
        </Card>
      </Modal>

      <Modal open={open} onClose={handleClose}>
        <CreateLabel handleClose={handleClose} fetchLabel={fetchLabel} />
      </Modal>

      {/* <Popover
                open={openChip}
                anchorEl={anchorEl}
                onClose={handleCloseChip}
                sx={{ mt: 1 }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{ p: 2 }}>Listed By</Typography>
            </Popover> */}
    </>
  );
};

export default Applications;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CreateLabel = ({ handleClose, fetchLabel }) => {
  const handlers = useForm(
    useMemo(
      () => ({
        item: "",
      }),
      []
    ),
    { Input: TextField }
  );
  const { showSuccess, showError } = useMessage();
  const submit = (res) => {
    const { success, message } = res.data;

    if (!success) return showError(message);

    showSuccess("Add label successfully");
    fetchLabel();
    handleClose();
  };

  return (
    <Box sx={style}>
      <Form
        handlers={handlers}
        onSubmit={submit}
        action="/hr/lists"
        method={"post"}
        final={(values) => ({
          ...values,
          name: "application_status",
        })}
        onError={console.log}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Create a new Label
        </Typography>
        <Box>
          <Input
            name="item"
            variant="standard"
            label="Add Label"
            autocomplete="off"
            fullWidth
          />
        </Box>
        <DialogActions sx={{ mt: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Submit>
            {(loader) => (
              <Button
                type="submit"
                variant="contained"
                disabled={loader}
                endIcon={loader}
              >
                Create
              </Button>
            )}
          </Submit>
        </DialogActions>
      </Form>
    </Box>
  );
};
