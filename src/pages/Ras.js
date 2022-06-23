import { useEffect, useState } from "react";
import Axios from "axios";
import Modal from "react-modal";
import domain from "../domain";

function Ras(props) {
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
      const res = await Axios.get(domain + "/all/" + props.tok);
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
    const res = await Axios.post(domain + "/sign", {
      id: pub._id,
      tok: props.tok,
    });
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
    const res = await Axios.post(domain + "/publish", {
      tok: props.tok,
      desc: in1,
      time: in2,
    });
    return res.data;
  }

  return (
    <div className="Ras">
      <h2>Read & Sign</h2>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <h3 style={{ fontSize: "30pt", textAlign: "center" }}>
            Publish a new publication:
          </h3>
          <br /> <br />
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%", textAlign: "center" }}>
              <h3 style={{ height: "250px" }}>Description:</h3>
              <br />
              <h3>Target Date:</h3>
              <br />
            </div>
            <div
              style={{
                width: "50%",
                float: "left",
                textAlign: "center",
                height: "200px",
              }}
            >
              <br />{" "}
              <textarea
                onChange={(e) => {
                  setin1(e.target.value);
                }}
                value={in1}
                style={{
                  textAlign: "center",
                  fontSize: "18pt",
                  width: "70%",
                  height: "230px",
                }}
              />
              <br /> <br />
              <br /> <br />
              <input
                onChange={(e) => {
                  setin2(e.target.value);
                }}
                value={in2}
                type="date"
                style={{
                  textAlign: "center",
                  fontSize: "18pt",
                  width: "70%",
                  height: "23px",
                }}
              />
              <br /> <br />
              <p style={{ color: "green", backgroundColor: "yellow" }}>{me}</p>
              <br /> <br />
            </div>
          </div>
          <br />
          <br />
          <br />
          <button
            className="footercancelbutton"
            onClick={() => {
              setme("");

              setin1("");
              setin2("");

              closeModal();
            }}
            style={{
              fontSize: "16pt",
              width: "300px",
              height: "50px",
            }}
          >
            Cancel
          </button>{" "}
          <button
            style={{
              width: "87px",
              height: "50px",
              backgroundColor: "unset",
              border: "0px solid black",
              cursor: "unset",
            }}
          ></button>
          <button
            onClick={async () => {
              setme("");

              if (await send()) {
                setin1("");
                setin2("");
                setme("Succsesfully Saved");
              } else {
              }
              setr(Math.random());
            }}
            style={{ fontSize: "16pt", width: "300px", height: "50px" }}
          >
            Save
          </button>{" "}
          <button
            style={{
              width: "87px",
              height: "50px",
              backgroundColor: "unset",
              border: "0px solid black",
              cursor: "unset",
            }}
          ></button>
          <button
            onClick={async () => {
              setme("");

              if (await send()) {
                setin1("");
                setin1("");
                closeModal();
              } else {
              }
            }}
            style={{ fontSize: "16pt", width: "300px", height: "50px" }}
          >
            Save and close
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={modalIsOpen2}
        onAfterOpen={afterOpenModal2}
        onRequestClose={closeModal2}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>Are you sure you have read the folowing publication:</div>
        <br />
        <div style={{ color: "red" }}>
          {publication && publication.desc}
        </div>{" "}
        <br />
        <div>And you want to sign it?</div>
        <br />
        <button onClick={closeModal2}>No</button>
        <span style={{ width: "5vw", color: "white" }}> </span>
        <button
          onClick={() => {
            sign(publication);
            closeModal2();
          }}
        >
          Yes
        </button>
      </Modal>

      <div>
        <button
          style={{
            color: "white",
            fontSize: "15pt",
            backgroundColor: "red",
            borderRadius: "100px",
          }}
          onClick={() => {
            const back = props.sethome;
            back(true);
          }}
        >
          Return Home
        </button>
      </div>
      <br />
      <button
        style={{
          color: "yellow",
          fontSize: "20pt",
          backgroundColor: "blue",
          borderRadius: "100px",
        }}
        onClick={() => {
          openModal();
        }}
      >
        Publish new
      </button>
      <br />
      <br />
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
                <tr
                  key={i}
                  onClick={() => {
                    setpublication(item);
                    openModal2();
                  }}
                >
                  <td>{item.owner || "Loading..."}</td>
                  <td>{item.desc || "Loading..."}</td>
                  <td>
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
                  <td>
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

export default Ras;
