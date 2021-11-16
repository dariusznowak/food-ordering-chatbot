import React from "react";
import "./Sidebar.css";
// import { BsChatDotsFill } from "react-icons/bs";
import { Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
/*react router; Link pozwala na przejscie do innego miejsca bez requesta do servera*/
import { Link } from "react-router-dom";

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
          <p>Dariusz (dariusz75)</p>
        </div>
      </div>
      <div className="sidebar__optionsBox">
        <div className="sidebar__optionsBoxGroup">
          <Link to="/" className="sidebar__link">
            <div className="sidebar__singleOption">
              <ChatBubbleOutlineIcon />
              <p> ASSISTANT</p>
            </div>
          </Link>
          <Link to="/usersettings" className="sidebar__link">
            <div className="sidebar__singleOption">
              <SettingsIcon />
              <p> User settings</p>
            </div>
          </Link>

          <Link to="/feedback" className="sidebar__link">
            <div className="sidebar__singleOption">
              <EmojiEmotionsIcon />
              <p> Give us feedback</p>
            </div>
          </Link>
        </div>
        {/* cos tu z linkiem do login nie dziala */}
        <Link to="/register" className="sidebar__link">
          <div className="sidebar__logout">
            <LogoutIcon />
            <p> Log out</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
