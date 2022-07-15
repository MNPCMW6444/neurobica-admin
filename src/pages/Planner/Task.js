import React, { useEffect, useState } from "react";
import Axios from "axios";
import domain from "../../domain";
import authHeader from "../../services/auth-header";

export default function Task(props) {
  let save_aysinc = "Save";

  const [newname, setnewname] = useState(props.it.name);
  const [newdesc, setnewdesc] = useState(props.it.desc);

  async function save() {
    console.log("Asdasd");
    if (save_aysinc === "Save") {
      save_aysinc = "Saving...";
      const res = await Axios.post(domain + "/editnewtask", {
        id: props.it._id,
        name: newname,
        desc: newdesc,
        headers: authHeader(),
      });
      props.setr(Math.random);
      save_aysinc = "Save";
    }
  }

  return (
    <div>
      <br />
      <table>
        <tr>
          <th style={{ width: "10%" }}>E2E Responsible:</th>
          <th style={{ width: "10%" }}>Name:</th>
          <th style={{ width: "80%" }}>Description:</th>
          {props.editmode && (
            <td rowSpan={2}>
              <button
                className="rbutton"
                style={{ fontSize: "2rem" }}
                onClick={() => {
                  save();
                }}
              >
                {save_aysinc}
              </button>
            </td>
          )}
        </tr>
        <tr>
          <td>{props.username}</td>
          <td>
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
          </td>
          <td>
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
          </td>
        </tr>
      </table>
    </div>
  );
}
