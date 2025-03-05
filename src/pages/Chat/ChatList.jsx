import { Box } from "@mui/material";
import axios from "axios";
import React, { useCallback, useState, useEffect } from "react";
import { formatTimestamp } from "../../utilities/function";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Fade from '@mui/material/Fade';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useSocket } from "../../hooks/useSocket";

const ChatList = ({ setCurrentChatUser, chatList = [], fetchChatList, setMessages }) => {
  let page = 1;
  // const [ chats , setChats] =  useState([])

  const { totalNotification } = useSocket();
  const updatedChatList = chatList.map(chat => {
    const notificationCount = totalNotification.filter(notification =>
      notification.sender === chat.sender._id || notification.sender === chat.receiver._id
    ).length;
    return { ...chat, notificationCount };
  });


  //   useEffect(() => {
  //     console.log('updatedChatList==>',updatedChatList);
  // }, [updatedChatList]);

  const [hoveredIndex, setHoveredIndex] = useState(false);
  const handleClick = (item) => {
    // console.log("shared data from chat", item);
    setCurrentChatUser(item);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const openDelete = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handelDeleteUserChat = async (id) => {
    //console.log('ididid',id);
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you delete selected messages from chat?")) {
      try {
        const response = await axios.delete(`/hr/message/deleteuserchat/${id}`);
        if (response.status === 200) {
          setCurrentChatUser([]);
          setMessages(prevMessages => {
            const newMessages = { ...prevMessages }; // Create a shallow copy of the previous state
            delete newMessages[id]; // Delete the key from the new object
            return newMessages; // Return the updated object
          });
          fetchChatList();
          toast.success(response.data.message);
        }
      } catch (e) {
        console.warn(e);
      }
    }
  };
  const currentUserId = JSON.parse(localStorage.org)._id;

  return (
    <><ToastContainer />
      {updatedChatList?.map((item, index) => {

        const nametodisplay = item?.receiver?._id === currentUserId
          ? `${item?.sender?.firstName} ${item?.sender?.lastName}`
          : `${item?.receiver?.firstName} ${item?.receiver?.lastName}`;

        return (
          <div key={index}
            className="relative" onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)} >
            <div className="flex gap-4 items-center p-1 my-3">
              <div className="h-[31px] w-[31px] md:h-[40px]  md:w-[50px] relative">
                <img
                  className="w-full h-full rounded-full object-cover object-top"
                  src={`https://ui-avatars.com/api/?name=${nametodisplay}`}
                  alt=""
                />
                <p className="h-[7px]  w-[7px]  bg-blue-500 border p-[2px] md:right-[1px] md:bottom-[3px] rounded-full absolute bottom-[4px] right-[-1px]"></p>
              </div>
              <div onClick={() => handleClick(item?.receiver?._id === currentUserId ? item.sender : item.receiver)} className="w-full font-bold flex justify-between items-center">
                <div className="">
                  <div className="text-sm  md:text-xs ">{nametodisplay}</div>

                  <div className="line-clamp-1 text-xs text-[#434343] md:text-[9px]">
                    {item.content}
                  </div>
                </div>
                <div className="flex justify-end items-center text-[#3A7EC1] text-xs md:text-[8px]">
                  {hoveredIndex === index && (<div onClick={(e) => e.stopPropagation()}>
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={openDelete ? 'long-menu' : undefined}
                      aria-expanded={openDelete ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering parent click
                        setAnchorEl(e.currentTarget);
                      }}
                      style={{ background: "transparent" }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="fade-menu"
                      MenuListProps={{
                        "aria-labelledby": "fade-button",
                      }}
                      anchorEl={anchorEl}
                      open={openDelete}
                      onClose={handleClose}
                      TransitionComponent={Fade}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}
                    >
                      <MenuItem onClick={() => { handelDeleteUserChat(item?.receiver?._id === currentUserId ? item.sender._id : item.receiver._id); handleClose(); }}>
                        <ListItemIcon>
                          <DeleteForeverIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="inherit" style={{ fontSize: "14px" }}>Delete Chat</Typography>
                      </MenuItem>
                    </Menu>
                  </div>)}
                  <div className="flex justify-end items-end text-[#3A7EC1] text-xs md:text-[8px]" style={{flexDirection: "column"}}>
                  <span className="text-right" style={{ width: 40 }}>{formatTimestamp(item.createdAt)}</span>
                  {item?.notificationCount>0 && (
                  <div className="bg-[#3A7EC1] text-white text-[10px] md rounded-full md:text-[7px] px-[6px] ">
                    {item?.notificationCount}
                  </div>)}
                  </div>
                </div>
              </div>
            </div>
            <p className="h-[1px] md:hidden bg-[#111111] w-full"></p>
          </div>
        )
      })}

    </>
  );
};

export default ChatList;
