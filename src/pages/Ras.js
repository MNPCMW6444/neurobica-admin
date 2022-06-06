import { useEffect, useState } from "react";
import Axios from "axios";

function Ras() {
  const [items, setitems] = useState([
    {
      Publishedby: "checking what is the Publishedby with server",
      PublishTime: "checking what is the PublishTime with server",
      Signedby: "checking what is the Signedby with server",
      TargetTime: "checking what is the TargetTime with server",
    },
  ]);

  useEffect(() => {
    async function getit() {
      const res = await Axios.get(`https://asdasdasd/all`);
      debugger;
      if (res.data.length > 0) setitems(res.data);
    }
    getit();
  }, []);

  return (
    <div className="Ras">
      <h2>Read & Sign</h2>
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
