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

  const getDate = (timestamp) => {
    return timestamp?.toDate().toLocaleString([], {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section className="chat-box">
      <div className="chat-box__header">
        <Avatar src={image} />
        <div className="chat-box__info">
          <h3>{roomName}</h3>
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
        {messages.map((message, i, array) => (
          <div key={message.timestamp}>
            <div className="chat-box__body--date">
              {i === 0 ? (
                <p>{getDate(array[i].timestamp)}</p>
              ) : getDate(array[i - 1].timestamp) !==
                getDate(array[i].timestamp) ? (
                <p>{getDate(array[i].timestamp)}</p>
              ) : (
                ""
              )}
            </div>
            <div
              className={`chat-box__body--message ${
                message.userId === uid && "chat-box__receiver"
              }`}
            >
              <span className="chat-box__body--name">
                <Avatar src={message.photoURL} sx={{ width: 24, height: 24 }} />
                {message.name}
              </span>
              <p> {message.message}</p>
              <span className="chat-box__body--timestamp">
                {new Date(message.timestamp?.toDate()).toLocaleString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
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
