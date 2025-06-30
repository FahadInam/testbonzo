import React, { useEffect, useRef, useState } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Grid, useTheme, Box, Snackbar } from '@material-ui/core';
import { User } from 'Actions';
import { Paper, H4, H5, Subtitle2, Body4, Button, Body1, ButtonText } from 'Components';
import Image from 'Components/Image';
import { Cordova, getInstanceText, getInstanceType } from 'Utils';
import useStyles from './style';
import ButtonBold from 'Components/Core/ButtonBold';
import { gameDispatch } from 'Utils/ActionCreators';
import { API_CALLS, IMAGES } from 'Constants';
import moment from 'moment/moment';
import { shallowEqual, useSelector } from 'react-redux';
import { INSTANCES_ID } from 'Constants/instance.config';

export const CompetitionCard = React.memo(
  ({ item, texts, Login_Type, callback, user, isPremiumUser, landingCompetitionCard, ...rest }) => {
    const style = useStyles(rest);
    const { palette } = useTheme();
    const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);

    // const [highResBannerPath, setHighResBannerPath] = useState('');

    const localCallback = (e) => {
      e.stopPropagation();
      // console.log(e.currentTarget, item);
      gameDispatch(API_CALLS.GetOpponents.CLEAR);
      if (callback) callback(e, item);
    };
    const orgRef = useRef(null);
    const [loaded, setLoaded] = useState(0);

    useEffect(() => {
      let mounted = true;
      const org = orgRef.current;
      org.addEventListener('load', () => {
        if (mounted) setLoaded(1);
      });

      org.addEventListener('error', () => {
        if (mounted) setLoaded(-1);
      });

      return () => {
        mounted = false;
        org.removeEventListener('load', null);
        org.removeEventListener('error', null);
      };
    }, []);

    useEffect(() => {
      if (item && item.banner_image) {
        // const path = item.banner_image;
        // const lI = path.lastIndexOf('.');
        // const ext = path.substr(lI, 15);
        // let newpath = `${path.substr(0, lI)}1${ext}`;
        // setHighResBannerPath(newpath);
      }
    }, [item]);

    // Calculate the percentage of lessons completed
    const percentage = Math.round((item?.lessons_completed / item?.total_lessons) * 100);

    const utcDate = moment().utc();
    const currentDate = utcDate.format('YYYY-MM-DD HH:mm:ss');
    const formattedDate = new Date(item?.end_date);
    const endDate = moment(formattedDate).format('YYYY-MM-DD HH:mm:ss');
    // console.log(item.competition_id, 'currentDate, ** ', currentDate, 'endDate ****', endDate);

    const isLocked =
      Inst_config?.comp_banner_locked &&
      user?.active_role !== 'principal' &&
      item?.is_private_comp_enabled === 1 &&
      item?.is_public === 0 &&
      item?.is_voucher_added === 0;

    const color =
      item?.is_demo === 1
        ? '#02B5F5' // Blue for demo
        : endDate < currentDate
        ? '#777777' // Grey for past date
        : '#3bb44d'; // Green for future date
    return (
      <Grid item xs={12}>
        <Box
          className={`${style.competition_card_container} ${landingCompetitionCard ? 'landing_competition_card_container' : ''} ${
            isLocked ? style.less_shadow : ''
          }`}
        >
          <Paper
            p={1}
            className={`sCompetitionCard ${style.root} ${style.competition_card}  ${user?.active_role === 'principal' ? '' : ''} ${
              landingCompetitionCard ? 'landing_competition_card' : ''
            } ${isLocked ? style.hide_shadow : ''}`}
            styleCSS={{ cursor: user?.active_role === 'principal' || isLocked ? 'default' : 'pointer' }}
            background={palette.common.white}
            tag={
              isLocked
                ? ''
                : item?.current_grade && !User.IsGuest() && item.enrolled === 1 && item?.competition_id !== 36
                ? 'competition'
                : 'show-rules'
            }
            onClick={user?.active_role === 'principal' ? localCallback : localCallback}
            data_sid={item?.name?.toLowerCase()}
          >
            <Box
              style={{ position: 'relative' }}
              className={`${style.image} ${landingCompetitionCard ? 'landing_competition_card_img' : ''}`}
            >
              {loaded !== -1 ? (
                <picture>
                  <source media="(max-width: 639px)" srcSet={Cordova.Path(item?.banner_image_mobile, true)} />
                  <source media="(min-width: 640px)" srcSet={Cordova.Path(item?.banner_image, true)} />
                  <img
                    className={style.srcImg}
                    ref={orgRef}
                    src={Cordova.Path(item?.banner_image, true)}
                    alt={item?.name ?? 'banner-img'}
                  />
                </picture>
              ) : (
                <Image
                  src={Cordova.Path(item?.banner_image, true)}
                  alt={item?.name}
                  loader={<Skeleton variant="rect" width="100%" height="300px" className={style.imageLoader} />}
                />
              )}
              {isLocked && (
                <div className={style.gray_shade}>
                  <div className={style.lock_img_container}>
                    {/* Lock Icon with a soft glowing animation */}
                    <img className={style.lock_icon} width={65} height={65} src={Cordova.Path(IMAGES.LOCK_ICON)} alt="icon" />

                    {/* Simple locked text */}
                    <ButtonBold
                      yellowBubble
                      secondaryYellow
                      blackShadow
                      tag={
                        item?.current_grade && !User.IsGuest() && item.enrolled === 1 && item?.competition_id !== 36
                          ? 'competition'
                          : 'show-rules'
                      }
                      onClick={localCallback}
                    >
                      {getInstanceText(texts, 'UN_LOCK_VOUCHER', Inst_config.instance_id)}
                    </ButtonBold>
                  </div>
                </div>
              )}
            </Box>
            {user?.active_role !== 'principal' && item?.enrolled === 1 ? (
              <Box mt={1} className={style.progress_container}>
                <Box className={style.progress_bg}>
                  <Box width={`${percentage}%`} className={style.progress_bar}></Box>
                </Box>
                <Box m={0} p={0} className={style.progress_result}>
                  {' '}
                  <span style={{ color: '#02BBFE', fontWeight: '600' }}>{item.lessons_completed}</span>{' '}
                  <span style={{ color: '#112D70', fontWeight: '600' }}>/ {item.total_lessons}</span>{' '}
                </Box>
              </Box>
            ) : (
              <></>
            )}
            <Grid
              className={`${style.paperBody} ${user?.active_role === 'principal' && isPremiumUser === 1 && style.flexGap} ${
                landingCompetitionCard ? 'competition_paper_body' : ''
              }`}
            >
              <Box style={{ width: '100%' }} className={`${landingCompetitionCard ? 'competition_card_content' : ''}`}>
                <H4
                  styleCSS={{ marginBottom: user?.active_role !== 'principal' ? '4px' : '0px' }}
                  color={palette.common.darkGray}
                  className={`${landingCompetitionCard ? 'competition_card_name' : ''}`}
                >
                  {item?.name}
                </H4>
                {user?.active_role !== 'principal' && (
                  <div className={style.badges_container}>
                    <div
                      className={style.badges_dot}
                      style={{
                        backgroundColor: color,
                      }}
                    />
                    <Body1
                      className={style.badge_text}
                      styleCSS={{
                        color: color,
                      }}
                    >
                      {item?.is_demo === 1 ? texts.DEMO : endDate < currentDate ? texts.FINISHED : texts.LIVE}
                    </Body1>
                  </div>
                )}
                {user?.active_role === 'principal' && isPremiumUser === 1 && (
                  <Body1 color="#777777" className="poppins-font-400" fontSize="14px">
                    {texts.TOTAL_PLAYERS} {item.total_players}
                  </Body1>
                )}
              </Box>
              {user?.active_role === 'principal' && isPremiumUser === 1 && (
                <Grid className={style.view_progress_btn}>
                  <ButtonBold yellowBubble secondaryYellow noTranslate tag={`view-progress`} onClick={localCallback}>
                    {texts.VIEW_PROGRESS}
                  </ButtonBold>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Box>
      </Grid>
    );
  }
);

export const CompetitionCardLoader = React.memo((props) => {
  const style = useStyles(props);
  const { landingCompetitionCard } = props;
  return (
    <Grid item xs={12}>
      <Paper p={0} className={`${style.root} ${landingCompetitionCard && style.landing_page_card}`}>
        <Box className={style.imageLoader}>
          <Skeleton variant="rect" width="100%" height="100%" className={style.skeleton} />
        </Box>
        <Box className={style.paperBody} p={1}>
          <Box width="100%">
            {!landingCompetitionCard && <Skeleton variant="rect" width="100%" height="16px" className={style.skeleton} />}
            <Skeleton variant="rect" width="100%" height="16px" className={style.skeleton} />
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
});

export const InviteCard = React.memo(({ item, callback, premiumData, ...rest }) => {
  // console.log(premiumData, 'premiumData');
  const style = useStyles(rest);
  const { palette } = useTheme();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const isGlobalClimate = getInstanceType(Inst_config.instance_id, INSTANCES_ID.GLOBAL_CLIMATE_LITERACY_ID);

  const competitionUrl = isGlobalClimate ? process.env.REACT_APP_GG_COMPETITION_URL : process.env.REACT_APP_COMPETITION_URL;
  const formattedCompetitionUrl = competitionUrl?.startsWith('http') ? competitionUrl : `https://${competitionUrl}`;
  //  console.log(formattedCompetitionUrl, 'formatted url');
  const displayCompetitionUrl = formattedCompetitionUrl.replace(/^https?:\/\//, '');
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleLinkClick = (url) => {
    window.open(url, '_blank');
  };
  return (
    <Grid item xs={12}>
      <Box className={style.competition_card_container}>
        <Paper p={1} className={`${style.root} ${style.competition_card}`} background={palette.common.white}>
          <Box className={style.inviteCard}>
            <H5 className={style.inviteCard_title}>Invite Participants</H5>
            <Grid className={style.invite_contentContainer}>
              <Box className={style.invite_contentBox}>
                <Subtitle2 className={style.inviteCard_sub_title}>STEP 1</Subtitle2>
                <Body4>{isGlobalClimate ? 'Create a Learner Account at:' : 'Players go to:'}</Body4>
                <Box
                  className={style.inviteCard_linkBox}
                  onClick={() => handleLinkClick(`https://${displayCompetitionUrl}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <Body1 className="poppins-font-600 text-truncate" color="#313644">
                    {displayCompetitionUrl}
                  </Body1>
                </Box>
              </Box>
              <Box className={style.invite_contentBox}>
                <Subtitle2 className={style.inviteCard_sub_title}>STEP 2</Subtitle2>
                <Body4>{isGlobalClimate ? 'Join the Competition with the Voucher Code:' : 'Enter Voucher Code:'}</Body4>
                <Box className={style.inviteCard_linkBox}>
                  {/* <H3 className={style.textTransform}></H3> */}
                  <Body1 className={`poppins-font-600 ${style.voucher_code}`} color="#313644">
                    {premiumData?.institution_voucher_code}
                  </Body1>
                  <Button className={style.join_btn} onClick={() => handleCopy(premiumData?.institution_voucher_code)}>
                    {/* {texts.COPY_TITLE} */}
                    <ButtonText color="#fff" fontSize="18px" fontWeight="600" letterSpacing="0.5px">
                      Copy
                    </ButtonText>
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Box>
        </Paper>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message="Voucher Code Copied!"
          ContentProps={{
            style: {
              minWidth: '0px',
              background: '#000000',
              color: '#fff',
            },
          }}
        />
      </Box>
    </Grid>
  );
});
