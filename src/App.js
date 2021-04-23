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
  const [audience, setAudience] = useState([]);
  const [clapping, setClapping] = useState([]);
  const [airhorns, setAirhorns] = useState([]);
  const [boos, setBoos] = useState([]);
  const [nytJingles, setNytJingles] = useState([]);
  const [nytRemixes, setNytRemixes] = useState([]);

  useEffect(() => {
    socket.on("welcome", (payload) => {
      setEntered(true);
      setName(payload);
    });

    socket.on("update", (payload) => {
      if (entered) {
        setCount(payload.count);
        setAudience(payload.audience);
        setClapping(payload.clap);
        setAirhorns(payload.airhorn);
        setBoos(payload.boo);
        setNytRemixes(payload.nytRemix);
        setNytJingles(payload.nyt);
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
      audience={audience}
      clapping={clapping}
      airhorns={airhorns}
      boos={boos}
      nytRemixes={nytRemixes}
      nytJingles={nytJingles}
    />
  );
}

export default App;
