import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import Home from "./pages/Home";
import Ras from "./pages/Ras";
import Notifications from "./pages/Notifications";
import Login from "./pages/Login";
import domain from "./domain";
import YoadHeaderlogo from "./YoadHeaderlogo";
import YoadHeadermas from "./YoadHeadermas";

import { getMessaging, onMessage } from "firebase/messaging";

function App() {
  const [home, sethome] = useState(true);
  const [rasortasks, setrasortasks] = useState(false);
  const [user, setUser] = useState(false);
  const [token, setToken] = useState(false);

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
    const userRes = await Axios.get(domain + "/loggedIn", token);
    setUser(userRes.data);
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="App">
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        animation
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          minWidth: 200,
        }}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">{notification.title}</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>{notification.body}</Toast.Body>
      </Toast>{" "}
      {/* <h1 style={{ textAlign: "center" }}>Neurobica Adminnistration</h1> */}
      <YoadHeaderlogo />
      <ReactNotifications />
      <Login user={user} setuser={setUser} token={token} settoken={setToken} />
      {user ? (
        home ? (
          <Home sethome={sethome} setrasortasks={setrasortasks} />
        ) : rasortasks ? (
          <Ras tok={token} sethome={sethome} setrasortasks={setrasortasks} />
        ) : (
          <Notifications
            sss={setTokenFound}
            tok={token}
            sethome={sethome}
            setrasortasks={setrasortasks}
          />
        )
      ) : null}
      <YoadHeadermas />
    </div>
  );
}

export default App;
