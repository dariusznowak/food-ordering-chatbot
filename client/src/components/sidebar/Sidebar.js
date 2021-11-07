import React from "react";
import "./Sidebar.css";
// import { BsChatDotsFill } from "react-icons/bs";
import { Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <h1 className="sidebar__headerText">Food Ordering Assistant</h1>
        {/* <BsChatDotsFill fontSize="70px" color="rgb(153, 0, 0)" /> */}
      </div>
      <div className="sidebar__userInfoBox">
        <h3>User logged in</h3>
        <div className="sidebar_userInfo">
          <Avatar />
          <p>UserNameHere</p>
        </div>
      </div>
      <div className="sidebar__optionsBox">
        <div className="sidebar__optionsBoxGroup">
          <div>
            <SettingsIcon />
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
