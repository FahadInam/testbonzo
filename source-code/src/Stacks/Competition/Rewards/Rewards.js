/* eslint-disable no-lonely-if */
/* eslint-disable camelcase */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTheme, Box, Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import PageTitle from 'Components/Core/PageTitle';
import PageSubTitle from 'Components/Core/PageSubTitle';
import competitions_icon from 'Assets/images/bonzoui/headings/rewards.png';
import LZString from 'lz-string';
import ButtonBold from 'Components/Core/ButtonBold';
import { PAGE_STATE, ALERT, LIMITS_CONFIG, API_CALLS, Reward_Type, IMAGES, PREMIUM_COMPETITION } from 'Constants';
import {
  GetCompetitionsRewards,
  GetUserCertificateDetails,
  GetProfileClaim,
  User,
  ClaimCertificate,
  SetUserTimeReward,
  Dotted,
  SelectedCompetition,
} from 'Actions';
import { Numbers, OnInputChange, Cordova, InAppBrowser, McdUser, isNumeric, getInstanceType } from 'Utils';
import {
  CardLoader,
  Card,
  H4,
  // H1,
  ModalBox,
  Input,
  Button,
  NoDataFound,
  Header,
  SlidableView,
  FlexibleView,
  Paper,
  // H3,
  WriteString,
  Body1,
  CoinIcon,
  GenericConfirmationBox,
  Select,
  ButtonText,
} from 'Components';
import ResContainer, { ResGrid } from 'Components/Layouts/ResponsiveGrid';

import { gameDispatch } from 'Utils/ActionCreators';
import { PageSwitch, GoToLastPage } from 'Navigation';
import { CompetitionNav, DefaultNav } from 'Navigation/Paths';
import { PerPageLoader } from 'Components/Loader/PerPageLoader';
import { ClaimReward, GetCompetitionDetails, GetCompetitionsActivities } from 'Actions/competitions.action';

import { Toast } from 'Actions/app.control.action';
import reward_icon from 'Assets/images/bonzoui/reward.png';
// import premium_rewards from 'Assets/images/premium_rewards.png';
import dailyBadge from 'Assets/images/dailybadge.png';
import weeklyBadge from 'Assets/images/weeklybadge.png';
import monthlyBadge from 'Assets/images/monthlybadge.png';
import eocBadge from 'Assets/images/eocbadge.png';
import alert from 'Assets/images/alerticon.png';
import OsProperties from 'Utils/OsProperties';
import useStyles from './style';
import { RewardHistory } from './RewardHistory';
import IframeComponent from 'Components/IframeComponent/IframeComponent';
import { INSTANCES_ID } from 'Constants/instance.config';
import { GetPaymentStatus } from 'Actions/payment.action';

