import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTheme, Box } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import dayjs from 'dayjs';
import { PAGE_STATE } from 'Constants';
import Grid from '@material-ui/core/Grid';
import { CardLoader, Card, Body2, NoDataFound } from 'Components';
import ResContainer, { ResGrid } from 'Components/Layouts/ResponsiveGrid';
import PageSubTitle from 'Components/Core/PageSubTitle';
import competitions_icon from 'Assets/images/bonzoui/headings/rewards.png';
import { PerPageLoader } from 'Components/Loader/PerPageLoader';
import { GetCompetitionDetails, GetRewardTransactions } from 'Actions/competitions.action';
import dailyBadge from 'Assets/images/dailybadge.png';
import weeklyBadge from 'Assets/images/weeklybadge.png';
import monthlyBadge from 'Assets/images/monthlybadge.png';
import useStyles from './style';
import { Cordova } from 'Utils';
import { SelectedCompetition } from 'Actions';
// import { Cordova } from 'Utils';

export const RewardHistory = ({ competition }) => {
  let PageState = PAGE_STATE.IS_LOADING;
  let PageUI = null;
  let PreLoader = null;
  const pageData = useSelector((state) => state.GetCompetitionsRewardHistory, shallowEqual);
  const compDetail = useSelector((state) => state.GetCompetitionDetails, shallowEqual);
  const { palette, texts } = useTheme();
  const styled = useStyles();
  const dispatch = useDispatch();
  // const [scrollNode, setScrollNode] = useState(undefined);
  // const user = User.Info();
  const currentComp = SelectedCompetition.Info();
  const friendlyDate = (str) => {
    return dayjs(str).format('DD/MM/YYYY');
  };

  if (!pageData) {
    PageState = PAGE_STATE.IS_LOADING;
    PreLoader = [0, 1, 2, 3, 4, 5].map((item) => {
      const secondary = (
        <Box m={2} display="flex" justifyContent="center" alignItems="center">
          <Box textAlign="left" className={styled.secondary}>
            <Box>
              <Skeleton variant="rect" width="90px" height="20px" className={styled.skeleton} />
            </Box>
            <Box>
              <Skeleton variant="rect" width="90px" height="20px" className={styled.skeleton} />
            </Box>
          </Box>
        </Box>
      );
      return (
        <ResGrid key={item}>
          <CardLoader item={{ secondary, primary: true }} />
        </ResGrid>
      );
    });
    PageUI = <PerPageLoader PageState={PageState}>{PreLoader}</PerPageLoader>;
  } else if (pageData.shouldRetry) {
    PageState = PAGE_STATE.RETRY;
    PageUI = <PerPageLoader PageState={PageState} />;
  } else if (pageData.rewards.length === 0) {
    PageState = PAGE_STATE.NO_DATA_TO_SHOW;
    PageUI = <NoDataFound />;
  } else {
    PageState = PAGE_STATE.LOADED;
    PageUI = pageData.rewards.map((reward) => {
      const secondary = (
        <Box ml={2} mr={2} mt={4} display="flex" justifyContent="space-between">
          <Body2 color={palette.common.grey[400]}>{friendlyDate(reward.request_date)}</Body2>
          <Body2
            color={
              reward.order_status === 'Processing'
                ? palette.common.blue
                : reward.order_status === 'Cancelled'
                ? palette.common.red
                : palette.common.green
            }
          >
            {reward.order_status}
          </Body2>
        </Box>
      );
      const badgeImg =
        parseInt(1 + Math.random() * (4 - 1)) === 1
          ? dailyBadge
          : parseInt(1 + Math.random() * (4 - 1)) === 3
          ? monthlyBadge
          : weeklyBadge;
      return (
        <ResGrid key={reward.reward_id}>
          <Grid container alignItems="flex-start" justifyContent="flex-end">
            <Box className={styled.containerCard}>
              {/* <img src={Cordova.Path(badgeImg)} alt="Avatar" className={styled.imageCard} /> */}
              <Card
                className={styled.imageCard}
                item={{
                  ...reward,
                  image: reward.image,
                  code: reward.code,
                  primary: reward.title,
                  secondary,
                  status: reward.order_status,
                }}
                iconImg
              />

              <Box className={styled.middleTxt}>
                <Box className={styled.textW}>
                  <img
                    src={Cordova.Path(badgeImg)}
                    style={{
                      zIndex: '99',
                      width: '74px',
                      height: '65px',
                      marginRight: '20px',
                      paddingTop: '10px',
                      paddingRight: '10px',
                      position: 'fixed',
                    }}
                    alt="Hello"
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
        </ResGrid>
      );
    });
  }

  const loadComDetailData = useCallback(() => {
    dispatch(GetCompetitionDetails(currentComp?.item?.enrolled, competition.competition_id));
  }, [dispatch, currentComp, competition]);

  useEffect(() => {
    if (!compDetail) {
      loadComDetailData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compDetail]);

  const loadData = useCallback(() => {
    dispatch(GetRewardTransactions({ competition_id: competition.competition_id, current_grade: compDetail.current_grade }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, competition]);

  useEffect(() => {
    if (!pageData && compDetail) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageData, compDetail]);

  return (
    <>
      {/* <SlidableView showGradient>
        <Header
          // trigger={trigger}
          scrollNode={scrollNode}
          headerSet={{
            showRight: true,
            showLeft: true,
            overrideLeftButton: false,
            notify: false,
          }}
        />
        <FlexibleView
          ref={(node) => {
            if (node) {
              setScrollNode(node);
            }
          }}
        > */}

      <PageSubTitle logo={competitions_icon} name={texts.CLAIMED_REDEEMED_REWARDS} />
      {/* <H1>{texts.REWARD_HISTORY}</H1> */}
      <ResContainer>{PageUI}</ResContainer>
      {/* </FlexibleView>
      </SlidableView> */}
    </>
  );
};

export default RewardHistory;
