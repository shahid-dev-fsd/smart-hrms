import { useState } from "react";
import {
  Box,
  Grid,
  Divider,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Management,
  TeamStrength,
  TeamAvailability,
  LocationDiversity,
  DepartmentWall,
  Groups,
  Surveys,
  WorkAnniversary,
  NewHires,
  Birthday,
} from "../../../components";

export default function TeamSpace() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [switchScreen, setSwitchScreen] = useState({
    first: "departmentWall",
  });

  const handleSwitchScreen = (screen) => {
    setSwitchScreen(screen);
  };

  const tabs = [
    { label: "Department Wall", value: "departmentWall" },
    { label: "Groups", value: "groups" },
    { label: "Surveys", value: "surveys" },
  ];

  // Determine the current tab index from the state
  const currentTabIndex = tabs.findIndex(
    (tab) => tab.value === switchScreen.first
  );

  const handleTabChange = (event, newValue) => {
    const selectedTab = tabs[newValue];
    handleSwitchScreen({
      first: selectedTab.value,
    });
  };

  return (
    <>
      <div className="h-fit w-[30%] flex gap-3 flex-col justify-center items-center rounded-lg shadow-md">
        <Grid
          sx={{
            backgroundColor: "background.default",
          }}
          className="w-full h-full rounded-lg border border-gray-800"
        >
          <Management />
          <Divider
            sx={{
              width: "92%",
              borderColor: "gray",
              pt: "0.8rem",
              mb: "0.4rem",
            }}
          />
          <TeamStrength />
        </Grid>
        <TeamAvailability />
        <LocationDiversity />
      </div>
      <div className="min-h-full w-full flex gap-3 p-3 flex-col justify-start items-start rounded-lg ">
        <div>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={currentTabIndex}
              onChange={handleTabChange}
              textColor="primary"
              indicatorColor="primary"
              aria-label="Navigation Tabs"
            >
              {tabs.map((tab, index) => (
                <Tab key={index} label={tab.label} />
              ))}
            </Tabs>
          </Box>
        </div>
        {switchScreen.first === "departmentWall" ? (
          <>
            <DepartmentWall />
          </>
        ) : (
          <></>
        )}
        {switchScreen.first === "groups" ? (
          <>
            <Groups />
          </>
        ) : (
          <></>
        )}
        {switchScreen.first === "surveys" ? (
          <>
            <Surveys />
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="min-h-full w-fit flex gap-3 flex-col justify-start items-start rounded-lg ">
        <WorkAnniversary />
        <NewHires />
        <Birthday />
      </div>
    </>
  );
}
