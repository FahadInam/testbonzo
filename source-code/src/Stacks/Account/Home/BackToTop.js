import React from 'react';
import { Fab } from '@material-ui/core';
import { KeyboardArrowUp } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    zIndex: '100',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    display: (props) => (props.show ? 'flex' : 'none'),
    boxShadow: '2px 2px 10px 0 rgba(49, 50, 51, .6)',
  },
  arrow: {
    fontSize: '44px',
  },
}));

const BackToTop = ({ show, scrollRef }) => {
  const classes = useStyles({ show });

  const handleClick = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Fab color="secondary" className={classes.root} onClick={handleClick}>
      <KeyboardArrowUp className={classes.arrow} />
    </Fab>
  );
};

export default BackToTop;
