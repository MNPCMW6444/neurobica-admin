import { useNavigate } from "react-router-dom";

function Home(props) {
  const hrefs = [
    {
      name: "PI Sheet",
      url: "https://docs.google.com/spreadsheets/d/1vgsSeyC7jBrNFhBbti38cC-i1gjR96ijB4nWr5h6fLk/edit",
    },
    {
      name: "confluence",
      url: "https://neurobica.atlassian.net/wiki/spaces/NEUROBICA/overview",
    },
    {
      name: "Google Tasks",
      url: "https://mail.google.com/mail/u/1/#chat/space/AAAAWAsxKy0",
    },
    {
      name: "Add a new one here",
      url: "mailto:coo@neurobica.online?subject='please add this link'",
      x: true,
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="Home">
      <div>
        <h1 style={{ fontSize: "8em" }}>Daily:</h1>
        <h2>Internal Components:</h2>
        <br />
        <button
          className="rbutton"
          onClick={() => {
            props.setpage("ras");
            console.log("ras");
          }}
        >
          Read & Sign
        </button>
        <br />
        <br />
        <button
          className="rbutton"
          onClick={() => {
            props.setpage("recp");
            console.log("recp");
          }}
        >
          Recrusive Planner
        </button>{" "}
        <br />
        <br /> <br />
        <br />
        <h2>External Links:</h2>
        {hrefs.map((href) => (
          <>
            {" "}
            <br />
            <a
              className="rbutton"
              href={href.url}
              style={href.x && { fontSize: "1.3rem" }}
            >
              {href.name}
            </a>
          </>
        ))}
      </div>
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <div>
        <h1 style={{ fontSize: "8em" }}>Utilities:</h1>
        <h2>Internal Components:</h2>
        <br />
        <button
          className="rbutton"
          onClick={() => {
            props.setpage("wt");
            console.log("wt");
          }}
        >
          Work Tracer
        </button>
        <br />
        <br />
        <button
          className="rbutton"
          onClick={() => {
            navigate("/fin");
          }}
        >
          Finance
        </button>
        <br />
        <br />
      </div>
    </div>
  );
}

export default Home;
