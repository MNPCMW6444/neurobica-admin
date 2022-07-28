function Home(props) {
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
      <br />
      <br />
      <a
        className="rbutton"
        href="https://docs.google.com/spreadsheets/d/1vgsSeyC7jBrNFhBbti38cC-i1gjR96ijB4nWr5h6fLk/edit"
      >
        PI Sheets
      </a>
      <br />
      <br />
      <a className="rbutton" href="https://neurobica.atlassian.net/">
        Confluence
      </a>
    </div>
  );
}

export default Home;
