import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { useStateValue } from "./StateProvider";

import Login from "./components/Login/Login";
import Sidebar from "./components/Sidebar/Sidebar";
import ChatBox from "./components/ChatBox/ChatBox";

function App() {
  const [{ user }, dispatch] = useStateValue();
  const uid =
    localStorage.getItem("uid") !== undefined
      ? localStorage.getItem("uid")
      : null;

  return (
    <div className="app">
      {!user && !uid ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Routes>
              <Route path="/rooms/:roomId" element={<ChatBox />} />
              <Route path="/" element={<></>} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
