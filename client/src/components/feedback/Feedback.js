import React from "react";
import "./Feedback.css";
import { withRouter } from "react-router-dom";

import Sidebar from "../sidebar/Sidebar";

function Feedback() {
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <div className="feedback">give us feedback</div>
      </div>
    </div>
  );
}

export default withRouter(Feedback);
// export default Feedback;
