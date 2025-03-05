import React, { useEffect, useState,useRef } from "react";
import ChatList from "./ChatList";
import MapsUgcRoundedIcon from "@mui/icons-material/MapsUgcRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import ContactList from "./ContactList";
import {
  Box,
  Button,
  IconButton,
  Modal,
  SvgIcon,
  Tooltip,
  Typography,
  List, ListItem
} from "@mui/material";
import ChatSection from "./Newchatsection";
import chatIcon from "../../services/icons/chatIcon/chat.svg";
import callIcon from "../../services/icons/chatIcon/call.svg";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import useModal from "../../hooks/useModal";
import { useSocket } from "../../hooks/useSocket";

import Paper from '@mui/material/Paper';

import Grid from '@mui/material/Grid';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.custom.search.main,
  width: "100%",
  borderRadius: "10px",
  padding: "0px 13px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  fontSize: "14px",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(3.5)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const ChatPage = () => {
  const [tabs, setTabs] = useState("chat");
  const [currentChatUser, setCurrentChatUser] = useState([]);
  const { modalState, closeModal, openModal } = useModal();

  const [loading, setLoading] = useState(false);
  const { messages, sendMessage, contacts, chatList, fetchChatList, setMessages, visibleTab } = useSocket()

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const dropdownRef = useRef(null);
  const handleInputChange = (event) => {
    const value = event.target.value;
    
    setSearchTerm(value);
    if (value) {
      const filtered = contacts.filter(contact =>
        `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(value.toLowerCase()) ||
        contact.email.toLowerCase().includes(value.toLowerCase())
      );
      console.log('filtered',filtered);
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts([]);
    }
  };

  const handleClick = (contact) => {
    // alert(`Selected Contact: ${contact.firstName} ${contact.lastName}`);
    setCurrentChatUser(contact);
    clearSearch();
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredContacts([]);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      clearSearch();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handelMobileChatOpen = (data) => {
    openModal();
    handelChatOpen(data)
  }
  const handelChatOpen = (data) => {
    setCurrentChatUser(data)
  }
  return (
    <Box
      className="h-full flex flex-col overflow-hidden sm:px-7 px-8 py-10 "
      sx={{ backgroundColor: "background.main", borderRadius: "12px" }}
    >
      {/* web Chat screen  */}
      {/* <div className="hidden md:flex justify-between items-center pb-3 ">
        <h1 className="text-2xl text-neutral-500">Chat</h1>
        <Tooltip title="info" placement="top">
          <InfoOutlinedIcon />
        </Tooltip>
      </div> */}
      <div className=" hidden md:flex md:pb-4 ">
        <Box
          sx={{
            backgroundColor: { sm: "background.view" },
            borderTopLeftRadius: "10px",
            borderBottomLeftRadius: "10px",
            height:"80vh"
          }}
          className={`block w-[30vw] relative mb-4 rounded-l-2xl border-r border-r-[#3F3F3F]`}
        >
          <div className={`overflow-hidden `}>
            <div className="block border-b border-b-[#3F3F3F]" ref={dropdownRef}>
              <div className="flex gap-4 my-2 px-2.5 justify-center " >
                
                <Paper
                  component="form"
                  sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 500 }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search or start a new chat"
                    inputProps={{ 'aria-label': 'search or start a new chat' }}
                    value={searchTerm}
                    onChange={handleInputChange}
                  />
                  <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </Paper>
                
                {/* <Button
                  onClick={() => setTabs("chat")}
                  sx={{
                    padding: "3px 38px",
                    backgroundColor: tabs == "chat" ? "" : "background.view",
                    border: tabs == "chat" ? "" : "0.8px solid",
                    color: "text.two",
                    borderRadius: "5px",
                  }}
                  variant="contained"
                >
                  Chat
                </Button>
                <Button
                  onClick={() => setTabs("contacts")}
                  sx={{
                    borderRadius: "5px",
                    padding: "3px 25px",
                    color: "text.two",
                    backgroundColor:
                      tabs == "contacts" ? "" : "background.view",
                    border: tabs == "contacts" ? "" : "0.8px solid ",
                  }}
                  variant="contained"
                >
                  Contacts
                </Button> */}
              </div>
              {filteredContacts.length > 0 && (
                  <List sx={{
                    position: 'absolute',
                    // top: '100%',
                    width: '100%',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    background: 'white',
                    zIndex: 2,
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
                  }}>
                    {filteredContacts.map((option) => {
                      const nameToDisplay = `${option.firstName} ${option.lastName}`;
                      
                      return (
                        <ListItem
                          key={option._id}
                          button
                          onClick={() => handleClick(option)}
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
                          <Grid container sx={{ alignItems: 'center' }}>
                            <Grid item sx={{ display: 'flex', width: 44 }}>
                              <img
                                loading="lazy"
                                width="40"
                                src={`https://ui-avatars.com/api/?name=${nameToDisplay}`}
                                alt={nameToDisplay}
                              />
                            </Grid>
                            <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                              <Box component="span" sx={{ fontWeight: 'bold' }}>
                                {nameToDisplay}
                              </Box>
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {option.email}
                              </Typography>
                            </Grid>
                          </Grid>
                        </ListItem>
                      );
                    })}
                  </List>
                )}
            </div>
            <Box>
              <div
                style={{ height: "calc(100vh - 220px)" }}
                className=" md:py-2 px-2 overflow-y-scroll  no-scrollbar"
              >
                <p className="h-[1px] md:hidden bg-[#111111] w-full"></p>
                {console.log('contacts', contacts)}
                {(visibleTab === "contacts" || visibleTab === "groups") && (
                  <ContactList setCurrentChatUser={handelChatOpen} contacts={contacts} />
                )}
                {visibleTab === "chat" && (
                  <ChatList setCurrentChatUser={handelChatOpen} chatList={chatList} fetchChatList={fetchChatList} setMessages={setMessages} />
                )}
              </div>
            </Box>
          </div>
          {/* <p className="h-[1px] hidden md:block absolute top-[68px] w-full bg-gray-500"></p> */}
        </Box>
        <Box
          sx={{
            backgroundColor: { sm: "background.view" },
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px"
          }}
          className={`w-[70vw] relative block mb-4 `}
        >
          <ChatSection currentChatUser={currentChatUser} closeModal={closeModal} messages={messages} sendMessage={sendMessage} />
        </Box>
      </div>

      {/* mobile chat screen */}
      <div className=" md:hidden flex">
        <Box
          sx={{ backgroundColor: { sm: "background.view" } }}
          className={`md:block  w-full  relative  border-r-[#3F3F3F]`}
        >
          <div className={`overflow-hidden  mt-1`}>
            <div className="flex justify-between items-center mb-2 ">
              <h1 className="text-2xl text-neutral-500">Chat</h1>
              <div className="flex flex-row gap-6">
                <div onClick={() => setTabs("chat")}>
                  <img
                    src={chatIcon}
                    alt="Interview Icon"
                    style={{ width: "22px", height: "22px" }}
                  />
                </div>
                <div onClick={() => setTabs("contacts")}>
                  <img
                    src={callIcon}
                    alt="Interview Icon"
                    style={{ width: "21px", height: "21px" }}
                  />
                </div>
              </div>
            </div>
            <div
              style={{ height: "calc(100vh - 198px)" }}
              className="px-2 overflow-y-scroll  no-scrollbar"
            >
              <div className="my-3">
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon sx={{ width: "18px", height: "18px" }} />
                  </SearchIconWrapper>
                  <StyledInputBase
                    sx={{
                      "& ::placeholder": {
                        fontSize: "small",
                        color: "text.secondary",
                      },
                    }}
                    placeholder={
                      tabs == "chat" ? "Search chat" : "Search contact"
                    }
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
              </div>
              <p className="h-[1px] bg-[#111111] w-full"></p>
              {tabs === "contacts" ? (
                <ContactList setCurrentChatUser={handelMobileChatOpen} contacts={contacts} />
              ) : (
                <ChatList setCurrentChatUser={handelMobileChatOpen} chatList={chatList} fetchChatList={fetchChatList} setMessages={setMessages} />
              )}
            </div>
          </div>
          {/* <p className="h-[1px] hidden md:block absolute top-[68px] w-full bg-gray-500"></p> */}
        </Box>
        <Modal sx={{
          overflowY: 'scroll',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-start'
        }} open={modalState} onClose={closeModal}>
          <Box
            sx={{
              width: '100%',
              bgcolor: 'background.main',
              boxShadow: 24,
            }}
          >
            <ChatSection currentChatUser={currentChatUser} closeModal={closeModal} messages={messages} sendMessage={sendMessage} />
          </Box>

        </Modal>
        {/* <Box
          sx={{ backgroundColor: { sm: "background.view" } }}
          className={` ${
            currentChatUser.firstName ? "block" : "hidden"
          } w-full relative `}
        >
        </Box> */}
      </div>
    </Box>
  );
};

export default ChatPage;
