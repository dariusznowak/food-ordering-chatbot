import React from "react";
import "./UserSettings.css";
import { withRouter } from "react-router-dom";

import Sidebar from "../sidebar/Sidebar";

function UserSettings() {
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <div className="userSettings">user settings</div>
      </div>
    </div>
  );
}

export default withRouter(UserSettings);
