// src/components/ChatWindow.js
import React from "react";
import ChatMessage from "./ChatMessage";
import "./ChatWindow.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import apiList from "../lib/apiList";
import { userType } from "../lib/isAuth";
import { Spin } from "antd";

const ChatWindow = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const lastMessageRef = React.useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) return;
    if (!receiver) return;
    const res = await axios.post(
      apiList.sendChat,
      {
        content: input,
        receiver: receiver._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setMessages([...messages, res.data?.message]);
    if (socket) socket.emit("new-message", { message: res.data?.message });
    setInput("");
  };

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      const res = await axios.get(apiList.chats, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }); // fetch user data from API
      setMessages(res.data);
      const lastMessage = res.data[0];
      setReceiver(
        userType() === lastMessage.sender.type
          ? lastMessage.receiver
          : lastMessage.sender
      );
      setLoading(false);
    };
    fetchMessages();
  }, []);

  useEffect(() => {
    socket.on("send-message", (message) => {
      setMessages((messages) => [...messages, message.message]);
    });
  }, [socket]);

  useEffect(() => {
    if (lastMessageRef) {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, lastMessageRef]);
  return (
    <div className="chat-window">
      <div className="chat-header">
        <img src={receiver?.avatar} alt={receiver?.name} className="avatar" />
        <div className="header-info">
          <div className="name">{receiver?.name}</div>
        </div>
      </div>
      <div className="chat-body">
        {messages &&
          messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
        <div ref={lastMessageRef}></div>
      </div>
      <div className="chat-footer">
        <input
          onChange={(e) => {
            setInput(e.target.value);
          }}
          value={input}
          type="text"
          placeholder="Aa"
          className="chat-input"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSubmit(e);
            }
          }}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
