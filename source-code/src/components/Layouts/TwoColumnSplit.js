/* eslint-disable import/no-cycle */
import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import User from 'Actions/user.action';
import SelectedCompetition from 'Actions/selectedCompetition.action';
import { shallowEqual, useSelector } from 'react-redux';
import { getInstanceType } from 'Utils';
import { INSTANCES_ID } from 'Constants/instance.config';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'inherit',
    overflow: 'inherit',
    background: theme.palette.background.default,
    flexDirection: 'column',
    paddingTop: () => (User.IsGuest() && !SelectedCompetition.CompetitionPrivacyCheck() ? theme.spacing(7) : 0),

    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row-reverse',
    },
  },
  subscribed_style: {
    paddingTop: '56px !important', // Apply same padding as the condition in root
  },
  un_subscribed_style: {
    paddingTop: '0px',
  },
}));

const TwoColumnSplit = ({ children }) => {
  const premium_competition = useSelector((state) => state.PremiumCompetition.data, shallowEqual);
  const isNotSubscribed = premium_competition?.is_subscribed === 0; // Ensure safe access
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const isShupavu = getInstanceType(Inst_config.instance_id, INSTANCES_ID.SHUPAVU_ID);

  const styled = useStyles();
  return (
    <Grid
      container
      className={`${styled.root} ${isNotSubscribed && isShupavu ? styled.subscribed_style : styled.un_subscribed_style}`}
    >
      {children}
    </Grid>
  );
};

export default TwoColumnSplit;
