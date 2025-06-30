import React from 'react';
import { Grid, makeStyles, useTheme, Container } from '@material-ui/core';
// import CompetitionNav from 'Navigation/Paths/competition.constants';
import User from 'Actions/user.action';
import { shallowEqual, useSelector } from 'react-redux';
// import { Button } from './Core';
import ButtonBold from 'Components/Core/ButtonBold';
import { PageSwitch } from 'Navigation';
import defaultNavConstants from 'Navigation/Paths/defaultNav.constants';
import { getInstanceType } from 'Utils';
import { INSTANCES_ID } from 'Constants/instance.config';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.common.black,
    position: 'fixed',
    zIndex: 2,
    top: 0,
    fontFamily: 'Poppins',
    fontWeight: 600,
  },
  nowrap: {
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.common.white,
    height: '56px',
    [theme.breakpoints.only('xs')]: {
      fontSize: theme.typography.pxToRem(13),
    },
    [theme.breakpoints.down('xs')]: {
      transform: 'scale(0.9)',
    },
  },
  subscribeBtn: {
    marginLeft: theme.spacing(2),
    marginTop: 0,
    height: '40px',
  },
  signIn: {
    marginTop: 0,
    marginLeft: theme.spacing(3),
    height: '40px',
  },
  containerClass: {
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
    },
  },
}));

// This component is displayed when the is_subscribed (status API response) value is false.
const TopSubscribeBar = () => {
  const styled = useStyles();
  useSelector((state) => state.User);
  const { texts } = useTheme();
  const premiumCompetition = useSelector((state) => state.PremiumCompetition.data, shallowEqual);
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const isShupavu = getInstanceType(Inst_config.instance_id, INSTANCES_ID.SHUPAVU_ID);

  if (!User.IsGuest() && !isShupavu ? true : premiumCompetition === null || premiumCompetition?.is_subscribed === 1) return <></>;

  return (
    <Grid container className={styled.root}>
      <Container className={styled.containerClass}>
        <Grid container className={styled.nowrap}>
          {texts.SUBSCRIBE_BAR_MSG}
          <ButtonBold
            yellowBubble
            secondaryYellow
            smallContainer
            width="auto"
            mt={0.75}
            m={0}
            className={styled.subscribeBtn}
            onClick={() => {
              PageSwitch(defaultNavConstants.PAYMENT);
            }}
          >
            {texts.SUBSCRIBE}
          </ButtonBold>
        </Grid>
        {/* </Grid> */}
      </Container>
    </Grid>
  );
};

export default TopSubscribeBar;
