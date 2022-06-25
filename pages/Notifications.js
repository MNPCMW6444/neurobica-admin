import { fetchToken } from "../firebase";
import { useState } from "react";

function Notifications(props) {
  const [mes, setmes] = useState();

  return (
    <div className="Notifications">
      <br />
      <br />
      <button
        style={{
          color: "white",
          fontSize: "15pt",
          backgroundColor: "red",
          borderRadius: "100px",
        }}
        onClick={() => {
          const back = props.sethome;
          back(true);
        }}
      >
        Return Home
      </button>
      <br />
      <br />
      <br />
      <button
        onClick={() => {
          if (setmes) fetchToken(props.sss, setmes, props.tok);
        }}
        style={{
          color: "black",
          fontSize: "25pt",
          backgroundColor: "orange",
          borderRadius: "100px",
        }}
      >
        Click to receive notifications
      </button>
      <p
        style={{
          color: "black",
          fontSize: "18pt",
          backgroundColor: "orange",
          borderRadius: "5px",
        }}
      >
        {mes}
      </p>
    </div>
  );
}

export default Notifications;
