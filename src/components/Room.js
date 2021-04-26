import { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import SoundCard from "./SoundCard";
import COLORS from "../constants/colors";

const RoomContainer = styled.div`
  padding: 50px;
  height: 100vh;
  background-color: ${({ darkMode }) =>
    darkMode ? COLORS.BACKGROUND.DARK : "white"};
  color: ${({ darkMode }) => (darkMode ? COLORS.WHITE.DEFAULT : "black")};
`;

const HR = styled.div`
  margin: 10px 0px;
  height: 4px;
  background-color: ${COLORS.BACKGROUND.BLUE};
  border-radius: 4px;
`;

const GridContainer = styled.div`
  margin-top: 20px;
  display: flex;
`;

const AudienceContainer = styled.div`
  flex: 1;
  padding-right: 20px;
  border-right: 4px solid ${COLORS.BACKGROUND.BLUE};
`;

const SoundsContainer = styled.div`
  flex: 5;
`;

const SoundsRow = styled.div`
  display: flex;
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
  screams,
  beeBooBooBops,
  seinfelds,
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
      <Header
        onVolumeChange={onVolumeChange}
        onMute={onMute}
        setDarkMode={setDarkMode}
        count={count}
        muted={muted}
        volume={volume}
        darkMode={darkMode}
      />
      <HR />
      <GridContainer>
        <AudienceContainer>
          {audience.map((audienceName) => (
            <AudienceName key={audienceName}>{audienceName}</AudienceName>
          ))}
        </AudienceContainer>
        <SoundsContainer>
          <SoundsRow>
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
          </SoundsRow>
          <SoundsRow>
            <SoundCard
              socket={socket}
              name={name}
              sound="scream"
              src="scream.mp3"
              prompt="Hold to Scream"
              names={screams}
              desc={"Screaming"}
              volume={muted ? 0 : volume / 100}
              color={COLORS.BLUE}
              darkMode={darkMode}
            />
            <SoundCard
              socket={socket}
              name={name}
              sound="bee-boo-boo-bop"
              src="bee-boo-boo-bop.mp3"
              prompt="Hold to Bee Boo Boo Bop"
              names={beeBooBooBops}
              desc={"Robots"}
              volume={muted ? 0 : volume / 100}
              color={COLORS.VIOLET}
              darkMode={darkMode}
            />
            <SoundCard
              socket={socket}
              name={name}
              sound="seinfeld"
              src="seinfeld.mp3"
              prompt="Hold to Seinfeld"
              names={seinfelds}
              desc={"Seinfelds"}
              volume={muted ? 0 : volume / 100}
              color={COLORS.PINK}
              darkMode={darkMode}
            />
          </SoundsRow>
        </SoundsContainer>
      </GridContainer>
    </RoomContainer>
  );
};

export default Room;
