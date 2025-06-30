/* eslint-disable no-lonely-if */
/* eslint-disable camelcase */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTheme, Box, Grid, Chip } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { PAGE_STATE, ALERT, API_CALLS } from 'Constants';
import { GetUserTransactions } from 'Actions';
import { friendlyDate, Cordova } from 'Utils';
import {
  H1,
  IconPaper,
  NoDataFound,
  Header,
  SlidableView,
  FlexibleView,
  Body2,
  GenericConfirmationBox,
  SupportBanner,
} from 'Components';
// import { InlineButton } from 'Components/Core/Button';
import ResContainer from 'Components/Layouts/ResponsiveGrid';

import { gameDispatch } from 'Utils/ActionCreators';
import { GoToLastPage } from 'Navigation';
// import { CompetitionNav, DefaultNav } from 'Navigation/Paths';
import { PerPageLoader } from 'Components/Loader/PerPageLoader';
// import { ClaimReward, GetCompetitionsActivities } from 'Actions/competitions.action';

import { Toast } from 'Actions/app.control.action';
// import OsProperties from 'Utils/OsProperties';
import useStyles from './style';

const MyPurchases = React.memo(({ competition, isOnlyCompetition }) => {
  let PageState = PAGE_STATE.IS_LOADING;
  let PageUI = null;
  let PreLoader = null;
  // let [reloadVar, setReloadVar] = useState(false);
  const { is_certificate_enabled } = competition;
  const pageData = useSelector((state) => state.GetUserTransactions, shallowEqual);
  // const UserData = useSelector((state) => state.Profile, shallowEqual);
  // const UserTimeRewardsData = useSelector((state) => state.SetUserTimeReward, shallowEqual);
  // const [certStatus, setCertStatus] = useState();
  const [popUpVisible, setPopUpVisible] = useState(false);
  // const [popUpInfoVisible, setPopUpInfoVisible] = useState(false);
  const [confBoxVisible, setConfBoxVisible] = useState(false);
  const IsMcdUser = useSelector((state) => state.McdUser.mcd_user, shallowEqual);
  const [scrollNode, setScrollNode] = useState(undefined);

  const { texts } = useTheme();
  // const user = User.Info();
  // console.log('USER: ', user);
  const styled = useStyles();
  const dispatch = useDispatch();
  const [callRef, setCallRef] = useState({ sent: false, grade: competition.current_grade });
  // // const [stateRef, setStateRef] = useState({ status: true, Subjects: null });
  // const [rewardAvailable, setRewardAvailable] = useState(false);
  // const [certAvailable, setCertAvailable] = useState(false);
  const cancelPayment = (no) => {
    setConfBoxVisible(true);
  };
  // const showRewardInfo = (reward, state = false, callback) => {
  //   setPopUpInfoVisible(state);
  //   console.log('popUpInfoVisible:', popUpInfoVisible);
  //   return (
  //     <ModalBox isVisible={popUpInfoVisible} allowClose callback={callback} icon="box" title="Reward Information">
  //       <Box mb={2} mt={2} textAlign="center">
  //         {reward.instructions}
  //       </Box>
  //     </ModalBox>
  //   );
  // };
  const returnPaymentMode = (m) => {
    switch (m.trim().toLowerCase()) {
      case 'otc':
        return 'Jazz Cash Voucher';
      // break;
      case 'migs':
        return 'Credit/Debit Card';
      // break;
      case 'mwallet':
        return 'Jazz Cash Mobile Account';
      // break;
      default:
        return 'Unknown/Other';
    }
  };
  const callback = (e, item) => {
    const t = e.currentTarget.getAttribute('data-tag') || e.target.name;
    // console.log('t: ', t);
    switch (t) {
      case 'overlay':
      case 'close':
        setPopUpVisible(false);
        break;
      case 'cancel-payment-positive':
        Toast.Show(texts.PAYMENT_REFUNDED, ALERT.SUCCESS);
        setConfBoxVisible(false);
        break;
      case 'cancel-payment-negative':
        setConfBoxVisible(false);
        break;
      case 'dummy_case_2309482389753285387':
        cancelPayment();
        break;
      default:
        break;
    }
  };

  const returnStatusPillStyle = (n) => {
    const m = parseInt(n, 10);
    switch (m) {
      case 0: // NONE
        return [styled.none, 'Unknown'];

      case 1: // PENDING
        return [styled.pending, 'Pending'];

      case 2: // APPROVED
        return [styled.approved, 'Approved'];

      case 3: // FAILED
        return [styled.failed, 'Failed'];

      case 4: // WAITING FOR PAYMENT
        return [styled.waitingForPayment, 'Waiting For Payment'];

      case 5: // PAID
        return [styled.paid, 'Paid'];

      default:
        return [styled.none, 'Unknown'];
    }
  };

  // TODO GET REWARDS DATA AND ASSIGN MONTHLY/DAILY FROM IT
  if (!pageData) {
    PageState = PAGE_STATE.IS_LOADING;
    PreLoader = [0].map((item, index) => {
      const secondary = (
        <Box
          m={2}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          display="flex"
          textAlign="center"
          justifyContent="center"
          sx={{ background: 'white', borderRadius: '1rem', width: '100%', height: '400px', margin: 'auto auto 4rem auto' }}
          alignItems="center"
          className={styled.error_text_content}
        >
          <Box className={styled.skeletonBox}>
            <Skeleton variant="rect" width="90%" height="40px" className={styled.skeleton} />
          </Box>
          <Box className={styled.skeletonBox}>
            <Skeleton variant="rect" width="90%" height="40px" className={styled.skeleton} />
          </Box>
          <Box className={styled.skeletonBox}>
            <Skeleton variant="rect" width="90%" height="40px" className={styled.skeleton} />
          </Box>
          <Box className={styled.skeletonBox}>
            <Skeleton variant="rect" width="90%" height="40px" className={styled.skeleton} />
          </Box>
          <Box className={styled.skeletonBox}>
            <Skeleton variant="rect" width="90%" height="40px" className={styled.skeleton} />
          </Box>
          <Box className={styled.skeletonBox}>
            <Skeleton variant="rect" width="90%" height="40px" className={styled.skeleton} />
          </Box>
        </Box>
      );
      return <>{secondary}</>;
    });
    PageUI = <PerPageLoader PageState={PageState}>{PreLoader}</PerPageLoader>;
  } else if (pageData.shouldRetry) {
    PageState = PAGE_STATE.RETRY;
    PageUI = <PerPageLoader PageState={PageState} />;
  } else if (pageData.length === 0) {
    PageState = PAGE_STATE.NO_DATA_TO_SHOW;
    PageUI = is_certificate_enabled ? null : (
      <Box style={{ marginTop: '24px' }} className={styled.takeOverWhenSmall}>
        <Grid item xs={12}>
          <NoDataFound noDataMsg={texts.NO_DATA_FOUND} />
        </Grid>
      </Box>
    );
  } else {
    PageState = PAGE_STATE.LOADED;
    // PageUI = <Box>Hello</Box>;
    // const pageContent = 'Following are the purchases that you've made ';
    const purchaseTable = pageData?.map((transaction, index) => {
      const pillContentAndStyle = returnStatusPillStyle(transaction.transaction_status);
      return (
        // eslint-disable-next-line react/no-array-index-key
        <Grid container className={styled.tableRow} key={`row_${index}`}>
          <Grid item className={styled.table_col_mid}>
            <Box className={styled.table_col_left_history}>
              <Chip
                className={`${styled.purchase_status_chip} ${pillContentAndStyle[0]}`}
                size="small"
                // variant="outlined"
                label={pillContentAndStyle[1]}
              />
            </Box>
            <Body2>
              <div className={styled.table_inside_title}>
                <span className="me-6">
                  <span className={styled.fw_b}>ID:&nbsp;</span>
                </span>
                {transaction.transaction_id}
              </div>
              <div className={styled.table_inside_title}>
                <span className="me-6">
                  <span className={styled.fw_b}>Payment Mode:&nbsp;</span>
                </span>
                {returnPaymentMode(transaction.transaction_mode)}{' '}
              </div>
              <span className={styled.table_inside_title}>
                <span className="me-6" style={{ marginRight: '24px' }}>
                  <i className="i i-box" style={{ marginRight: '6px' }} />
                  {competition.name}
                </span>
                <span className="ms-6">
                  <i className="i i-grade" style={{ marginRight: '6px' }} />{' '}
                  {competition?.is_mcd && (transaction.grade === 6 ? 'Teens' : 'Adults')}
                  {!competition?.is_mcd && transaction.grade}{' '}
                </span>
              </span>
              <br />
              <div className="me-6" style={{ marginTop: '6px' }}>
                <i className="i i-calendar2-event-1" style={{ marginRight: '12px' }} />
                {friendlyDate(new Date(`${transaction.last_updated}Z`).toString())}
              </div>
            </Body2>
          </Grid>
          {/* <Grid item className={styled.table_col_right}>
            <Button tag="claim" size="small" className={styled.refund_button}  onClick={()=>{ cancelPayment(0);}}>
            {texts.CANCEL}
          </Button> 
          </Grid> */}
        </Grid>
      );
    });
    const purchaseHistoryContent = (
      <>
        {/* <Box>
          <Body2>
            <WriteString text={pageContent} />
          </Body2>
        </Box> */}
        <GenericConfirmationBox
          callback={callback}
          visible={confBoxVisible}
          icon="bag-heart"
          tag="cancel-payment"
          title="Cancel Payment"
          primary="Are you sure about cancelling purchase? You will have to re-purchase the item in future."
          positive={texts.YES}
          negative={texts.NO}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column-reverse', width: '90%', margin: '1rem 2rem' }}>{purchaseTable}</Box>
      </>
    );

    PageUI = (
      <>
        <Box className={styled.takeOverWhenSmall}>
          <Grid item xs={12}>
            <SupportBanner
              competition={competition}
              showActivationMessage={
                pageData[pageData.length - 1].transaction_mode.trim().toLowerCase() === 'otc' &&
                pageData[pageData.length - 1].transaction_status === 1
              }
            />
            <IconPaper icon="i i-bag-heart" title="Purchase History" className={styled.error_text_content} fullWidth>
              {purchaseHistoryContent || '<Body2>No Purchase Found</Body2>'}
            </IconPaper>
          </Grid>
        </Box>
      </>
    );
  }

  const GlobalCom = useCallback(() => {
    if (setPopUpVisible && popUpVisible) setPopUpVisible(!popUpVisible);
    else GoToLastPage();
  }, [popUpVisible]);

  useEffect(() => {
    if (Cordova.IsCordova) {
      window.MyBackButton = GlobalCom;
      window.myOnBeforeUnload = () => {
        window.MyBackButton = null;
      };
    }
  }, [GlobalCom]);

  const loadData = useCallback(() => {
    dispatch(GetUserTransactions(competition));
  }, [dispatch, competition]);

  const ClearData = () => {
    gameDispatch(API_CALLS.GetUserTransactions.CLEAR);
    loadData();
  };

  useEffect(() => {
    ClearData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // const loadUserTimeRewardsData = useCallback(() => {
  //   dispatch(SetUserTimeReward(competition?.competition_id, competition?.current_grade));
  // }, [dispatch, competition]);

  if (competition.current_grade !== callRef.grade && callRef.sent) {
    setCallRef({ sent: false, grade: competition.current_grade });
  }

  useEffect(() => {
    if (pageData !== null) {
      // setCertStatus(pageData.certificate_status);
    }
    if (!pageData && !callRef.sent) {
      loadData();
    }
    setCallRef({ grade: callRef.grade, sent: true });
  }, [pageData, loadData, callRef.sent, callRef.grade]);

  useEffect(() => {
    window.myOnBeforeUnload = () => {
      gameDispatch(API_CALLS.GetProfile.CLEAR);
    };
  }, []);

  return (
    <>
      <SlidableView>
        <Header
          isOnlyCompetition
          // trigger={trigger}
          scrollNode={scrollNode}
          headerSet={{
            showRight: true,
            showLeft: IsMcdUser ? false : !isOnlyCompetition,
            overrideLeftButton: false,
            notify: true,
          }}
        />
        <FlexibleView
          ref={(node) => {
            if (node) {
              setScrollNode(node);
            }
          }}
        >
          <H1>{texts.MY_PURCHASES}</H1>
          <ResContainer>
            <Box sx={{ width: '100%', marginTop: '0rem', marginBottom: '4rem' }}>{PageUI}</Box>
          </ResContainer>
        </FlexibleView>
      </SlidableView>
    </>
  );
});

export default MyPurchases;
