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
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const exitApp = () => {
    localStorage.removeItem("uid");
    window.location.reload();
    setLogout(true);
  };

  const photoUrl =
    localStorage.getItem("photoURL") !== ""
      ? localStorage.getItem("photoURL")
      : null;

  const displayName = localStorage.getItem("displayName");

  return (
    <section className="sidebar">
      <div className="sidebar__header">
        <Avatar
          alt={displayName}
          src={photoUrl}
          sx={{ width: 48, height: 48 }}
        />
        <div className="sidebar__header--icons">
          <IconButton aria-label="more vert" onClick={exitApp}>
            <ExitToAppIcon />
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
