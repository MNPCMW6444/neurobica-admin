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
    console.log("Asdasd");
    if (save_aysinc === "Save") {
      ssave_aysinc("Saving...");
      try {
        const res = await Axios.post(domain + "/editnewtask", {
          id: props.it._id,
          name: newname,
          desc: newdesc,
          headers: authHeader(),
        });
      } catch (e) {
        ssave_aysinc("Save");
      }
      props.setr(Math.random);
      ssave_aysinc("Save");
    }
  }

  return (
    <div>
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
              {props.editmode ? (
                <input
                  style={{ maxWidth: "100%" }}
                  value={newname}
                  onChange={(e) => {
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
  );
}
