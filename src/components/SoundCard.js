import styled from "styled-components";
import ReactHowler from "react-howler";
import COLORS from "../constants/colors";

const ButtonContainer = styled.div`
  flex: 1;
  text-align: center;
`;

const StyledButton = styled.div`
  cursor: pointer;
  user-select: none;
  line-height: 40px;
  margin: 0px 20px;
  border-radius: 4px;
  font-size: 18px;
  border: 3px solid ${({ color }) => color.DARK};
  color: ${({ $darkMode }) =>
    $darkMode ? COLORS.BACKGROUND.BLACK : COLORS.WHITE.BRIGHT};
  background-color: ${({ color }) => color.DEFAULT};

  :hover {
    color: ${({ $darkMode }) =>
      $darkMode ? COLORS.WHITE.DARK : COLORS.WHITE.BRIGHT};
    background-color: ${({ color }) => color.DARK};
    border: 3px solid ${({ color }) => color.DEFAULT};
  }

  :active {
    color: ${({ $darkMode }) =>
      $darkMode ? COLORS.WHITE.DARK : COLORS.WHITE.BRIGHT};
    background-color: ${({ color }) => color.DARKEST};
    border: 3px solid ${({ color }) => color.DEFAULT};
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
  darkMode,
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
        $darkMode={darkMode}
      >
        {prompt}
      </StyledButton>
      <br />
      {/* <div>
        {names.length} {desc}
      </div>
      {names.map((name) => (
        <div key={name}>{name}</div>
      ))} */}
      {names.map((name) => (
        <ReactHowler key={name} src={src} loop html5 volume={volume} />
      ))}
    </ButtonContainer>
  );
};

export default SoundCard;
