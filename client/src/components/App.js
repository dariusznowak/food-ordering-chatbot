import "./App.css";
import Sidebar from "./sidebar/Sidebar";
import Chat from "./chat/Chat";

function App() {
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
