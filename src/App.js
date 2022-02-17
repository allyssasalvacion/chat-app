import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import ChatBox from "./components/ChatBox/ChatBox";

function App() {
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <ChatBox />
      </div>
    </div>
  );
}

export default App;
