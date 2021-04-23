import styled from "styled-components";
import { Button } from "antd";
import ReactHowler from "react-howler";
import COLORS from "../constants/colors";

const ButtonContainer = styled.div`
  flex: 1;
`;

const StyledButton = styled(Button)`
  border: none;
  color: ${COLORS.WHITE.BRIGHT};
  background-color: ${({ color }) => color.DEFAULT};

  :hover {
    color: ${COLORS.WHITE.BRIGHT};
    background-color: ${({ color }) => color.DARK};
  }

  :active {
    background-color: ${({ color }) => color.DARKEST};
  }
`;

const SoundCard = ({
  socket,
  name,
  sound,
  src,
  prompt,
  names,
  desc,
  volume,
  color,
}) => {
  const onSend = (sound, type) => {
    socket.emit("sound", { name, sound, type });
  };

  return (
    <ButtonContainer>
      <StyledButton
        onMouseDown={({ button }) => {
          if (button === 0) onSend(sound, "START");
        }}
        onMouseUp={() => onSend(sound, "STOP")}
        onMouseLeave={() => onSend(sound, "STOP")}
        color={color}
      >
        {prompt}
      </StyledButton>
      <br />
      <br />
      <div>
        {names.length} {desc}
      </div>
      {names.map((name) => (
        <div key={name}>{name}</div>
      ))}
      {names.map((name) => (
        <ReactHowler key={name} src={src} loop html5 volume={volume} />
      ))}
    </ButtonContainer>
  );
};

export default SoundCard;
