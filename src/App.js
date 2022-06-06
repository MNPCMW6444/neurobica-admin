import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import Home from "./pages/Home";
import Ras from "./pages/Ras";
import Tasks from "./pages/Tasks";

function App() {
  const [home, sethome] = useState(true);
  const [rasortasks, setrasortasks] = useState(false);

  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Neurobica Adminnistration</h1>

      {home ? (
        <Home sethome={sethome} setrasortasks={setrasortasks} />
      ) : rasortasks ? (
        <Ras />
      ) : (
        <Tasks />
      )}
    </div>
  );
}

export default App;
