import { useEffect, useState } from "react";
import Axios from "axios";
import Task from "./Task";
import domain from "../../domain";
import authHeader from "../../services/auth-header";
import Switch from "react-switch";
import Timer from "./Timer";

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

let timeasked;

function Planner(props) {
  const [res, setres] = useState();
  const [r, setr] = useState();
  const [editmode, seteditmode] = useState(false);
  const [newroot, setnewroot] = useState(false);

  const [newname, setnewname] = useState();
  const [newdesc, setnewdesc] = useState();
  const [time, setime] = useState(props.time);

  const [save_aysinc, ssave_aysinc] = useState("Save");

  async function save() {
    let flag = false;
    if (save_aysinc === "Save") {
      ssave_aysinc("Saving...");
      try {
        const res = await Axios.post(domain + "/savenewtask", {
          name: newname,
          desc: newdesc,
          headers: authHeader(),
        });
        flag = true;
      } catch (e) {
        ssave_aysinc("Error!");
        setTimeout(() => {
          ssave_aysinc("Save");
        }, 1000);
      } finally {
        setr(Math.random);
        if (flag) {
          ssave_aysinc("Saved!");
          setTimeout(() => {
            ssave_aysinc("Save");
            setnewroot(false);
            setnewdesc("");
            setnewname("");
          }, 1000);
        }
      }
    }
  }

  useEffect(() => {
    async function getit() {
      if (time !== 9999) {
        timeasked = Date.now();
        let list = (
          await Axios.get(domain + "/allt/", { headers: authHeader() })
        ).data;
        /*  let ress = [];
      for (let i = 0; i < re.length; i++) {
        if (!re[i].parent) {
          ress.push(re[i]);
          re.splice(i, 1);
          i--;
        }
      }
      while (re.length > 0)
        for (let i = 0; i < re.length; i++) {
          for(let j=0; j <ress.length;j++)
          if(findParent())
            ress[].push(re[i]);
        } */

        let map = {},
          node,
          roots = [],
          i;
        for (i = 0; i < list.length; i += 1) {
          map[list[i]._id] = i; // initialize the map
          list[i].children = []; // initialize the children
        }
        for (i = 0; i < list.length; i += 1) {
          node = list[i];

          if (node.parentId && node.parentId !== "0") {
            // if you have dangling branches check that map[node.parentId] exists
            list[map[node.parentId]].children.push(node);
          } else {
            roots.push(node);
          }
        }
        setres(roots);
        Axios.post(domain + "/letime", {
          took: Date.now() - timeasked,
          headers: authHeader(),
        });
        // seteditmode(false);
      } else {
        checkTime();
      }
    }
    getit();
  }, [r]);

  async function checkTime() {
    let t = (await Axios.get(domain + "/hmtime/", { headers: authHeader() }))
      .data.t;
    setime(t);
    setr(Math.random());
  }

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
      {res && (
        <>
          {" "}
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
        </>
      )}

      <div className="rp">
        {res ? (
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
          ))
        ) : (
          <Timer time={time} />
        )}
      </div>
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
                      ssave_aysinc("Save");
                    }}
                  ></input>
                </Td>
                <Td>
                  <textarea
                    style={{ maxWidth: "100%" }}
                    value={newdesc}
                    onChange={(e) => {
                      setnewdesc(e.target.value);
                      ssave_aysinc("Save");
                    }}
                  ></textarea>
                </Td>
                {editmode && (
                  <Td>
                    <button
                      className="rbutton"
                      style={{
                        fontSize: "2rem",
                        maxWidth: "100%",
                        backgroundColor:
                          save_aysinc === "Save"
                            ? ""
                            : save_aysinc === "Error!"
                            ? "red"
                            : save_aysinc === "Saving..."
                            ? "yellow"
                            : "green",
                      }}
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
    </div>
  );
}

export default Planner;
