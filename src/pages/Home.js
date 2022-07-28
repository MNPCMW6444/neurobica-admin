function Home(props) {
  return (
    <div className="Home">
      <h2>Home</h2>
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
      <button
        className="rbuttonsmall"
        href="https://docs.google.com/spreadsheets/d/1vgsSeyC7jBrNFhBbti38cC-i1gjR96ijB4nWr5h6fLk/edit"
      >
        PI Sheets
      </button>
      <br />
      <br />
      <button className="rbuttonsmall" href="https://neurobica.atlassian.net/">
        Confluence
      </button>
    </div>
  );
}

export default Home;
