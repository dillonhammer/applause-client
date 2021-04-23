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
  margin-top: 4px;
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
  margin-top: 20px;
  display: flex;
`;

const HR = styled.div`
  margin: 10px 0px;
  height: 4px;
  background-color: yellowgreen;
  border-radius: 4px;
`;

const AudienceContainer = styled.div`
  flex: 1;
  border-right: 4px solid yellowgreen;
  margin-right: 20px;
`;

const AudienceName = styled.div`
  margin: 0px;
`;

const Room = ({
  socket,
  name,
  count,
  audience,
  clapping,
  airhorns,
  boos,
  nytJingles,
  nytRemixes,
}) => {
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
      <HR />
      <GridContainer>
        <AudienceContainer>
          {audience.map((audienceName) => (
            <AudienceName key={audienceName}>{audienceName}</AudienceName>
          ))}
        </AudienceContainer>
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
        <SoundCard
          socket={socket}
          name={name}
          sound="boo"
          src="boo.mp3"
          prompt="Hold to Boo"
          names={boos}
          desc={"Booing"}
          volume={muted ? 0 : volume / 100}
        />
        <SoundCard
          socket={socket}
          name={name}
          sound="nyt"
          src="nyt.mp3"
          prompt="Hold to NYT Jingle"
          names={nytJingles}
          desc={"NYT Jingles"}
          volume={muted ? 0 : volume / 100}
        />
        <SoundCard
          socket={socket}
          name={name}
          sound="nytRemix"
          src="nyt-remix.mp3"
          prompt="Hold to NYT Remix"
          names={nytRemixes}
          desc={"NYT Remixes"}
          volume={muted ? 0 : volume / 100}
        />
      </GridContainer>
    </RoomContainer>
  );
};

export default Room;
