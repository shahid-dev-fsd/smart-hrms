import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/Authorize";
// import TaskAltIcon from '@mui/icons-material/CheckCircleOutline';
let ClikklePlan = [
  "All features in Current Plan",
  "Access to all Clikkle Products",
  "Customizable Reports and Analytics",
  "Real Time Notifications and Alerts",
  "Document Management System",
  "Mobile App Access",
  "Automated Payroll Processing",
  "Employee Self-Service Portal",
  "AI Powered Candidate Matching",
  "Integrated Video Interviewing",
  "Project Management Tools",
];

let CurrentPlan = [
  "Full HR platform",
  "Recruiting / ATS",
  "Time off Management",
  "HR Analytics",
  "Time and Attendance Tracking",
  "Performance Management",
  "New Hire Onboarding",
  "Job Offers",
  "Surveys and Training",
  "24/7 Customer Support",
];

const CardSection = () => {
  // const classes = useStyles();
  // const { SnackBar, showMessage } = useSnack();
  const platformUser = useUser();
  const [plan, setPlan] = useState("Private"); // Initialize with a default plan
  const [alignment, setAlignment] = useState("mo"); //  an , mon
  const [name, setName] = useState("");
  const [zip, setZip] = useState(0);
  // const [planData, setPlanData] = useState({ amount: 49, period: "mon" });
  const [showMessage, setShowMessage] = useState({
    show: true,
    message: "",
    severity: "",
  });
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // setShowMessage({
    //   show: true,
    //   message: "Subscribe Successfully",
    //   severity: "success",
    // });
    // setTimeout(() => {
    //   navigate("/createOrganization");
    // }, [4000]);
    event.preventDefault();
    // showMessage(`Offer letter successfully send to ${handlers.values.nameOfEmployee}`);
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: name,
        address: {
          postal_code: zip,
        },
      },
    });

    if (error) {
      setShowMessage({
        show: true,
        message: "Error creating payment ",
        severity: "error",
      });
      console.error("Error creating payment method:", error);
    } else {
      const { token, error } = await stripe.createToken(cardElement, {
        name,
        address_zip: zip,
      });

      if (error) {
        setShowMessage({
          show: true,
          message: "Error creating Subscriptions ",
          severity: "error",
        });
        console.error(error.message);
      } else {
        // Save token and process payment
        try {
          const response = await axios.post(`/user/subscription/subscribe`, {
            name,
            email: platformUser.recoveryEmail,
            paymentMethod: paymentMethod.id,
            tokenId: token.id,
            card: token.card,
            plan: "private",
            amount: getPlanPrice(plan),
          });

          if (response.status === 200) {
            let data = response.data;
            localStorage.setItem("subscriptionId", data.subscriptionId);
            setShowMessage({
              show: true,
              message: "Subscribe Successfully",
              severity: "success",
            });
            setTimeout(() => {
              navigate("/createOrganization");
            }, [1000]);
          }
        } catch (e) {
          console.log("Payment method created:", e);
          setShowMessage({
            show: true,
            message: "Error creating Subscriptions ",
            severity: "error",
          });
        }
        console.log("Payment method created:", paymentMethod);
        // You can use paymentMethod.id to complete the payment
      }
    }
  };

  const handleClose = (event) => {
    setShowMessage({ show: false, message: " ", severity: "" });
  };

  const handlePlanChange = (event, newPlan) => {
    setPlan(newPlan);
    // switch (newPlan) {
    //   case "Private":
    //     setPlanData({ amount: 49, period: "mon" });
    //     break;
    //   case "Business":
    //     setPlanData({ amount: 149, period: "mon" });
    //     break;
    //   case "Enterprise":
    //     setPlanData({ amount: 249, period: "mon" });
    //     break;
    //   default:
    //     setPlanData({ amount: 99, period: "mon" });
    // }
  };

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const borderStyle = {
    marginTop: "18px",
    width: "18px",
    height: "18px",
    borderTop: "2px solid blue", // Adjust the color and width as needed
    borderRight: "2px solid blue", // Adjust the color and width as needed
    borderTopRightRadius: "50px",
  };

  const [cardNumberComplete, setCardNumberComplete] = useState(false);
  const [cardExpiryComplete, setCardExpiryComplete] = useState(false);
  const [cardCvcComplete, setCardCvcComplete] = useState(false);

  const handleCardNumberChange = (event) => {
    setCardNumberComplete(event.complete);
  };

  const handleCardExpiryChange = (event) => {
    setCardExpiryComplete(event.complete);
  };

  const handleCardCvcChange = (event) => {
    setCardCvcComplete(event.complete);
  };

  React.useEffect(() => {
    let tempPlanData = localStorage.getItem("planData");
    if (tempPlanData) {
      tempPlanData = JSON.parse(tempPlanData);
      console.log("tempPlanData ", tempPlanData);
      // setPlanData(tempPlanData);
      let amount = Number(tempPlanData.amount) || 49;
      switch (amount) {
        case 49:
          setPlan("Private");
          setAlignment("mo");
          break;
        case 149:
          setPlan("Business");
          setAlignment("mo");
          break;
        case 249:
          setPlan("Enterprise");
          setAlignment("mo");
          break;
        case 99:
          setPlan("Clikkle Plus");
          setAlignment("mo");
          break;
        case 294:
          setPlan("Private");
          setAlignment("an");
          break;
        case 894:
          setPlan("Business");
          setAlignment("an");
          break;
        case 1494:
          setPlan("Enterprise");
          setAlignment("an");
          break;
        case 594:
          setPlan("Clikkle Plus");
          setAlignment("an");
          break;
        default:
          setPlan("Private");
          setAlignment("mo");
          break;
      }
    }
  }, []);

  const isButtonDisabled =
    name === "" ||
    zip.length !== 6 ||
    !cardNumberComplete ||
    !cardExpiryComplete ||
    !cardCvcComplete;

  const handleSelectChange = (event) => {
    setPlan(event.target.value);
    console.log("plan", plan);
    // switch (event.target.value) {
    //   case "Private":
    //     setPlanData({ amount: 49, period: "mon" });
    //     break;
    //   case "Business":
    //     setPlanData({ amount: 149, period: "mon" });
    //     break;
    //   case "Enterprise":
    //     setPlanData({ amount: 249, period: "mon" });
    //     break;
    //   default:
    //     setPlanData({ amount: 49, period: "mon" });
    // }
  };

  const getBillingDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getPlanPrice = (plan) => {
    let price = 49;
    switch (plan) {
      case "Private":
        price = alignment == "an" ? 294 : 49;
        break;
      case "Business":
        price = alignment == "an" ? 894 : 8;
        break;
      case "Enterprise":
        price = alignment == "an" ? 1494 : 10;
        break;
      case "Clikkle Plus":
        price = alignment == "an" ? 594 : 99;
        break;
      default:
        price = alignment == "an" ? 294 : 49;
        break;
    }
    return price;
  };

  return (
    <Box>
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
      <div className="flex flex-col justify-center  items-center my-2">
        <div className="flex flex-row">
          <div className="text-center m-2 text-blue-800">Save Up to 50%</div>
          <div style={borderStyle}></div>
        </div>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton
            sx={{
              px: {
                xs: 2,
                sm: 3,
              },
              fontSize: {
                xs: 10,
                sm: 14,
              },
              borderBottomLeftRadius: 50,
              borderTopLeftRadius: 50,
            }}
            value="mo"
          >
            Bill Monthly
          </ToggleButton>
          <ToggleButton
            sx={{
              px: {
                xs: 2,
                sm: 3,
              },
              fontSize: {
                xs: 10,
                sm: 14,
              },
              borderBottomRightRadius: 50,
              borderTopRightRadius: 50,
            }}
            value="an"
          >
            Bill Annually
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "2rem 1rem",
        }}
      >
        {/* Card One */}
        <Grid item xs={11} md={4}>
          <Card
            className="p-4 "
            sx={{
              backgroundColor: "background.cardView",
              height: "100%",
              width: "100%",
            }}
          >
            <CardContent className=" w-full">
              <ToggleButtonGroup
                color="primary"
                value={plan}
                exclusive
                aria-label="Platform"
                onChange={handlePlanChange}
              >
                <Box>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-customized-select-label"
                      id="demo-customized-select"
                      value={plan}
                      onChange={handleSelectChange}
                      style={{
                        color: "gray",
                        border: "1px solid #e7e3e3",
                        borderRadius: "3px",
                      }}
                    >
                      <MenuItem disabled value="Clikkle Plus">
                        CURRENT PLAN{" "}
                      </MenuItem>
                      <MenuItem value="Private">PRIVATE</MenuItem>
                      <MenuItem value="Business">BUSINESS</MenuItem>
                      <MenuItem value="Enterprise">ENTERPRISE</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <ToggleButton className="py-3" value="Clikkle Plus">
                  clikkle Plus
                </ToggleButton>
              </ToggleButtonGroup>

              <div className="text-base font-black mt-4 mb-1">
                <Typography variant="h6" component="h2">
                  {plan}
                </Typography>
              </div>
              <Typography variant="body2" color="textSecondary" gutterBottom>
               {plan==="Private" ? "Free upto 5 user":<>  7 days free trial, then ${getPlanPrice(plan)}/
                {alignment == "an" ? "Annually" : "User"}</>}
              </Typography>
              <Typography
                variant="body1"
                component="p"
                sx={{
                  fontWeight: "600",
                  marginTop: "1rem",
                }}
              >
                All Features Included:
              </Typography>
              <List dense>
                {(plan == "Current Plan" ? CurrentPlan : ClikklePlan).map(
                  (item, index) => (
                    <ListItem key={index} className="d-flex justify-between">
                      <TaskAltIcon
                        color="primary"
                        sx={{
                          fontSize: "18px",
                        }}
                      ></TaskAltIcon>
                      <ListItemText className="ps-2" primary={item} />
                    </ListItem>
                  )
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>
        {/* card two */}

        <Grid item xs={11} md={4}>
          <Card
            className="p-4 w-full"
            sx={{
              height: "100%",
              backgroundColor: "background.card",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                component="h2"
                className="text-base font-black mt-4 mb-1"
              >
                Billing Information
              </Typography>
              <Box
                sx={{
                  marginTop: "2rem",
                }}
              >
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    Full Name on card
                    <TextField
                      // label="Full Name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      placeholder="Full Name"
                      fullWidth
                      variant="outlined"
                      className=""
                    />
                  </Grid>
                  <Grid item xs={12}>
                    Card Number
                    <CardNumberElement
                      className="border border-zinc-300 p-4 hover:border-2 hover:border-blue-500"
                      onChange={handleCardNumberChange}
                    />
                    {/* <TextField
                      placeholder="Card Number"
                      fullWidth
                      variant="outlined"
                      className=""
                    /> */}
                  </Grid>
                  <Grid item xs={6} md={4}>
                    Expiration Date
                    <CardExpiryElement
                      className="border border-zinc-300 p-4 hover:border-2 hover:border-blue-500 "
                      onChange={handleCardExpiryChange}
                    />
                    {/* <TextField
                      placeholder="01/09"
                      fullWidth
                      variant="outlined"
                      className=""
                    /> */}
                  </Grid>
                  <Grid item xs={6} md={4}>
                    CVV
                    <CardCvcElement
                      className="leading-3 border border-zinc-300 p-4 hover:border-2 hover:border-blue-500"
                      onChange={handleCardCvcChange}
                    />
                    {/* <TextField
                      placeholder="123"
                      fullWidth
                      variant="outlined"
                      className=""
                    /> */}
                  </Grid>
                  <Grid item xs={12} md={4}>
                    Billing Zip Code
                    <TextField
                      placeholder="Zip Code"
                      onChange={(e) => setZip(e.target.value)}
                      value={zip}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      placeholder="Coupon (Optional)"
                      fullWidth
                      variant="outlined"
                      className=""
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box
                sx={{
                  marginTop: "1rem",
                  textAlign: "center",
                }}
              >
                <Button
                  onClick={handleSubmit}
                  className="bg-[#fff]"
                  sx={{
                    color: "custom.menu",
                    width: "100%",
                  }}
                  variant="contained"
                  disabled={isButtonDisabled}
                >
                  Start my 7-day trial
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* card three */}
        <Grid item xs={11} md={4}>
          <Card
            className="p-4 w-full"
            sx={{
              backgroundColor: "background.cardView",
              height: "100%",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                component="h2"
                className="text-base font-black mt-4 mb-1"
              >
                How your free trial works
              </Typography>
              <Box
                sx={{
                  marginTop: "1.5rem",
                }}
              >
                <List>
                  <ListItem className="pb-7" sx={{ marginBottom: "10px" }}>
                    <ListItemIcon>
                      <TaskAltIcon sx={{ fontSize: "2rem" }} color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ color: "#3B84D9" }}
                      primary="CREATE AN ACCOUNT"
                      secondary="You successfully created your free account."
                    />
                  </ListItem>
                  <ListItem className="pb-7" sx={{ marginBottom: "10px" }}>
                    <ListItemIcon>
                      <VpnKeyOutlinedIcon
                        sx={{ fontSize: "2rem" }}
                        color="primary"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="TODAY: GET INSTANT ACCESS"
                      secondary="Get instant access to all our packages and enjoy the seamless flows and interactions."
                    />
                  </ListItem>
                  <ListItem className="pb-7" sx={{ marginBottom: "10px" }}>
                    <ListItemIcon>
                      <MoreTimeIcon sx={{ fontSize: "2rem" }} color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="DAY 4: FREE TRIAL REMINDER"
                      secondary="We'll send you an email/notification 3 days before billing. Cancel anytime :)"
                    />
                  </ListItem>
                  <ListItem className="pb-7" sx={{ marginBottom: "10px" }}>
                    <ListItemIcon>
                      <AutoAwesomeIcon
                        sx={{ fontSize: "2rem" }}
                        color="primary"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="DAY 7: FREE TRIAL ENDS"
                      secondary={`You will be billed for the ${plan} plan ($${getPlanPrice(
                        plan
                      )}/${alignment}) on ${getBillingDate()}.`}
                    />
                  </ListItem>
                </List>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CardSection;
