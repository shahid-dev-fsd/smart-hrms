import React, { useState } from "react";

import Generalsettings from "./Generalsettings";
import Captcha from "./Captcha";
import Theme from "./Theme";
import Ticket from "./Ticket";
import Fileupload from "./Fileupload";
import Notifications from "./Notifications";
import Emailsetting from "./Emailsetting";
import Chat from "./Chat";
import Customcssjs from "./Customcssjs";

const Generalsettinghome = () => {
  const [tab, setTab] = useState("General");

  const handleTabChange = (newTab) => {
    setTab(newTab);
  };

  return (
    <div>
      <div className="absolute top-40 w-[90%]">
        {" "}
        <ul className="w-full px-12 overflow-hidden overflow-x-scroll gap-5 flex  no-scrollbar items-center ">
          <li
            className={`cursor-pointer whitespace-nowrap p-2 ${
              tab === "General"
                ? "bg-blue-500 text-white px-3 py-2 rounded"
                : " bg-transparent"
            }`}
            onClick={() => handleTabChange("General")}
          >
            General
          </li>
          <li
            className={`cursor-pointer p-2 whitespace-nowrap ${
              tab === "Captcha"
                ? "bg-blue-500 text-white px-3 py-2 rounded"
                : " bg-transparent"
            }`}
            onClick={() => handleTabChange("Captcha")}
          >
            Captcha
          </li>
          <li
            className={`cursor-pointer p-2 whitespace-nowrap ${
              tab === "Theme"
                ? "bg-blue-500 text-white px-3 py-2 rounded"
                : " bg-transparent"
            }`}
            onClick={() => handleTabChange("Theme")}
          >
            Theme
          </li>
          <li
            className={`cursor-pointer p-2 whitespace-nowrap ${
              tab === "File_Upload"
                ? "bg-blue-500 text-white px-3 py-2 rounded"
                : " bg-transparent"
            }`}
            onClick={() => handleTabChange("File_Upload")}
          >
            File Upload{" "}
          </li>{" "}
          <li
            className={`cursor-pointer p-2 whitespace-nowrap ${
              tab === "Ticket"
                ? "bg-blue-500 text-white px-3 py-2 rounded"
                : " bg-transparent"
            }`}
            onClick={() => handleTabChange("Ticket")}
          >
            Ticket
          </li>{" "}
          <li
            className={`cursor-pointer p-2 whitespace-nowrap ${
              tab === "Notification"
                ? "bg-blue-500 text-white px-3 py-2 rounded"
                : " bg-transparent"
            }`}
            onClick={() => handleTabChange("Notification")}
          >
            Notification{" "}
          </li>{" "}
          <li
            className={`cursor-pointer p-2 whitespace-nowrap ${
              tab === "Email"
                ? "bg-blue-500 text-white px-3 py-2 rounded"
                : " bg-transparent"
            }`}
            onClick={() => handleTabChange("Email")}
          >
            Email{" "}
          </li>{" "}
          <li
            className={`cursor-pointer p-2 whitespace-nowrap ${
              tab === "Chat"
                ? "bg-blue-500 text-white px-3 py-2 rounded"
                : " bg-transparent"
            }`}
            onClick={() => handleTabChange("Chat")}
          >
            Chat{" "}
          </li>{" "}
          <li
            className={`cursor-pointer p-2 whitespace-nowrap ${
              tab === "Custom"
                ? "bg-blue-500 text-white px-3 py-2 rounded"
                : " bg-transparent"
            }`}
            onClick={() => handleTabChange("Custom")}
          >
            Custom (CSS/javascript){" "}
          </li>
        </ul>
      </div>
      {tab === "General" && (
        <div>
          <Generalsettings />{" "}
        </div>
      )}
      {tab === "Captcha" && (
        <div>
          <Captcha />
        </div>
      )}
      {tab === "Theme" && (
        <div>
          <Theme />{" "}
        </div>
      )}
      {tab === "File_Upload" && (
        <div>
          <Fileupload />{" "}
        </div>
      )}{" "}
      {tab === "Ticket" && (
        <div>
          <Ticket />{" "}
        </div>
      )}{" "}
      {tab === "Notification" && (
        <div>
          <Notifications />{" "}
        </div>
      )}{" "}
      {tab === "Email" && (
        <div>
          <Emailsetting />{" "}
        </div>
      )}{" "}
      {tab === "Chat" && (
        <div>
          <Chat />{" "}
        </div>
      )}
      {tab === "Custom" && (
        <div>
          <Customcssjs />{" "}
        </div>
      )}
    </div>
  );
};

export default Generalsettinghome;
