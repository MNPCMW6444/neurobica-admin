import { useEffect, useState } from "react";
import Axios from "axios";
import Task from "./Task";
import Modal from "react-modal";
import domain from "../../domain";
import authHeader from "../../services/auth-header";

function Planner(props) {
  const [res, setres] = useState();
  const [r, setr] = useState();

  useEffect(() => {
    async function getit() {
      const re = await Axios.get(domain + "/all/", { headers: authHeader() });
      setres(re);
    }
    getit();
  }, [r]);

  return (
    <div className="Planner">
      <h2>Recrusive Planner</h2>
      <div>
        <button
          style={{
            color: "white",
            fontSize: "15pt",
            backgroundColor: "red",
            borderRadius: "100px",
          }}
          onClick={() => {
            const back = props.setpage;
            back("home");
          }}
        >
          Return Home
        </button>
      </div>
      <div className="rp">
        {res &&
          res.length &&
          res.map((task) => <div>{<Task it={task} />}</div>)}
      </div>
    </div>
  );
}

export default Planner;
