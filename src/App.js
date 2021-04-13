import { useEffect, useState } from "react";
import io from "socket.io-client";
import useSound from "use-sound";
import newHorizon from "./sounds/dillon-anh.m4a";

console.log("initializing socket");
const socket = io("localhost:8080");

function App() {
  const [play, { stop }] = useSound(newHorizon);
  const [name, setName] = useState("");
  const [entered, setEntered] = useState(false);
  const [count, setCount] = useState(1);
  const [clapping, setClapping] = useState(0);

  useEffect(() => {
    socket.on("update", (payload) => {
      console.log(payload);
      setCount(payload.count);
      setClapping(payload.clapping);
    });
  }, []);

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      setEntered(true);
      socket.emit("enter", name);
    }
  };

  const onPlay = () => {
    socket.emit("clap");
  };

  const onStop = () => {
    socket.emit("end_clap");
  };

  return !entered ? (
    <div>
      Enter your name:
      <input
        onChange={({ target }) => setName(target.value)}
        onKeyPress={onKeyPress}
      />
    </div>
  ) : (
    <div>
      <button onMouseDown={onPlay} onMouseUp={onStop}>
        Play!
      </button>
      <div>{count} here</div>
      <div>{clapping} clapping</div>
    </div>
  );
}

export default App;
