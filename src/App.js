import { useEffect, useState } from "react";
import io from "socket.io-client";
import ReactHowler from "react-howler";

console.log("initializing socket");
const socket = io("https://pit-applause-server.herokuapp.com");

function App() {
  const [name, setName] = useState("");
  const [entered, setEntered] = useState(false);
  const [count, setCount] = useState(1);
  const [clapping, setClapping] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    socket.on("welcome", (payload) => {
      setEntered(true);
      setCount(payload.count);
      setClapping(payload.clapping);
    });

    socket.on("update", (payload) => {
      if (entered) {
        setCount(payload.count);
        setClapping(payload.clapping);
      }
    });

    socket.on("error", (message) => {
      setError(message);
    });
  }, [entered]);

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      socket.emit("enter", name);
    }
  };

  const onPlay = () => {
    socket.emit("clap", name);
  };

  const onStop = () => {
    socket.emit("end_clap", name);
  };

  const onMock = () => {
    const personNum = Math.ceil(Math.random() * 1000);
    socket.emit("enter", `Person ${personNum}`);
    socket.emit("clap", `Person ${personNum}`);
  };

  const onClear = () => {
    socket.emit("clear");
  };

  return !entered ? (
    <div>
      Enter your name:
      <input
        onChange={({ target }) => setName(target.value)}
        onKeyPress={onKeyPress}
      />
      {error && <div>{error}</div>}
    </div>
  ) : (
    <div>
      <button onMouseDown={onPlay} onMouseUp={onStop}>
        Play!
      </button>
      {name === "root" && (
        <>
          <button onMouseDown={onMock}>Mock Person</button>
          <button onMouseDown={onClear}>Clear All</button>
        </>
      )}
      <div>{count} here</div>
      <div>{clapping.length} clapping</div>
      {clapping.map((name) => (
        <div key={name}>{name}</div>
      ))}
      {clapping.map((name) => (
        <ReactHowler key={name} src="clapping.mp3" loop html5 />
      ))}
    </div>
  );
}

export default App;
