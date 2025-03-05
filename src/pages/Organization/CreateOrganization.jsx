import React, { useState } from "react";
import {
  Box,
  Tab,
  TabList,
  TabContext,
  TabPanel,
  Card,
  CardContent,
  Typography,
  Button,
  Input,
  TextField,
  Snackbar,
  Alert,
  AlertTitle,
  Modal,
  Dialog,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./organization.css";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Close } from "@mui/icons-material";
import createOrg from "../../assets/createOrganization image.png"
import {  useMediaQuery, useTheme } from '@mui/material';

// Tabs Section
const CreateOrganization = () => {
  const [organizationName, setOrganizationName] = useState(""); // Start with the second tab active
  const [email, setEmail] = useState(""); // Start with the second tab active
  const [website, setWebsite] = useState(""); // Start with the second tab active
  const [picture, setPicture] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState({
    show: true,
    message: "",
    severity: "",
  });
  const [page, setPage] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOrganizationChange = (event) => {
    setOrganizationName(event.target.value);
  };

  const handelSubmit = async () => {
    // setShowMessage({
    //   show: true,
    //   message: "organization Created Successfully",
    //   severity: "success",
    // });
    // setTimeout(()=>{
    //   navigate("/listOrganization");
    // },[2500])
    let subscriptionId = localStorage.getItem("subscriptionId");

    //if (subscriptionId) {
      try {
        const formData = new FormData();
        formData.append("photo", picture); // Ensure 'photo' matches backend field name
        formData.append("name", organizationName); // Ensure 'resume' matches backend field name
        formData.append("subscription", subscriptionId);
        formData.append("email", email);
        formData.append("website", website);
        const response = await axios.post(`/hr/organization`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        let data = response.data;
        console.log(data)
        

        if (data.success) {
          setShowMessage({
            show: true,
            message: "organization Created Successfully",
            severity: "success",
          });
          setTimeout(() => {
            navigate("/listOrganization");
          }, [2500]);
        }
      } catch (e) {
        console.log("organization method created:", e);
        setShowMessage({
          show: true,
          message: e.response.data.error,
          severity: "error",
        });
      }
  //  } else {
  //     navigate("/listOrganization");
  //   } 
  };

  const handlePhotoChange = (e) => {
    const { files } = e.target;
    if (!files || files.length === 0) {
      // toast.error('No file selected');
      setShowMessage({
        show: true,
        message: "No file selected",
        severity: "error",
      });
      return;
    }

    const file = files[0];
    const isValidExtension = ["PNG", "JPEG", "JPG", "AVIF", "WEBP"].some(
      (ext) => new RegExp(`(${ext})$`, "i").test(file.name)
    );

    if (!isValidExtension) {
      setShowMessage({
        show: true,
        message:
          "Please provide a valid photo file format (PNG, JPEG, JPG, AVIF, WEBP).",
        severity: "error",
      });
      // toast.warn('Please provide a valid photo file format (PNG, JPEG, JPG, AVIF, WEBP).');
      return;
    }

    setShowMessage({
      show: true,
      message: "Photo update successfully",
      severity: "success",
    });
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
    // toast.success("Photo update successfully");
    setPicture(file);
  };

  const handleClose = (event) => {
    setShowMessage({ show: false, message: " ", severity: "" });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateWebsite = (website) => {
    const urlRegex =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    return urlRegex.test(website);
  };

  const handleEmailChange = () => {
    if (!validateEmail(email)) {
      setShowMessage({
        show: true,
        message: "Invalid email address",
        severity: "error",
      });
    }
  };

  const handleWebsiteChange = (e) => {
    if (!validateWebsite(website)) {
      setShowMessage({
        show: true,
        message: "Invalid URL",
        severity: "error",
      });
      return;
    }
  };

  const isFormValidate =
    organizationName == "" ||
    !validateEmail(email) ||
    !validateWebsite(website) ||
    picture == "";

  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.main",
          p: { xs: 3, sm: 8 },
          width: "100vw",
          minHeight: "100vh",
        }}
      >
        <Snackbar
          open={showMessage.show}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <Alert
            severity={showMessage.severity}
            variant="filled"
            sx={{ width: "100%" }}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <AlertTitle> {showMessage.severity}</AlertTitle>
            {showMessage.message}
          </Alert>
        </Snackbar>
        <Box
          sx={{
            marginTop: { xs: "3rem", sm: "0" },
            textAlign: { xs: "center", sm: "start" },
          }}
        >
          <Typography sx={{ fontSize: { xs: "1.6rem", sm: "2.2rem" } }}>
            Create an Organization to track the status of your employees
          </Typography>

          <Typography
            className=" text-neutral-500"
            sx={{
              marginTop: ".7rem",
              paddingX: { xs: 2, sm: 0 },
              marginRight: { xs: 0, sm: 36 },
              fontSize: { xs: "0.7rem", sm: "1rem" },
            }}
          >
            HR organization refers to the style of coordination, communication and management, a team or an employee uses through out his/her contract with the organization.
          </Typography>
          <div className="flex justify-center items-center">
            <img
              className={`origin-center  ${isMobile? "h-[30vh] md:w-[15%] mt-[15%] mb-[11%]":"h-[40vh] md:w-[20%] mb-20% mt-[5%] mb-[4%] "} `}
              src={createOrg}
              alt="walkover1"
            />
          </div>
          <div>
            <TextField
              name="question"
              size="small"
              value={organizationName}
              variant="outlined"
              onChange={handleOrganizationChange}
              placeholder="Organization Name"
              fullWidth
            />
          </div>
          <div className="flex justify-end ">
            <Button
              className="ml-auto"
              variant="contained"
              onClick={() => {
                setPage(1);
              }}
              sx={{ px: 5, py: 1 }}
              disabled={organizationName?.length === 0}
            >
              Next
            </Button>
          </div>
        </Box>
      </Box>
      <Dialog open={page == 1} onClose={() => setPage(0)} fullWidth>
        <DialogTitle className="flex justify-end">
          <Close onClick={() => setPage(0)} />
        </DialogTitle>
        <div className="w-full flex flex-col gap-8 p-8">
          <div>
            <div className="w-[13%] pb-3 flex items-center">
              <p className="text-[20px] whitespace-nowrap">
                Organization Email
              </p>
            </div>
            <TextField
              name="question"
              size="small"
              value={email}
              variant="outlined"
              onBlur={handleEmailChange}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              fullWidth
            />{" "}
          </div>
          <div>
            <div className="w-[13%] pb-3 flex items-center">
              <p className="text-[20px] whitespace-nowrap">
                Organization Website url
              </p>
            </div>
            <TextField
              name="question"
              size="small"
              value={website}
              variant="outlined"
              onBlur={handleWebsiteChange}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder=" Enter website url"
              fullWidth
            />
          </div>
          <div>
            <div className="w-[13%] pb-3 flex items-center">
              <p className="text-[20px] whitespace-nowrap">
                {" "}
                Organization Logo
              </p>
            </div>

            <div className="mb-4 flex flex-row">
              {/* <input
                type="file"
                className="rounded px-6 py-3 mr-2"
                accept="*"
                required
                onChange={handlePhotoChange}
              /> */}

              <div className="image-input-wrapper">
                <input
                  type="file"
                  accept="*"
                  required
                  onChange={handlePhotoChange}
                  className="image-input"
                />
                {image ? (
                  <img src={image} alt="Selected" className="image-preview" />
                ) : (
                  <div className="plus-icon">
                    <AddOutlinedIcon />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end pb-5">
            <Button
              className=" ml-auto"
              variant="contained"
              disabled={isFormValidate}
              onClick={handelSubmit}
              sx={{ px: 5, py: 1 }}
            >
              Create
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CreateOrganization;
