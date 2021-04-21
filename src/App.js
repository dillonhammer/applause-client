import { useEffect, useState } from "react";
import io from "socket.io-client";
import "antd/dist/antd.css";
import Welcome from "./components/Welcome";
import Room from "./components/Room";

const socket = io("https://pit-applause-server.herokuapp.com");

function App() {
  const [name, setName] = useState("");
  const [entered, setEntered] = useState(false);
  const [count, setCount] = useState(1);
  const [clapping, setClapping] = useState([]);
  const [airhorns, setAirhorns] = useState([]);

  useEffect(() => {
    socket.on("welcome", (payload) => {
      setEntered(true);
      setName(payload);
    });

    socket.on("update", (payload) => {
      if (entered) {
        setCount(payload.count);
        setClapping(payload.clap);
        setAirhorns(payload.airhorn);
      }
    });
  }, [entered]);

  return !entered ? (
    <Welcome socket={socket} />
  ) : (
    <Room
      socket={socket}
      name={name}
      count={count}
      clapping={clapping}
      airhorns={airhorns}
    />
  );
}

export default App;
