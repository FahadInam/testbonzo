import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Box, Grid, useTheme } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { PAGE_STATE, API_CALLS, IMAGES } from 'Constants';
import { GetStats } from 'Actions';
import { Numbers, IsEmptyObject } from 'Utils';
import { Paper, IconPaper, SlidableView, FlexibleView, Header, NoDataFound } from 'Components';
import { gameDispatch } from 'Utils/ActionCreators';
import { WinLostData } from 'Components/Stats';
import ResContainer from 'Components/Layouts/ResponsiveGrid';
import { PerPageLoader } from 'Components/Loader/PerPageLoader';
import useStyles from './style';
import { GoToLastPage } from 'Navigation';
import { useHistory } from 'react-router-dom';

const Stats = React.memo(({ competition }) => {
  let PageState = PAGE_STATE.IS_LOADING;
  let PageUI = null;
  let PreLoader = null;
  const { texts } = useTheme();
  const styled = useStyles();
  const dispatch = useDispatch();
  const [callRef, setCallRef] = useState({ sent: false, grade: competition.current_grade });
  const [scrollNode, setScrollNode] = useState(undefined);
  const pageData = useSelector((state) => state.Stats, shallowEqual);
  const compDetail = useSelector((state) => state.GetCompetitionDetails, shallowEqual);
  const history = useHistory();

  function AbbreviatedNumber(value, decimalPlaces) {
    if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(decimalPlaces) + 'M'; // Abbreviate in millions
    } else if (value >= 1000) {
      const rounded = (value / 1000).toFixed(decimalPlaces);
      return parseFloat(rounded) + 'K'; // ParseFloat removes trailing ".0"
    }
    return value.toString(); // No abbreviation for numbers below 1000
  }

  if (!pageData) {
    PreLoader = (
      <>
        <Box style={{ width: '100%', paddingTop: '50px' }}>
          <Grid xs={12} item>
            <Paper>
              <Box pb={2} className={`${styled.row} ${styled.flexCenter}`} style={{ gap: '20px', paddingTop: '4px' }}>
                <Skeleton variant="circle" className={styled.skeletonNumberCircle} height="45px" width="45px" />
                <Skeleton height="44px" width="50%" className={styled.skeleton} />
              </Box>
              <Box mt={4} pb={2} className={`${styled.row} ${styled.flexCenter} ${styled.skeleton_box}`} style={{ gap: '20px' }}>
                <Box className={`${styled.row}`}>
                  <Skeleton height="44px" width="100%" className={styled.skeleton} />
                  <Skeleton className={styled.skeletonNumberCircle} height="320px" width="100%" style={{ marginTop: '-65px' }} />
                  <Skeleton height="44px" width="100%" className={styled.skeleton} style={{ marginTop: '-42px' }} />
                </Box>
                <Box className={`${styled.row}`}>
                  <Skeleton height="50px" width="100%" className={styled.skeleton} />
                  <Skeleton height="50px" width="100%" className={styled.skeleton} />
                  <Skeleton height="50px" width="100%" className={styled.skeleton} />
                  <Skeleton height="50px" width="100%" className={styled.skeleton} />
                  <Skeleton height="50px" width="100%" className={styled.skeleton} />
                  <Skeleton height="50px" width="100%" className={styled.skeleton} />
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Box>
        <Box style={{ width: '100%', paddingTop: '50px' }}>
          <Grid xs={12} item>
            <Paper>
              <Box pb={2} className={`${styled.row} ${styled.flexCenter}`} style={{ gap: '20px', paddingTop: '4px' }}>
                <Skeleton variant="circle" className={styled.skeletonNumberCircle} height="45px" width="45px" />
                <Skeleton height="44px" width="50%" className={styled.skeleton} />
              </Box>
              <Box mt={4} pb={2} className={`${styled.row} ${styled.flexCenter} ${styled.skeleton_box}`} style={{ gap: '20px' }}>
                <Box className={`${styled.row}`}>
                  <Skeleton height="44px" width="100%" className={styled.skeleton} />
                  <Skeleton className={styled.skeletonNumberCircle} height="320px" width="100%" style={{ marginTop: '-65px' }} />
                  <Skeleton height="44px" width="100%" className={styled.skeleton} style={{ marginTop: '-42px' }} />
                </Box>
                <Box className={`${styled.row}`}>
                  <Skeleton height="50px" width="100%" className={styled.skeleton} />
                  <Skeleton height="50px" width="100%" className={styled.skeleton} />
                  <Skeleton height="50px" width="100%" className={styled.skeleton} />
                  <Skeleton height="50px" width="100%" className={styled.skeleton} />
                  <Skeleton height="50px" width="100%" className={styled.skeleton} />
                  <Skeleton height="50px" width="100%" className={styled.skeleton} />
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Box>
        <Box style={{ width: '100%', paddingTop: '50px' }}>
          <Grid xs={12} item>
            <Paper>
              <Box pb={2} className={`${styled.row} ${styled.flexCenter}`} style={{ gap: '20px', paddingTop: '4px' }}>
                <Skeleton variant="circle" className={styled.skeletonNumberCircle} height="45px" width="45px" />
                <Skeleton height="44px" width="50%" className={styled.skeleton} />
              </Box>
              <Box mt={4} pb={2} className={`${styled.row} ${styled.flexCenter} ${styled.skeleton_box}`} style={{ gap: '20px' }}>
                <Box className={`${styled.row}`}>
                  <Skeleton height="44px" width="100%" className={styled.skeleton} />
                  <Skeleton className={styled.skeletonNumberCircle} height="320px" width="100%" style={{ marginTop: '-65px' }} />
                  <Skeleton height="44px" width="100%" className={styled.skeleton} style={{ marginTop: '-42px' }} />
                </Box>
                <Box className={`${styled.row}`}>
                  <Skeleton height="50px" width="100%" className={styled.skeleton} />
                  <Skeleton height="50px" width="100%" className={styled.skeleton} />
                  <Skeleton height="50px" width="100%" className={styled.skeleton} />
                  <Skeleton height="50px" width="100%" className={styled.skeleton} />
                  <Skeleton height="50px" width="100%" className={styled.skeleton} />
                  <Skeleton height="50px" width="100%" className={styled.skeleton} />
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Box>
      </>
    );
    PageUI = <PerPageLoader PageState={PageState}>{PreLoader}</PerPageLoader>;
  } else if (pageData.shouldRetry) {
    PageState = PAGE_STATE.RETRY;
    PageUI = <PerPageLoader PageState={PageState} />;
  } else if (IsEmptyObject(pageData) || (pageData.global && pageData.subjects.length === 0 && IsEmptyObject(pageData.global))) {
    PageState = PAGE_STATE.NO_DATA_TO_SHOW;
    PageUI = <NoDataFound />;
  } else {
    PageState = PAGE_STATE.LOADED;
    const { global, subjects } = pageData;
    PageUI = (
      <>
        <IconPaper
          ADD_CODE
          title={texts.COMPETITION_SUMMARY}
          title_bg="#112d70"
          addCodeIcon={IMAGES.STATS_ICON}
          fullWidth
          className={styled.stats_container}
        >
          <WinLostData
            total_coins={`${global[0].points > 0 ? `+ ${AbbreviatedNumber(global[0].points, 1)}` : 0} `}
            overall_accuracy={global[0]?.overall_accuracy}
            total_multiplayer_matches={global[0].total_multiplayer_matches}
            total_single_player_matches={global[0].total_single_player_matches}
            total_multiplayer_wins={global[0].total_multiplayer_wins}
            total_single_player_wins={global[0].total_single_player_wins}
            total_multiplayer_ties={global[0].total_multiplayer_ties}
            total_multiplayer_others={global[0].total_multiplayer_others}
          />
        </IconPaper>

        {subjects.length > 1 &&
          subjects.map((item, index) => {
            return (
              <IconPaper
                key={index}
                ADD_CODE
                title={item?.subject}
                // title={"Competition Summary"}
                title_bg="#112d70"
                addCodeIcon={IMAGES.STATS_ICON}
                fullWidth
                className={styled.stats_container}
              >
                <WinLostData
                  total_coins={`${
                    Numbers.AbbreviatedNumber(item.points, 2) > 0 ? `+ ${Numbers.AbbreviatedNumber(item.points, 2)}` : 0
                  } `}
                  overall_accuracy={item?.overall_accuracy}
                  total_multiplayer_matches={item.total_multiplayer_matches}
                  total_single_player_matches={item.total_single_player_matches}
                  total_multiplayer_wins={item.total_multiplayer_wins}
                  total_single_player_wins={item.total_single_player_wins}
                  total_multiplayer_ties={item.total_multiplayer_ties}
                  total_multiplayer_others={item.total_multiplayer_others}
                  // secondary1={texts.MULTIPLAYER_MATCHES}
                  // secondary2={texts.SINGLE_PLAYER_MATCHES}
                />
              </IconPaper>
            );
          })}
      </>
    );
  }

  const loadData = useCallback(() => {
    dispatch(GetStats(competition?.competition_id, compDetail?.current_grade));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, competition]);

  if (competition.current_grade !== callRef.grade && callRef.sent) {
    setCallRef({ sent: false, grade: competition.current_grade });
  }

  useEffect(() => {
    if (!pageData && !callRef.sent) {
      loadData();
    }
    setCallRef({ grade: callRef.grade, sent: true });
  }, [pageData, loadData, callRef.sent, callRef.grade]);

  useEffect(() => {
    return () => {
      gameDispatch(API_CALLS.GetStats.CLEAR);
    };
  }, []);

  const backButtonCallback = () => {
    GoToLastPage(history);
  };

  return (
    <SlidableView showGradient>
      <Header
        scrollNode={scrollNode}
        headerSet={{
          showRight: true,
          showLeft: true,
          leftTitle: texts.BACK,
          overrideLeftButton: true,
          notify: false,
          callback: backButtonCallback,
          showFloatingFAQ: true,
        }}
      />

      <FlexibleView
        ref={(node) => {
          if (node) {
            setScrollNode(node);
          }
        }}
      >
        {/* <H1>Stats</H1> */}
        <ResContainer boxClassName={styled.stats_screen} className={styled.stats_screen}>
          {PageUI}
        </ResContainer>
      </FlexibleView>
    </SlidableView>
  );
});

export default Stats;
