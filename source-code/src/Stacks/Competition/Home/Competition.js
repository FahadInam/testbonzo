/* eslint-disable camelcase */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Box, Grid, useTheme } from '@material-ui/core';
import ResContainer from 'Components/Layouts/ResponsiveGrid';
import { PAGE_STATE, config, CALL_PRIORITY, IMAGES, API_CALLS, ALERT, PREMIUM_COMPETITION } from 'Constants';
import { H3, FlexibleView, SlidableView, Header, NoDataFound, Card } from 'Components';

import {
  GetCompetitionsActivities,
  User,
  SelectedCompetition,
  GetRecommendations,
  GetCompetitionDetails,
  GetUserNotifications,
  // GetCompetitionDetails
} from 'Actions';
import { IsEmptyObject, Cordova, getInstanceType } from 'Utils';
import { SetInvitationStatus } from 'Actions/challenge.action';
import ConfirmationBox from 'Components/ConfirmationBox';
import { PerPageLoader } from 'Components/Loader/PerPageLoader';

import { CustomToast, FromNotification } from '../../../Actions/app.control.action';
import { RecommendationLoader, Recommendations } from './Recommendations';
import { ListingLoader, Invitations, Results, YourTurn, TheirTurn } from './LocalComponents';
import CompetitionDetails from './CompetitionDetails';
import useStyles from './style';
import { gameDispatch } from 'Utils/ActionCreators';
import { GetPaymentStatus, ResetFailedAlert } from 'Actions/payment.action';
import MsgModal from 'Components/PaymentErrorMsgModal/MsgModal';
import { INSTANCES_ID } from 'Constants/instance.config';
import moment from 'moment';
// import { INSTANCES_ID } from 'Constants/instance.config';

window.GlobalActivityTimer = null;

