import { useEffect, useState } from "react";
import Axios from "axios";
import Task from "./Task";
import Modal from "react-modal";
import domain from "../../domain";
import authHeader from "../../services/auth-header";
import Switch from "react-switch";

function Planner(props) {
  const [res, setres] = useState();
  const [r, setr] = useState();
  const [editmode, seteditmode] = useState();
  const [newroot, setnewroot] = useState();

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
      <br />
      <label style={{ fontSize: "2em" }}>
        View only mode:<span style={{ color: "white" }}> X</span>{" "}
      </label>
      <Switch
        onChange={() => {
          seteditmode(!editmode);
        }}
        checked={!editmode}
      />
      <div className="rp">
        {editmode && (
          <div>
            <button
              style={{
                borderRadius: "8%",
                border: "1px solid pink",
                backgroundColor: "green",
                color: "white",
                fontSize: "2em",
              }}
              onClick={() => {
                setnewroot(true);
              }}
            >
              ➕ Create a new task at root
            </button>
          </div>
        )}
        {editmode && newroot && (
          <div>
            <br />
            <table>
              <tr>
                <th style={{ width: "10%" }}>E2E Responsible:</th>
                <th style={{ width: "10%" }}>Name:</th>
                <th style={{ width: "80%" }}>Description:</th>
              </tr>
              <tr>
                <td>{props.username}</td>
                <td>
                  <input></input>
                </td>
                <td>
                  <textarea></textarea>
                </td>
              </tr>
            </table>
          </div>
        )}
        {res &&
          res.length &&
          res.map((task) => <div>{<Task it={task} />}</div>)}
      </div>
    </div>
  );
}

export default Planner;
