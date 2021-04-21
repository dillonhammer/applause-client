import { useState } from "react";
import styled from "styled-components";
import { Slider } from "antd";
import { VolumeUpRounded, VolumeOffRounded } from "@material-ui/icons";
import SoundCard from "./SoundCard";

const RoomContainer = styled.div`
  margin: 50px;
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
        <SoundCard
          socket={socket}
          name={name}
          sound="clap"
          src="clapping.mp3"
          prompt="Hold to Clap"
          names={clapping}
          desc={"Clapping"}
          volume={muted ? 0 : volume / 100}
        />
        <SoundCard
          socket={socket}
          name={name}
          sound="airhorn"
          src="airhorn.mp3"
          prompt="Hold to Airhorn"
          names={airhorns}
          desc={"Airhorns"}
          volume={muted ? 0 : volume / 100}
        />
        <ButtonContainer />
        <ButtonContainer />
      </GridContainer>
    </RoomContainer>
  );
};

export default Room;
