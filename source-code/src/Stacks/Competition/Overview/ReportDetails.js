/* eslint-disable camelcase */
import React from 'react';

import { Grid, makeStyles, useTheme } from '@material-ui/core';
import ListBox, { NoDataListBox } from '../shared/ListBox';
const useStyles = makeStyles((theme) => ({
  nowrap: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '16px',
  },
}));
const ReportDetails = React.memo(({ mainReport, top_performance, struggling_performance, competition_progress, games_report, tableHeading }) => {
  const { texts } = useTheme();
  const styled = useStyles();
  // console.log('recommendationsData', recommendationsData);

  return (
    <>
      <Grid item container xs={12} className={styled.nowrap}>
        {mainReport}
      </Grid>

      <Grid item xs={12} md={6} pb={1} pt={1} key="top_performance" id="top_performance">
        {top_performance ? (
          <ListBox title={texts.TOP_PERFORMERS} items={top_performance} />
        ) : (
          <NoDataListBox title={texts.TOP_PERFORMERS} NoDataText={texts.NO_DATA_FOUND} />
        )}
      </Grid>

      <Grid item xs={12} md={6} key="struggling_performance" id="struggling_performance">
        {struggling_performance ? (
          <ListBox title={texts.STRUGGLING_PERFORMERS} items={struggling_performance} />
        ) : (
          <NoDataListBox title={texts.STRUGGLING_PERFORMERS} NoDataText={texts.NO_DATA_FOUND} />
        )}
      </Grid>

      <Grid item xs={12} key="competition_progress" id="competition_progress">
        {competition_progress ? (
          <ListBox title={texts.COMPETITION_PROGRESS} items={competition_progress} />
        ) : (
          <NoDataListBox title={texts.COMPETITION_PROGRESS} NoDataText={texts.NO_DATA_FOUND} />
        )}
      </Grid>

      <Grid item xs={12} md={12} key="games_report" id="games_report">
        {games_report ? (
          <ListBox tableHeading={tableHeading} title={texts.GAMES_REPORT} items={games_report} />
        ) : (
          <NoDataListBox title={texts.GAMES_REPORT} NoDataText={texts.NO_DATA_FOUND} />
        )}
      </Grid>
    </>
  );
});

export default ReportDetails;
