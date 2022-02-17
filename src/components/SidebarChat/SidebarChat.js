import React, { useState, useEffect } from "react";
import "./SidebarChat.css";

import Avatar from "@mui/material/Avatar";

function SidebarChat({ addNewChat }) {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter name for chat");

    if (roomName) {
      // do some clever stuff in the database
    }
  };

  return !addNewChat ? (
    <div className="sidebar-chat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <dl className="sidebar-chat__info">
        <h2>Chat room name</h2>
        <p>Last message...</p>
      </dl>
    </div>
  ) : (
    <div onClick={createChat} className="sidebar-chat sticky">
      <p>Add new chat..</p>
    </div>
  );
}

export default SidebarChat;
