import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import { useParams } from "react-router-dom";
import "./ChatBox.css";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import db from "../../firebase";

function ChatBox() {
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [image, setImage] = useState("");
  const [messages, setMessages] = useState([]);
  const [sortedMessages, setSortedMessages] = useState([]);
  const displayName = localStorage.getItem("displayName");
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setImage(snapshot.data().image));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .add({
        message: input,
        name: displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        photoURL: localStorage.getItem("photoURL"),
        userId: uid,
      });
    setInput("");
  };

  const groupMessages = () => {
    let groupedMessages = {};
    for (let message of messages) {
      let date = String(
        new Date(message.timestamp?.toDate()).toUTCString()
      ).slice(5, 16);
      if (date in groupedMessages) {
        groupedMessages[date].push(message);
      } else {
        groupedMessages[date] = [];
        groupedMessages[date].push(message);
      }
    }
    console.log(groupedMessages);
    setSortedMessages(groupedMessages);
  };

  return (
    <section className="chat-box">
      <div className="chat-box__header">
        <Avatar src={image} />
        <div className="chat-box__info">
          <h3>{roomName}</h3>
          <p>
            Last seen at{" "}
            {messages.length
              ? new Date(
                  messages[messages.length - 1]?.timestamp?.toDate()
                ).toLocaleString("en-US", { timeZone: "Asia/Manila" })
              : "..."}
          </p>
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
        {messages.map((message) => (
          <div
            className={`chat-box__body--message ${
              message.userId === uid && "chat-box__receiver"
            }`}
            key={message.timestamp}
          >
            <span className="chat-box__body--name">
              <Avatar src={message.photoURL} sx={{ width: 24, height: 24 }} />
              {message.name}
            </span>
            <p> {message.message}</p>
            <span className="chat-box__body--timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </div>
        ))}
      </div>
      <div className="chat-box__footer">
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send
          </button>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </section>
  );
}

export default ChatBox;
