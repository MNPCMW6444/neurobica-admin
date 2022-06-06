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
        className="rbutton"
        onClick={() => {
          props.sethome(false);
          props.setrasortasks(false);
        }}
      >
        Tasks
      </button>
    </div>
  );
}

export default Home;
