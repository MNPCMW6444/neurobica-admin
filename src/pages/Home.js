function Home(props) {
  hrefs = [
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
      <h1>BDM:</h1>
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
      </button>
      {hrefs.map((href) => (
        <>
          {" "}
          <br />
          <br />
          <a className="rbutton" href={href.url}>
            {href.name}
          </a>
        </>
      ))}
    </div>
  );
}

export default Home;
