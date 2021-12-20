import React, { useContext } from "react";
import "./Sidebar.css";
// import { BsChatDotsFill } from "react-icons/bs";
import { Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
/*react router; Link pozwala na przejscie do innego miejsca bez requesta do servera*/
import { Link } from "react-router-dom";
import axios from "../../axios";

import { UserContext } from "../loginAndRegister/UserContext";

function Sidebar() {
  const { /*isAuth, */ setIsAuth, /*login, setLogin,*/ userInfo } =
    useContext(UserContext);

  const logout = () => {
    axios
      .post("/logout", {}, { withCredentials: true })
      //usuwamy sobie z contextu nasz login - ta funkcjonalnosc moze byc tymczasowa!!!
      .then(() => {
        //setLogin("");
        setIsAuth(false);
        localStorage.setItem("isAuth", JSON.stringify(false));
      });
    //nastepnie usuwamy ciasteczko w endpoincie w api

    //ponadto czyscimy localstorage z zapisanych wiadomosci
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
          <Avatar src="https://media-exp1.licdn.com/dms/image/C4E03AQGQFQ_AGFxzgw/profile-displayphoto-shrink_400_400/0/1634675705304?e=1642032000&v=beta&t=M07g0BbowFzd3xE-C4g7meQ6PUJax7GZQY0JKLjS1_c" />
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
          {/* <Link to="/usersettings" className="sidebar__link">
            <div className="sidebar__singleOption">
              <SettingsIcon />
              <p> User settings</p>
            </div>
          </Link> */}

          <Link to="/feedback" className="sidebar__link">
            <div className="sidebar__singleOption">
              <EmojiEmotionsIcon />
              <p> Give us feedback</p>
            </div>
          </Link>
        </div>
        {/* cos tu z linkiem do login nie dziala */}
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
