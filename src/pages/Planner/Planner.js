import { useEffect, useState } from "react";
import Axios from "axios";
import Task from "./Task";
import domain from "../../domain";
import authHeader from "../../services/auth-header";
import Switch from "react-switch";

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

function Planner(props) {
  const [res, setres] = useState();
  const [r, setr] = useState();
  const [editmode, seteditmode] = useState();
  const [newroot, setnewroot] = useState();

  const [newname, setnewname] = useState();
  const [newdesc, setnewdesc] = useState();

  const [save_aysinc, ssave_aysinc] = useState("Save");

  async function save() {
    console.log("Asdasd");
    if (save_aysinc === "Save") {
      ssave_aysinc("Saving...");
      try {
        const res = await Axios.post(domain + "/savenewtask", {
          name: newname,
          desc: newdesc,
          headers: authHeader(),
        });
      } catch (e) {
        ssave_aysinc("Save");
      }
      setnewname("");
      setnewdesc("");
      setnewroot(false);
      setr(Math.random);
      ssave_aysinc("Save");
    }
  }

  useEffect(() => {
    async function getit() {
      const re = await Axios.get(domain + "/allt/", { headers: authHeader() });
      setres(re.data);
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
            {!newroot && (
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
            )}
          </div>
        )}
        {editmode && newroot && (
          <div>
            <br />
            <Table>
              <Thead>
                <Tr>
                  <Th style={{ width: "10%" }}>E2E Responsible:</Th>
                  <Th style={{ width: "10%" }}>Name:</Th>
                  <Th style={{ width: "80%" }}>Description:</Th>
                  {editmode && <Th style={{ width: "80%" }}></Th>}
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{props.username}</Td>
                  <Td>
                    <input
                      style={{ maxWidth: "100%" }}
                      value={newname}
                      onChange={(e) => {
                        setnewname(e.target.value);
                      }}
                    ></input>
                  </Td>
                  <Td>
                    <textarea
                      style={{ maxWidth: "100%" }}
                      value={newdesc}
                      onChange={(e) => {
                        setnewdesc(e.target.value);
                      }}
                    ></textarea>
                  </Td>
                  {editmode && (
                    <Td>
                      <button
                        className="rbutton"
                        style={{ fontSize: "2rem", maxWidth: "100%" }}
                        onClick={() => {
                          save();
                        }}
                      >
                        {save_aysinc}
                      </button>
                    </Td>
                  )}
                </Tr>
              </Tbody>
            </Table>
          </div>
        )}
        {res &&
          res.map((task) => (
            <div>
              {
                <Task
                  it={task}
                  setr={setr}
                  username={props.username}
                  editmode={editmode}
                />
              }
            </div>
          ))}
      </div>
    </div>
  );
}

export default Planner;