const Competition = React.memo(({ competition, games }) => {
  let PageState = PAGE_STATE.IS_LOADING;
  let PageUI = null;
  let recommendationsUI = null;
  let yourTurnUI = null;
  let theirTurnUI = null;
  let lastPlayedUI = null;
  let invitationsUI = null;
  let PreLoader = null;
  const styled = useStyles();
  const user = User.Info();
  const currentComp = SelectedCompetition.Info();

  const competitionStr = useSelector((state) => state.Competition, shallowEqual);
  const selectedComp = SelectedCompetition.StrToObj(competitionStr);

  const [rejectInvRef, setRejectInvRef] = useState({ item: null, anchor: false });

  //Call 1
  const compDetail = useSelector((state) => state.GetCompetitionDetails, shallowEqual);

  //Call 2
  const pageData = useSelector((state) => state.GetCompetitionsActivities, shallowEqual);
  //  console.log(pageData, 'pageData');
  //Call 3
  const recData = useSelector((state) => state.GetRecommendations, shallowEqual);
  // console.log(recData, 'recData');
  const IsMcdUser = useSelector((state) => state.McdUser.mcd_user, shallowEqual);
  const IsAdLogin = useSelector((state) => state.AdLoginUser.adLogin_user, shallowEqual);
  const IsDirectLaunch = useSelector((state) => state.DirectLaunch.directLaunch_user, shallowEqual);
  const [callRef, setCallRef] = useState({ sent: false, recCallSent: false });

  const [scrollNode, setScrollNode] = useState(undefined);
  const { texts } = useTheme();
  const dispatch = useDispatch();
  const FromNotify = useSelector((state) => state.AppControl.fromNotification, shallowEqual);
  const NotifyTo = useSelector((state) => state.AppControl.notifyTo, shallowEqual);
  const [notificationData, setNotificationData] = useState(null);
  const NotifyGoto = document.getElementById(NotifyTo);
  const GlobalCom = useCallback(() => {
    if (setRejectInvRef && rejectInvRef.anchor) setRejectInvRef({ ...rejectInvRef, anchor: false });
  }, [rejectInvRef]);
  const currenetName = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
  const [firstCall, setFirstCall] = useState(false);
  const [popupRef, setPopupRef] = useState({ paymentErrorMsgAnchor: false });
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const isShupavu = getInstanceType(Inst_config.instance_id, INSTANCES_ID.SHUPAVU_ID);
  const premiumCompetition = useSelector((state) => state.PremiumCompetition.data, shallowEqual);
  const isSubscribed = premiumCompetition?.is_subscribed === 1;
  const utcDate = moment().utc();
  const currentDate = utcDate.format('YYYY-MM-DD HH:mm:ss');
  const formattedDate = new Date(pageData?.comp_info?.end_date);
  const endDate = moment(formattedDate).format('YYYY-MM-DD HH:mm:ss');
  const isExpired = endDate < currentDate;

  useEffect(() => {
    if (pageData?.user_data?.is_failed_payment_alert === 1 && isShupavu) {
      setPopupRef({ ...popupRef, paymentErrorMsgAnchor: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageData]);

  const closeErrorModal = () => {
    setPopupRef({ ...popupRef, paymentErrorMsgAnchor: false });
  };

  const resetAlert = () => {
    dispatch(
      ResetFailedAlert({ competition_id: currentComp?.item?.competition_id, current_grade: compDetail?.current_grade }, () => {
        const updatedData = {
          ...pageData,
          user_data: {
            ...pageData.user_data,
            is_failed_payment_alert: 0,
          },
        };
        gameDispatch(API_CALLS.GetCompetitionsActivities.SUCCESS, updatedData);
      })
    );
  };

  useEffect(() => {
    localStorage.setItem('compName', competition?.url);
    setTimeout(() => {
      // Check if the 'Qualified' toast should be shown
      if (localStorage.getItem('showQualifiedToast') === 'true') {
        CustomToast.Open(texts.QUALIFY_ON_STAGE2, ALERT.SUCCESS, true);
        localStorage.removeItem('showQualifiedToast');
      }

      // Check if the 'Certified' toast should be shown
      if (localStorage.getItem('showCertifiedToast') === 'true') {
        CustomToast.Open(texts.THANKS_FOR_COMPLETING, ALERT.SUCCESS, true);
        localStorage.removeItem('showCertifiedToast');
      }
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Cordova.IsCordova) {
      window.MyBackButton = GlobalCom;
    }
  }, [GlobalCom]);

  useEffect(() => {
    if (selectedComp && selectedComp?.item?.url !== currenetName) {
      if (!firstCall) {
        gameDispatch(API_CALLS.GetCompetitionDetails.CLEAR);
        gameDispatch(API_CALLS.GetRecommendations.CLEAR);
        setFirstCall(true);
      }
      if (CompetitionDetails && firstCall) {
        loadData(CALL_PRIORITY.HIGH, true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstCall, CompetitionDetails]);

  useEffect(() => {
    if (FromNotify && NotifyGoto) {
      NotifyGoto.scrollIntoView({ block: 'start', behavior: 'smooth' });
      FromNotification.NotifyFalse();
    }
  }, [FromNotify, NotifyGoto]);

  // Call 1
  const loadComDetailData = useCallback(() => {
    dispatch(GetCompetitionDetails(selectedComp?.item?.enrolled, currentComp.item?.competition_id));
  }, [dispatch, selectedComp, currentComp]);

  useEffect(() => {
    if (!compDetail && !callRef.sent) {
      loadComDetailData();
      setCallRef({ recCallSent: false, sent: true });
    }
  }, [compDetail, loadComDetailData, callRef.sent]);

  // Call 2
  const loadData = useCallback(
    (priority = CALL_PRIORITY.HIGH, fetchNoti = false) => {
      // dispatch(GetCompetitionsActivities(competition, priority));
      if (!User.IsGuest()) {
        dispatch(
          GetCompetitionsActivities(
            { competition_id: competition?.competition_id, current_grade: compDetail?.current_grade },
            priority,
            false,
            (data) => {
              //  console.log(fetchNoti, 'fetchNoti');
              if (data && fetchNoti) {
                dispatch(
                  GetUserNotifications({ grade: compDetail?.current_grade, competition_id: competition?.competition_id }, (data) => {
                    //  console.log(data, 'data here');
                    setNotificationData(data);
                  })
                );
              }
            },
            texts
          )
        );
      }
    },
    /* eslint-disable react-hooks/exhaustive-deps */
    [dispatch, competition, compDetail]
  );

  // loads data if its not already in store
  useEffect(() => {
    if ((!selectedComp.user_data || !pageData || firstCall || (!notificationData && !recData)) && compDetail) {
      loadData(CALL_PRIORITY.HIGH, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compDetail?.current_grade]);
  // Call 3

  // const [isNotificationsCallSent, setIsNotificationsCallSent] = useState(false);

  //call for only notification
  // useEffect(() => {
  //   if (
  //     selectedComp.user_data &&
  //     pageData &&
  //     compDetail &&
  //     !recData &&
  //     !callRef.recCallSent &&
  //     !isNotificationsCallSent &&
  //     !notificationData
  //   ) {
  //     dispatch(
  //       GetUserNotifications({ grade: compDetail?.current_grade, competition_id: competition?.competition_id }, (data) => {
  //         setNotificationData(data);
  //       })
  //     );
  //     setCallRef({ sent: true, recCallSent: false });
  //     setIsNotificationsCallSent(true);
  //   }
  // }, [selectedComp, pageData, callRef.recCallSent, recData, compDetail, notificationData]);

  const loadRecData = useCallback(() => {
    dispatch(
      GetRecommendations(
        {
          competition_id: competition?.competition_id,
          current_grade:
            compDetail?.current_grade === 0 || compDetail?.current_grade === null
              ? selectedComp.item.current_grade
              : compDetail?.current_grade,
        },
        false,
        true
      )
    );
  }, [dispatch, competition, compDetail]);
  // load recommendations

  // Call 4
  const loadComPaymentData = useCallback(() => {
    if (selectedComp?.item?.is_premium === 1) {
      const dto = {
        competition_id: competition?.competition_id,
        //competition_id: 78,
        current_grade: compDetail?.current_grade,
      };
      dispatch(
        GetPaymentStatus(dto, (data) => {
          gameDispatch(PREMIUM_COMPETITION.SET_DATA, data);
        })
      );
    }
  }, [dispatch, selectedComp]);

  useEffect(() => {
    // console.log(User.IsGuest(), compDetail, selectedComp, 'compDetail');
    if (selectedComp.user_data && pageData && compDetail && !recData && !callRef.recCallSent && notificationData) {
      loadRecData();
      loadComPaymentData();
      setCallRef({ sent: true, recCallSent: true });
      // console.log(User.IsGuest(), compDetail, 'compDetail');
    } else if (
      User.IsGuest() &&
      (compDetail?.current_grade !== 0 || selectedComp.item.current_grade) &&
      !recData &&
      !callRef.recCallSent
    ) {
      loadRecData();
      setCallRef({ sent: true, recCallSent: true });
    }
  }, [selectedComp, pageData, loadRecData, callRef.recCallSent, recData, compDetail, notificationData]);

  // useEffect(() => {
  //   if (User.IsGuest()) {
  //     GetRecommendations({ competition_id: competition?.competition_id, current_grade: compDetail?.current_grade }, false, true)
  //   }
  // }, []);

  // on load
  // pooling logic
  useEffect(() => {
    clearInterval(window.GlobalActivityTimer);
    window.GlobalActivityTimer = setInterval(() => {
      if (window.MyWinFocused) {
        loadData(CALL_PRIORITY.LOW, true);
      }
    }, config.ActivityLoadingTimer);
  }, [loadData]);

  // remove timer logic
  // scrolling restore
  useEffect(() => {
    const sclComp = SelectedCompetition.Info();
    if (sclComp && sclComp.compScrollPos) {
      document.getElementById('scrollingId').scrollTop = sclComp.compScrollPos;
    }

    window.myOnBeforeUnload = () => {
      window.MyBackButton = null;
      clearInterval(window.GlobalActivityTimer);
      const scrEle = document.getElementById('scrollingId');
      if (scrEle) {
        SelectedCompetition.Update({
          compScrollPos: document.getElementById('scrollingId').scrollTop,
        });
      }
    };

    return () => {
      clearInterval(window.GlobalActivityTimer);
    };
  }, []);

  const callback = (e, item) => {
    const t = e.currentTarget.getAttribute('data-tag') || item.tag;
    const tag = item && item.tag;
    switch (tag || t) {
      case 'reject-invitation':
        setRejectInvRef({ item, anchor: true });
        break;

      case 'replay':
        console.log('replay');
        break;

      case 'result':
        console.log('RESULT');
        break;

      case 'invitation-accept':
      case 'invitation':
        dispatch(SetInvitationStatus(competition, item, 'accept', texts, () => {}, IsMcdUser));
        break;

      case 'reject-positive':
        dispatch(SetInvitationStatus(competition, { ...rejectInvRef.item }, 'reject', texts, () => {}, IsMcdUser));
        setRejectInvRef({ item: null, anchor: false });
        break;

      case 'reject-negative':
      case 'close':
      case 'overlay':
        setRejectInvRef({ item: null, anchor: false });
        // setRulesPopUpVisible(false);
        break;
      // case 'I_AGREE-rules':
      //   setRulesPopUpVisible(false);
      //   break;
      default:
        break;
    }
  };

  if ((!pageData || !recData || IsEmptyObject(pageData)) && !User.IsGuest()) {
    PageState = PAGE_STATE.IS_LOADING;
    recommendationsUI = <RecommendationLoader />;

    invitationsUI = <ListingLoader />;

    yourTurnUI = <ListingLoader />;

    theirTurnUI = <ListingLoader />;

    lastPlayedUI = <ListingLoader />;

    PreLoader = (
      <CompetitionDetails
        recommendations={recommendationsUI}
        your_turn={yourTurnUI}
        their_turn={theirTurnUI}
        results={lastPlayedUI}
        invitations={invitationsUI}
        competition={competition}
      />
    );
    PageUI = <PerPageLoader PageState={PageState}>{PreLoader}</PerPageLoader>;
  } else if (pageData?.shouldRetry) {
    PageState = PAGE_STATE.RETRY;
    PageUI = <PerPageLoader PageState={PageState} />;
  } else if (recData?.length === 0 && pageData?.results.length === 0) {
    // console.log('No DATA');
    PageState = PAGE_STATE.NO_DATA_TO_SHOW;
    PageUI = <NoDataFound />;
  } else {
    PageState = PAGE_STATE.LOADED;
    let your_turn, their_turn, invitations, results;
    if (User.IsGuest()) {
      your_turn = null;
      their_turn = null;
      invitations = null;
      results = null;
    } else {
      your_turn = [...pageData.your_turn];
      their_turn = [...pageData.their_turn];
      invitations = [...pageData.invitations];
      results = [...pageData.results];
    }

    // for AFS competition only
    if (recData?.length === 0 && competition.competition_id === 10) {
      recommendationsUI = (
        <Grid container>
          <Box margin="auto">
            <Card
              item={{
                id: -1,
                buttonTitle: 'Open',
                image: '/images/games/essay.png',
                tag: 'AFS_CHALLENGE',
              }}
              chip="Essay"
              callback={() => {
                window.open(
                  `https://docs.google.com/forms/d/e/1FAIpQLSeygZuBjjGKH1Es03_hnG10a2Albui7lr_kQJsbt0-iKD-EUA/viewform?usp=pp_url&entry.533714779=${user.username}`,
                  '_blank'
                );
              }}
            />
          </Box>
        </Grid>
      );
    }

    if (recData?.length > 0) {
      recommendationsUI = (
        <Recommendations
          recommendations={recData}
          results={pageData?.results}
          their_turn={their_turn}
          callback={callback}
          games={games}
          competition={competition}
          IsMcdUser={IsMcdUser}
          userID={user.user_id}
          currentGrade={compDetail?.current_grade}
        />
      );
    } else if (!recData && User.IsGuest()) {
      recommendationsUI = <RecommendationLoader />;
      PreLoader = <CompetitionDetails recommendations={recommendationsUI} competition={competition} />;
      PageUI = <PerPageLoader PageState={PageState}>{PreLoader}</PerPageLoader>;
    } else if (competition?.is_multiplayer_allowed === 0) {
      recommendationsUI = (
        <NoDataFound
          isGamesCompleted={isShupavu && isSubscribed}
          noDataMsg={isShupavu && isSubscribed ? texts.ALL_DAILY_GAMES_PLAYED : texts.ALL_GAMES_PLAYED}
        />
      );
    } else if (competition?.is_daily_learning === 1 && competition?.is_premium === 0) {
      recommendationsUI = (
        <NoDataFound
          isGamesCompleted={true}
          noDataMsg={isExpired ? texts.COMP_GAMES_COMPLETED : texts.DAILY_GAMES_COMPLETED}
          noDataDesc
          isExpired={isExpired}
        />
      );
    }

    if (invitations?.length > 0) invitationsUI = <Invitations invitations={invitations} callback={callback} />;
    if (your_turn?.length > 0)
      yourTurnUI = (
        <YourTurn
          your_turn={your_turn}
          competition={competition}
          dispatch={dispatch}
          callback={callback}
          currentGrade={compDetail?.current_grade}
          IsMcdUser={IsMcdUser}
        />
      );
    if (their_turn?.length > 0) theirTurnUI = <TheirTurn their_turn={their_turn} callback={callback} />;
    if (results?.length > 0) lastPlayedUI = <Results results={results} callback={callback} user={user} is_mcd={competition.is_mcd} />;

    PageUI = (
      <CompetitionDetails
        recommendationsData={recData}
        recommendations={recommendationsUI}
        your_turn={yourTurnUI}
        their_turn={theirTurnUI}
        results={lastPlayedUI}
        invitations={invitationsUI}
        competition={competition}
        show_header={recData?.length > 0}
        page_data={pageData}
      />
    );
  }
  const GoBackButton = IsMcdUser || IsAdLogin || IsDirectLaunch ? false : true;
  return (
    <>
      <ConfirmationBox
        visible={rejectInvRef.anchor}
        callback={callback}
        // icon="reject"
        addCodeIcon={IMAGES.WARNING}
        ADD_CODE
        hideCross
        allowClose
        title={texts.DECLINE_INVITE}
        className={styled.confirmation_box}
        buttonsContainer={styled.sign_out_buttons_container}
        primary={texts.REJECT_INVITATION}
        positive={texts.CONFIRM}
        negative={texts.CANCEL}
        tag="reject"
      />

      <SlidableView showGradient>
        <Header
          isOnlyCompetition
          scrollNode={scrollNode}
          headerSet={{
            showRight: true,
            showLeft: GoBackButton,
            overrideLeftButton: false,
            notify: true,
            showFloatingFAQ: true,
          }}
          notificationData={notificationData}
        />
        <FlexibleView
          ref={(node) => {
            if (node) {
              setScrollNode(node);
            }
          }}
        >
          <div
            style={{
              texAlign: 'center',
              margin: 'auto',
              display: 'flex',
              justifyContent: 'center',
              marginTop: '18px',
              marginBottom: '12px',
            }}
          >
            <H3>{competition.name}</H3>
          </div>
          <ResContainer>
            {PageUI}
            <MsgModal reset={resetAlert} onClose={closeErrorModal} menuAnchor={popupRef.paymentErrorMsgAnchor} Header />
          </ResContainer>
        </FlexibleView>
      </SlidableView>
    </>
  );
});

export default Competition;
