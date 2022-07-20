import React, { useEffect, useState } from "react";
import Axios from "axios";
import domain from "../../domain";
import authHeader from "../../services/auth-header";

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

export default function Task(props) {
  const [newname, setnewname] = useState(props.it.name);
  const [newdesc, setnewdesc] = useState(props.it.desc);
  const [newnewname, setnewnewname] = useState();
  const [newnewdesc, setnewnewdesc] = useState();
  const [newroot, setnewroot] = useState(false);

  const [save_aysinc, ssave_aysinc] = useState("Save");
  console.log(props.it.status);
  const [status_aysinc, sstatus_aysinc] = useState(
    props.it.status
      ? props.it.status % 3 === 0
        ? "red"
        : props.it.status % 3 === 1
        ? "yellow"
        : "green"
      : "red"
  );
  const [delete_aysinc, sdelete_aysinc] = useState("Delete");

  async function save() {
    let flag = false;
    if (save_aysinc === "Save") {
      ssave_aysinc("Saving...");
      try {
        const res = await Axios.post(domain + "/editnewtask", {
          id: props.it._id,
          name: newname,
          desc: newdesc,
          headers: authHeader(),
        });
        flag = true;
        props.setr(Math.random());
      } catch (e) {
        ssave_aysinc("Error!");
        setTimeout(() => {
          ssave_aysinc("Save");
        }, 1000);
      } finally {
        props.setr(Math.random);
        if (flag) {
          ssave_aysinc("Saved!");
          setTimeout(() => {
            ssave_aysinc("Save");
          }, 1000);
        }
      }
    }
  }

  async function status() {
    let flag = false;

    if (
      status_aysinc === "red" ||
      status_aysinc === "yellow" ||
      status_aysinc === "green"
    ) {
      let scache = status_aysinc;
      sstatus_aysinc("unicorn");
      try {
        const res = await Axios.post(domain + "/status", {
          id: props.it._id,
          headers: authHeader(),
        });
        flag = true;
      } catch (e) {
        sstatus_aysinc("black");
        setTimeout(() => {
          sstatus_aysinc(scache);
        }, 1000);
      } finally {
        props.setr(Math.random);
        if (flag) {
          sstatus_aysinc(
            scache === "red" ? "yellow" : scache === "yellow" ? "green" : "red"
          );
        }
      }
    }
  }

  async function savesub() {
    let flag = false;
    if (save_aysinc === "Save") {
      ssave_aysinc("Saving...");
      try {
        const res = await Axios.post(domain + "/savesub", {
          name: newnewname,
          desc: newnewdesc,
          parentId: props.it._id,
          headers: authHeader(),
        });
        flag = true;
      } catch (e) {
        ssave_aysinc("Error!");
        setTimeout(() => {
          ssave_aysinc("Save");
        }, 1000);
      } finally {
        props.setr(Math.random);
        if (flag) {
          ssave_aysinc("Saved!");
          setTimeout(() => {
            ssave_aysinc("Save");
          }, 1000);
        }
      }
    }
  }

  async function deletea() {
    let flag = false;
    if (delete_aysinc === "Delete") {
      sdelete_aysinc("Deliting...");
      try {
        const res = await Axios.post(domain + "/deletet", {
          id: props.it._id,
          headers: authHeader(),
        });
        flag = true;
      } catch (e) {
        sdelete_aysinc("Error!");
        setTimeout(() => {
          sdelete_aysinc("Delete");
        }, 1000);
      } finally {
        props.setr(Math.random);
        if (flag) {
          sdelete_aysinc("Deleted!");
          setTimeout(() => {
            sdelete_aysinc("Delete");
          }, 1000);
        }
      }
    }
  }

  return (
    <div>
      <br />
      <div style={{ border: "3px solid yellow" }}>
        <div
          onClick={() => {
            status();
          }}
        >
          <Table style={{ tableLayout: "fixed" }}>
            <Thead>
              <Tr className={status_aysinc}>
                <Th style={{ width: "15%" }}>E2E Responsible:</Th>
                <Th style={{ width: "15%" }}>Name:</Th>
                <Th style={{ width: props.editmode ? "50%" : "70%" }}>
                  Description:
                </Th>
                {props.editmode && <Th style={{ width: "10%" }}></Th>}
                {props.editmode && <Th style={{ width: "10%" }}></Th>}
              </Tr>
            </Thead>
            <Tbody>
              <Tr className={status_aysinc + "l"}>
                <Td>{props.it.owner}</Td>
                <Td>
                  {props.editmode ? (
                    <input
                      style={{ maxWidth: "100%" }}
                      value={newname}
                      onChange={(e) => {
                        ssave_aysinc("Save");
                        setnewname(e.target.value);
                      }}
                    ></input>
                  ) : (
                    <div>{props.it.name}</div>
                  )}
                </Td>
                <Td>
                  {props.editmode ? (
                    <textarea
                      style={{ maxWidth: "100%" }}
                      value={newdesc}
                      onChange={(e) => {
                        ssave_aysinc("Save");
                        setnewdesc(e.target.value);
                      }}
                    ></textarea>
                  ) : (
                    <div>{props.it.desc}</div>
                  )}
                </Td>

                {props.editmode && (
                  <Td>
                    <button
                      className="rbutton"
                      style={{
                        fontSize: "1rem",
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
                        setnewroot(true);
                        save();
                      }}
                    >
                      {save_aysinc}
                    </button>
                  </Td>
                )}
                {props.editmode && (
                  <Td>
                    <button
                      className="rbutton"
                      style={{
                        fontSize: "0.5rem",
                        maxWidth: "100%",
                        backgroundColor:
                          delete_aysinc === "Delete"
                            ? ""
                            : delete_aysinc === "Error!"
                            ? "red"
                            : delete_aysinc === "Deliting..."
                            ? "yellow"
                            : "green",
                      }}
                      onClick={() => {
                        setnewroot(true);
                        deletea();
                      }}
                    >
                      {delete_aysinc}
                    </button>
                  </Td>
                )}
              </Tr>
            </Tbody>
          </Table>
        </div>
        {props.it.children && props.it.children.length > 0 && (
          <div
            style={{
              position: "relative",
              width: "92%",
              left: "4%",
            }}
          >
            <div>
              {props.it.children.map((child) => (
                <Task
                  it={child}
                  setr={props.setr}
                  username={props.username}
                  editmode={props.editmode}
                />
              ))}
            </div>
          </div>
        )}
        {props.editmode && (
          <div>
            {!newroot && (
              <button
                style={{
                  borderRadius: "8%",
                  border: "1px solid pink",
                  backgroundColor: "green",
                  color: "white",
                  fontSize: "1em",
                  width: "50%",
                }}
                onClick={() => {
                  setnewroot(true);
                }}
              >
                ➕ Create a new task here
              </button>
            )}
          </div>
        )}
        {props.editmode && newroot && (
          <div
            style={{
              position: "relative",
              width: "92%",
              left: "4%",
            }}
          >
            <br />
            <Table>
              <Thead>
                <Tr>
                  <Th style={{ width: "10%" }}>E2E Responsible:</Th>
                  <Th style={{ width: "10%" }}>Name:</Th>
                  <Th style={{ width: "80%" }}>Description:</Th>
                  {props.editmode && <Th style={{ width: "80%" }}></Th>}
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{props.username}</Td>
                  <Td>
                    <input
                      style={{ maxWidth: "100%" }}
                      value={newnewname}
                      onChange={(e) => {
                        setnewnewname(e.target.value);
                        ssave_aysinc("Save");
                      }}
                    ></input>
                  </Td>
                  <Td>
                    <textarea
                      style={{ maxWidth: "100%" }}
                      value={newnewdesc}
                      onChange={(e) => {
                        setnewnewdesc(e.target.value);
                        ssave_aysinc("Save");
                      }}
                    ></textarea>
                  </Td>
                  {props.editmode && (
                    <Td>
                      <button
                        className="rbutton"
                        style={{
                          fontSize: "1rem",
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
                          setnewroot(true);
                          savesub();
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
      </div>
    </div>
  );
}
