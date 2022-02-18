import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SidebarChat.css";
import db from "../../firebase";

import Avatar from "@mui/material/Avatar";

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");
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

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter name for chat room");

    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebar-chat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <dl className="sidebar-chat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message ? messages[0]?.message : "No messages"}</p>
        </dl>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebar-chat sticky">
      <p>Add new chat..</p>
    </div>
  );
}

export default SidebarChat;
