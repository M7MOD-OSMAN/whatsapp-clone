import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Avatar, CircularProgress, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SidebarChat from "./SidebarChat";
import { chooseChatUser, User } from "../store/user";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/users").then((res) => res.data),
  });
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
        {isLoading ? (
          <CircularProgress />
        ) : (
          users?.map((user) => (
            <SidebarChat
              key={user.id}
              username={user.name}
              onClick={() => handleClick(user)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
