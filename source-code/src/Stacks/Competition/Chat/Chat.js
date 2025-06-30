/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-case-declarations */
/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { PAGE_STATE, API_CALLS, config, CALL_PRIORITY, ALERT } from 'Constants';
import { Box, Grid, useTheme } from '@material-ui/core';
import { GetMessage, User, SendMessage, SelectedCompetition, uploadFile } from 'Actions';
import { ReadUserNotification, GetUserPremiumStatus, SetUserPayment } from 'Actions/competitions.action';
import { gameDispatch } from 'Utils/ActionCreators';
import { PerPageLoader } from 'Components/Loader/PerPageLoader';
import { Body1, SlidableView, FlexibleView, Header } from 'Components';
// import Toast from 'Components/Toast/Toast';
import { InlineButton } from 'Components/Core/Button';
import ResContainer from 'Components/Layouts/ResponsiveGrid';
import { AppControl, Toast } from '../../../Actions/app.control.action';

import MessageStructure from './MessageStructure';
import { emoticonsFormatted, revertEmoticons, Message, MessageLoader, SecondaryButtons } from './LocalComponents';
import useStyles from './style';

window.GlobalChatTimer = null;

const Chat = React.memo(({ competition }) => {
  const { texts } = useTheme();
  const { state } = useLocation();
  const location = useLocation();
  let PageState = PAGE_STATE.IS_LOADING;
  let PageUI = null;
  let PreLoader = null;
  const chatScrollId = 'chatScrollingId';
  const styled = useStyles();
  // console.log('IDHR XE CALLED, ', location?.pathname);
  AppControl.SetComingFrom(location?.pathname || '');
  const dispatch = useDispatch();
  const [callRef, setCallRef] = useState({ sent: false, grade: competition.current_grade });
  const [scrollNode, setScrollNode] = useState(undefined);
  const messages = useSelector((nState) => nState.Chat, shallowEqual);
  // const premiumStatus = useSelector((nState) => nState.GetUserPremiumStatus, shallowEqual);
  const user = User.Info();
  const [msg, setMsg] = useState('');
  const [imageUrl, setImageUrl] = useState({
    image: '',
  });
  const [msgSent, setMsgSent] = useState(false);
  const [premiumTag, setPremiumTag] = useState(3); // 3 - loading, 2 - error loading, 0 - no, 1 - yes
  useEffect(() => {
    gameDispatch(API_CALLS.GetCompetitionsFriends.CLEAR);
    gameDispatch(API_CALLS.GetMessage.CLEAR);
  }, []);
  // console.log('premiumStatus: ', premiumStatus);
  // console.log('messages: ', messages);
  const loadDataForUserPremiumStatus = useCallback(
    (priority = CALL_PRIORITY.HIGH) => {
      dispatch(
        GetUserPremiumStatus(competition, state, (d) => {
          // console.log('premiumStatus: ', premiumStatus);
          // console.log('premiumTag: ', premiumTag);
          // console.log('premium d: ', d);
          // console.log('premium data: ', d);
          // console.log('premiumStatus inside func: ', premiumStatus);
          setPremiumTag(d || 0);
        })
      );
    },
    [dispatch, competition]
  );
  // console.log('state?.user_id, competition?.competition_id: ', state?.user_id, competition?.competition_id);
  const changeDataofUserPremiumStatus = useCallback(
    (priority = CALL_PRIORITY.HIGH) => {
      dispatch(
        SetUserPayment(state?.user_id, competition?.competition_id, (d) => {
          // console.log('premiumStatus: ', premiumStatus);
          // console.log('premiumTag: ', premiumTag);
          // console.log('premium d: ', d);
          // console.log('premium data: ', d);
          // console.log('premiumStatus inside func: ', premiumStatus);
          const isSuccessfulPremium = d.transaction_id?.trim().toUpperCase() === 'SUPPORTPAYMENT';
          Toast.Show(
            isSuccessfulPremium ? texts.SUPPORT_USER_PREMIUM_CHANGE_SUCCESS : texts.SUPPORT_USER_PREMIUM_CHANGE_FAILED,
            isSuccessfulPremium ? ALERT.SUCCESS : ALERT.ERROR
          );
          setPremiumTag(3);
          loadDataForUserPremiumStatus();
        })
      );
    },
    [dispatch, competition]
  );

  const checkForPremiumUserStatus = () => {
    // console.log('competition?.is_premium ', competition?.is_premium);
    // console.log(
    //   'user?.user_id === parseInt(process.env.REACT_APP_SUPPORT_ID, 10) ',
    //   user?.user_id === parseInt(process.env.REACT_APP_SUPPORT_ID, 10)
    // );
    // console.log('premiumStatus === null || premiumStatus === undefined ', premiumStatus === null || premiumStatus === undefined);
    // console.log('premiumTag', premiumTag);
    if (competition?.is_premium && user?.user_id === parseInt(process.env.REACT_APP_SUPPORT_ID, 10) && premiumTag === 3) {
      // console.log('check_premium');
      // console.log('window.UserPremierStatsTimer: ', window.UserPremierStatsTimer);
      if (!window.UserPremierStatsTimer) window.UserPremierStatsTimer = setTimeout(() => loadDataForUserPremiumStatus(), 1000);
    } else {
      setPremiumTag(premiumTag);
    }
  };

  const changePremiumUserStatus = () => {
    if (competition?.is_premium && user?.user_id === parseInt(process.env.REACT_APP_SUPPORT_ID, 10)) {
      setTimeout(() => changeDataofUserPremiumStatus(), 500);
    } else {
      // setPremiumTag(2);
    }
  };

  const markUserAsRead = useCallback(
    (data, priority = CALL_PRIORITY.LOW) => {
      // console.log('window.isMessageMarkedAsRead: ', !window.isMessageMarkedAsRead);
      // console.log('messages?.length > 0: ', messages);
      // console.log('data', data);
      if (!window.isMessageMarkedAsRead && data?.length > 0) {
        // console.log('competition?.is_mcd', competition?.is_mcd);
        // console.log('messages?.length > 0', data?.data?.length > 0);
        // console.log('data', data);
        // console.log(
        //   'messages[messages?.length - 1]?.sender_id === parseInt(process.env.REACT_APP_SUPPORT_ID, 10)',
        //   data[data?.length - 1]?.sender_id === parseInt(process.env.REACT_APP_SUPPORT_ID, 10)
        // );
        if (
          competition?.is_mcd &&
          data?.length > 0 &&
          data[data?.length - 1]?.sender_id === parseInt(process.env.REACT_APP_SUPPORT_ID, 10)
        ) {
          // console.log('yes it should be marked as read.');
          window.isMessageMarkedAsRead = setTimeout(() => {
            dispatch(
              ReadUserNotification(
                {
                  user_id: user?.user_id,
                  competition_id: competition?.competition_id,
                  notification_id: state?.notification_id,
                },
                () => {}
              )
            );
          }, 2000);
        }
      }
    },
    [dispatch, competition]
  );

  const loadData = useCallback(
    (priority = CALL_PRIORITY.LOW) => {
      dispatch(
        GetMessage(
          competition,
          state,
          (data) => {
            // console.log('hi--');
            checkForPremiumUserStatus();
            // console.log('competition?.is_mcd: ', competition?.is_mcd);
            // console.log(
            //   'user?.user_id === parseInt(process.env.REACT_APP_SUPPORT_ID, 10): ',
            //   user?.user_id === parseInt(process.env.REACT_APP_SUPPORT_ID, 10)
            // );
            // console.log('competition?.is_mcd: ', competition?.is_mcd);
            if (
              competition?.is_mcd &&
              user?.user_id === parseInt(process.env.REACT_APP_SUPPORT_ID, 10) &&
              !window.isMessageMarkedAsRead
            ) {
              markUserAsRead(data);
            }
            // console.log('hi----');
          },
          priority
        )
      );
    },
    [dispatch, competition, state]
  );

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      document.getElementsByClassName('loaderImageUpload')[0].style.display = 'flex';
      dispatch(
        SendMessage(competition, state, revertEmoticons(msg), () => {
          setMsg('');
          setImageUrl({ image: '' });
          setMsgSent(true);
          loadData(CALL_PRIORITY.HIGH);
          document.getElementsByClassName('loaderImageUpload')[0].style.display = 'none';
        })
      );
    }
  };

  const UploadImage = (tag, file) => {
    if (tag === 'Upload') {
      uploadFile(file, user, (response) => {
        setImageUrl({
          ...imageUrl,
          image: response.data.file_path,
        });

        document.getElementsByClassName('loaderImageUpload')[0].style.display = 'none';
      });
    } else if (tag === 'Delete') {
      setImageUrl({
        ...imageUrl,
        image: '',
      });

      document.getElementsByClassName('loaderImageUpload')[0].style.display = 'none';
    }
  };

  // console.log('Image', imageUrl);
  // console.log('state', state);
  const makePremium = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm(texts.SUPPORT_USER_STATUS_CHANGE_STATUS_PRE_CONFIRMATION)) {
      changePremiumUserStatus();
    }
  };
  const callback = (e, tag) => {
    const t = e?.currentTarget.getAttribute('data-tag') || tag;
    switch (t) {
      case 'upload-image':
        // console.log('Upload your image here');
        UploadImage(e);
        break;
      case 'send':
        document.getElementsByClassName('loaderImageUpload')[0].style.display = 'flex';
        // console.log(revertEmoticons(msg), imageUrl);
        const finalMsg = imageUrl.image
          ? `${revertEmoticons(
              msg
            )} <img style="border-radius: 8px!important; max-height: 1500px; max-width: 600px; width: 100%; cursor: pointer" src=${
              imageUrl.image
            } onclick="parent.location.href='${imageUrl.image}';"/>`
          : revertEmoticons(msg);
        dispatch(
          SendMessage(competition, state, finalMsg, (data) => {
            setMsg('');
            setImageUrl({ image: '' });
            setMsgSent(true);
            loadData(CALL_PRIORITY.HIGH);
            //  console.log(data);

            if (
              state?.is_from_support &&
              user?.user_id === parseInt(process.env.REACT_APP_SUPPORT_ID, 10) &&
              state?.notification_id &&
              state?.notification_id > 0
            ) {
              setTimeout(() => {
                dispatch(
                  ReadUserNotification(
                    {
                      user_id: user?.user_id,
                      competition_id: competition?.competition_id,
                      notification_id: state?.notification_id,
                    },
                    () => {}
                  )
                );
              }, 500);
            }

            document.getElementsByClassName('loaderImageUpload')[0].style.display = 'none';
          })
        );
        break;
      default:
        setMsg(emoticonsFormatted(e.target.value || ''));
        break;
    }
  };

  // const isSupport = !!(state?.user_id === parseInt(process.env.REACT_APP_SUPPORT_ID, 10) || state?.friend_id === parseInt(process.env.REACT_APP_SUPPORT_ID, 10));
  if (!messages) {
    PageState = PAGE_STATE.IS_LOADING;
    PreLoader = (
      <MessageStructure
        isSupportChat={
          !!(
            state?.user_id === parseInt(process.env.REACT_APP_SUPPORT_ID, 10) ||
            state?.user_id === parseInt(process.env.REACT_APP_SUPPORT_ID, 10)
          )
        }
        isMcd={competition?.is_mcd}
        messages={
          <>
            <MessageLoader />
            <MessageLoader />
            <MessageLoader myMsg />
            <MessageLoader />
            <MessageLoader myMsg />
          </>
        }
        callback={callback}
        msg={msg}
      />
    );
    PageUI = <PerPageLoader PageState={PageState}>{PreLoader}</PerPageLoader>;
  } else if (messages.shouldRetry) {
    PageState = PAGE_STATE.RETRY;
    PageUI = <PerPageLoader PageState={PageState} />;
  } else {
    PageState = PAGE_STATE.LOADED;
    let ind = '';
    const messagesUI = messages.map((item, index) => {
      ind = `${index}_chat`;
      // console.log('state: ', state?.user_id === parseInt(process.env.REACT_APP_SUPPORT_ID, 10));
      return <Message item={item} friend={state} user={user} key={ind} />;
    });
    // console.log('state: ', state);
    // console.log('user: ', user);
    PageUI = (
      <MessageStructure
        messages={messagesUI}
        callback={callback}
        msg={msg}
        msgSent={msgSent}
        handleEnter={handleEnter}
        uploadedImageCallback={UploadImage}
        UploadedImage={imageUrl}
        notificationId={state?.notification_id}
        isSupportAdmin={user?.user_id === parseInt(process.env.REACT_APP_SUPPORT_ID, 10)}
        isSupportChat={
          !!(
            user?.user_id === parseInt(process.env.REACT_APP_SUPPORT_ID, 10) ||
            state?.user_id === parseInt(process.env.REACT_APP_SUPPORT_ID, 10)
          )
        }
      />
    );
  }

  if (competition.current_grade !== callRef.grade && callRef.sent) {
    setCallRef({ sent: false, grade: competition.current_grade });
  }

  useEffect(() => {
    clearInterval(window.GlobalChatTimer);
    window.GlobalChatTimer = setInterval(() => {
      if (window.MyWinFocused) {
        loadData(CALL_PRIORITY.HIGH);
      }
    }, config.MessageLoadingTimer);
    // return () => clearInterval(window.GlobalChatTimer);
  }, [loadData]);

  useEffect(() => {
    if (!state) {
      // its anomaly, should clear all pages and challenge data from redux
      SelectedCompetition.GotoCompetition();
    } else if (!messages && !callRef.sent) {
      loadData();
    }
    setCallRef({ grade: callRef.grade, sent: true });
  }, [messages, loadData, callRef.sent, callRef.grade, state]);

  useEffect(() => {
    return () => {
      clearInterval(window.GlobalChatTimer);
      clearTimeout(window.isMessageMarkedAsRead);
      clearTimeout(window.UserPremierStatsTimer);
      gameDispatch(API_CALLS.GetMessage.CLEAR);
    };
  }, []);

  // useEffect(() => {
  //   window.checkPremium = setTimeout(() => {
  //     if (!premiumStatus) {
  //       loadDataForUserPremiumStatus();
  //     }
  //     console.log('premiumStatus: ', premiumStatus);
  //     console.log('timing_const: ', parseInt(process.env.REACT_APP_SUPPORT_ID, 10));
  //   }, 2000);
  //   return () => {
  //     clearInterval(window.checkPremium);
  //     // gameDispatch(API_CALLS.GetMessage.CLEAR);
  //   };
  // }, [premiumStatus]);

  useEffect(() => {
    if (msgSent) {
      setTimeout(() => {
        setMsgSent(false);
      }, 500);
    }
  }, [msgSent]);

  const isSupport = !!(
    user?.user_id === parseInt(process.env.REACT_APP_SUPPORT_ID, 10) || state?.user === parseInt(process.env.REACT_APP_SUPPORT_ID, 10)
  );
  // const is_from_support
  // console.log('user: ', user);
  // console.log('state: ', state);
  // console.log('competition: ', competition);
  // console.log(texts.SUPPORT_TIMINGS_SHOWN_ABOVE_CHAT);
  return (
    <SlidableView showGradient>
      <Header
        scrollNode={scrollNode}
        headerSet={{
          showRight: true,
          showLeft: true,
          overrideLeftButton: false,
          notify: false,
          SecondaryButtons: <SecondaryButtons avatar={state?.profile_picture} isSupportChat={isSupport} />,
        }}
      />
      {state?.user_id === parseInt(process.env.REACT_APP_SUPPORT_ID, 10) && competition?.is_mcd && (
        <>
          <div style={{ backgroundColor: '#FF6377', display: 'flex', padding: 'auto 24px', justifyContent: 'center' }}>
            <Body1 className={styled.messageNoticeText2}>{texts.SUPPORT_RECEIPT_WARNING_SHOWN_ABOVE_CHAT}</Body1>
          </div>
          <Grid className={styled.messageSupportTextBox} xs={12} item>
            <Box display="flex" flexDirection="row" className={styled.messageNoticeTextArea} sx={{ flexDirection: 'column' }}>
              <Body1 className={styled.messageNoticeText}>{texts.SUPPORT_TIMINGS_SHOWN_ABOVE_CHAT}</Body1>
            </Box>
          </Grid>
        </>
      )}
      {state?.is_from_support && competition.is_mcd && (
        <Grid className={premiumTag === 1 ? styled.messageSupportTextBoxPremium : styled.messageSupportTextBox} xs={12} item>
          <Box display="flex" flexDirection="row" className={styled.messageNoticeTextArea}>
            <span className={styled.messageNoticeText}>
              {premiumTag === 1 ? texts.SUPPORT_USER_STATUS_PAID : ''}
              {premiumTag === 0 ? texts.SUPPORT_USER_STATUS_FREE : ''}
              {premiumTag === 0 ? (
                <InlineButton onClick={makePremium} className={styled.smallBtn}>
                  {texts.SUPPORT_USER_STATUS_CHANGE_STATUS}
                </InlineButton>
              ) : (
                ''
              )}
              {premiumTag === 2 ? texts.SUPPORT_USER_STATUS_ERROR : ''}
              {premiumTag === 3 ? texts.SUPPORT_USER_STATUS_LOADING : ''}
            </span>
          </Box>
        </Grid>
      )}
      {/* {console.log('imageUrl: ', imageUrl?.image.length > 0)} */}
      <FlexibleView
        className={imageUrl?.image.length > 0 ? styled.messagesContainerWithImageArea : styled.messagesContainer}
        chatScrollId={chatScrollId}
        ref={(node) => {
          if (node) {
            setScrollNode(node);
          }
        }}
      >
        <ResContainer>{PageUI}</ResContainer>
      </FlexibleView>
    </SlidableView>
  );
});

export default Chat;
