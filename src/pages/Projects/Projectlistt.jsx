import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import totalprojicon from "../../assets/Icons/totalprojicon.png";
import completedprojicon from "../../assets/Icons/completedprojicon.png";
import ongoingprojicon from "../../assets/Icons/ongoingprojicon.png";
import pendingprojicon from "../../assets/Icons/pendingprojicon.png";
import cancelledicon from "../../assets/Icons/cancelled.png";
import notstartedicon from "../../assets/Icons/notstarted.png";


import { TrendingUp, TrendingDown } from "@mui/icons-material";
import { Grid } from "@mui/material";

const Projectlistt = () => {
  const [overview, setOverview] = useState([]);
  const fetchOverview = useCallback(async () => {
    try {
      const response = await axios.get(`/hr/projects`);
      console.log(response);
      setOverview(response.data.projects);
    } catch (e) {
      console.log(e);
    }
  }, [setOverview]);

  useEffect(() => {
    fetchOverview();
  }, [fetchOverview]);
  console.log(overview);

  const countProjectsByStatus = (status) => {
    return overview.filter((project) => project.status === status).length;
  };
  const totalProjects = overview.length;
  const completedProjects = countProjectsByStatus("Completed");
  const ongoingProjects = countProjectsByStatus("Ongoing");
  const pendingProjects = countProjectsByStatus("Pending");
  const boxesData = [
    {
      icon: <img alt="" src={totalprojicon} />,
      title: "Total Projects",
      value: (
        <div className="text-[#3767B1] text-[25px] font-[700] leading-[32.55px] md:text-[28px] md:font-[700] md:leading-[47.57px]">
          {totalProjects ? totalProjects : "150"}
        </div>
      ),
      description: "124 for last month",
      trendIcon: <TrendingUp className="text-green-500" />,
    },
    {
      icon: <img alt="" src={completedprojicon} />,
      title: "Completed Projects",
      value: (
        <div className="text-[#42B824] text-[25px] font-[700] leading-[32.55px] md:text-[28px] md:font-[700] md:leading-[47.57px]">
          {completedProjects ? completedProjects : "50"}
        </div>
      ),
      description: "124 for last month,",
      trendIcon: <TrendingDown className="text-red-500" />,
    },
    {
      icon: <img alt="" src={ongoingprojicon} />,
      title: "Ongoing Projects",
      value: (
        <div className="text-[#50E3C2] text-[25px] font-[700] leading-[32.55px] md:text-[28px] md:font-[700] md:leading-[47.57px]">
          {ongoingProjects ? ongoingProjects : "75"}
        </div>
      ),
      description: "124 for last month,",
      trendIcon: <TrendingDown className="text-red-500" />,
    },

    {
      icon: (
        <img alt="" src={pendingprojicon} />
       
      ),
      title: "Pending Projects",
      value: (
        <div className="text-[#FF9B05] text-[25px] font-[700] leading-[32.55px] md:text-[28px] md:font-[700] md:leading-[47.57px]">
          {pendingProjects ? pendingProjects : "25"}
        </div>
      ),
      description: "124 for last month",
    },
    {
      icon: (
        <img alt="" src={cancelledicon} />
       
      ),
      title: "Cancelled Projects",
      value: (
        <div className="text-[#D40606] text-[25px] font-[700] leading-[32.55px] md:text-[28px] md:font-[700] md:leading-[47.57px]">
          {pendingProjects ? pendingProjects : "02"}
        </div>
      ),
      description: "124 for last month",
    }, {
      icon: (
        <img alt="" src={notstartedicon} />
       
      ),
      title: "Not Started Projects",
      value: (
        <div className=" text-[#FF3D3D] text-[25px] font-[700] leading-[32.55px] md:text-[28px] md:font-[700] md:leading-[47.57px]">
          {pendingProjects ? pendingProjects : "03"}
        </div>
      ),
      description: "124 for last month",
    },
  ];
  return (
    <div className="md:hidden mx-2">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-4/4">
          <div className="flex flex-col gap-4 mb-4 md:flex-row">
            {boxesData.map((box, index) => (
              <Grid
                sx={{
                  backgroundColor: "background.view",
                  borderRadius: "8px",
                }}
                key={index}
                className="rounded-lg p-4 shadow-md md:w-1/2"
              >
                <div className="flex items-center justify-between">
                  {" "}
                  <div className="">
                    {" "}
                    <p className="text-[15px] text-nowrap font-[500] leading-[19.53px] md:text-[16px] md:font-[500] md:leading-[23.44px]">
                      {box.title}
                    </p>
                    <p className="w-5/6 text-[23px] leading-[32.55px] md:text-[35px] md:font-[700] md:leading-[47.57px]">
                      {box.value}
                    </p>
                  </div>
                  <div className="flex justify-end w-1/6">{box.icon}</div>
                </div>
              </Grid>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projectlistt;
