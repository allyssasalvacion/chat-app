import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import db from "../../firebase";

import SidebarChat from "../SidebarChat/SidebarChat";

// components
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

// icons
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

function Sidebar() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  return (
    <section className="sidebar">
      <div className="sidebar__header">
        <Avatar
          alt="Allyssa Albores"
          src="/images/1.png"
          sx={{ width: 48, height: 48 }}
        />
        <div className="sidebar__header--icons">
          <IconButton aria-label="donut large">
            <DonutLargeIcon />
          </IconButton>

          <IconButton aria-label="chat">
            <ChatIcon />
          </IconButton>

          <IconButton aria-label="more vert">
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__search--container">
          <SearchOutlinedIcon />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </section>
  );
}

export default Sidebar;
