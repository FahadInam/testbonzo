import React from 'react';
import { Grid, makeStyles, useTheme, Container } from '@material-ui/core';
// import CompetitionNav from 'Navigation/Paths/competition.constants';
import { useSelector } from 'react-redux';
import { McdUser } from 'Utils';
import { Button } from './Core';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.common.dark,
    position: 'fixed',
    zIndex: 2,
    top: 0,
  },
  nowrap: {
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.common.white,
    height: '64px',
    [theme.breakpoints.only('xs')]: {
      fontSize: theme.typography.pxToRem(13),
    },
  },
  signUp: {
    marginLeft: theme.spacing(2),
    marginTop: 0,
    height: '41px',
  },
  signIn: {
    marginTop: 0,
    background: 'transparent',
    height: '41px',
    border: `1.5px solid ${theme.palette.common.white}`,
    '&:hover': {
      background: theme.palette.common.red,
      border: `1.5px solid ${theme.palette.common.red}`,
      color: theme.palette.dark,
    },
    '&:active': {
      background: theme.palette.common.red,
      border: `1.5px solid ${theme.palette.common.red}`,
      color: theme.palette.dark,
    },
  },
}));

const McdFullScreenBar = ({ mcdStatus }) => {
  const styled = useStyles();
  useSelector((state) => state.User);
  const { texts } = useTheme();
  if (!mcdStatus) return null;

  return (
    <Grid container className={styled.root}>
      <Container>
        <Grid container className={styled.nowrap}>
          {/* <Grid item className={styled.text}> */}
          {texts.FULLSCREEN_TEXT}
          {/* </Grid>
          <Grid item className={styled.btn}> */}
          <Button
            width="auto"
            mt={0.75}
            m={0}
            className={styled.signUp}
            onClick={() => {
              McdUser.ToggleFullScreen(true);
            }}
          >
            {texts.FULLSCREEN}
          </Button>
        </Grid>
        {/* </Grid> */}
      </Container>
    </Grid>
  );
};

export default McdFullScreenBar;
