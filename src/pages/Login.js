import Axios from "axios";
import React, { useState } from "react";
import domain from "../domain";

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
      const r = ////////
        await Axios.post(domain + "/login", loginData);
      const tok = r.data.unsec; //////

      async function getUser() {
        const userRes = await Axios.get(domain + "/loggedIn/" + tok);
        props.setuser(userRes.data);
      }
      await getUser();
      props.settoken(tok); /////////
    } catch (err) {
      seterror(err);
    }
  }

  return (
    <div>
      {props.user ? (
        <button
          onClick={async () => {
            // await Axios.get(domain + "/logout");
            props.setuser(null);
            props.settoken(null);
          }}
          style={{ color: "red", width: "10%" }}
        >
          Logout
        </button>
      ) : (
        <div className="auth-form">
          <h2>כניסה</h2>
          {error && (
            <>
              <div
                style={{
                  color: "red",
                  fontSize: "20pt",
                  backgroundColor: "white",
                  opacity: 0.8,
                }}
              >
                {"שגיאה: " +
                  error.response.data.errorMessage +
                  " (" +
                  error.response.status +
                  ")"}
              </div>{" "}
              <br />
            </>
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
        </div>
      )}
    </div>
  );
}

export default Login;
