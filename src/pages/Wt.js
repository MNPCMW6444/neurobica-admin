import React from "react";

import { useEffect, useState } from "react";
import Axios from "axios";
import domain from "../domain";
import authHeader from "../services/auth-header";

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

export default function Wt(props) {
  const [ttimesum, setttimesum] = useState(1);
  const [ttime, setttime] = useState([
    {
      type: "nocto",
      sum: "There is a serious and critical problem",
    },
  ]);
  const [r, setr] = useState();

  useEffect(() => {
    async function getit() {
      const res = await Axios.get(domain + "/getttime/", {
        headers: authHeader(),
      });
      setttime(res.data);
      setttimesum(
        res.data
          .map((o) => o.sum)
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
          )
      );
    }

    getit();
  }, [r]);

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  function convertMsToHM(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    let months = Math.floor(days / 30);
    let years = Math.floor(months / 12);

    seconds = seconds % 60;
    // 👇️ if seconds are greater than 30, round minutes up (optional)
    minutes = seconds >= 30 ? minutes + 1 : minutes;

    minutes = minutes % 60;

    // 👇️ If you don't want to roll hours over, e.g. 24 to 00
    // 👇️ comment (or remove) the line below
    // commenting next line gets you `24:00:00` instead of `00:00:00`
    // or `36:15:31` instead of `12:15:31`, etc.
    hours = hours % 24;
    days = days % 30;
    months = months % 12;

    return `${padTo2Digits(years)}y ${padTo2Digits(
      months
    )}months ${padTo2Digits(days)}d ${padTo2Digits(hours)}h ${padTo2Digits(
      minutes
    )}m ${padTo2Digits(seconds)}s`;
  }

  return (
    <div>
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
      <h1>Michael:</h1>
      <Table>
        <Thead>
          <Tr style={{ backgroundColor: "black" }}>
            {ttime.map((ttimetype) => (
              <Th>{ttimetype.type}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            {ttime.map((ttimetype) => (
              <Td>
                <div>
                  {convertMsToHM(ttimetype.sum) +
                    " which is " +
                    Math.round((ttimetype.sum / ttimesum) * 100) +
                    "%"}
                </div>
              </Td>
            ))}
          </Tr>
          <Tr>
            {ttime.map((ttimetype) => (
              <Td>
                <div>
                  <button
                    onClick={async () => {
                      Axios.post(
                        domain + "/start",
                        {
                          type: ttimetype.type,
                        },
                        { headers: authHeader() }
                      );
                    }}
                  >
                    start
                  </button>
                  <button
                    onclick={async () => {
                      Axios.post(
                        domain + "/stop",
                        {
                          type: ttimetype.type,
                        },
                        { headers: authHeader() }
                      );
                    }}
                  >
                    stop
                  </button>
                  <input type="number" />
                  <button>subtract minutes</button>
                </div>
              </Td>
            ))}
          </Tr>
        </Tbody>
      </Table>
    </div>
  );
}