const Rewards = React.memo(({ competition, isOnlyCompetition }) => {
  let PageState = PAGE_STATE.IS_LOADING;
  let PageUI = null;
  let PreLoader = null;
  // let [reloadVar, setReloadVar] = useState(false);
  const { is_certificate_enabled } = competition;
  const pageData = useSelector((state) => state.GetCompetitionsRewards, shallowEqual);
  const compActivities = useSelector((state) => state.GetCompetitionsActivities, shallowEqual);
  const UserData = useSelector((state) => state.Profile, shallowEqual);
  // const UserTimeRewardsData = useSelector((state) => state.SetUserTimeReward, shallowEqual);
  const [certStatus, setCertStatus] = useState();
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [instructionsPopup, setInstructionsPopup] = useState(false);
  const [rewardInstructions, setRewardInstructions] = useState('');
  // const [popUpInfoVisible, setPopUpInfoVisible] = useState(false);
  const [editName, setEditName] = useState(false);
  const [popUpCertVisible, setPopUpCertVisible] = useState(false);
  const IsMcdUser = useSelector((state) => state.McdUser.mcd_user, shallowEqual);
  const IsAdLogin = useSelector((state) => state.AdLoginUser.adLogin_user, shallowEqual);
  const IsDirectLaunch = useSelector((state) => state.DirectLaunch.directLaunch_user, shallowEqual);
  const compDetail = useSelector((state) => state.GetCompetitionDetails, shallowEqual);
  const [confBoxVisible, setConfBoxVisible] = useState(false);
  const [certIframeOpened, setCertIframeOpened] = useState(false);
  const [iframeData, setIframeData] = useState(null);
  const [certJson, setCertJson] = useState(null);
  const [certIframeSrc, setCertIframeSrc] = useState('about:blank');

  const [rewardsTypeRef, setRewardsTypeRef] = useState(0);
  const currentComp = SelectedCompetition.Info();

  const rewardsTypeCallBack = (e, item) => {
    // const t = typeof e === 'string' ? e : e.currentTarget.getAttribute('data-tag');
    setRewardsTypeRef(item?.index || 0);
  };

  const [scrollNode, setScrollNode] = useState(undefined);
  const [claim, setClaim] = useState({
    name: '',
    schoolName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    reward_id: '',
    user_image: '',
    isFilled: false,
  });

  const user = User.Info();
  const [certForm, setCertForm] = useState({
    name: '',
    age: '',
    phoneNumber: '',
    city: '',
  });
  const { texts, palette, typography } = useTheme();
  // console.log(user, 'user');
  // console.log(certForm, 'certForm');
  const { user_data } = compActivities || [];
  const styled = useStyles();
  const dispatch = useDispatch();
  const [callRef, setCallRef] = useState({ sent: false, grade: compDetail?.current_grade });
  const [rewardAvailable, setRewardAvailable] = useState(false);
  const [certAvailable, setCertAvailable] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [originalName, setOriginalName] = useState('');

  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const isGlobalClimate = getInstanceType(Inst_config.instance_id, INSTANCES_ID.GLOBAL_CLIMATE_LITERACY_ID);
  const isShupavu = getInstanceType(Inst_config.instance_id, INSTANCES_ID.SHUPAVU_ID);
  const isSGG = getInstanceType(Inst_config.instance_id, INSTANCES_ID.SGG_ID);

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

  // const loadComDetailData = useCallback(() => {
  //   dispatch(GetCompetitionDetails(user.user_id, competition.item?.competition_id));
  // }, [dispatch, user.user_id, competition]);

  // useEffect(() => {
  //   if (!compDetail) {
  //     loadComDetailData();
  //     // setCallRef({ recCallSent: false, sent: true });
  //   } else if (compDetail){
  //     setCallRef({ sent: callRef.sent, grade: compDetail?.current_grade  });
  //   }
  // }, [compDetail, loadComDetailData]);

  useEffect(() => {
    if (popUpCertVisible) {
      setCertForm({
        ...certForm,
        name: certForm?.name || user?.name || user?.username,
      });
      setOriginalName(certForm?.name || user?.name || user?.username);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popUpCertVisible]);

  const callback = (e, item) => {
    const value = typeof e === 'string' ? '' : e.target.value;
    const t = e.currentTarget.getAttribute('data-tag') || e.target.name;
    // console.log('t: ', t);
    switch (t) {
      case 'overlay':
      case 'close':
        setPopUpVisible(false);
        break;
      case 'city':
      case 'address':
      case 'schoolName':
        OnInputChange({ name: t, value: e.target.value }, claim, setClaim);
        break;
      case 'phoneNumber':
        if (isNumeric(value)) {
          OnInputChange({ name: t, value: e.target.value }, claim, setClaim);
        }
        break;
      case 'rewardHistory':
        PageSwitch(CompetitionNav.REWARD_HISTORY);
        break;
      case 'claim':
        dispatch(
          ClaimReward({ competition_id: competition.competition_id, current_grade: compDetail.current_grade }, claim, texts, () => {
            if (competition?.competition_id && compDetail?.current_grade) {
              dispatch(
                GetCompetitionsRewards({ competition_id: competition.competition_id, current_grade: compDetail.current_grade })
              );
              setPopUpVisible(false);
              gameDispatch(API_CALLS.GetCompetitionsActivities.CLEAR);
              dispatch(
                GetCompetitionsActivities({ competition_id: competition.competition_id, current_grade: compDetail.current_grade })
              );
              Toast.Show(texts.CLAIM_SUCCESS_FULL, ALERT.SUCCESS);
            }
          })
        );

        break;
      default:
        if (item.showClaim) {
          if (item.reward_type === Reward_Type.Redeem) {
            if (!is_certificate_enabled || (is_certificate_enabled && certStatus > 0)) {
              if (User.IsGuest()) {
                Toast.Show(texts.SIGNUP_TO_CLAIM, ALERT.INFO);
                return;
              }
              if (item.quantity === 0) {
                setRewardAvailable(false);
                Toast.Show(texts.REWARD_UNAVAILABLE, ALERT.INFO);
                return;
              }
              // console.log(item.cost, 'item.cost', compActivities.user_data.points);
              setRewardAvailable(true);

              if (!UserData) {
                setClaim({
                  ...claim,
                  isFilled: false,
                });
                dispatch(GetProfileClaim());
              } else if (claim.isFilled) {
                // console.log('YAHAN TRUE HOWA');
                setPopUpVisible(true);
              }
              setClaim({ ...claim, reward_id: item.reward_id });
            } else {
              setRewardInstructions(certJson?.non_certified_popup || texts.CERTIFICATE_INFO_REWARD);
              setInstructionsPopup(true);
            }
          } else if (item.reward_type !== Reward_Type.Redeem) {
            // console.log('show reward info: ', item);
            // showRewardInfo(item, true, () => {});
            // console.log('item.buttonTitle', item.buttonTitle === texts.HOW_TO_EARN);
            // console.log('item.buttonTitle', item.buttonTitle);
            if (item.buttonTitle === texts.HOW_TO_EARN || (!IsMcdUser && item.buttonTitle === texts.CLAIM)) {
              setRewardInstructions(item.instructions);
              setInstructionsPopup(true);
              // Toast.Show(item.instructions, ALERT.INFO);
            } else {
              // eslint-disable-next-line no-prototype-builtins
              // if (item.hasOwnProperty('quantity') && (item.quantity === 0 || item.quantity === '00' || item.quantity === '0')) {
              //   Toast.Show(texts.REWARD_UNAVAILABLE, ALERT.ERROR);
              // } else {
              if (!item.is_claimed) {
                if (IsMcdUser) {
                  Dotted.Show();
                  //  console.log('ClaimRewards McDonalds');
                  McdUser.ClaimRewards(item.secondary_id, competition?.competition_id, compDetail?.current_grade, item.reward_id);
                } else {
                  dispatch(SetUserTimeReward(competition.competition_id, compDetail.current_grade, item.reward_id));
                  // => setReloadVar(!reloadVar)
                }
              } else {
                if (IsMcdUser) {
                  /* ENTER MCDAPP REDIRECTION CODE */
                  //  console.log('REDEEM', `gmalite://gmalite-deals?filterid=dealFilter`);
                  //  window.location.href = `gmalite://gmalite-deals?filterid=dealFilter1`;
                  window.location.href = `gmalite://gmalite-deals?filterid=dealFilter2&apn=com.mcdonalds.mobileapp7&isi=1217507712&ibi=com.mcdonalds.mobileapp`;
                  // alert(item.secondary_id);
                  //  window.location.href = `gmalite://gmalite-offers-detail?offerid=${item.secondary_id}`;
                }
              }
              // }
            }
          } else {
            Toast.Show('Error processing action!', ALERT.ERROR);
          }
        }
        break;
    }
  };

  const claimCertCallback = async () => {
    const { user_id, session_id } = user;
    const { competition_id } = competition;
    const { current_grade } = compDetail;
    // const user_data = JSON.stringify(certForm);
    const user_data = certForm;
    if (certForm.name) {
      dispatch(
        ClaimCertificate({ current_grade, competition_id, full_name: certForm.name, user_data }, () => {
          window.open(
            `https://bonzoapi.knowledgeplatform.com/api/GenerateCertificate?user_id=${user_id}&session_id=${session_id}&competition_id=${competition_id}&grade=${current_grade}`,
            '_system'
          );
          setPopUpCertVisible(false);
          setCertAvailable(false);
          Toast.Show(texts.CERT_CLAIM_SUCCESS_FULL, ALERT.SUCCESS);
        })
      );
    } else {
      Toast.Show(texts.NAME_REQUIRED, ALERT.ERROR);
    }
  };

  const instructionsCallback = (e, val) => {
    const t = e.currentTarget.getAttribute('data-tag') || e.target.name;
    // console.log(t);
    // console.log('OsProperties.IsAndroid()', OsProperties.IsAndroid());
    switch (t) {
      case 'play-btn': {
        setInstructionsPopup(false);
        setRewardInstructions('');
        PageSwitch(CompetitionNav.COMPETITION_HOME);
        break;
      }
      case 'close': {
        setInstructionsPopup(false);
        setRewardInstructions('');
        break;
      }
      default: {
        setInstructionsPopup(false);
        setRewardInstructions('');
      }
    }
  };

  const certCallback = (e, val) => {
    const t = e.currentTarget.getAttribute('data-tag') || e.target.name;
    // console.log(t);
    // console.log('OsProperties.IsAndroid()', OsProperties.IsAndroid());
    switch (t) {
      case 'cert-claim': {
        if (!UserData) {
          dispatch(GetProfileClaim());
        }
        setCertAvailable(true);
        break;
      }
      case 'cert-download': {
        if (!certForm.name.length) {
          setPopUpCertVisible(true);
          break;
        } else if (certForm.name.length > 0 && certForm.name.length < 3) {
          popUpCertVisible && Toast.Show(texts.NAME_INVALID, ALERT.ERROR);
          setPopUpCertVisible(true);
          break;
        } else if (!popUpCertVisible) {
          setPopUpCertVisible(true);
          break;
        }
        dispatch(
          GetUserCertificateDetails(
            { full_name: certForm.name.trim(), competition_id: competition?.competition_id, current_grade: compDetail?.current_grade },
            (data2) => {
              const cData = pageData.certificate_json;
              if (cData.length > 0) {
                const dcData = cData?.length > 0 ? LZString.decompressFromBase64(cData) : null;
                const dcData_Path = JSON.stringify(dcData)?.file_name || 'gclc';
                // console.log('cData: ', cData);
                // console.log('data2: ', data2);
                // console.log('dcData: ', dcData);

                setCertIframeSrc('');
                setIframeData(null);
                setCertIframeOpened(false);
                // console.log('dcData_Path: ', dcData_Path);

                setCertIframeSrc(`/certificate-generator/certificates/${dcData_Path}.html`);
                setIframeData(JSON.stringify({ cData: JSON.stringify(dcData), data2: data2 }));
                setCertIframeOpened(true);
                setPopUpCertVisible(false);
                User.UpdateUser('name', certForm.name.trim());
                // console.log('CD Data: ', data2);
              }
            }
          )
        );
        break;
      }
      case 'cert-download2': {
        // if (3 > 4) {
        //   setCertIframeOpened(true);
        //   setCertIframeSrc('/certificate-generator/certificates/gclc.html');
        // }
        const { user_id, session_id } = user;
        const { current_grade, competition_id } = competition;
        if (OsProperties.IsAndroid()) {
          const x = new InAppBrowser(
            `https://bonzoapi.knowledgeplatform.com/api/GenerateCertificate?user_id=${user_id}&session_id=${session_id}&competition_id=${competition_id}&grade=${current_grade}`,
            (a) => {
              if (a === 'loadstop') {
                //  dispatch(LoaderAction.Hide());
                // console.log('x', x);
              } else if (a === 'nointernet' || a === 'loaderror') {
                // dispatch(LoaderAction.Hide());
              }
            },
            'Certificate',
            '_system'
          );
          console.log(x);
        } else {
          window.open(
            `https://bonzoapi.knowledgeplatform.com/api/GenerateCertificate?user_id=${user_id}&session_id=${session_id}&competition_id=${competition_id}&grade=${current_grade}`,
            '_system'
          );
        }

        break;
      }
      case 'overlay':
      case 'close':
        setPopUpCertVisible(false);
        setCertAvailable(false);
        setEditName(false);
        break;
      case 'name':
      case 'age':
      case 'city':
      case 'phoneNumber':
        OnInputChange({ name: t, value: e.target.value }, certForm, setCertForm);
        break;
      case 'claim': {
        claimCertCallback();
        break;
      }
      case 'how-to-earn': {
        setRewardInstructions(certJson?.non_certified_popup || texts.CERTIFICATE_INFO_REWARD);
        setInstructionsPopup(true);
        break;
      }
      case 'edit-name': {
        setEditName(true);
        setTimeout(() => {
          const firstInput = document.querySelector('input[type="text"]');
          if (firstInput) {
            firstInput.focus();
          }
        }, 300);
        break;
      }
      case 'save-name': {
        if (editName) {
          if (certForm.name.trim() !== originalName.trim()) {
            if (certForm.name.length >= 0 && certForm.name.length < 3) {
              Toast.Show(texts.NAME_INVALID, ALERT.ERROR);
            } else if (!/^[a-zA-Z0-9@.\s]+$/.test(certForm.name.trim())) {
              Toast.Show(texts.INVALID_NAME, ALERT.ERROR);
            } else {
              dispatch(
                GetUserCertificateDetails(
                  {
                    full_name: certForm.name.trim(),
                    competition_id: competition?.competition_id,
                    current_grade: compDetail?.current_grade,
                  },
                  (data) => {
                    setCertForm({
                      ...certForm,
                      name: certForm.name.trim(),
                    });
                    setOriginalName(certForm.name.trim()); // Update original name after save
                    setEditName(false);
                    User.UpdateUser('name', certForm.name.trim());
                  }
                )
              );
            }
          } else {
            setEditName(false);
          }
        } else {
          setOriginalName(certForm.name); // Store the current name before editing
          setEditName(true);
        }
        break;
      }
      default:
        break;
    }
  };

  const confBoxCallBack = (e, item) => {
    const t = typeof e === 'string' ? e : e.currentTarget.getAttribute('data-tag');
    switch (t) {
      case 'warn-positive':
        PageSwitch(DefaultNav.SETTINGS);
        break;
      case 'warn-negative':
        setConfBoxVisible(false);
        break;
      default:
        setConfBoxVisible(false);
        break;
    }
  };

  const claimCertCard = pageData && !!is_certificate_enabled && (pageData.rewards.length > 0 ? rewardsTypeRef !== 3 : true) && (
    <ResGrid>
      <Grid
        container
        //  className={styled.claim_cert_card}
        className={`${styled.CardMainContainer} ${styled.claim_cert_card}`}
      >
        <Box
          style={{
            boxShadow: '0px 7px 0px 0px rgba(0,0,0,0.3)',
            borderRadius: '22px',
            maxWidth: '284px',
            width: '100%',
            height: 'auto',
          }}
          className={styled.containerCard}
        >
          <div className={styled.cert_card}>
            <div className={styled.img_box}>
              <img src={Cordova.Path(IMAGES.CERTIFICATE)} alt="icon" />
            </div>
            <p className={`${styled.img_text} ${styled.img_text_gclc}`}>
              {certJson?.certificate_title || texts.CERTIFICATE_OF_PARTICIPATE}{' '}
            </p>
            <div style={{ padding: '0px 11px 11px 11px' }}>
              <div style={{ padding: certStatus === 1 ? '' : '' }} className={`${styled.cert_desc} truncate_text_2`}>
                <p>
                  {certStatus === undefined && 'Loading...'}
                  {certStatus === 0 && (certJson?.non_certified_desc || texts.CERTIFICATE_FIRST_REWARD)}
                  {certStatus === 1 && (certJson?.certified_desc || texts.THANKS_FOR_COMPLETING)}
                </p>
              </div>
              <ButtonBold yellowBubble secondaryYellow tag={certStatus === 0 ? 'how-to-earn' : 'cert-download'} onClick={certCallback}>
                {certStatus === 0 && texts.HOW_TO_EARN}
                {certStatus === 1 && texts.DOWNLOAD_CERTIFICATE_BTN}
              </ButtonBold>
            </div>
          </div>
        </Box>
      </Grid>
    </ResGrid>
  );

  const singleCertCard = claimCertCard && (
    <div
      style={{
        marginTop: rewardsTypeRef === 1 && pageData.rewards.length > 0 && !pageData.time_rewards.length > 0 ? '0px' : '36px',
        marginBottom: '16px',
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
      }}
    >
      {claimCertCard}
    </div>
  );

  const fRewardsType = [
    { name: texts.ALL_REWARDS, index: 0 },
    { name: texts.EARNED_REWARDS, index: 1 },
    { name: texts.COMPETITION_REWARDS, index: 2 },
    { name: texts.CLAIMED_REDEEMED_REWARDS, index: 3 },
  ];

  // TODO GET REWARDS DATA AND ASSIGN MONTHLY/DAILY FROM IT
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
    PageUI = is_certificate_enabled ? singleCertCard : <NoDataFound noDataMsg={texts.COMING_SOON} />;
  } else {
    PageState = PAGE_STATE.LOADED;
    // PageUI = <Box>Hello</Box>;
    const PageUIPartA =
      (pageData.time_rewards.length > 0 && (rewardsTypeRef === 1 || rewardsTypeRef === 0)) ||
      (!!is_certificate_enabled && certStatus === 1 && (rewardsTypeRef === 1 || rewardsTypeRef === 0)) ? (
        <Grid item xs={12} mt={12}>
          <PageSubTitle logo={competitions_icon} name={texts.EARNED_REWARDS} />

          {/* <Paper maxWidth="100%" background="transparent" m={0} mb={2} pt={1.5} pb={1.5} pl={6} pr={6} elevation={0}>
            <H3 textAlign="center" m={0}>
              <WriteString text="Earned Rewards" />
            </H3>
          </Paper> */}
        </Grid>
      ) : rewardsTypeRef === 1 && !pageData.time_rewards.length > 0 ? (
        <Grid item xs={12} mt={12}>
          <PageSubTitle logo={competitions_icon} name={texts.EARNED_REWARDS} />
          <NoDataFound />
        </Grid>
      ) : (
        <></>
      );

    const PageUIPartB = pageData.time_rewards?.map((reward) => {
      let badgeImg = false;
      switch (reward.reward_type) {
        case Reward_Type.Daily:
          badgeImg = dailyBadge;
          break;
        case Reward_Type.Weekly:
          badgeImg = weeklyBadge;
          break;
        case Reward_Type.Monthly:
          badgeImg = monthlyBadge;
          break;
        case Reward_Type.AllTime:
          badgeImg = eocBadge;
          break;
        default:
          break;
      }
      let buttonLabel = false;

      if (reward.is_claimed === 1) {
        if (IsMcdUser) {
          buttonLabel = 'Redeem';
        } else {
          buttonLabel = texts.CLAIMED;
        }
      } else {
        buttonLabel = texts.CLAIM;
      }

      return (
        <ResGrid key={reward.reward_id}>
          <Grid container className={styled.CardMainContainer}>
            <Box className={styled.containerCard}>
              <Card
                className={styled.imageCard}
                item={{
                  ...reward,
                  image: reward.image,
                  primary: reward.title,
                  buttonTitle: buttonLabel,
                  desc: reward.description || '',
                  showClaim: IsMcdUser || user_data?.points >= reward?.cost ? true : false,
                }}
                imageAutoHeight={!!competition.is_reward_full_height}
                iconImg
                // thirdChip={
                //   competition?.is_mcd && (reward.reward_type === 'daily' || reward.reward_type === 'eoc') ? <b>Premium</b> : false
                // }
                thirdChip={false}
                extendedPrimaryTextHeight
                chip={reward.is_claimed !== true ? false : 'Claimed'}
                callback={callback}
                titleOverlay
                heightFull={(rewardsTypeRef === 1 || rewardsTypeRef === 0) && !IsMcdUser ? true : false}
              />

              <Box className={styled.middleTxt}>
                <Box className={styled.textW}>
                  {badgeImg && (
                    <img
                      src={Cordova.Path(badgeImg, true)}
                      style={{
                        display: badgeImg ? 'block' : 'none',
                        zIndex: '99',
                        width: '74px',
                        height: '65px',
                        marginRight: '20px',
                        paddingTop: '10px',
                        marginTop: '70px',
                        paddingRight: '10px',
                        position: 'fixed',
                      }}
                      alt="Badge"
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </Grid>
        </ResGrid>
      );
    });

    const PageUIPartX = (
      <Grid item xs={12} mt={12}>
        <PageSubTitle logo={competitions_icon} name={texts.COMPETITION_REWARDS} />
      </Grid>
    );
    const PageUIPartY = pageData.rewards.map((reward) => {
      const secondary = !IsMcdUser ? (
        <Box m={1} display="flex" justifyContent="center" alignItems="center">
          <Box className={styled.secondary}>
            <H4 color={palette.common.dark} fontWeight={typography.fontWeightBold} className={styled.boxAlignment}>
              <Box mr={1} component="span" height="22px">
                {<CoinIcon />}
              </Box>
              {reward.reward_type !== Reward_Type.Redeem ? '' : ''}
              {Numbers.ToCommaSeparated(reward.cost)}
            </H4>
            <H4 color={palette.common.red2} fontWeight={typography.fontWeightRegular} className={styled.boxAlignment}>
              <Box component="span" mr={1.5} height="22px">
                {/* <i className="i i-box" /> */}
              </Box>

              {`${Numbers.ToCommaSeparatedWithoutZero(reward.quantity)} left`}
            </H4>
          </Box>
        </Box>
      ) : null;
      let badgeImg = false;
      switch (reward.reward_type) {
        case Reward_Type.Daily:
          badgeImg = dailyBadge;
          break;
        case Reward_Type.Weekly:
          badgeImg = weeklyBadge;
          break;
        case Reward_Type.Monthly:
          badgeImg = monthlyBadge;
          break;
        case Reward_Type.AllTime:
          badgeImg = eocBadge;
          break;
        default:
          break;
      }
      return (
        <ResGrid key={reward.reward_id}>
          <Grid container className={styled.CardMainContainer}>
            <Box className={styled.containerCard}>
              <Card
                className={styled.imageCard}
                item={{
                  ...reward,
                  image: reward.image,
                  primary: reward.title,
                  desc: reward.description || '',
                  secondary: IsMcdUser ? null : secondary,
                  buttonTitle:
                    reward.reward_type === Reward_Type.Redeem && !IsMcdUser
                      ? texts.CLAIM
                      : // : reward.reward_type !== Reward_Type.Redeem && !isGlobalClimate
                        // ? texts.HOW_TO_EARN
                        texts.HOW_TO_EARN,
                  showClaim: IsMcdUser || user_data?.points >= reward?.cost ? true : false,
                }}
                // thirdChip={
                //   competition?.is_mcd && (reward.reward_type === 'daily' || reward.reward_type === 'eoc') ? <b>Premium</b> : false
                // }
                thirdChip={false}
                imageAutoHeight={!!competition.is_reward_full_height}
                iconImg
                extendedPrimaryTextHeight
                callback={callback}
                titleOverlay
              />

              <Box className={styled.middleTxt}>
                <Box className={styled.textW}>
                  {badgeImg && (
                    <img
                      src={Cordova.Path(badgeImg, true)}
                      style={{
                        display: badgeImg ? 'block' : 'none',
                        zIndex: '99',
                        width: '74px',
                        height: '65px',
                        marginRight: '20px',
                        paddingTop: '10px',
                        marginTop: '70px',
                        paddingRight: '10px',
                        position: 'fixed',
                      }}
                      alt="Badge"
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </Grid>
        </ResGrid>
      );
    });

    const combineCards = [claimCertCard, ...PageUIPartY];
    const combineCardsB = [claimCertCard, ...PageUIPartB];

    PageUI = (
      <>
        {/* <IframeComponent src={certIframeSrc} isOpenInitially={certIframeOpened} messageContent={iframeData} /> */}
        {(rewardsTypeRef === 0 || rewardsTypeRef === 1) && PageUIPartA}
        {(rewardsTypeRef === 1 || rewardsTypeRef === 0) && certStatus === 1
          ? combineCardsB
          : rewardsTypeRef === 1 || rewardsTypeRef === 0
          ? PageUIPartB
          : null}
        {(rewardsTypeRef === 0 || rewardsTypeRef === 2) && PageUIPartX}
        {rewardsTypeRef === 0 || rewardsTypeRef === 2 ? combineCards : rewardsTypeRef !== 1 ? singleCertCard : null}

        {user?.active_role === 'learner' && (rewardsTypeRef === 0 || rewardsTypeRef === 3) && (
          <div style={{ width: '100%', marginTop: '24px' }}>
            <RewardHistory competition={competition} />
          </div>
        )}
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
    if (competition?.competition_id && compDetail?.current_grade && !User.IsGuest()) {
      dispatch(GetCompetitionsRewards({ competition_id: competition.competition_id, current_grade: compDetail.current_grade }));
    } else if (User.IsGuest() && !callRef.sent) {
      dispatch(GetCompetitionsRewards({ competition_id: competition.competition_id, current_grade: compDetail.current_grade }));
      setCallRef({ grade: callRef.grade, sent: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, competition, compDetail, paymentStatus]);

  // const ClearData = () => {
  //   gameDispatch(API_CALLS.GetCompetitionsRewards.CLEAR);
  //   loadData();
  // };
  // useEffect(() => {
  //   if (paymentStatus) {
  //     ClearData();
  //   }
  // }, [paymentStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadComDetailData = useCallback(() => {
    dispatch(GetCompetitionDetails(currentComp?.item?.enrolled, competition.competition_id));
  }, [dispatch, currentComp, competition]);

  useEffect(() => {
    if (!compDetail) {
      loadComDetailData();
    } else if (compDetail) {
      setCallRef({ sent: callRef.sent, grade: compDetail?.current_grade });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compDetail]);

  if (compDetail?.current_grade !== callRef.grade && callRef.sent) {
    setCallRef({ sent: false, grade: compDetail?.current_grade });
  }

  useEffect(() => {
    if (pageData !== null) {
      const cData = pageData.certificate_json;

      setCertJson(cData?.length > 0 ? JSON.parse(LZString.decompressFromBase64(cData)).certificate_data : null);
      // console.log(certJson);
      setCertStatus(pageData.certificate_status); // TODO: UNCOMMENT THIS AND REMOVE NEXT LINE
    }
    if (!callRef.sent) {
      loadData();
    }
    setCallRef({ grade: callRef.grade, sent: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadData, callRef.sent, callRef.grade, pageData]);

  useEffect(() => {
    if (competition.competition_id && compDetail?.current_grade && user?.active_role === 'learner' && competition.is_premium === 1) {
      dispatch(
        GetPaymentStatus({ competition_id: competition.competition_id, current_grade: compDetail?.current_grade }, (data) => {
          setPaymentStatus(data);
        })
      );
      if (!isShupavu) {
        gameDispatch(PREMIUM_COMPETITION.SET_DATA, competition);
      }
    } else {
      setPaymentStatus(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compDetail]);

  useEffect(() => {
    if (UserData && !claim.isFilled && rewardAvailable) {
      const { name, username, school_name, city, phone_number } = UserData?.users[0];
      if (!name || !username) {
        setConfBoxVisible(true);
      } else {
        setClaim({
          ...claim,
          name,
          schoolName: school_name,
          email: username,
          city,
          phoneNumber: phone_number,
          isFilled: true,
        });
        setPopUpVisible(true);
      }
    }

    if (UserData && certAvailable) {
      const { name } = UserData;
      setCertForm({
        ...certForm,
        name: name || user?.name || user?.username || user?.email,
      });
      setPopUpCertVisible(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UserData, claim, rewardAvailable, certAvailable]);

  const UploadImage = (e) => {
    const selectedFile = e.target.files;
    if (selectedFile.length > 0) {
      const imageFile = selectedFile[0];
      if (imageFile.size <= LIMITS_CONFIG.REWARD_UPLOAD_IMAGE_SIZE && imageFile.size > 0) {
        if (imageFile.type === 'image/png' || imageFile.type === 'image/jpeg') {
          const fileReader = new FileReader();
          fileReader.onload = (fileLoadedEvent) => {
            const srcData = fileLoadedEvent.target.result;
            const newImage = document.createElement('img');
            newImage.src = srcData;
            setClaim({ ...claim, user_image: newImage.src });
          };
          fileReader.readAsDataURL(imageFile);
        } else {
          Toast.Show(texts.VALID_IMAGE, ALERT.ERROR);
          e.target.value = null;
          setClaim({ ...claim, user_image: '' });
        }
      } else {
        Toast.Show(texts.INVALID_IMAGE_SIZE, ALERT.ERROR);
        e.target.value = null;
        setClaim({ ...claim, user_image: '' });
      }
    }
  };

  useEffect(() => {
    window.myOnBeforeUnload = () => {
      gameDispatch(API_CALLS.GetProfile.CLEAR);
    };
  }, []);

  // const backButtonCallback = () => {
  //   SelectedCompetition.GotoCompetition();
  // }

  return (
    <>
      <GenericConfirmationBox
        callback={confBoxCallBack}
        visible={confBoxVisible}
        tag="warn"
        addCodeIcon={IMAGES.CLAIM_REWARD}
        ADD_CODE
        hideCross
        className={styled.confirmation_box}
        buttonsContainer={styled.sign_out_buttons_container}
        // icon="alert"
        title="Claim Reward"
        primary="To claim this reward, you have to update your profile first."
        positive={texts.UPDATE_PROFILE}
        negative={texts.NOT_NOW}
        allowClose
      />

      <ModalBox
        isVisible={popUpVisible}
        hideCross
        allowClose
        hideIcon
        ADD_CODE
        className={styled.modal_container}
        addCodeIcon={reward_icon}
        callback={callback}
        title={texts.CLAIM_REWARD}
      >
        <Box mt={2} mb={2} width="80%" textAlign="center">
          <Input disabled tag="name" value={claim.name} label={texts.ENTER_FULL_NAME} className={styled.textcolor} />
        </Box>
        <Box mb={2} width="80%" textAlign="center">
          <Input disabled tag="email" value={claim.email} label={texts.ENTER_YOUR_EMAIL} className={styled.textcolor} />
        </Box>
        <Box mb={2} width="80%" textAlign="center">
          <Input tag="schoolName" onChange={callback} label={texts.ENTER_YOUR_SCHOOL_NAME} autoFocus />
        </Box>
        <Box mb={2} width="80%" textAlign="center">
          <Input tag="city" value={claim.city} onChange={callback} label={texts.ENTER_YOUR_CITY} required />
        </Box>
        <Box mb={2} width="80%" textAlign="center">
          <Input tag="phoneNumber" value={claim.phoneNumber} onChange={callback} label={texts.PHONE_NUMBER} required />
        </Box>

        {/* <Box mb={2} width="160px" textAlign="center">
          <Button
            startIcon={<i className="i i-image-upload" />}
            onClick={() => {
              if (Cordova.IsCordova) {
                Cordova.GetPicture((data) => {
                  // TODO possibly add toast image copied
                  setClaim({ ...claim, user_image: data });
                });
              } else {
                document.getElementById('file-input').click();
              }
            }}
          >
            {texts.SELECT_IMAGE}
          </Button>
          <input
            id="file-input"
            name="uploadImage"
            type="file"
            onChange={(e) => {
              UploadImage(e);
            }}
            tag="uploadImage"
            style={{ display: 'none' }}
          />
        </Box> */}

        <Box mb={2} width="160px" textAlign="center">
          <Button
            startIcon={<i className="i i-image-upload" />}
            onClick={() => {
              if (Cordova.IsCordova) {
                Cordova.GetPicture((data) => {
                  setClaim({ ...claim, user_image: data });
                });
              } else {
                document.getElementById('file-input').click();
              }
            }}
          >
            {texts.SELECT_IMAGE}
          </Button>
          <input id="file-input" name="uploadImage" type="file" onChange={UploadImage} style={{ display: 'none' }} />
          {claim.user_image && (
            <Box mt={2}>
              <img src={claim.user_image} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </Box>
          )}
        </Box>

        <Box mb={2} width="80%" textAlign="left">
          {/* <TextField
            className={styled.textArea}
            name="address"
            onChange={callback}
            multiline
            minRows={4}
            variant="outlined"
            inputProps={{ className: styled.textArea }}
          /> */}
          <Input
            tag="address"
            label={texts.SHIPPING_ADDRESS}
            variant="outlined"
            onChange={callback}
            multiline // for textarea, add this prop
            minRows={4} // for textarea row, add this prop
            className="textAreaParent"
          />
        </Box>

        <Button mb={4} mt={4} tag="claim" onClick={callback} thirdYellow>
          <ButtonText color="#FFF" fontSize="18px" fontWeight="600" letterSpacing="0.5px">
            {texts.SUBMIT_CLAIM}
          </ButtonText>
        </Button>
      </ModalBox>

      <ModalBox
        isVisible={popUpCertVisible}
        hideCross
        xIconBold
        hideIcon
        ADD_CODE
        allowClose
        className={styled.modal_container}
        addCodeIcon={IMAGES.CHOOSE_GRADE}
        callback={certCallback}
        title={texts.CLAIM_CERT}
      >
        <H4
          styleCSS={{
            fontSize: '24px',
            padding: '10px',
            fontWeight: '600',
            color: '#00A3FF',
            textAlign: 'center',
            margin: '10px 0px',
          }}
        >
          {texts.CONGRATS}
        </H4>

        <Body1 className={styled.faq_question}>
          {certJson?.certified_popup || texts.THANKS_FOR_COMPLETING_2}
          {/* {` : You’ve earned your Stage 1 certificate for ${competition?.name}.`} */}
        </Body1>
        <Box className={styled.input_box} mt={2} width="84%" mb={2} textAlign="center">
          <Input
            disabled={!editName ? true : false}
            required
            tag="name"
            onChange={certCallback}
            value={certForm.name}
            label={'Edit your name'}
            autoFocus={editName ? true : false}
          />
          <Button
            onClick={certCallback}
            tag={editName ? 'save-name' : 'edit-name'}
            width="auto"
            mt={0}
            m={0}
            className={styled.detailBtn}
          >
            {editName ? 'Save' : 'Edit'}
          </Button>
        </Box>
        {/* <Box mb={2} width="80%" textAlign="center">
          <Input tag="age" onChange={certCallback} label={texts.ENTER_YOUR_AGE} />
        </Box>
        <Box mb={2} width="80%" textAlign="center">
          <Input tag="city" onChange={certCallback} label={texts.ENTER_YOUR_CITY} />
        </Box>
        <Box mb={2} width="80%" textAlign="center">
          <Input tag="phoneNumber" onChange={certCallback} label={texts.PHONE_NUMBER} />
        </Box> */}
        <Grid className={styled.profile_btn_container}>
          <ButtonBold bgBlue yellowBubble secondaryYellow tag="close" onClick={certCallback}>
            {texts.CANCEL}
          </ButtonBold>
          <ButtonBold yellowBubble secondaryYellow tag="cert-download" onClick={certCallback}>
            {texts.DOWNLOAD_CERTIFICATE_BTN}
          </ButtonBold>
        </Grid>
        {/* <Box mb={2} width="180px" textAlign="center">

          <ButtonBold mb={2} mt={4} tag="cert-download" onClick={certCallback} secondaryYellow yellowBubble>
            {texts.DOWNLOAD_CERTIFICATE_BTN}
          </ButtonBold>
        </Box> */}
      </ModalBox>

      <ModalBox
        isVisible={instructionsPopup}
        hideIcon
        titleClose
        ADD_CODE
        allowClose
        className={styled.modal_container}
        addCodeIcon={IMAGES.CHOOSE_GRADE}
        callback={instructionsCallback}
        title={isSGG ? texts.HOW_TO_GET_CERT : texts.HOW_TO_EARN}
      >
        {rewardInstructions.length > 0 && (
          <H4
            styleCSS={{
              fontSize: '24px',
              padding: '10px 10px 0px 10px',
              fontWeight: '600',
              color: '#00A3FF',
              textAlign: 'center',
              margin: '10px 12px 0px 12px',
            }}
          >
            {isGlobalClimate && !currentComp?.item?.is_semi_private ? texts.CERTIFICATE_NOT_AVAILABLE : texts.INSTRUCTIONS}
          </H4>
        )}
        <Box mt={4} mb={4} width="80%" textAlign="center">
          <WriteString className={styled.font_color} text={rewardInstructions || texts.NO_REWARD_INFO} />
        </Box>
        {/* <Box mb={2} width="80%" textAlign="center">
          <Input tag="age" onChange={certCallback} label={texts.ENTER_YOUR_AGE} />
        </Box>
        <Box mb={2} width="80%" textAlign="center">
          <Input tag="city" onChange={certCallback} label={texts.ENTER_YOUR_CITY} />
        </Box>
        <Box mb={2} width="80%" textAlign="center">
          <Input tag="phoneNumber" onChange={certCallback} label={texts.PHONE_NUMBER} />
        </Box> */}

        <Grid className={styled.buttons_container}>
          <ButtonBold m={2} noTextWrap tag="cancel-btn" onClick={instructionsCallback} bgBlue secondaryYellow yellowBubble>
            {texts.CLOSE}
          </ButtonBold>
          <ButtonBold m={2} noTextWrap tag="play-btn" onClick={instructionsCallback} secondaryYellow yellowBubble>
            {texts.PLAY}
          </ButtonBold>
        </Grid>
      </ModalBox>
      <SlidableView showGradient>
        <Header
          isOnlyCompetition
          // trigger={trigger}
          scrollNode={scrollNode}
          headerSet={{
            showRight: true,
            showLeft: IsMcdUser || IsAdLogin || IsDirectLaunch ? false : true,
            overrideLeftButton: true,
            notify: true,
            showFloatingFAQ: true,
            // SecondaryButtons,
            // leftTitle: competition.name,
            // callback: backButtonCallback,
          }}
        />
        <FlexibleView
          ref={(node) => {
            if (node) {
              setScrollNode(node);
            }
          }}
        >
          <Grid container style={{ marginTop: '16px' }}>
            <Grid item xs={12} md={3}>
              &nbsp;
            </Grid>
            <Grid item xs={12} md={6}>
              <PageTitle logo={competitions_icon} noMargins name={texts.REWARDS} />
            </Grid>
            <Grid className="sRewardsFilter" item xs={12} md={3}>
              <Grid item container justifyContent="center" xs={12}>
                <Paper className={styled.filterPaper} elevation={0} sx={{ marginTop: '8px' }}>
                  <Select
                    list={fRewardsType}
                    callback={rewardsTypeCallBack}
                    value={rewardsTypeRef}
                    tag="selected-item"
                    className={styled.select}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <div>&nbsp;</div>

          {/* <H1>{texts.REWARDS}</H1> */}
          <ResContainer>
            {/* {pageData && user.active_role === 'learner' && (
              <PremiumBanner competition={competition} paymentData={paymentStatus} status={pageData !== null} />
            )} */}

            {/* {!is_certificate_enabled && (
              <Grid item xs={12}>
                <Paper flexDirection="row" justifyContent="center" alignItems="center">
                  <Box ml={2} mr={2} mt={1} mb={1}>
                    <img height="40px" width="45px" src={Cordova.Path(alert)} alt="t" />
                  </Box>
                  <Box ml={2} mr={2} mt={1} mb={1}>
                    <Body1>{texts.REWARD_WARNING}</Body1>
                  </Box>
                </Paper>
              </Grid>
            )} */}
            {competition?.is_mcd === 1 && (
              <Grid item xs={12}>
                <Paper flexDirection="row" justifyContent="center" alignItems="center">
                  <Box ml={2} mr={2} mt={1} mb={1}>
                    <img height="40px" width="45px" src={Cordova.Path(alert)} alt="t" />
                  </Box>
                  <Box ml={2} mr={2} mt={1} mb={1}>
                    <Body1>
                      {user?.claimed_rewards === 3 ? (
                        <WriteString text={texts.REWARD_WARNING_MCD_REACHED} />
                      ) : (
                        <WriteString text={texts.REWARD_WARNING_MCD} />
                      )}
                    </Body1>
                  </Box>
                </Paper>
              </Grid>
            )}
            {/* {!!is_certificate_enabled && (
              <Grid item xs={12}>
                <Box flexDirection="row" justifyContent="center" alignItems="center" className={styled.cardBase}>
                  <div
                    style={{ width: '100%', marginBottom: '8px', backgroundColor: '#ffffff', height: 'auto', borderRadius: '15px' }}
                  >
                    <Grid container direction="row" justifyContent="center" alignItems="center" className={styled.certBannerBG}>
                      <Grid item sm={12} lg={12} className={`${styled.certTextContent} ${styled.certTextContent2}`}>
                        <Box ml={0} mr={0} mt={0} mb={0}>
                          <img
                            height="30px"
                            width="38px"
                            src={Cordova.Path(cert)}
                            alt="Certificate"
                            className={styled.certImageIcon}
                          />
                        </Box>
                        <Box mt={4} mb={4} className={styled.certTextContent}>
                          <Body1>
                            <h3
                              style={{
                                fontFamily: 'Fredoka',
                                fontWeight: 'bold',
                                color: 'black',
                                fontSize: '1.2rem',
                                display: certStatus > 0 ? 'inherit' : 'none',
                              }}
                            >
                              {texts.CONGRATS}{' '}
                            </h3>

                            <span style={{ color: '#000000', fontSize: '1.2rem', lineHeight: '1.2rem' }}>
                              {certStatus === undefined && 'Loading...'}
                              {certStatus === 0 && texts.INCOMPLETE_FOR_CERT}
                              {certStatus === 1 && texts.DOWNLOAD_CERT}
                            </span>
                          </Body1>
                        </Box>
                      </Grid>
                      <Grid item md={12} lg={3}>
                        <Box
                          ml={3}
                          mr={3}
                          mt={1}
                          mb={1}
                          className={styled.certTextContent}
                          style={{
                            display: certStatus > 0 ? 'inherit' : 'none',
                          }}
                        >
                          <Body1>
                            {certStatus === 1 && (
                              <ButtonBold
                                tag="cert-download"
                                type="submit"
                                className={styled.claimButtonEnabled}
                                onClick={certCallback}
                                secondaryYellow
                                yellowBubble
                              >
                                {texts.DOWNLOAD_CERTIFICATE_BTN}
                              </ButtonBold>
                            )}
                          </Body1>
                        </Box>
                      </Grid>
                    </Grid>
                  </div>
                </Box>
              </Grid>
            )} */}
            {/* {pageData && !!is_certificate_enabled && (
              <div className={styled.cert_card}>
                <div className={styled.img_box}>
                  <img src={Cordova.Path(IMAGES.CERTIFICATE)} alt="icon" />
                </div>
                <p className={styled.img_text}>Certificate of Participation</p>
                <p className={styled.cert_desc}>
                  {certStatus === undefined && 'Loading...'}
                  {certStatus === 0 && texts.COMPLETE_GAMES}
                  {certStatus === 1 && texts.DOWNLOAD_CERT}
                </p>
                <ButtonBold
                  yellowBubble
                  secondaryYellow
                  tag="cert-download"
                  isClaimCert={certStatus === 1 ? false : true}
                  className={certStatus === 1 ? '' : styled.disable_cert}
                  onClick={certCallback}
                >
                  {certStatus === 0 && texts.CLAIM_CERTIFICATE_BTN}
                  {certStatus === 1 && texts.DOWNLOAD_CERTIFICATE_BTN}
                </ButtonBold>
              </div>
            )} */}
            <IframeComponent src={certIframeSrc} isOpenInitially={certIframeOpened} messageContent={iframeData} />
            {PageUI}
          </ResContainer>
        </FlexibleView>
      </SlidableView>
    </>
  );
});

export default Rewards;
