import React, { useState, useEffect } from "react";
import "./ChatBox.css";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function ChatBox() {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random * 5000));
  }, []);

  return (
    <section className="chat-box">
      <div className="chat-box__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat-box__info">
          <h3>Room name</h3>
          <p>Last seen at...</p>
        </div>
        <div className="chat-box__icons">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat-box__body">
        <p className="chat-box__body--message">
          <span className="chat-box__body--name">Allyssa Albores</span>
          Hey my name is Allyssa Albores!
          <span className="chat-box__body--timestamp">3:52pm</span>
        </p>
        <p className="chat-box__body--message chat-box__receiver">
          <span className="chat-box__body--name">James Alfon Salvacion</span>
          Good Evening! Sample message...
          <span className="chat-box__body--timestamp">3:52pm</span>
        </p>
        <p className="chat-box__body--message chat-box__receiver">
          <span className="chat-box__body--name">James Alfon Salvacion</span>
          Good Evening! Sample message...
          <span className="chat-box__body--timestamp">3:52pm</span>
        </p>
        <p className="chat-box__body--message">
          <span className="chat-box__body--name">Allyssa Albores</span>
          Hey my name is Allyssa Albores!
          <span className="chat-box__body--timestamp">3:52pm</span>
        </p>
      </div>
      <div className="chat-box__footer"></div>
    </section>
  );
}

export default ChatBox;
