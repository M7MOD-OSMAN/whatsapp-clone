import MoreVert from "@mui/icons-material/MoreVert";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import InsertEmoticonOutlinedIcon from "@mui/icons-material/InsertEmoticonOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import { Avatar, IconButton } from "@mui/material";
import { FormEvent, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { resetUser } from "../store/user";

interface Message {
  uuid: string;
  text: string;
  receiverEmail: string;
  fromOtherSide: boolean;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const dispatch = useDispatch();
  const socketRef = useRef<Socket>();
  const currentUserEmail = useSelector(
    (state: RootState) => state.currentUser.email
  );
  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_SERVER_URL!, {
      query: {
        email: currentUserEmail,
      },
      withCredentials: true,
    });
    const socket = socketRef.current;
    socket.on("message", (newMessage) => {
      setMessages((oldMessages) => [
        ...oldMessages,
        { ...newMessage, fromOtherSide: true },
      ]);
    });
    socket.on("connect_error", (err) => {
      if (err.message === "auth_error") {
        dispatch(resetUser());
      }
    });
    return () => {
      socketRef.current?.disconnect();
    };
  }, [currentUserEmail, dispatch]);
  const handleSendMessage = (ev: FormEvent) => {
    ev.preventDefault();
    const newMessage = {
      text: messageInput,
      receiverEmail: currentUserEmail,
      uuid: nanoid(),
    } as Message;
    socketRef.current?.emit("message", newMessage);
    setMessages([...messages, { ...newMessage, fromOtherSide: false }]);
    setMessageInput("");
  };
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
        {messages.map((message) => (
          <p
            key={message.uuid}
            className={`chat-message ${
              message.fromOtherSide ? "chat-receiver" : ""
            }`}
          >
            <span className="chat-name">Mahmoud</span>
            {message.text}
            <span className="chat-timestamp">{new Date().toUTCString()}</span>
          </p>
        ))}
      </div>

      <div className="chat-footer">
        <IconButton>
          <InsertEmoticonOutlinedIcon />
        </IconButton>
        <IconButton>
          <AttachFileOutlinedIcon />
        </IconButton>
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
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
