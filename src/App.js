import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import Home from "./pages/Home";
import Ras from "./pages/Ras";
import Notifications from "./pages/Notifications";
import Login from "./pages/Login";
import domain from "./domain";

import "react-notifications-component/dist/theme.css";
import { ReactNotifications } from "react-notifications-component";
import { Store } from "react-notifications-component";

import { getMessaging, onMessage } from "firebase/messaging";

function App() {
  const [home, sethome] = useState(true);
  const [rasortasks, setrasortasks] = useState(false);
  const [user, setUser] = useState(false);

  const messaging = getMessaging();
  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    // ...
    Store.addNotification({
      title: payload.notification.title,
      message: payload.notification.body,
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
  });

  Axios.defaults.withCredentials = true;

  async function getUser() {
    const userRes = await Axios.get(domain + "/loggedIn");
    setUser(userRes.data);
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Neurobica Adminnistration</h1>
      <ReactNotifications />
      <Login user={user} setuser={setUser} />
      {user ? (
        home ? (
          <Home sethome={sethome} setrasortasks={setrasortasks} />
        ) : rasortasks ? (
          <Ras sethome={sethome} setrasortasks={setrasortasks} />
        ) : (
          <Notifications sethome={sethome} setrasortasks={setrasortasks} />
        )
      ) : null}
    </div>
  );
}

export default App;
