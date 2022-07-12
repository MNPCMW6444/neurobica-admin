import { useEffect, useState } from "react";
import Axios from "axios";
import Modal from "react-modal";
import domain from "./domain";
import authHeader from "./services/auth-header";

function PPT(props) {
  const [in1, setin1] = useState();
  const [in2, setin2] = useState();
  const [me, setme] = useState();
  const [r, setr] = useState();
  const [publication, setpublication] = useState();
  //const [mouse, setmouse] = useState(new Array());

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);

  const [items, setitems] = useState([{}]);
  useEffect(() => {
    async function getit() {
      const res = await Axios.get(domain + "/all2/", { headers: authHeader() });
      let itemsb = new Array();
      if (res.data.length > 0) itemsb = res.data;
      for (let i = 0; i < itemsb.length; i++) {
        itemsb[i].mouse = false;
      }
      setitems(itemsb);
    }

    getit();
  }, [r]);

  async function sign(pub) {
    const res = await Axios.post(
      domain + "/sign",
      {
        id: pub._id,
      },
      { headers: authHeader() }
    );
    setr(Math.random());
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "25%",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      overflow: "auto",
      maxHeight: "100vh",
    },
  };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
    setr(Math.random());
  }

  function openModal2() {
    setIsOpen2(true);
  }

  function afterOpenModal2() {}

  function closeModal2() {
    setIsOpen2(false);
  }

  async function send() {
    const res = await Axios.post(
      domain + "/publish",
      {
        desc: in1,
        time: in2,
      },
      { headers: authHeader() }
    );
    return res.data;
  }

  return (
    <div className="Ras">
      <div style={{ padding: "5vw", width: "90vw", overflowX: "auto" }}>
        <table>
          <tbody>
            <tr>
              <th>Published by</th>
              <th>Description</th>
              <th>Publish Time</th>
              <th>Signed by</th>
              <th>Target Time</th>
            </tr>
            {items &&
              items.map((item, i) => (
                <tr key={i}>
                  <td
                    onClick={() => {
                      setpublication(item);
                      openModal2();
                    }}
                  >
                    {item.owner || "Loading..."}
                  </td>
                  <td
                    onClick={() => {
                      setpublication(item);
                      openModal2();
                    }}
                  >
                    {item.desc || "Loading..."}
                  </td>
                  <td
                    onClick={() => {
                      setpublication(item);
                      openModal2();
                    }}
                  >
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleString()
                      : "Loading..."}
                  </td>
                  <td
                    onMouseEnter={() => {
                      let itemscopy = new Array();
                      for (let j = 0; j < items.length; j++) {
                        itemscopy.push(items[j]);
                      }
                      let firstitem = { ...itemscopy[i] };
                      firstitem.mouse = true;
                      itemscopy[i] = firstitem;
                      for (let j = 0; j < itemscopy.length; j++) {
                        if (i !== j) itemscopy[j].mouse = false;
                      }
                      setitems(itemscopy);
                    }}
                    onMouseLeave={() => {
                      let itemscopy = new Array();
                      for (let i = 0; i < items.length; i++) {
                        itemscopy.push(items[i]);
                      }
                      let firstitem = { ...itemscopy[i] };
                      firstitem.mouse = false;
                      itemscopy[i] = firstitem;
                      setitems(itemscopy);
                    }}
                    style={{
                      backgroundColor:
                        (item.sign1 ? 1 : 0) +
                          (item.sign2 ? 1 : 0) +
                          (item.sign3 ? 1 : 0) ===
                        3
                          ? "green"
                          : "red",
                    }}
                  >
                    {item.owner
                      ? 0 +
                        (item.sign1 ? 1 : 0) +
                        (item.sign2 ? 1 : 0) +
                        (item.sign3 ? 1 : 0) +
                        "/3"
                      : "Loading..."}
                    <div className={"hover" + item.mouse}>
                      <table>
                        <tr>
                          <th>name:</th>
                          <th>signiture:</th>
                        </tr>
                        <tr>
                          {" "}
                          <td>yoda</td>
                          <td style={{ color: item.sign1 ? "green" : "red" }}>
                            {item.sign1 ? "V" : "X"}
                          </td>
                        </tr>
                        <tr>
                          {" "}
                          <td>nelson</td>
                          <td style={{ color: item.sign2 ? "green" : "red" }}>
                            {item.sign2 ? "V" : "X"}
                          </td>{" "}
                        </tr>
                        <tr>
                          {" "}
                          <td>ovadov</td>
                          <td style={{ color: item.sign3 ? "green" : "red" }}>
                            {item.sign3 ? "V" : "X"}
                          </td>{" "}
                        </tr>
                      </table>
                    </div>
                  </td>
                  <td
                    onClick={() => {
                      setpublication(item);
                      openModal2();
                    }}
                  >
                    {item.owner
                      ? item.time
                        ? new Date(item.time).toLocaleString()
                        : "-"
                      : "Loading..."}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PPT;
