import { useState } from "react";
import styled from "styled-components";
import { Slider, Switch } from "antd";
import {
  VolumeUpRounded,
  VolumeOffRounded,
  Brightness4Rounded,
  Brightness7Rounded,
} from "@material-ui/icons";
import SoundCard from "./SoundCard";
import COLORS from "../constants/colors";

const RoomContainer = styled.div`
  padding: 50px;
  height: 100vh;
  background-color: ${({ darkMode }) =>
    darkMode ? COLORS.BACKGROUND.DARK : "white"};
  color: ${({ darkMode }) => (darkMode ? COLORS.WHITE.DEFAULT : "black")};
`;

const HeaderContainer = styled.div`
  display: inline-block;
  width: 100%;
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

const DarkModeSwitchContainer = styled.div`
  float: right;
  vertical-align: top;
  margin-top: 5px;
`;

const BrightnessIconContainer = styled.div`
  display: inline-block;
  vertical-align: top;
  margin: 1px 4px;
`;

const GridContainer = styled.div`
  margin-top: 20px;
  display: flex;
`;

const HR = styled.div`
  margin: 10px 0px;
  height: 4px;
  background-color: ${COLORS.BACKGROUND.BLUE};
  border-radius: 4px;
`;

const AudienceContainer = styled.div`
  flex: 1;
  border-right: 4px solid ${COLORS.BACKGROUND.BLUE};
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
  const [volume, setVolume] = useState(25);
  const [muted, setMuted] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const onVolumeChange = (value) => {
    setMuted(false);
    setVolume(value);
  };

  const onMute = () => {
    setMuted(!muted);
  };

  return (
    <RoomContainer darkMode={darkMode}>
      <HeaderContainer>
        <RoomCount>{count} Here</RoomCount>
        <VolumeIconContainer onClick={onMute}>
          {muted ? (
            <VolumeOffRounded
              style={{
                color: darkMode ? COLORS.WHITE.DEFAULT : COLORS.BACKGROUND.BLUE,
              }}
            />
          ) : (
            <VolumeUpRounded
              style={{
                color: darkMode ? COLORS.WHITE.DEFAULT : COLORS.BACKGROUND.BLUE,
              }}
            />
          )}
        </VolumeIconContainer>
        <VolumeSliderContainer>
          <Slider
            value={muted ? 0 : volume}
            onChange={onVolumeChange}
            style={{ width: 200 }}
            handleStyle={{ borderColor: COLORS.BACKGROUND.BLUE }}
            trackStyle={{ backgroundColor: COLORS.BACKGROUND.BLUE }}
          />
        </VolumeSliderContainer>
        <DarkModeSwitchContainer>
          <BrightnessIconContainer>
            <Brightness7Rounded style={{ color: COLORS.BACKGROUND.BLUE }} />
          </BrightnessIconContainer>
          <Switch
            defaultChecked
            onChange={(checked) => setDarkMode(checked)}
            style={{ backgroundColor: COLORS.BACKGROUND.BLUE }}
          />
          <BrightnessIconContainer>
            <Brightness4Rounded style={{ color: COLORS.BACKGROUND.BLUE }} />
          </BrightnessIconContainer>
        </DarkModeSwitchContainer>
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
          color={COLORS.RED}
          darkMode={darkMode}
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
          color={COLORS.ORANGE}
          darkMode={darkMode}
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
          color={COLORS.YELLOW}
          darkMode={darkMode}
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
          color={COLORS.GREEN}
          darkMode={darkMode}
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
          color={COLORS.TEAL}
          darkMode={darkMode}
        />
      </GridContainer>
    </RoomContainer>
  );
};

export default Room;
