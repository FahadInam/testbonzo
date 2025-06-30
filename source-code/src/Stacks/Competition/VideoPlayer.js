import React, { useEffect } from 'react';
import Cordova from 'Utils/Cordova';
import McdUser from 'Utils/McdUser';
import { useSelector, shallowEqual } from 'react-redux';
import { Box, makeStyles, useTheme } from '@material-ui/core';
import { Button } from 'Components';

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

const VideoPlayer = () => {
  const videoLink = useSelector((state) => state.GetCompetitionVideoLink, shallowEqual);
  const IsMcdUser = useSelector((state) => state.McdUser.mcd_user, shallowEqual);
  const styled = useStyles();
  const { texts } = useTheme();

  const FinalLink = Array.isArray(videoLink.link) ? videoLink.link[0].url : videoLink.link;
  const localCallback = (e) => {
    const t = e.currentTarget.getAttribute('data-tag') || e.target.name;
    switch (t) {
      case 'skip': {
        if (IsMcdUser) {
          McdUser.SetPortrait();
          McdUser.ToggleFullScreen(false);
        }
        Cordova.SetPortrait();
        Cordova.ShowStatusbar();
        window.history.back();
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    if (IsMcdUser) {
      McdUser.SetLandscape();
      McdUser.ToggleFullScreen(true);
    }
    Cordova.SetLandscape();
    Cordova.HideStatusbar();
  }, [IsMcdUser]);
  //  console.log(FinalLink, 'FinalLink');
  return (
    <Box className={styled.root}>
      <div className={styled.videoPlayer}>
        <iframe
          className={styled.videoPlayerIframe}
          title="unique"
          src={FinalLink}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; fullscreen"
          data-allow="autoplay; fullscreen"
        />
      </div>

      <Button className={styled.skipBtn} tag="skip" onClick={localCallback}>
        {texts.CLOSE_BOX}
      </Button>
    </Box>
  );
};

export default VideoPlayer;
