function Home(props) {
  return (
    <div className="Home">
      <h2>Home</h2>

      <button
        className="rbutton"
        onClick={() => {
          props.sethome(false);
          props.setrasortasks(true);
        }}
      >
        Read & Sign
      </button>
      <br />
      <br />
      <button
        className="rbuttonsmall"
        onClick={() => {
          props.sethome(false);
          props.setrasortasks(false);
        }}
      >
        Notification Settings
      </button>
    </div>
  );
}

export default Home;
