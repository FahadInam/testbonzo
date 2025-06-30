import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: '100%',
    overflow: 'hidden',
    flex: '1 1',
    flexGrow: 1,
    flexShrink: 1,
    background: theme.palette.background.default,
    '& > div': {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      willChange: ' opacity, transform',
      overflow: 'hidden',
    },
  },
}));

const CustomSwitcher = (props) => {
  const style = useStyles();
  const { children } = props;
  return <div className={style.root}>{children}</div>;
};

export default CustomSwitcher;
