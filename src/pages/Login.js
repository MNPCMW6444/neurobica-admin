import Axios from "axios";
import React, { useContext, useState } from "react";

function Login(props) {
  const [name, setname] = useState();
  const [password, setpassword] = useState();
  const [error, seterror] = useState();

  async function login(e) {
    e.preventDefault();

    const loginData = {
      name: name,
      password: password,
    };

    try {
      await Axios.post("http://localhost:5000/login", loginData);
      async function getUser() {
        const userRes = await Axios.get("http://localhost:5000/loggedIn");
        props.setuser(userRes.data);
      }
      await getUser();
    } catch (err) {
      seterror(err);
    }
  }

  return (
    <div>
      {props.user ? (
        <button
          onClick={async () => {
            Axios.get("http://localhost:5000/logout");
            props.setuser(null);
          }}
          style={{ color: "red", width: "10%" }}
        >
          Logout
        </button>
      ) : (
        <div className="auth-form">
          <h2>כניסה</h2>
          {error && (
            <div style={{ color: "red", fontSize: "20pt" }}>{"שגיאה"}</div>
          )}
          <form className="form" onSubmit={login}>
            <label htmlFor="form-ma">Name:</label>
            <input
              id="form-ma"
              type="string"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
            <br></br>
            <br />
            <label htmlFor="form-password">Password: </label>
            <input
              id="form-password"
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />{" "}
            <br></br> <br></br>
            <button className="btn-submit" type="submit">
              היכנס
            </button>{" "}
            <br></br>
            <br /> <br /> <br></br>
            <br /> <br />
          </form>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      )}
    </div>
  );
}

export default Login;
