import React, { useEffect, useState } from "react";
import Axios from "axios";
import domain from "../../domain";
import authHeader from "../../services/auth-header";

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

export default function Task(props) {
  let save_aysinc = "Save";

  const [newname, setnewname] = useState(props.it.name);
  const [newdesc, setnewdesc] = useState(props.it.desc);

  async function save() {
    console.log("Asdasd");
    if (save_aysinc === "Save") {
      save_aysinc = "Saving...";
      try {
        const res = await Axios.post(domain + "/editnewtask", {
          id: props.it._id,
          name: newname,
          desc: newdesc,
          headers: authHeader(),
        });
      } catch (e) {
        save_aysinc = "Save";
      }
      props.setr(Math.random);
      save_aysinc = "Save";
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
            {props.editmode && (
              <Td rowSpan={2}>
                <button
                  className="rbutton"
                  style={{ fontSize: "2rem" }}
                  onClick={() => {
                    save();
                  }}
                >
                  {save_aysinc}
                </button>
              </Td>
            )}
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{props.username}</Td>
            <Td>
              {props.editmode ? (
                <input
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
                  value={newdesc}
                  onChange={(e) => {
                    setnewdesc(e.target.value);
                  }}
                ></textarea>
              ) : (
                <div>{props.it.desc}</div>
              )}
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </div>
  );
}
