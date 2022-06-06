import { useEffect, useState } from "react";
import Axios from "axios";
import Modal from "react-modal";

function Ras() {
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
        asdasd
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
