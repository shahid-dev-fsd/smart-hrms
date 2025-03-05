import React, { useState } from "react";
import Othersetting from "./Othersetting";
import Paymentsetting from "./Paymentsetting";
import Socialsetting from "./Socialsetting";

const Apisetting = () => {
  const [tab, setTab] = useState("Social_Setting");

  const handleTabChange = (newTab) => {
    setTab(newTab);
  };

  return (
    <div className="">
      <div className="absolute top-40 w-[90%]">
        {" "}
        <ul className="w-full px-12 overflow-hidden overflow-x-scroll gap-5 flex  no-scrollbar items-center ">
          <li
            className={`cursor-pointer whitespace-nowrap p-2 ${
              tab === "Social_Setting"
                ? "bg-blue-500 text-white px-3 py-2 rounded"
                : " bg-transparent"
            }`}
            onClick={() => handleTabChange("Social_Setting")}
          >
            Social Setting
          </li>
          <li
            className={`cursor-pointer p-2 whitespace-nowrap ${
              tab === "Payment_Setting"
                ? "bg-blue-500 text-white px-3 py-2 rounded"
                : " bg-transparent"
            }`}
            onClick={() => handleTabChange("Payment_Setting")}
          >
            Payment Setting
          </li>
          <li
            className={`cursor-pointer p-2 whitespace-nowrap ${
              tab === "Other_Setting"
                ? "bg-blue-500 text-white px-3 py-2 rounded"
                : " bg-transparent"
            }`}
            onClick={() => handleTabChange("Other_Setting")}
          >
            Other Setting
          </li>
        </ul>
      </div>
      {tab === "Social_Setting" && (
        <div>
          <Socialsetting />{" "}
        </div>
      )}
      {tab === "Other_Setting" && (
        <div>
          <Othersetting />
        </div>
      )}
      {tab === "Payment_Setting" && (
        <div>
          <Paymentsetting />{" "}
        </div>
      )}
    </div>
  );
};

export default Apisetting;
