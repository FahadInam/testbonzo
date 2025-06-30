/* eslint-disable camelcase */
import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import { ReportCardLoader, ReportCard } from 'Components';
import { IMAGES } from 'Constants';
import { convertSecondsToTimeString } from 'Utils';

const useStyles = makeStyles((theme) => ({
  root: {
    // border: '1px solid red',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '28px',
    width: '100%',
    '@media (max-width: 1305px)': {
      gap: '24px',
    },
    '@media (max-width: 923px)': {
      gap: '20px',
    },
  },
  cardGrid: {
    position: 'relative',
    padding: '20px 50px',
    [theme.breakpoints.down('md')]: {
      padding: '20px',
    },
  },
}));

export const MainReportLoader = () => {
  const styled = useStyles();
  const UI = [0, 1, 2, 4, 5, 6].map((item, index) => {
    return <ReportCardLoader key={index} item={{}} />;
  });

  return <Grid className={styled.root}>{UI}</Grid>;
};

export const MainReport = React.memo((ReportData) => {
  // const useStyles = makeStyles((theme) => ({
  //   root: {},
  // }));

  const styled = useStyles();

  if (!ReportData) return null;

  const { active_players, avg_completion, games_played, time_spent_in_seconds, total_games, total_players } = ReportData.ReportData;

  let calculated_time = time_spent_in_seconds ? convertSecondsToTimeString(time_spent_in_seconds) : 0;
  const Report = [
    { icon: IMAGES.TOTAL_GAMES, number: total_games, title: 'Total Games' },
    { icon: IMAGES.TOTAL_GAMES_PLAYED, number: games_played, title: 'Total Games played' },
    { icon: IMAGES.TOTAL_HOURS_SPENT, number: calculated_time, title: 'Total Time Spent' },
    { icon: IMAGES.TOTAL_PLAYERS, number: total_players, title: 'Total Players' },
    { icon: IMAGES.ACTIVE_PLAYERS, number: active_players, title: 'Active Players' },
    { icon: IMAGES.AVG_COMPLETION_RATE, number: avg_completion, title: 'Average Completion rate' },
  ];

  const UI = Report.map((item, index) => {
    return (
      // <Grid className={styled.root} key={index}>
      //   <ReportCard item={item} />
      // </Grid>
      // <Grid item sm={12} md={6} lg={4}>
      <ReportCard key={index} item={item} />
      // </Grid>
    );
  });

  return <Grid className={styled.root}>{UI}</Grid>;
});
