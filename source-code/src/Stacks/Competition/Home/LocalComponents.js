/* eslint-disable camelcase */
import React from 'react';
import { UsernameResolver } from 'Utils';
import { Box, IconButton, useTheme } from '@material-ui/core';
import { AccuracyCalc, GoToVsScreen, PlayChallenge, WinCalculator } from 'Actions';
import { gameDispatch } from 'Utils/ActionCreators';
import { CHALLENGE } from 'Constants/challenge.constants';
import { PageSwitch } from 'Navigation';
import { ChallengeNav } from 'Navigation/Paths';
import { OneListItem, OneListItemLoader, SecondaryText } from '../shared/ListBox';

import rejectIcon from 'Assets/images/bonzoui/tabicons/reject.svg';
import acceptIcon from 'Assets/images/bonzoui/tabicons/accept.svg';
import waitingIcon from 'Assets/images/bonzoui/tabicons/waiting.svg';
import playIcon from 'Assets/images/bonzoui/tabicons/play.svg';

import useStyles from './style';
import { useDispatch } from 'react-redux';

const MAX_LIST_ITEMS = 12;

const TwoIcons = ({ callback, item }) => {
  const styled = useStyles();
  const localCallback = (e) => {
    if (callback) callback(e, item);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mr={-1}>
      <IconButton onClick={localCallback} data-tag="reject-invitation" className={styled.relativePos}>
        {/* <i className="i i-reject" /> */}
        <img src={rejectIcon} width="26" height="26" border="0" alt="reject" style={{ padding: '3px' }} />
      </IconButton>
      <IconButton onClick={localCallback} data-tag="invitation-accept">
        {/* <i className="i i-tick" /> */}
        <img src={acceptIcon} width="25" height="25" border="0" alt="reject" />
      </IconButton>
    </Box>
  );
};

export const ListingLoader = () => {
  return [0, 1, 2, 3, 4, 5].map((item) => {
    return <OneListItemLoader secondary endIcon key={item} />;
  });
};

export const Invitations = ({ invitations, callback }) => {
  // const { texts } = useTheme();
  const styled = useStyles();
  if (invitations.length === 0) return null;

  return invitations.slice(0, MAX_LIST_ITEMS).map((item) => {
    return (
      <OneListItem
        item={{
          ...item,
          primary: <Box className={styled.name}>{UsernameResolver(item.opponent_name, item.opponent_username)}</Box>,
          avatar: item.opponent_profile_picture,
          // tag: 'invitation',
        }}
        secondary={<SecondaryText merge1={item.subject} merge2="" />}
        endIcon={<TwoIcons callback={callback} item={item} />}
        towAction
        callback={callback}
        key={item.row_id}
      />
    );
  });
};

export const YourTurn = ({ your_turn, competition, currentGrade, IsMcdUser }) => {
  const { texts } = useTheme();
  const styled = useStyles();
  const dispatch = useDispatch();
  if (your_turn.length === 0) return null;
  const callback = (e, item) => {
    gameDispatch(CHALLENGE.SET_SUBJECT, {
      ...item,
      type: item.content_type,
    });
    gameDispatch(CHALLENGE.SET_OPPONENT, {
      ...item,
    });
    // console.log(item, competition);
    const {
      content_id,
      link,
      match_id,
      opponent_id,
      opponent_name,
      opponent_profile_picture,
      opponent_username,
      row_id,
      skill,
      subject,
      content_type,
    } = item;

    const data1 = {
      match_id,
      skill,
      row_id,
      subject,
      type: content_type,
      content_id,
      link,
      summary_id: 0,
      simulation_time_limit: item?.simulation_time_limit,
    };

    const Opponent = {
      name: opponent_name,
      profile_picture: opponent_profile_picture,
      ranking: 1,
      same_school: 0,

      user_id: opponent_id,
      username: opponent_username,
      opponent_id,
      opponent_name,
      opponent_profile_picture,
      opponent_username,
    };

    // console.log(data1, Opponent);
    dispatch(
      PlayChallenge(
        competition,
        data1,
        () => {
          dispatch(
            GoToVsScreen(
              Opponent,
              {
                ...data1,
                subject: data1.subject,
                is_game: true,
                content_id: data1.content_id,
                summary_id: 0,
              },
              [data1],
              texts,
              competition
            )
          );
        },
        currentGrade,
        IsMcdUser
      )
    );

    // PageSwitch(ChallengeNav.CHALLENGE_START);
  };

  return your_turn.slice(0, MAX_LIST_ITEMS).map((item) => {
    return (
      <OneListItem
        item={{
          ...item,
          primary: <Box className={styled.name}>{UsernameResolver(item.opponent_name, item.opponent_username)}</Box>,
          avatar: item.opponent_profile_picture,
          tag: 'your_turn',
        }}
        secondary={<SecondaryText merge1={item.subject} merge2="" thirdLine={texts.READY_TO_PLAY} />}
        // endIcon="play_button_invert"
        endIcon={<img src={playIcon} width="22" height="22" border="0" alt="reject" style={{ padding: '1px', marginRight: '10px' }} />}
        callback={callback}
        noButtonIcon
        key={item.row_id}
      />
    );
  });
};

export const TheirTurn = ({ their_turn }) => {
  const { texts } = useTheme();
  const styled = useStyles();
  if (their_turn.length === 0) return null;

  const callback = (e, item) => {
    gameDispatch(CHALLENGE.SET_RESULT, item);
    PageSwitch(ChallengeNav.CHALLENGE_RESULT);
  };

  return their_turn.slice(0, MAX_LIST_ITEMS).map((item) => {
    return (
      <OneListItem
        item={{
          ...item,
          primary: <Box className={styled.name}>{UsernameResolver(item.opponent_name, item.opponent_username)}</Box>,
          avatar: item.opponent_profile_picture,
          tag: 'their_turn',
        }}
        secondary={<SecondaryText merge1={item.subject} merge2="" thirdLine={texts.OPPONENT_WAITING} />}
        // endIcon="eye_enable"
        //endIcon="waiting" // should be old icon
        endIcon={
          <img src={waitingIcon} width="30" height="30" border="0" alt="reject" style={{ padding: '1px', marginRight: '10px' }} />
        }
        noButtonIcon
        callback={callback}
        key={item.row_id}
      />
    );
  });
};

export const Results = ({ results, user, is_mcd }) => {
  const { texts } = useTheme();
  const styled = useStyles();

  if (results.length === 0) return null;
  // console.log('results', results);
  const callback = (e, item) => {
    gameDispatch(CHALLENGE.SET_RESULT, item);
    PageSwitch(ChallengeNav.CHALLENGE_RESULT);
  };
  return results.slice(0, MAX_LIST_ITEMS).map((item) => {
    const result = WinCalculator(
      { ...item, my_accuracy: AccuracyCalc(item.my_total_correct, item.my_total_questions, item.my_total_questions) },
      user,
      texts,
      is_mcd
    );
    return (
      <OneListItem
        item={{
          ...item,
          primary: result.title,
          avatar: item.opponent_profile_picture,
          tag: 'result',
        }}
        secondary={result.str}
        endIcon={<Box className={styled.resultIcon}>{result.icon}</Box>}
        callback={callback}
        key={item.match_id}
      />
    );
  });
};
