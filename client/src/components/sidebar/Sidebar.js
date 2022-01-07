import React, { useContext } from "react";
import "./Sidebar.css";
import { Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { Link } from "react-router-dom";
import axios from "../../axios";
import { UserContext } from "../loginAndRegister/UserContext";

function Sidebar() {
  const { setIsAuth, userInfo } = useContext(UserContext);

  const logout = () => {
    axios.post("/logout", {}, { withCredentials: true }).then(() => {
      setIsAuth(false);
      localStorage.setItem("isAuth", JSON.stringify(false));
    });
    localStorage.removeItem("conversations");
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <h1 className="sidebar__headerText">Food Ordering Assistant</h1>
      </div>
      <div className="sidebar__userInfoBox">
        <h3>User logged in</h3>
        <div className="sidebar_userInfo">
          <Avatar />
          <div className="sidebar_userInfoText">
            <p>{userInfo.fullName}</p>
            <p>({userInfo.login})</p>
          </div>
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

          <Link to="/feedback" className="sidebar__link">
            <div className="sidebar__singleOption">
              <EmojiEmotionsIcon />
              <p> Give us feedback</p>
            </div>
          </Link>
        </div>
        <Link to="/login" className="sidebar__link">
          <div className="sidebar__logout" onClick={logout}>
            <LogoutIcon />
            <p> Log out</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
