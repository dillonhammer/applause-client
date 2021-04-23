import { useState } from "react";
import styled from "styled-components";
import { Button, Input } from "antd";
import COLORS from "../constants/colors";
import { useEffect } from "react";

const WelcomeContainer = styled.div`
  padding: 50px;
  height: 100vh;
  text-align: center;
  background-color: ${COLORS.BACKGROUND.DARK};
  color: ${COLORS.WHITE.DEFAULT};
`;

const WelcomeButton = styled(Button)`
  border: none;
  color: ${COLORS.BACKGROUND.BLACK};
  background-color: ${({ color }) => color.DEFAULT};

  :hover {
    color: ${COLORS.WHITE.DARK};
    background-color: ${({ color }) => color.DARK};
  }

  :active {
    background-color: ${({ color }) => color.DARKEST};
  }
`;

const Welcome = ({ socket }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    socket.on("error", (payload) => {
      setError(payload);
    });
  }, [socket]);

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
      <WelcomeButton onClick={() => onEnter(name)} color={COLORS.TEAL}>
        Join Room
      </WelcomeButton>
      <br />
      <br />
      {error && <div>{error}</div>}
    </WelcomeContainer>
  );
};

export default Welcome;
