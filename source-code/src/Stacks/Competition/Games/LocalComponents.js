import React, { useMemo } from 'react';
import { Grid, Box, useTheme } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { H3, Card, CardLoader, Paper } from 'Components';
import Rail, { RailItem } from 'Components/Rail';
import { 
  // GetObjFromArr,
   IsEmptyObject } from 'Utils';
import { PageSwitch } from 'Navigation';
import { ChallengeNav } from 'Navigation/Paths';
import { CHALLENGE_TAGS, CHALLENGE } from 'Constants/challenge.constants';
import { gameDispatch } from 'Utils/ActionCreators';
import useStyles from './style';

const preProcessGames = (title, list) => {
  const filteredBySubject = [];
  let singleMcq = {};
  for (let i = 0; i < list.length; i++) {
    if (list[i].subject === title) {
      filteredBySubject.push({ ...list[i] });
    }
  }

  if (filteredBySubject.length === 1) return filteredBySubject;

  for (let i = 0; i < filteredBySubject.length; i++) {
    if (filteredBySubject[i].type.toLowerCase() === 'mcq') {
      singleMcq = { ...filteredBySubject[i] };
      filteredBySubject.splice(i, 1);
      i--;
    }
  }
  if (!IsEmptyObject(singleMcq)) {
    filteredBySubject.push(singleMcq);
  }

  return filteredBySubject;
};

export const SingleSubjectGames = React.memo(({ title, list, games }) => {
  const { texts, palette } = useTheme();
  const callback = (e, item) => {
    gameDispatch(CHALLENGE.SET_SUBJECT, item);
    PageSwitch(ChallengeNav.CHALLENGE_SELECTION);
  };
  let gameObj = {};

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const listToShow = useMemo(() => preProcessGames(title, list), [title]);
  // console.log('games.........', games, 'title', title, 'list..', list)

  return (
    <Grid item xs={12}>
      <Paper
        maxWidth="100%"
        background={palette.primary.light}
        m={0}
        mb={2}
        pt={1.5}
        pb={1.5}
        pl={6}
        pr={6}
        elevation={0}
        display="inline-block"
      >
        <H3 m={0}>{title}</H3>
      </Paper>

      <Rail>
        {listToShow.map((game) => {
            // gameObj = GetObjFromArr(games, 'game_id', game.type);

            // if (!gameObj || IsEmptyObject(gameObj)) return null;
            return (
              <RailItem key={game.content_id}>
                <Card
                  item={{
                    ...game,
                    id: game.content_id,
                    buttonTitle: texts.PLAY,
                    image: gameObj.image_url,
                    tag: CHALLENGE_TAGS.RECOMMENDED_GAME,
                  }}
                  callback={callback}
                />
              </RailItem>
            );
          })}
      </Rail>
    </Grid>
  );
});

export const SingleSubjectGamesLoader = React.memo(({ item: { list } }) => {
  const styled = useStyles();
  return (
    <Grid item xs={12}>
      <Box pb={2} pl={1} mb={1}>
        <Skeleton variant="rect" width="65%" height="48px" className={styled.skeleton} />
      </Box>
      <Rail>
        {list.map((game) => {
          return (
            <RailItem key={game.id}>
              <CardLoader item={game} />
            </RailItem>
          );
        })}
      </Rail>
    </Grid>
  );
});
