import styled from "styled-components";
import { Slider, Switch } from "antd";
import {
  VolumeUpRounded,
  VolumeOffRounded,
  Brightness4Rounded,
  Brightness7Rounded,
} from "@material-ui/icons";
import COLORS from "../constants/colors";

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

const Header = ({
  onVolumeChange,
  onMute,
  setDarkMode,
  count,
  muted,
  volume,
  darkMode,
}) => {
  return (
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
  );
};

export default Header;
