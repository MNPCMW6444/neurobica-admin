import logo from "./logo.svg";
import { Button, Toast } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import Home from "./pages/Home";
import Ras from "./pages/Ras";
import Wt from "./pages/Wt";
import Planner from "./pages/Planner/Planner";
import Notifications from "./pages/Notifications";
import Login from "./pages/Login";
import domain from "./domain";
import YoadHeaderlogo from "./YoadHeaderlogo";
import YoadHeadermas from "./YoadHeadermas";
import { ReactNotifications } from "react-notifications-component";
import { Store } from "react-notifications-component";
import AuthService from "./services/auth.service";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import authHeader from "./services/auth-header";

function App() {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [isTokenFound, setTokenFound] = useState(false);
  const [time, setime] = useState(9999);

  const [home, sethome] = useState(true);
  const [page, setpage] = useState("home");
  const [user, setUser] = useState(false);
  const [username, setUsername] = useState(false);

  Axios.defaults.withCredentials = true;

  async function getUser() {
    const userRes = AuthService.getCurrentUser();
    setUser(userRes.accessToken);
  }

  async function getName() {
    const u = await Axios.get(domain + "/myname", { headers: authHeader() });
    setUsername(u.data.itis);
  }

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getName();
  }, [user]);

  async function checkTime() {
    let t = (await Axios.get(domain + "/hmtime/", { headers: authHeader() }))
      .data.t;
    setime(t);
  }

  useEffect(async () => {
    async function a() {
      await checkTime();
    }
    await a();
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
        ) : page === "wt" ? (
          <Wt setpage={setpage} />
        ) : page === "recp" ? (
          <Planner setpage={setpage} username={username} time={time} />
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
