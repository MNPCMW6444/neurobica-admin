import React, { useEffect, useState } from "react";
import Axios from "axios";
import domain from "../../domain";
import authHeader from "../../services/auth-header";

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

export default function Task(props) {
  const [newname, setnewname] = useState(props.it.name);
  const [newdesc, setnewdesc] = useState(props.it.desc);

  const [save_aysinc, ssave_aysinc] = useState("Save");

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

  return (
    <div style={{border: "2px solid purple", margin:"3vw"}}>
      
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
    </div>
  );
}
