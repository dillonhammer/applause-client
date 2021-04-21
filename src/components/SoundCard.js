import styled from "styled-components";
import { Button } from "antd";
import ReactHowler from "react-howler";

const ButtonContainer = styled.div`
  flex: 1;
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
}) => {
  const onSend = (sound, type) => {
    socket.emit("sound", { name, sound, type });
  };

  return (
    <ButtonContainer>
      <Button
        type="primary"
        onMouseDown={({ button }) => {
          if (button === 0) onSend(sound, "START");
        }}
        onMouseUp={() => onSend(sound, "STOP")}
        onMouseLeave={() => onSend(sound, "STOP")}
      >
        {prompt}
      </Button>
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
