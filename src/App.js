import logo from "./logo.svg";
import "./App.css";
import { fetchToken, onMessageListener } from "./firebase";
import { Button, Toast } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import Home from "./pages/Home";
import Ras from "./pages/Ras";
import Planner from "./pages/Planner";
import Notifications from "./pages/Notifications";
import Login from "./pages/Login";
import domain from "./domain";
import YoadHeaderlogo from "./YoadHeaderlogo";
import YoadHeadermas from "./YoadHeadermas";
import { ReactNotifications } from "react-notifications-component";
import { Store } from "react-notifications-component";
import { getMessaging, onMessage } from "firebase/messaging";
import AuthService from "./services/auth.service";

function App() {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [isTokenFound, setTokenFound] = useState(false);

  const [home, sethome] = useState(true);
  const [page, setpage] = useState("home");
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

  fetchToken(setTokenFound, null);

  onMessageListener()
    .then((payload) => {
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      setShow(true);
      console.log(payload);
    })
    .catch((err) => console.log("failed: ", err));

  const onShowNotificationClicked = () => {
    setNotification({
      title: "Notification",
      body: "This is a test notification",
    });
    setShow(true);
  };

  async function getUser() {
    const userRes = AuthService.getCurrentUser();
    setUser(userRes.accessToken);
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
      </Toast>

      <YoadHeaderlogo />
      <ReactNotifications />
      <Login user={user} setuser={setUser} />
      {user ? (
        page === "home" ? (
          <Home setpage={setpage} />
        ) : page === "ras" ? (
          <Ras setpage={setpage} />
        ) : page === "recp" ? (
          <Planner setpage={setpage} />
        ) : page === "noti" ? (
          <Notifications
            sss={setTokenFound}
            sethome={sethome}
            setpage={setpage}
          />
        ) : null
      ) : null}
      <YoadHeadermas />
    </div>
  );
}

export default App;
