// src/components/ChatMessage.js
import React from 'react';
import './ChatMessage.css';
import { userType } from '../lib/isAuth';

const ChatMessage = ({ message }) => {
  const isUser = userType() === message.sender?.type;
  return (
    <div className={`chat-message ${isUser ? 'user-message' : 'other-message'}`}>
      <div className="message-info">
        {!isUser && <img src={message.sender.avatar} alt={message.sender.name} className="avatar" />}
        <div className="message-content">
          {!isUser && <div className="sender-name">{message.sender.name}</div>}
          <div className="text">{message.content}</div>
          <div className="time">{message.createdAt}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
