import React from 'react';
import { Box, IconButton } from '@material-ui/core';
import { CHALLENGE_TAGS } from 'Constants/challenge.constants';
// import useStyles from './style';

import playIcon from 'Assets/images/bonzoui/tabicons/play.svg';

const TwoIcons = ({ callback, item }) => {
  // const styled = useStyles();
  const localCallback = (e) => {
    if (callback) callback(e, { ...item, tag: CHALLENGE_TAGS.SET_OPPONENT });
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mr={-1}>
      {/* <IconButton onClick={localCallback} data-tag="message" className={styled.relativePos}>
        {!!item.is_new_message && <Box className={styled.indicator} />}
        <i className="i i-send" />
      </IconButton> */}
      <IconButton disabled onClick={localCallback} data-tag={CHALLENGE_TAGS.SET_OPPONENT}>
        {/* <i className="i i-play_button_invert ___new" /> */}
        <img src={playIcon} width="22" height="22" border="0" alt="reject" style={{ padding: '1px', marginRight: '10px' }} />
      </IconButton>
    </Box>
  );
};

export default TwoIcons;
