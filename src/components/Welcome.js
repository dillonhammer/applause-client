import { useState } from "react";
import styled from "styled-components";
import { Button, Input } from "antd";

const WelcomeContainer = styled.div`
  margin: 50px;
  text-align: center;
`;

const Welcome = ({ socket }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

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

  return (
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
  );
};

export default Welcome;
