import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import Home from "./pages/Home";
import Ras from "./pages/Ras";
import Tasks from "./pages/Tasks";
import Login from "./pages/Login";

function App() {
  const [home, sethome] = useState(true);
  const [rasortasks, setrasortasks] = useState(false);
  const [user, setUser] = useState(false);

  Axios.defaults.withCredentials = true;

  async function getUser() {
    const userRes = await Axios.get("http://localhost:5000/loggedIn");
    setUser(userRes.data);
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Neurobica Adminnistration</h1>
      <Login user={user} setuser={setUser} />
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
