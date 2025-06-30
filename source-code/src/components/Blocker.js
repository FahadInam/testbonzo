import React from 'react';
import { Box, makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  blocker: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: theme.zIndex.modal,
    background: 'rgba(0,0,0,0.5)',
  },
}));

const Blocker = ({ children, className, callback }) => {
  const styled = useStyle();
  return (
    <Box onClick={callback} data-tag="overlay" className={`${styled.blocker} ${className || ''}`}>
      {children}
    </Box>
  );
};

export default Blocker;
