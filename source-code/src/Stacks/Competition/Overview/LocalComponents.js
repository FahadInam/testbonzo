/* eslint-disable camelcase */
import React from 'react';
import { Numbers } from 'Utils';
import { Box, Grid } from '@material-ui/core';
import { OneListItem, OneListItemLoader, SecondaryText } from '../shared/ListBox';
import useStyles from './style';

export const ListingLoader = () => {
  return [0, 1, 2, 3, 4, 5].map((item) => {
    return <OneListItemLoader secondary endIcon key={item} />;
  });
};
export const ListPrimaryText = React.memo((props) => {
  const styled = useStyles();
  // const { palette } = useTheme();
  const { name, points, points2, forHeading } = props;
  let points_to_show = points > 100000 ? Numbers.AbbreviatedNumber(points, 2) : Numbers.ToCommaSeparated(points);
  let points_to_show2 = points2 > 100000 ? Numbers.AbbreviatedNumber(points2, 2) : points2;

  return (
    <Grid container>
      <Grid item xs={points2 ? 6 : 9}>
        <Box className={forHeading && styled.progress_table_heading} pr={2.5} pt={0.5} textOverflow="ellipsis" overflow="hidden">
          {name}
        </Box>
      </Grid>
      {(points || points === 0) && (
        <Grid item xs={3} pt={0.5} container alignItems={forHeading ? 'flex-start' : 'center'} justifyContent="flex-start">
          <Box className={forHeading && styled.progress_table_heading} pt={0.25}>{`${
            typeof points === 'string'
              ? points
              : points === 0
              ? points
              : typeof points === 'number'
              ? Number.isInteger(points)
                ? points_to_show
                : parseFloat(Number(points_to_show).toFixed(2))
              : 0
          }${forHeading ? '' : '%'}`}</Box>
        </Grid>
      )}
      {(points2 || points2 === 0) && (
        <Grid item xs={3} pt={0.5} container alignItems={forHeading ? 'flex-start' : 'center'} justifyContent="flex-start">
          <Box className={forHeading && styled.progress_table_heading} pt={0.25}>{`${
            points_to_show2 === 'Completed By'
              ? points_to_show2
              : Number(points2) === 0
              ? points2
              : typeof Number(points2) === 'number'
              ? Number.isInteger(Number(points2))
                ? points_to_show2
                : parseFloat(Number(points_to_show2).toFixed(2))
              : 0
          }${forHeading ? '' : '%'}`}</Box>
        </Grid>
      )}
    </Grid>
  );
});

export const TopPerformance = ({ top_performance }) => {
  if (top_performance.length === 0) return null;

  return top_performance.map((item) => {
    return (
      <OneListItem
        item={{
          ...item,
          primary: <ListPrimaryText name={item.name} points={item.avg_score} />,
          avatar: item.profile_picture,
          tag: 'top',
        }}
        key={item.row_id}
      />
    );
  });
};

export const StrugglingPerformance = ({ struggling_performance }) => {
  if (struggling_performance.length === 0) return null;

  return struggling_performance.map((item, index) => {
    return (
      <OneListItem
        item={{
          ...item,
          primary: <ListPrimaryText name={item.name} points={item.avg_score} />,
          avatar: item.profile_picture,
          tag: 'struggling',
        }}
        key={index}
      />
    );
  });
};

export const InstReport = ({ competition_progress }) => {
  if (competition_progress.lessons.length === 0) return null;
  // console.log(competition_progress.lessons);
  return competition_progress.lessons.map((item, index) => {
    // console.log(item, index);
    return (
      <OneListItem
        item={{
          ...item,
          primary: <ListPrimaryText name={item.lesson_name} points={item.avg_completion || 0} />,
          tag: 'competition_progress',
        }}
        secondary={<SecondaryText merge1={`${item.completed_by} of ${item.total_players}`} merge2="have completed" />}
        key={index}
      />
    );
  });
};

export const InstGamesReport = ({ games_report }) => {
  if (games_report.report.length === 0) return null;
  // console.log('games_report', games_report.report);
  return games_report.report.map((item, index) => {
    // console.log(item, index);
    return (
      <OneListItem
        item={{
          ...item,
          primary: <ListPrimaryText name={item.title} points={item.avg_score || 0} points2={`${item.completion_percentage || 0}`} />,
          tag: 'games_report',
        }}
        // secondary={<SecondaryText merge1={`${item.completed_by} of ${item.total_players}`} merge2="have completed" />}
        // secondary={<SecondaryText merge1={`${item.title}`} merge2="" />}
        key={index}
      />
    );
  });
};
