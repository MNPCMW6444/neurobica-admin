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
        onClick={() => {
          props.setpage("noti");
          console.log("noti");
        }}
      >
        Notification Settings
      </button>
    </div>
  );
}

export default Home;
