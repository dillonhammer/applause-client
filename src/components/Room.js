import { useState } from "react";
import styled from "styled-components";
import { Button, Slider } from "antd";
import ReactHowler from "react-howler";
import { VolumeUpRounded, VolumeOffRounded } from "@material-ui/icons";

const RoomContainer = styled.div`
  margin: 40px;
`;

const HeaderContainer = styled.div`
  display: inline-block;
`;

const RoomCount = styled.div`
  float: left;
  margin-top: 6px;
`;

const VolumeIconContainer = styled.div`
  float: left;
  margin-top: 4px;
  margin-left: 10px;
  cursor: pointer;
`;

const VolumeSliderContainer = styled.div`
  float: left;
  margin-left: 10px;
`;

const GridContainer = styled.div`
  display: flex;
`;

const ButtonContainer = styled.div`
  flex: 1;
`;

const Room = ({ socket, name, count, clapping, airhorns }) => {
  const [volume, setVolume] = useState(80);
  const [muted, setMuted] = useState(false);

  const onVolumeChange = (value) => {
    setMuted(false);
    setVolume(value);
  };

  const onMute = () => {
    setMuted(!muted);
  };

  const onSend = (sound, type) => {
    socket.emit("sound", { name, sound, type });
  };

  return (
    <RoomContainer>
      <HeaderContainer>
        <RoomCount>{count} Here</RoomCount>
        <VolumeIconContainer onClick={onMute}>
          {muted ? <VolumeOffRounded /> : <VolumeUpRounded />}
        </VolumeIconContainer>
        <VolumeSliderContainer>
          <Slider
            value={muted ? 0 : volume}
            onChange={onVolumeChange}
            style={{ width: 200 }}
          />
        </VolumeSliderContainer>
      </HeaderContainer>
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
              volume={muted ? 0 : volume / 100}
            />
          ))}
          {airhorns.map((name) => (
            <ReactHowler
              key={name}
              src="airhorn.mp3"
              loop
              html5
              volume={muted ? 0 : volume / 100}
            />
          ))}
        </ButtonContainer>
        <ButtonContainer />
        <ButtonContainer />
      </GridContainer>
    </RoomContainer>
  );
};

export default Room;
