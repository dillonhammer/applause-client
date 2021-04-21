import { useEffect, useState } from "react";
import io from "socket.io-client";
import ReactHowler from "react-howler";
import styled from "styled-components";
import { Button, Slider } from "antd";
import "antd/dist/antd.css";
import { VolumeUpRounded, VolumeOffRounded } from "@material-ui/icons";
import Welcome from "./components/Welcome";

const socket = io("https://pit-applause-server.herokuapp.com");

const GridContainer = styled.div`
  display: flex;
`;

const RoomContainer = styled.div`
  margin: 40px;
`;

const ButtonContainer = styled.div`
  flex: 1;
`;

function App() {
  const [name, setName] = useState("");
  const [entered, setEntered] = useState(false);
  const [count, setCount] = useState(1);
  const [volume, setVolume] = useState(80);
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

  const onSend = (sound, type) => {
    socket.emit("sound", { name, sound, type });
  };

  const onMock = () => {
    const personNum = Math.ceil(Math.random() * 1000);
    socket.emit("enter", `Person ${personNum}`);
    socket.emit("sound", {
      name: `Person ${personNum}`,
      sound: "clap",
      type: "START",
    });
  };

  const onClear = () => {
    socket.emit("clear");
  };

  return !entered ? (
    <Welcome socket={socket} />
  ) : (
    <RoomContainer>
      <p>{count} Here</p>
      <VolumeUpRounded />
      <Slider
        defaultValue={volume}
        onChange={(value) => setVolume(value)}
        style={{ width: 200 }}
      />
      <GridContainer>
        <ButtonContainer>
          <Button
            type="primary"
            onMouseDown={({ button }) => {
              if (button === 0) onSend("clap", "START");
            }}
            onMouseUp={() => onSend("clap", "STOP")}
            onMouseLeave={() => onSend("clap", "STOP")}
          >
            Hold to Clap
          </Button>
          <br />
          <br />
          <div>{clapping.length} Clapping</div>
          {clapping.map((name) => (
            <div key={name}>{name}</div>
          ))}
          {name === "root" && (
            <>
              <button onMouseDown={onMock}>Mock Person</button>
              <button onMouseDown={onClear}>Clear All</button>
            </>
          )}
        </ButtonContainer>
        <ButtonContainer>
          <Button
            type="primary"
            danger
            onMouseDown={({ button }) => {
              if (button === 0) onSend("airhorn", "START");
            }}
            onMouseUp={() => onSend("airhorn", "STOP")}
            onMouseLeave={() => onSend("airhorn", "STOP")}
          >
            Hold to Airhorn
          </Button>
          <br />
          <br />
          <div>{airhorns.length} Airhorns</div>
          {airhorns.map((name) => (
            <div key={name}>{name}</div>
          ))}
          {clapping.map((name) => (
            <ReactHowler
              key={name}
              src="clapping.mp3"
              loop
              html5
              volume={volume / 100}
            />
          ))}
          {airhorns.map((name) => (
            <ReactHowler
              key={name}
              src="airhorn.mp3"
              loop
              html5
              volume={volume / 100}
            />
          ))}
        </ButtonContainer>
        <ButtonContainer />
        <ButtonContainer />
      </GridContainer>
    </RoomContainer>
  );
}

export default App;
