import { Avatar } from "@mui/material";

interface SidebarChatProps {
  onClick?: () => void;
  username: string;
}
const SidebarChat = ({ onClick, username }: SidebarChatProps) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div onClick={onClick} className="sidebarChat">
    <Avatar />
    <div className="sidebarChat-info">
      <h2>{username}</h2>
      <p>This is the last message</p>
    </div>
  </div>
);
SidebarChat.defaultProps = {
  onClick: () => {},
};
export default SidebarChat;
