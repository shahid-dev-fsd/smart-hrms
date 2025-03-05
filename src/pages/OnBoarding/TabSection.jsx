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
} from "@mui/material";
import CardSection from "./CardSection";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51MxNE1F45yCfzDJKgucECXKPmoe1gFXRQCcimLRKuGAcYuzMAqrNGOVxt87BGSi47mHlyCa0Xhyy4NGDlOqDhoT8005bAVsdZ5"
);

// Tabs Section
const TabSection = () => {
  const [activeTab, setActiveTab] = useState(1); // Start with the second tab active

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ marginTop: "5rem" }}>
      <Elements stripe={stripePromise}>
        <Box justifyContent="center"
          sx={{
            display: "flex",
            justifyContent: "center",
            width: { xs: "60%"  ,  sm:"100%" }  ,
            margin:"auto"
          }}
        >
          <Tab
            label="1. Create an account"
            disabled
            sx={{
              border: "1px solid #000",
              ...(activeTab === 0 && {
                backgroundColor: "background.view", // Change the background color of the active tab
                color: "primary", // Change the text color of the active tab
              }),
            }}
          />
          <Tab
            label="2. Activate your trial"
            sx={{
              border: "1px solid #000",
              ...(activeTab === 1 && {
                backgroundColor: "background.activeTab", // Change the background color of the active tab
                color: "primary.main", // Change the text color of the active tab
              }),
            }}
            onClick={(event) => handleTabChange(event, 1)} // Make the second tab clickable
          />
        </Box>
        <Box sx={{ textAlign: "center", marginTop: ".7rem" }}>
          <Typography sx={{ fontWeight: "400", fontSize: { xs: "0.8rem"    ,  sm:"1.2rem" } ,  paddingX :{ xs: 4  ,  sm:0 }  , color:"#616161" }}>
            Kindly add your payment details to begin the free trial. <br /> You
            can cancel anytime before the free trial ends to avoid being
            charged.
          </Typography>
        </Box>
        {activeTab === 1 && <CardSection />}
        {/* Render the CardSection only on the second tab */}
      </Elements>
    </Box>
  );
};

export default TabSection;
