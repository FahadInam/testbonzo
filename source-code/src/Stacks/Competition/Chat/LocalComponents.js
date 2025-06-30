/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Box, Grid, IconButton, MenuItem, ListItemText, ListItemIcon, useTheme } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Skeleton from '@material-ui/lab/Skeleton';

import { AvatarSwitcher } from 'Constants';
import { Paper, Body1, Body2, Menu } from 'Components';
import { UsernameResolver, IsEmptyObject, friendlyDate, CreateMarkup } from 'Utils';
import { SelectedCompetition, BlockFriend } from '../../../Actions';
import ConfirmationBox from '../../../Components/ConfirmationBox';
import sList from './LocalConstants';
import useStyles from './style';

export const emoticonsFormatted = (inputMsg) => {
  let inputMsgT = inputMsg;
  for (let sind = 0; sind < sList.length; sind++) {
    inputMsgT = inputMsgT.split(sList[sind].from).join(String.fromCodePoint(sList[sind].to));
    if (sList[sind].from2) {
      inputMsgT = inputMsgT.split(sList[sind].from2).join(String.fromCodePoint(sList[sind].to));
    }
    if (sList[sind].from3) {
      inputMsgT = inputMsgT.split(sList[sind].from3).join(String.fromCodePoint(sList[sind].to));
    }
    if (sList[sind].from4) {
      inputMsgT = inputMsgT.split(sList[sind].from4).join(String.fromCodePoint(sList[sind].to));
    }
    if (sList[sind].from5) {
      inputMsgT = inputMsgT.split(sList[sind].from5).join(String.fromCodePoint(sList[sind].to));
    }
    if (sList[sind].from6) {
      inputMsgT = inputMsgT.split(sList[sind].from6).join(String.fromCodePoint(sList[sind].to));
    }
    if (sList[sind].from7) {
      inputMsgT = inputMsgT.split(sList[sind].from7).join(String.fromCodePoint(sList[sind].to));
    }
  }

  return inputMsgT;
};

export const revertEmoticons = (msgIn) => {
  let msgInT = msgIn;
  for (let sind = 0; sind < sList.length; sind++) {
    msgInT = msgInT.split(String.fromCodePoint(sList[sind].to)).join(sList[sind].from);
  }

  return msgInT;
};

