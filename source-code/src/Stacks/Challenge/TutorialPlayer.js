import React, { useState, useEffect } from 'react';
import { Box, makeStyles, useTheme } from '@material-ui/core';
import { Button } from 'Components';
import { PageSwitch } from 'Navigation';
import { ChallengeNav } from 'Navigation/Paths';
import Cordova from 'Utils/Cordova';
import McdUser from 'Utils/McdUser';
import { GetObjFromObj } from 'Utils';
import { shallowEqual, useSelector } from 'react-redux';
import { VideoTutorialAnimation } from './shared/Animations';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.common.black,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  videoPlayer: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '100vh',
    textAlign: 'center',
    overflow: 'hidden',
    width: '100%',
    maxWidth: '178vh',
  },
  videoPlayerIframe: {
    height: '100%',
    width: '100%',
    maxHeight: '100vh',
  },
  skipBtn: {
    position: 'absolute',
    top: '8px',
    width: 'auto',
    right: '16px',
    height: 'auto',
    padding: '4px 16px',
  },
  backBtn: {
    position: 'absolute',
    color: theme.palette.common.white,
    top: '10px',
    left: '16px',
  },
}));

const TutorialPlayer = ({ challenge, games }) => {
  const styled = useStyles();
  const { texts } = useTheme();
  const [stateRef, setStateRef] = useState({ animPlay: false });
  const IsMcdUser = useSelector((state) => state.McdUser.mcd_user, shallowEqual);
  const data = challenge.data || {};
  const selectedGame = GetObjFromObj(games, 'game_id', data.content_type);
  let isMcq = false;
  if (selectedGame) isMcq = selectedGame.game_id.toLowerCase().trim() === 'mcq';

  const localCallback = (e) => {
    const t = e.currentTarget.getAttribute('data-tag') || e.target.name;
    switch (t) {
      case 'skip':
      case 'play':
        PageSwitch(ChallengeNav.CHALLENGE_PLAYER);
        break;
      default:
        setStateRef({ animPlay: true });
        break;
    }
  };

  useEffect(() => {
    if (!window.customVideoShow) {
      setStateRef({ animPlay: true });
    }
  }, []);

  useEffect(() => {
    if (!isMcq) {
      if (IsMcdUser) {
        McdUser.SetLandscape();
        McdUser.ToggleFullScreen(true);
      }

      Cordova.SetLandscape();
      Cordova.HideStatusbar();
    }
  }, [isMcq, IsMcdUser]);

  return (
    <Box className={styled.root}>
      {stateRef.animPlay && <VideoTutorialAnimation checked={stateRef.animPlay} />}
      <div className={styled.videoPlayer}>
        <iframe
          className={styled.videoPlayerIframe}
          title="unique"
          src={challenge.videoLink}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; fullscreen"
          data-allow="autoplay; fullscreen"
        />
      </div>

      <Button className={styled.skipBtn} tag="skip" onClick={localCallback}>
        {texts.CONTINUE}
      </Button>
    </Box>
  );
};

export default TutorialPlayer;
