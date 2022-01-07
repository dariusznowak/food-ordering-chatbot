import React, { useState, useContext } from "react";
import "./Feedback.css";
import { UserContext } from "../loginAndRegister/UserContext";
import { withRouter } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "../../axios.js";
import Sidebar from "../sidebar/Sidebar";

function Feedback() {
  const [feedbackInput, setFeedbackInput] = useState("");

  const { userInfo } = useContext(UserContext);

  const sendFeedback = async (e) => {
    const data = { login: userInfo.login, feedbackInput };

    if (feedbackInput === "") {
      return;
    }

    try {
      await axios.post("/feedback", data, { withCredentials: true });
    } catch {
      alert("Couldn't send feedback. Please try again.");
    }

    setFeedbackInput("");
    e.preventDefault();
  };

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <div className="feedback__body">
          <div className="feedback__formBody">
            <div className="feedback__header">Send us feedback</div>
            <div className="feedback__input">
              <textarea
                type="text"
                placeholder="Please write here..."
                value={feedbackInput}
                onChange={(e) => setFeedbackInput(e.target.value)}
              ></textarea>
            </div>
            <div className="feedback__button">
              <Button
                sx={{
                  width: "200px",
                  borderRadius: "15px",
                  background: "rgb(82, 247, 41)",
                  border: "solid 1px",
                  fontWeight: "600",
                  color: "rgb(66, 66, 66)",
                }}
                onClick={sendFeedback}
              >
                SEND
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Feedback);