export const Message = ({ item, user, friend }) => {
  const myMsg = user.user_id === item.sender_id;
  const styled = useStyles({ myMsg });
  return (
    <div style={{ paddingTop: '16px' }}>
      <Grid container justifyContent={myMsg ? 'flex-end' : 'flex-start'}>
        <Grid item xs={10} sm={9} md={8}>
          <Paper className={styled.messagePaper} flexDirection="row">
            <div style={{ marginRight: '16px' }}>
              <Tooltip
                disableFocusListener
                title={
                  <span style={{ fontSize: '13px' }}>
                    {myMsg ? UsernameResolver(user.name, user.username) : UsernameResolver(friend.name, friend.username)}
                  </span>
                }
              >
                <IconButton className={styled.avatarWrapper}>
                  <AvatarSwitcher t={myMsg ? user.profile_picture : friend.profile_picture} s={36} />
                </IconButton>
              </Tooltip>
            </div>
            <div style={{ width: '100%' }}>
              <Body1 className={styled.text}>
                {' '}
                <div dangerouslySetInnerHTML={CreateMarkup(emoticonsFormatted(item.message))} />
              </Body1>
              <Body2 component="p" className={styled.date}>
                {friendlyDate(item.sent_date)}
                {user.user_id === parseInt(process.env.REACT_APP_SUPPORT_ID, 10) && <span>&nbsp; - Sender's ID:{item.sender_id}</span>}
              </Body2>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export const MessageLoader = ({ myMsg }) => {
  const styled = useStyles({ myMsg });
  return (
    <div style={{ paddingTop: '16px' }}>
      <Grid container justifyContent={myMsg ? 'flex-end' : 'flex-start'}>
        <Grid item xs={10} sm={9} md={8}>
          <Paper className={styled.messagePaper} flexDirection="row">
            <div style={{ marginRight: '16px' }}>
              <Skeleton variant="circle" height="36px" width="36px" className={styled.skeletonCircle} />
            </div>
            <div  style={{ width: '100%' }}>
              <Body1 className={styled.text}>
                <Skeleton variant="rect" height="12px" width="75%" className={styled.skeleton} />
                <Skeleton variant="rect" height="12px" width="60%" className={styled.skeleton} />
                <Skeleton variant="rect" height="12px" width="40%" className={styled.skeleton} />
              </Body1>
              <Body2 component="p" className={styled.date}>
                <Skeleton variant="rect" height="12px" width="40%" className={`${styled.dateSkeleton} ${styled.skeleton}`} />
              </Body2>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export const ChatMenu = ({ menuAnchor, callback }) => {
  const { texts } = useTheme();
  const { state } = useLocation();

  return (
    <Menu menuAnchor={menuAnchor} callback={callback} avAlign="bottom" tvAlign="top">
      <MenuItem
        data-tag="block-friend"
        onClick={(e) => {
          if (callback) callback(e, { competition: SelectedCompetition.Info(), friend: state });
        }}
      >
        <ListItemIcon>
          <i className="i i-remove-friend" />
        </ListItemIcon>
        <ListItemText primary={texts.BLOCK_FRIEND} />
      </MenuItem>
    </Menu>
  );
};

export const SecondaryButtons = (props) => {
  const { texts } = useTheme();
  const { avatar, isSupportChat } = props;
  const dispatch = useDispatch();
  const [stateRef, setStateRef] = useState({
    menuAnchor: null,
    blockFriendAnchor: false,
    toBlockFriend: {},
  });

  const callback = (e, item) => {
    const t = typeof e === 'string' ? e : e.currentTarget.getAttribute('data-tag');
    switch (t) {
      case 'block-friend':
        setStateRef({
          blockFriendAnchor: true,
          toBlockFriend: item,
          menuAnchor: null,
        });
        break;
      case 'block-friend-positive':
        dispatch(BlockFriend(stateRef.toBlockFriend.competition.item, stateRef.toBlockFriend.friend));
        setStateRef({
          blockFriendAnchor: false,
          toBlockFriend: {},
          menuAnchor: null,
        });
        break;
      case 'ChatDropDown':
        setStateRef({ ...stateRef, menuAnchor: e.currentTarget });
        break;
      case 'close':
      case 'overlay':
      case 'block-friend-negative':
        setStateRef({
          blockFriendAnchor: false,
          toBlockFriend: {},
        });
        break;
      default:
        setStateRef({ ...stateRef, menuAnchor: null });
        break;
    }
  };
  return (
    <Box ml={1}>
      <ConfirmationBox
        visible={stateRef.blockFriendAnchor}
        callback={callback}
        icon="remove-friend"
        allowClose
        primary={
          IsEmptyObject(stateRef.toBlockFriend)
            ? ''
            : `${texts.BLOCK_FRIENDS}${UsernameResolver(stateRef.toBlockFriend.friend.name, stateRef.toBlockFriend.friend.username)}?`
        }
        positive="Block"
        negative={texts.CANCEL}
        tag="block-friend"
      />
      <Box data-tag="ChatDropDown" sx={{ cursor: isSupportChat ? 'default' : 'pointer' }} onClick={callback}>
        <AvatarSwitcher t={avatar} s={40} ml={0} />
      </Box>
      {/* {console.log('props: ', props)}
      {console.log('isSupportChat: ', isSupportChat)} */}
      {!isSupportChat && <ChatMenu menuAnchor={stateRef.menuAnchor} callback={callback} />}
    </Box>
  );
};
