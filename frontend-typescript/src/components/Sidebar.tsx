import React from "react";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Avatar, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import SidebarChat from "./SidebarChat";
import { chooseChatUser, User } from "../store/user";

const users: User[] = [
  {
    name: "mohamad",
    email: "mohamad@hotmail.com",
  },
  { name: "ahmad", email: "ahmad@hotmail.com" },
  { name: "saleh", email: "saleh@hotmail.com" },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const handleClick = (user: User) => {
    dispatch(chooseChatUser(user));
  };
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src="" />
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar-search">
        <div className="sidebar-searchContainer">
          <SearchOutlinedIcon style={{ color: "gray" }} />
          <input type="text" placeholder="search..." />
        </div>
      </div>
      <div className="sidebar-chats">
        {users.map((user) => (
          <SidebarChat username={user.name} onClick={() => handleClick(user)} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
