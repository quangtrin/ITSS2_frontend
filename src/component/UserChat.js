// src/components/UserChat.js
import React from "react";
import "./UserChat.css"; // optional, for styling
import { timeAgoOrDateTime } from "../utils/TimeUtils";
import { userType } from "../lib/isAuth";

const UserChat = ({
  user,
  setOpenMessage,
  openMessage,
  setOpenListMessage,
}) => {
  return (
    <div
      className="user-chat"
      onClick={() => {
        setOpenMessage(!openMessage);
        setOpenListMessage(false);
      }}
    >
      <img src={user.avatar} alt={user.name} className="avatar" />
      <div className="user-details">
        <h4 className="user-name">{user.name}</h4>
        <p className="last-message">
          {userType() === user.lastMessage?.type && "You: "}
          {user.lastMessage?.content}
        </p>
      </div>
      <span className="timestamp">
        {timeAgoOrDateTime(user.lastMessage?.createdAt)}
      </span>
    </div>
  );
};

export default UserChat;
