import { Box } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import CallIcon from "@mui/icons-material/Call";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useTheme } from "../../style/theme";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import axios from "axios";
import io from 'socket.io-client';
import { env, formatTimestamp,formatDateTimestamp } from "../../utilities/function";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSocket } from "../../hooks/useSocket";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Connect to the server
// const socket = io(env('SERVER'));

const ChatSection = ({ currentChatUser, closeModal, messages, sendMessage }) => {
  const { mode } = useTheme();
  const [chats, setChats] = useState([])
  const [selectedchats, setSelectedchats] = useState([])
  const [message, setMessage] = useState('');
  const [deleteActivated, setDeleteActivated] = useState(false);
  const textareaRef = useRef(null);
  const [rows, setRows] = useState(1);
  // const [hoveredIndex, setHoveredIndex] = useState(null);
  const { getUnreadNotification } = useSocket();
  const lastMessageRef = useRef(null);

  const handelSendMessage = (e) => {
    if (message === "") {
      toast.error('Type a message to send');
      return;
    } else {
      sendMessage(currentChatUser._id, message);
      setMessage('');
    }
  };
  let page = 1;
  // console.log("SharedData from newschatsection", messages);

  const fetchChatList = useCallback(
    async () => {
      clearSelectedChat();
      // setJobs(null);
      try {
        const response = await axios.get(
          `/hr/message/details?receiver=${currentChatUser._id}&page=${page}&limit=0`
        );
        const data = response.data;
        setChats(data.messages)
        getUnreadNotification();
      } catch (e) {
        console.warn(e);
      }
    },
    [currentChatUser]
  );

  const renderTextWithLinks = (text) => {
    if (!text) return text; // Return as is if empty or undefined

    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[^\s]*)?)/g;

    return text.split(urlRegex).map((part, index) => {
      if (!part) return ""; // Handle undefined cases from split

      // Check if the part is a URL
      const isURL = urlRegex.test(part);
      if (isURL) {
        const hasProtocol = part.startsWith("http://") || part.startsWith("https://");
        const href = hasProtocol ? part : `https://${part}`; // Add https if missing

        return (
          <a key={index} href={href} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            {part}
          </a>
        );
      }

      return part; // Return non-link text as is
    });
  };

  const scrollToBottom = () => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth', block: "end", inline: "nearest" });
  };

  const handleSelect = (e, chat, btnClick = false) => {
    // console.log('chatchatchatchat',chat);
    const parentDiv = e.target.closest("div"); // Find the parent div of the checkbox
    if (e.target.checked) {
      parentDiv.classList.add("selectedchat"); // Add the "selectedchat" class
      setSelectedchats((prev) => [...prev, chat._id]); // Add only the _id to the selectedchats
    } else {
      parentDiv.classList.remove("selectedchat"); // Remove the "selectedchat" class
      setSelectedchats((prev) => prev.filter((id) => id !== chat._id)); // Remove the _id from the selectedchats
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      // Select all chats
      // setTimeout(() => {
        setSelectedchats(chats.map((chat) => chat._id)); // Add all chat IDs to selectedchats
        document.querySelectorAll(".chat-item").forEach((div) => {
          div.classList.add("selectedchat"); // Add the "selectedchat" class to all parent divs
        });
        document
          .querySelectorAll(".chat-item input[type='checkbox']")
          .forEach((checkbox) => (checkbox.checked = true)); // Check all checkboxes
      // }, 50);

    } else {
      clearSelectedChat();

    }
  };

  const clearSelectedChat = () => {
    const selectedDivs = document.querySelectorAll('div.selectedchat');
    selectedDivs.forEach((div) => {
      div.classList.remove('selectedchat');
    });

    document
      .querySelectorAll(".chat-item input[type='checkbox']")
      .forEach((checkbox) => (checkbox.checked = false));
    setSelectedchats([]);
  };

  const handelDeleteMessages = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you delete selected messages from chat?")) {
      try {
        const response = await axios.delete(`/hr/message/delete`, {
          data: { selectedchats }, // Pass selectedchats as part of the request body
        });
        if (response.status === 200) {
          clearSelectedChat();
          fetchChatList();
          toast.success(response.data.message);
        }
      } catch (e) {
        console.warn(e);
      }
    }
  };

  // useEffect(() => {
  //   if (selectedchats.length === 0) {
  //     setDeleteActivated(false)
  //   }
  // }, [selectedchats]);

  useEffect(() => {
    fetchChatList();
  }, [fetchChatList]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyDown = (event) => {
    // If Shift + Enter is pressed, add a new line
    if (event.key === 'Enter' && event.shiftKey) {
      event.preventDefault(); // Prevent default behavior (submit or new line)
      const newMessage = message + '\n'; // Append a new line
      setMessage(newMessage); // Update the state with the new message

      // Focus the textarea and move the cursor to the new line
      setTimeout(() => {
        const textarea = textareaRef.current;
        textarea.focus();
        // Move cursor to the end of the new line
        textarea.selectionStart = textarea.selectionEnd = newMessage.length; // Move cursor to the end
      }, 50); // Use timeout to ensure cursor is placed after re-render
    }
    else if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default behavior of Enter (like submitting a form)
      if (message.trim()) {
        handelSendMessage();
      }
    }
  };

  // Function to adjust the height of the textarea dynamically
  const adjustHeight = () => {
    const lines = message.split('\n').length; // Count the number of lines
    if (lines > 1) {
      setRows(2); // Set rows to 2 if there are more than 1 line
    } else {
      setRows(1); // Set rows to 1 if there's only 1 line
    }
  };
  useEffect(() => {
    adjustHeight();
  }, [message]);
  const currentUserName = "Admin " + JSON.parse(localStorage.org).name;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied to clipboard!");
    }).catch(() => {
      toast.error("Failed to copy");
    });
  };
  return (
    <>
      <div className={`overflow-hidden relative flex flex-col mx-2`}>
        <div className="flex md:border-b md:border-b-[#3F3F3F] my-4 md:my-0 md:mt-4 md:pb-2 md:pt-px justify-between items-center">
          <div className="flex md:mx-2 items-center gap-2.5 ">
            <div className="flex gap-4 items-center ">
              <div
                className="md:hidden"
                onClick={() => {
                  closeModal();
                }}
              >
                <ArrowBackIosIcon sx={{ width: "22px", height: "22px" }} />
              </div>
              <div className="h-[32px] w-[32px] md:h-[40px]  md:w-[40px] relative">
                <img
                  className="w-full h-full rounded-full object-cover object-top"
                  src={`https://ui-avatars.com/api/?name=${currentChatUser.firstName ? currentChatUser.firstName : "NA"} ${currentChatUser.lastName ? currentChatUser.lastName : ""}`}
                  alt=""
                />
                <p className="h-[7px] w-[7px]  bg-blue-500 border p-[2px]  rounded-full absolute bottom-[4px] md:bottom-[3px] md:right-[1px] right-[-1px]"></p>
              </div>
            </div>
            <div className="font-bold">
              <div className="text-base ">
                {currentChatUser.firstName ? currentChatUser.firstName : "N/a"}{" "} {currentChatUser.lastName && currentChatUser.lastName}
              </div>
              <p className=" text-[#BDBDBD] text-xs md:text-[11px]">Active</p>
            </div>
          </div>
          <ul className="flex gap-2 md:gap-6 ">
            {" "}
            <li>
              <CallIcon sx={{ fontSize: "17px" }} />
            </li>
            <li>
              <FolderOpenIcon sx={{ fontSize: "17px" }} />
            </li>
            <li>
              <DeleteOutlineIcon sx={{ fontSize: "17px", cursor: "pointer" }} onClick={(e) => { clearSelectedChat(); setDeleteActivated(!deleteActivated); }} />
            </li>
            <li>
              {" "}
              <InfoOutlinedIcon sx={{ fontSize: "17px" }} />
            </li>
            <li>
              <MoreHorizIcon sx={{ fontSize: "17px" }} />
            </li>
          </ul>
        </div>
        <p className="h-[1px] md:hidden bg-[#111111] w-full"></p>

        <Box style={{ height: 'calc(100vh - 280px)' }} className="overflow-y-auto mt-[14px] px-2 mb-2 md:mt-0 no-scrollbar"
        >
          {chats.map((chat, index) => (<>
            <div key={`chat${index}`} className="  md:text-xs
            text-sm font-bold"
            // onMouseEnter={() => setHoveredIndex(`chat${index}`)} 
            // onMouseLeave={() => setHoveredIndex(null)} 
            >
              {(chat?.sender == currentChatUser?._id) ?
                <div className="flex flex-row w-full mt-[25px] justify-start">
                  <div>
                    <div className="h-[32px] w-[32px] md:h-[40px]  md:w-[40px]">
                      <img
                        className="w-full h-full rounded-full object-cover object-top"
                        src={`https://ui-avatars.com/api/?name=${currentChatUser.firstName ? currentChatUser.firstName : "N/a"} ${currentChatUser.lastName && currentChatUser.lastName}`}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className=" px-3.5">
                    <div
                      className={`${mode === "dark" ? "bg-[#1E1E1E]" : "border-2 bg-[#EEEEEE]"
                        }  p-[12px] rounded-t-[12px]  rounded-br-[12px]  md:leading-[17px] chat-message`}
                        onDoubleClick={() => copyToClipboard(chat?.content)}
                    >
                     {renderTextWithLinks(chat?.content)}
                    </div>
                    <p className="mt-1 text-[#434343]"> {formatDateTimestamp(chat.createdAt)}</p>
                  </div>
                </div>
                :
                <div className="chat-item">
                  {deleteActivated && <input type="checkbox" style={{ position: "relative", top: "55px", left: "-4px" }} onClick={(e) => handleSelect(e, chat)} />}
                  <div className="flex flex-row w-full mt-[25px] justify-end">
                    <div className="text-right px-3.5">
                      <div
                        className={`${mode === "dark" ? "bg-[#3C95D0]" : "bg-[#51A0D5]"
                          }  p-[12px] rounded-t-[12px] rounded-bl-[12px]  md:leading-[17px] chat-message`}
                        onDoubleClick={() => copyToClipboard(chat?.content)}
                      >
                       {renderTextWithLinks(chat?.content)}
                      </div>
                      <p className="mt-1   text-[#434343]">{formatDateTimestamp(chat.createdAt)}</p>
                    </div>
                    <div>
                      <div className="h-[32px] w-[32px] md:h-[40px]  md:w-[40px] ">
                        <img
                          className="w-full h-full rounded-full object-cover object-top"
                          src={`https://ui-avatars.com/api/?name=${currentUserName}`}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </>
          ))}

          {messages[currentChatUser?._id]?.map((chat, index) => (<>
            <div key={index} className="  md:text-xs
            text-sm font-bold">
              {(chat?.sender == currentChatUser?._id) ?
                <div className="flex flex-row w-full mt-[25px] justify-start">
                  <div>
                    <div className="h-[32px] w-[32px] md:h-[40px]  md:w-[40px]">
                      <img
                        className="w-full h-full rounded-full object-cover object-top"
                        src={`https://ui-avatars.com/api/?name=${currentChatUser.firstName ? currentChatUser.firstName : "N/a"} ${currentChatUser.lastName ? currentChatUser.lastName : ""}`}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className=" px-3.5">
                    <div
                      className={`${mode === "dark" ? "bg-[#1E1E1E]" : "border-2 bg-[#EEEEEE]"
                        }  p-[12px] rounded-t-[12px]  rounded-br-[12px]  md:leading-[17px] chat-message`}
                        onDoubleClick={() => copyToClipboard(chat?.content)}
                      style={{ whiteSpace: "pre-wrap" }}
                    >
                     {renderTextWithLinks(chat?.content)}
                    </div>
                    <p className="mt-1    text-[#434343]">{formatDateTimestamp(chat.createdAt)}</p>
                  </div>
                </div>
                :
                <div className="flex flex-row w-full mt-[25px] justify-end">
                  <div className="text-right px-3.5">
                    <div
                      className={`${mode === "dark" ? "bg-[#3C95D0]" : "bg-[#51A0D5]"
                        }  p-[12px] rounded-t-[12px] rounded-bl-[12px]  md:leading-[17px] chat-message`}
                        onDoubleClick={() => copyToClipboard(chat?.content)}
                      style={{ whiteSpace: "pre-wrap" }}
                    >
                     {renderTextWithLinks(chat?.content)}
                    </div>
                    <p className="mt-1   text-[#434343]">{formatDateTimestamp(chat.createdAt)}</p>
                  </div>
                  <div>
                    <div className="h-[32px] w-[32px] md:h-[40px]  md:w-[40px] ">
                      <img
                        className="w-full h-full rounded-full object-cover object-top"
                        src={`https://ui-avatars.com/api/?name=${currentUserName}`}
                        alt=""
                      />
                    </div>
                  </div>
                </div>}
            </div>
          </>
          ))}
          <div ref={lastMessageRef}> </div>
        </Box>
        {!deleteActivated ? <>
          <Box sx={{ backgroundColor: "background.input" }} className="flex items-center justify-between px-4  rounded-[8px]">
            <div className="text-[12px] py-4  md:py-2 flex w-full mr-4">
              <AddCircleIcon color={"#626262"} sx={{ fontSize: "26px", marginRight: "16px", color: "#626262" }} />{" "}
              <textarea
                ref={textareaRef}
                className="w-full outline-none bg-transparent placeholder:text-[#494949] placeholder:text-base md:placeholder:text-sm"
                placeholder="Type message here"
                value={message}
                rows={rows}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown} // Listen for keydown events
                style={{
                  width: '100%',
                  resize: 'none', // Disable manual resize
                  overflowY: 'hidden', // Hide vertical scrollbar
                  lineHeight: '1.5', // Line height to match the content
                }}
              />
            </div>
            <div>
              <SendIcon
                sx={{
                  fontSize: "26px",
                  color: "#3b82f6",
                  transform: "rotate(-35deg)",
                  marginBottom: "6px"

                }}
                onClick={handelSendMessage}
              />
            </div>
          </Box>
        </>
          :
          <>
            <Box sx={{ backgroundColor: "background.input" }} className="flex items-center justify-between px-4  rounded-[8px]">
              <div className="text-[12px] py-4  md:py-2 w-full mr-4">
                <CloseIcon color={"#626262"} sx={{ fontSize: "26px", marginRight: "16px", color: "#626262" }} onClick={clearSelectedChat} />{" "}
                {document.querySelectorAll(".chat-item input[type='checkbox']:checked").length} selected (<label style={{ cursor: "pointer" }} ><input type="checkbox" className="hidden" onClick={handleSelectAll} checked={document.querySelectorAll(".chat-item input[type='checkbox']").length === document.querySelectorAll(".chat-item input[type='checkbox']:checked").length && document.querySelectorAll(".chat-item input[type='checkbox']:checked").length > 0} /> {(document.querySelectorAll(".chat-item input[type='checkbox']").length !== document.querySelectorAll(".chat-item input[type='checkbox']:checked").length || document.querySelectorAll(".chat-item input[type='checkbox']:checked").length === 0) ? "Select All" : "Clear selection"} </label>)
              </div>
              <div>
                <DeleteIcon
                  sx={{
                    fontSize: "26px",
                    cursor: "pointer"
                  }}
                  onClick={handelDeleteMessages}
                />
              </div>
            </Box>
          </>
        }
      </div>
      <ToastContainer />
      {/* <p className="h-[1px] absolute top-[68px] w-full bg-gray-500"></p> */}
    </>
  );
};

export default ChatSection;
