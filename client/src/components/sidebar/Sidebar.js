import React from "react";
import "./Sidebar.css";
// import { BsChatDotsFill } from "react-icons/bs";
import { Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <h1 className="sidebar__headerText">Food Ordering Assistant</h1>
      </div>
      <div className="sidebar__userInfoBox">
        <h3>User logged in</h3>
        <div className="sidebar_userInfo">
          <Avatar src="https://media-exp1.licdn.com/dms/image/C4E03AQGQFQ_AGFxzgw/profile-displayphoto-shrink_400_400/0/1634675705304?e=1642032000&v=beta&t=M07g0BbowFzd3xE-C4g7meQ6PUJax7GZQY0JKLjS1_c" />
          <p>Dariusz (daroo735)</p>
        </div>
      </div>
      <div className="sidebar__optionsBox">
        <div className="sidebar__optionsBoxGroup">
          <div>
            <ChatBubbleOutlineIcon />
            <p> ASSISTANT</p>
          </div>

          <div>
            <SettingsIcon />
            <p> User settings</p>
          </div>

          <div>
            <EmojiEmotionsIcon />
            <p> Give us feedback</p>
          </div>
        </div>
        <div className="sidebar__logout">
          <LogoutIcon />
          <p> Log out</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
