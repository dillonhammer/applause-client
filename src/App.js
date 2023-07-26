import { useEffect, useState } from "react";
import io from "socket.io-client";
import "antd/dist/antd.css";
import Welcome from "./components/Welcome";
import Room from "./components/Room";

const socket = io(process.env.REACT_APP_SERVER);

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
  const [screams, setScreams] = useState([]);
  const [beeBooBooBops, setBeeBooBooBops] = useState([]);
  const [seinfelds, setSeinfelds] = useState([]);

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
        setScreams(payload.scream);
        setBeeBooBooBops(payload["bee-boo-boo-bop"]);
        setSeinfelds(payload.seinfeld);
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
      screams={screams}
      beeBooBooBops={beeBooBooBops}
      seinfelds={seinfelds}
    />
  );
}

export default App;
