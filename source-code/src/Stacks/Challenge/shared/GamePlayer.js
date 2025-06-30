/* eslint-disable camelcase */
import React, { useEffect, useRef, useCallback } from 'react';
import { makeStyles, Box, useTheme } from '@material-ui/core';

import { Spinner, Toast } from 'Actions';
import { CHALLENGE_GLOBAL } from 'Constants/challenge.constants';
import { config, ALERT } from 'Constants';
import { Cordova } from 'Utils';
import OsProperties from 'Utils/OsProperties';
import { CompetitionNav } from 'Navigation/Paths';
import { PageSwitch } from 'Navigation';

window.GlobalCom = null;
window.GameLoadingTimer = null;

const useStyles = makeStyles(() => ({
  root: {
    margin: 0,
    display: 'block',
    border: 0,
    outline: 0,

    width: '100%',
    maxWidth: '100%',
    minWidth: '100%',
    minHeight: '100%',
    maxHeight: '100%',
    height: '100%',
    position: 'relative',
  },
  blocker: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height: '100%',
    width: '100%',
    background: 'rgba(0,0,0,0.000000025)',
    zIndex: 2,
  },
}));

const GamePlayer = React.memo(({ data, selectedGame, callback, allowPlaying, user, totalTime, gameMode, completionPercentage }) => {
  let pWidth = null;
  let pHeight = null;

  // const { is_online } = selectedGame;
  if (OsProperties.IsIos()) {
    // fix for IOS < 13
    if (parseInt(OsProperties.version, 10) < 13) {
      if (window.innerWidth < window.innerHeight) {
        pWidth = window.innerHeight;
        pHeight = window.innerWidth;
      } else {
        pWidth = window.innerWidth;
        pHeight = window.innerHeight;
      }
    }
  }

  //console.log(data, selectedGame);

  let launchURL = selectedGame.link;
  if (Cordova.IsCordova) {
    // if (is_online) {
    //   launchURL = `https://www.1on1quiz.com${launchURL}`;
    // } else {
    launchURL = Cordova.Path(launchURL);
    //}
  } else {
    launchURL = `${launchURL}&user_id=${user.user_id}&isPlayBonzo=1`;

    // ===== This is testing URL for launching Ai simulation in local environment =====
    //launchURL = 'http://localhost:5173/?content_id=20392&institution_id=98&isLmsContent=0&user_id=473&isPlayBonzo=1';

    // launchURL =
    //   'https://cmsdev.knowledgeplatform.com/generic/launch?content_id=19869&institution_id=101&isLmsContent=1&user_id=15&coming_from=competition';

    //console.log('launchURL', launchURL);
    //  launchURL =
    //  'https://cmsdev.knowledgeplatform.com/generic/launch?content_id=19869&institution_id=101&isLmsContent=1&user_id=15&coming_from=competition';
    // launchURL =
    //   'https://cmsdev.knowledgeplatform.com/generic/launch?content_id=19215&institution_id=98&isLmsContent=1&user_id=15&coming_from=competition';

    // console.log('launchURL', launchURL);
    // launchURL = 'http://localhost:3001/generic/launch?content_id=19215&institution_id=98&isLmsContent=1&user_id=15&isPlayBonzo=1';

    //  launchURL = 'http://localhost:3001/generic/launch?content_id=19063&institution_id=98&isLmsContent=1&user_id=15&isPlayBonzo=1';
  }

  const ref = useRef(null);
  const styled = useStyles();
  const { texts } = useTheme();

  const onLoad = useCallback(() => {
    Spinner.Hide();
  }, []);

  useEffect(() => {
    const frameNode = ref.current;
    frameNode.addEventListener('load', onLoad);

    return () => {
      frameNode.setAttribute('src', '#');
      frameNode.removeEventListener('load', onLoad);
      clearTimeout(window.GameLoadingTimer);
      window.GlobalCom = null;
    };
  }, [onLoad]);

  const gameLoadWatchDog = () => {
    clearTimeout(window.GameLoadingTimer);
    window.GameLoadingTimer = setTimeout(() => {
      Toast.Show(texts.SLOW_INTERNET, ALERT.INFO);
      const frameNode = ref.current;
      frameNode.src = launchURL;
    }, config.GameLoadingTime);
  };

  const MessageReceived = (action, payload) => {
    switch (action) {
      case CHALLENGE_GLOBAL.ON_LOAD:
        return {
          questionDelay: config.questionDelay,
          sound: true,
          width: pWidth,
          height: pHeight,
          gameTime: totalTime,
          gameMode: gameMode,
          completionPercentage: completionPercentage,
        };
      case CHALLENGE_GLOBAL.SUBMIT_QUESTION:
      case CHALLENGE_GLOBAL.STOP:
      case CHALLENGE_GLOBAL.RESIGN:
        if (callback) callback(action, payload);
        break;
      case CHALLENGE_GLOBAL.START:
      case CHALLENGE_GLOBAL.STOP_TIMER:
        if (callback) callback(action, payload);
        clearTimeout(window.GameLoadingTimer);
        break;
      default:
        if (callback) callback(action, payload);
        gameLoadWatchDog();
        break;
    }
    return `${action}_OK`;
  };

  // let iteration = 0;

  const GetMessage = (event) => {
    if (event.data?.source) {
      return;
    }
    const { message, data } = JSON.parse(event?.data);

    if (message) {
      // iteration += 1;
      // console.log('333 iteration', message, iteration);
      let DataToreturn = '';

      if (message === CHALLENGE_GLOBAL.NOT_FOUND) {
        PageSwitch(CompetitionNav.COMPETITION_HOME);
        return;
      }

      DataToreturn = MessageReceived(message, data);

      if (DataToreturn) {
        event.source.postMessage({ message, data: DataToreturn }, '*');
      }
    }
  };

  function setupListener() {
    if (!window.isListenerAdded) {
      window.addEventListener('message', GetMessage, false);
      window.isListenerAdded = true;
      return () => {
        window.removeEventListener('message', GetMessage, false);
        window.isListenerAdded = false;
      };
    } else {
      return () => {};
    }
  }

  useEffect(() => {
    const cleanup = setupListener();
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!allowPlaying && (
        <Box
          className={styled.blocker}
          onClick={(e) => {
            if (e.target !== e.currentTarget) return false;
            return false;
          }}
        />
      )}
      <iframe
        ref={ref}
        className={styled.root}
        src={launchURL}
        title="Game Player"
        width="100%"
        height="80%"
        scrolling="no"
        webkitallowfullscreen="true"
        allowFullScreen
        mozallowfullscreen="true"
        allow="microphone"
      />
    </>
  );
});

export default GamePlayer;
