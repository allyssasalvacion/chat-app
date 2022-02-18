import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SidebarChat.css";
import db from "../../firebase";

import Avatar from "@mui/material/Avatar";

function SidebarChat({ id, name, image }) {
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  return (
    <Link to={`/rooms/${id}`}>
      <div className="sidebar-chat">
        <Avatar src={image} />
        <dl className="sidebar-chat__info">
          <h2>{name}</h2>
          <p>
            {messages[0]?.message
              ? `${messages[0]?.name}: ${messages[0]?.message}`
              : "No messages"}
          </p>
        </dl>
      </div>
    </Link>
  );
}

export default SidebarChat;
