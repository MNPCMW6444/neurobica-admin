import React, { useState } from "react";

function Timer({ time }) {
  const [timeleft, setTimeleft] = useState(time);

  setTimeout(() => {
    if (timeleft <= 1) {
    } else setTimeleft(timeleft - 1);
  }, 1000);

  return (
    <div>
      <div style={{ fontSize: "3rem" }}>
        <div className="loader"></div> Loading...
        <div className="loader"></div>
      </div>
      <div>
        Maybe it will take {timeleft} more seconds. maybe even more. who knows
      </div>
    </div>
  );
}

export default Timer;
