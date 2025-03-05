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
import Hr from "./Department Directory/Hr";
import IT from "./Department Directory/IT";
import Marketing from "./Department Directory/Marketing";
import Test1 from "./Department Directory/Test1";
import Management from "./Department Directory/Management";

export default function OrganizationDepartmentDirectory() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [switchScreen, setSwitchScreen] = useState({
    first: "hr",
  });

  const handleSwitchScreen = (screen) => {
    setSwitchScreen(screen);
  };

  const tabs = [
    { label: "HR", value: "hr" },
    { label: "IT", value: "it" },
    { label: "Management", value: "management" },
    { label: "Marketing", value: "marketing" },
    { label: "test1", value: "test1" },
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
      <div className="min-h-full w-full flex gap-3 p-3 flex-col justify-start items-start rounded-lg ">
        <div>
          <Box>
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
        {switchScreen.first === "hr" ? (
          <>
            <Hr />
          </>
        ) : (
          <></>
        )}
        {switchScreen.first === "it" ? (
          <>
            <IT />
          </>
        ) : (
          <></>
        )}
        {switchScreen.first === "management" ? (
          <>
            <Management />
          </>
        ) : (
          <></>
        )}
        {switchScreen.first === "marketing" ? (
          <>
            <Marketing />
          </>
        ) : (
          <></>
        )}
        {switchScreen.first === "test1" ? (
          <>
            <Test1 />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
