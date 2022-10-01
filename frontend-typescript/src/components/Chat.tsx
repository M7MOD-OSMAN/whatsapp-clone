import MoreVert from "@mui/icons-material/MoreVert";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import InsertEmoticonOutlinedIcon from "@mui/icons-material/InsertEmoticonOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import { Avatar, IconButton } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";

const Chat = () => {
  useEffect(() => {
    axios.get("/messages");
  }, []);
  return (
    <div className="chat">
      <div className="chat-header">
        <Avatar />
        <div className="chat-headerInfo">
          <h3>Room Name</h3>
          <p>Last seen at...</p>
        </div>

        <div className="chat-headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          {/* <IconButton><AttachFile /></IconButton> */}
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat-body">
        <p className="chat-message">
          <span className="chat-name">Mahmoud</span>
          This is a message
          <span className="chat-timestamp">{new Date().toUTCString()}</span>
        </p>
        <p className="chat-message chat-receiver">
          <span className="chat-name">Mahmoud</span>
          This is a response
          <span className="chat-timestamp">{new Date().toUTCString()}</span>
        </p>
        <p className="chat-message chat-receiver">
          <span className="chat-name">Mahmoud</span>
          This is a response
          <span className="chat-timestamp">{new Date().toUTCString()}</span>
        </p>
        <p className="chat-message">
          <span className="chat-name">Mahmoud</span>
          This is a message
          <span className="chat-timestamp">
            {new Date().toISOString().slice(0, 10)}
          </span>
        </p>
      </div>

      <div className="chat-footer">
        <IconButton>
          <InsertEmoticonOutlinedIcon />
        </IconButton>
        <IconButton>
          <AttachFileOutlinedIcon />
        </IconButton>
        <form>
          <input
            type="text"
            // value={input}
            // onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
          />
          <button type="submit">Send a message</button>
        </form>
        <IconButton>
          <MicOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
