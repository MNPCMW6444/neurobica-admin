import { useEffect, useState } from "react";
import Axios from "axios";
import Modal from "react-modal";

function Ras() {
  const [in1, setin1] = useState();
  const [in2, setin2] = useState();
  const [in3, setin3] = useState();

  const [modalIsOpen, setIsOpen] = useState(false);

  const [items, setitems] = useState([
    {
      Publishedby: "checking what is the Publishedby with server",
      PublishTime: "checking what is the PublishTime with server",
      Signedby: "checking what is the Signedby with server",
      TargetTime: "checking what is the TargetTime with server",
    },
  ]);
  //https://neuronbica-admin.herokuapp.com/all
  useEffect(() => {
    async function getit() {
      const res = await Axios.get("http://localhost:5000/all");
      if (res.data.length > 0) setitems(res.data);
    }

    getit();
  }, []);

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
        <div style={{}}>
          <h2 style={{ fontSize: "30pt", textAlign: "center" }}>
            טופס הוספת משתמש חדש:
          </h2>
          <br /> <br />
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%", textAlign: "center" }}>
              <h2>מספר אישי:</h2>
              <br />
              <h2>כינוי:</h2>
              <br />
              <h2>סיסמה ראשונית:</h2>
              <br />
            </div>
            <div style={{ width: "50%", float: "left", textAlign: "center" }}>
              <br />{" "}
              <input
                onChange={(e) => {
                  setin1(e.target.value);
                }}
                value={in1}
                style={{
                  textAlign: "center",
                  fontSize: "18pt",
                  width: "70%",
                  height: "23px",
                }}
              />
              <br /> <br />
              <br /> <br />
              <input
                onChange={(e) => {
                  setin2(e.target.value);
                }}
                value={in2}
                style={{
                  textAlign: "center",
                  fontSize: "18pt",
                  width: "70%",
                  height: "23px",
                }}
              />
              <br /> <br />
              <br /> <br />
              <input
                onChange={(e) => {
                  setin3(e.target.value);
                }}
                value={in3}
                style={{
                  textAlign: "center",
                  fontSize: "18pt",
                  width: "30%",
                  height: "23px",
                }}
              />{" "}
              <button
                onClick={() => {
                  var result = "";
                  var characters =
                    /* "ABCDEFGHIJKLMNOPQRSTUVWXYZ4567890abcdefghijklmnopqrstuv" +*/ "wxyz123";
                  var charactersLength = characters.length;
                  for (var i = 0; i < 6; i++) {
                    result += characters.charAt(
                      Math.floor(Math.random() * charactersLength)
                    );
                  }
                  setin3(result);
                }}
                style={{ width: "20%", fontSize: "18pt" }}
              >
                צור קל
              </button>
              <button
                onClick={() => {
                  var result = "";
                  var characters =
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZ4567890abcdefghijklmnopqrstuv" +
                    "wxyz123";
                  var charactersLength = characters.length;
                  for (var i = 0; i < 10; i++) {
                    result += characters.charAt(
                      Math.floor(Math.random() * charactersLength)
                    );
                  }
                  setin3(result);
                }}
                style={{ width: "20%", fontSize: "18pt" }}
              >
                צור קשה
              </button>
            </div>
          </div>
          <br />
          <br />
          <br />
          <button
            className="footercancelbutton"
            onClick={() => {
              closeModal();
            }}
            style={{
              fontSize: "16pt",
              width: "300px",
              height: "50px",
            }}
          >
            בטל
          </button>
          <button
            style={{
              width: "87px",
              height: "50px",
              backgroundColor: "unset",
              cursor: "unset",
            }}
          ></button>
          <button
            onClick={async () => {
              if (/* await send() */ true) {
                setin1("");
                setin2("");
                setin3("");
              } else {
              }
            }}
            style={{ fontSize: "16pt", width: "300px", height: "50px" }}
          >
            שמור והוסף משתמש חדש
          </button>
          <button
            style={{
              width: "87px",
              height: "50px",
              backgroundColor: "unset",
              cursor: "unset",
            }}
          ></button>
          <button
            onClick={async () => {
              if (/* await send() */ true) {
                closeModal();
              } else {
              }
            }}
            style={{ fontSize: "16pt", width: "300px", height: "50px" }}
          >
            שמור וחזור לספר טלפונים
          </button>
        </div>
      </Modal>
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
      <table>
        <tbody>
          <tr>
            <th>Published by</th>
            <th>Publish Time</th>
            <th>Signed by</th>
            <th>Target Time</th>
          </tr>
          {items &&
            items.map((item, i) => (
              <tr key={i}>
                <td>{item.Publishedby}</td>
                <td>{item.PublishTime}</td>
                <td>{item.Signedby}</td>
                <td>{item.TargetTime}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Ras;
