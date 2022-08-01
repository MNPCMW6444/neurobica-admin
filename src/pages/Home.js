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
      name: "Add a new one here",
      url: "mailto:cto@neurobica.online?subject='please add this link'",
    },
  ];

  return (
    <div className="Home">
      <div>
        <h1 style={{ fontSize: "8em" }}>Meeting:</h1>
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
            <a className="rbutton" href={href.url}>
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
        <h1 style={{ fontSize: "8em" }}>Tools:</h1>
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
      </div>
    </div>
  );
}

export default Home;
