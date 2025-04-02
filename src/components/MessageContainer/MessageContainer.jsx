import React from "react";
import "./MessageContainer.css";
import pocketImage from "../../assets/image-removebg-preview.png";
import lock from "../../assets/lock.png";
import { useSelector } from "react-redux";
const MessageContainer = () => {
  const { addButtonToggle } = useSelector((store) => store.notes);
  return (
    <div
      className={`message-container  ${addButtonToggle ? "blur-overlay" : ""}`}
    >
      <div className="no-chat-place-container">
        <div className="no-chat-place">
          <img src={pocketImage} alt="" />
          <h1 style={{ fontSize: "50px" }}>Pocket Notes</h1>
          <p
            style={{
              fontSize: "20px",
              fontWeight: "400",
              letterSpacing: "2%",
            }}
          >
            Send and receive messages without keeping your phone online. Use
            Pocket Notes on up to 4 linked devices and 1 mobile phone{" "}
          </p>
        </div>
      </div>{" "}
      <div className="end-to-end">
        <img src={lock} alt="" />
        <p>end-to-end encrypted</p>
      </div>
      <div></div>
    </div>
  );
};

export default MessageContainer;
