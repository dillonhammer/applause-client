import { useEffect, useState } from "react";
import io from "socket.io-client";
import ReactHowler from "react-howler";
import styled from "styled-components";
import { Button, Input } from "antd";
import "antd/dist/antd.css";

console.log("initializing socket");
const socket = io("https://pit-applause-server.herokuapp.com");

const WelcomeContainer = styled.div`
  margin: 40px;
  text-align: center;
`;

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
  const [clapping, setClapping] = useState([]);
  const [airhorns, setAirhorns] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    socket.on("welcome", (payload) => {
      setEntered(true);
      setCount(payload.count);
      setClapping(payload.clapping);
      setAirhorns(payload.airhorns);
    });

    socket.on("update", (payload) => {
      if (entered) {
        setCount(payload.count);
        setClapping(payload.clapping);
        setAirhorns(payload.airhorns);
      }
    });

    socket.on("error", (message) => {
      setError(message);
    });
  }, [entered]);

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      onEnter(name);
    }
  };

  const onEnter = (name) => {
    if (name) {
      socket.emit("enter", name);
    } else {
      setError("Name cannot be empty");
    }
  };

  const onSend = (event) => {
    socket.emit(event, name);
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
    <WelcomeContainer>
      <p>Enter your name</p>
      <Input
        onChange={({ target }) => setName(target.value)}
        onKeyPress={onKeyPress}
        style={{ width: 200 }}
      />
      <br />
      <br />
      <Button type="primary" onClick={() => onEnter(name)}>
        Join Room
      </Button>
      <br />
      <br />
      {error && <div>{error}</div>}
    </WelcomeContainer>
  ) : (
    <RoomContainer>
      <p>{count} Here</p>
      <GridContainer>
        <ButtonContainer>
          <Button
            type="primary"
            onMouseDown={() => onSend("clap")}
            onMouseUp={() => onSend("end_clap")}
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
            onMouseDown={() => onSend("airhorn")}
            onMouseUp={() => onSend("end_airhorn")}
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
            <ReactHowler key={name} src="clapping.mp3" loop html5 />
          ))}
          {airhorns.map((name) => (
            <ReactHowler key={name} src="airhorn.mp3" loop html5 />
          ))}
        </ButtonContainer>
        <ButtonContainer />
        <ButtonContainer />
      </GridContainer>
    </RoomContainer>
  );
}

export default App;
