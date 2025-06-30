/* eslint-disable camelcase */
import React from 'react';
import { useTheme, Grid } from '@material-ui/core';

import { IconPaper, H3 } from 'Components';
// import { IMAGES } from 'Constants';
// import { Cordova } from 'Utils';

// import useStyles from './style';
import typography from 'Theme/Typography';
import ButtonBold from 'Components/Core/ButtonBold';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'auto',
    width: '100%',
    minWidth: '284px',
    maxWidth: '100%',
    overflow: 'auto',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  avatarWrapper: {
    position: 'relative',
    paddingLeft: '20px',
    // '&:hover': {
    //   backgroundColor: 'transparent!important',
    // },
  },
  avatar: {
    width: '85px',
    height: '85px',
    // marginLeft: '-0.3px',
    // marginBottom: '-0.3px',
    // '&:hover': {
    //   margin: '15px',
    //   transform: 'scale(1.09)',
    //   border: '5px solid rgba(0,0,0,0.2)',
    //   borderStyle: 'inset',
    //   //borderColor: theme.palette.secondary.main,
    // },
  },
  btn: {
    position: 'absolute',
    bottom: '-10px',
    right: '-2px',
    // marginLeft: '-48px',
    // marginTop: '68px',
    // margin: '37px auto auto 37px',
    height: '36px',
    width: '36px',
    borderRadius: '50%',
    display: 'flex',
    zIndex: '2',
    justifyContent: 'center',
    alignItems: 'center',
    '& img': {
      width: '26px',
      height: '26px',
      transform: 'translateX(10px)',
    },
    // background: theme.palette.secondary.main,
    // color: theme.palette.common.white,
    '& i': {
      fontSize: '20px',
      border: '5px',
    },
    '&:hover': {
      // background: theme.palette.secondary.main,
      color: theme.palette.common.white,
      // paddingRight: '6px',
      // paddingBottom: '6px',
      // paddingLeft: '16px',
    },
    '&:active': {
      // background: theme.palette.secondary.main,
      color: theme.palette.common.white,
    },
  },
  gender: {
    width: '47%',
    fontSize: '0.8rem !important',
    color: theme.palette.grey['400'],
    '& .MuiFormGroup-root': {
      flexDirection: 'row',
      fontSize: '0.8rem !important',
    },
    '& .MuiTypography-body1': {
      fontSize: '0.8rem!important',
    },
  },
  skeleton: {
    background: theme.palette.action.skeleton,
    marginBottom: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
  },
  skeletonCircle: {
    background: theme.palette.action.skeleton,
  },
  skeletonButton: {
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.action.skeleton,
    marginBottom: theme.spacing(1),
  },
  skeletonIcon: {
    background: theme.palette.action.skeleton,
    width: '70px',
    height: '70px',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  grid: {
    marginBottom: theme.spacing(2),
  },
  circle: {
    margin: '-20px',
  },
  radioB: {
    color: `${theme.palette.grey['400']}!important`,
    borderColor: `${theme.palette.grey['400']}!important`,
    borderLeftColor: `${theme.palette.grey['400']}!important`,
    borderRightColor: `${theme.palette.grey['400']}!important`,
    borderTopColor: `${theme.palette.grey['400']}!important`,
    borderBottomColor: `${theme.palette.grey['400']}!important`,
  },
  row: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
  },
  'MuiIconButton-root': {
    '&:hover': {
      backgroundColor: 'transparent!important',
    },
  },
  profile_container: {
    maxWidth: '920px',
    margin: 'auto',
    padding: 0,
    width: '100%',
    paddingBottom: '12px!important',
  },
  skeleton_column: {
    width: '50%',
    '@media (max-width: 638.88px)': {
      width: '100%',
    },
  },
  modal_container: {
    // maxWidth: "1000px",
    // margin: "auto",
    // transform: "translateX(-4px)",
    // border: "3px solid green",
    background: `linear-gradient(to top, #277DFF, #00FFE0)`,
    padding: 0,
    // paddingTop: "10px",
  },
  title: {
    fontSize: '18px',
    color: 'white',
  },
  profile_input_container: {
    display: 'flex',
    // gap: '52px',
    '& > .MuiBox-root': {
      margin: '0px 10px',
    },
    padding: '24px',
    width: '100%',
    '@media (max-width: 638.88px)': {
      flexDirection: 'column',
      // gap: '0px',
      '& > .MuiBox-root': {
        margin: '4px 0px',
      },
    },
  },
  modal_avatar_container: {
    '@media (max-width: 638.88px)': {
      padding: '0px',
    },
  },
  modal_avatar: {
    padding: 0,
    marginBottom: '26px',
    border: '7px solid',
    '@media (max-width: 638.88px)': {
      marginBottom: '14px',
      border: '5px solid',
    },
  },
  profile_avatar: {
    padding: 0,
    margin: 0,
    background: 'transparent',
    width: '100px',
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  profile_btn_container: {
    display: 'flex',
    width: '100%',
    maxWidth: '240px',
    gap: '20px',
    margin: '12px',
    marginTop: '16px',
    '@media (max-width: 638.88px)': {
      gap: '10px',
      maxWidth: '84%',
    },
  },
  profile_btn_custom_width: {
    // maxWidth: '492px',
    maxWidth: '300px',
    display: 'flex',
    '@media (max-width: 638.88px)': {
      flexDirection: 'column',
      paddingLeft: '10px ',
      paddingRight: '10px',
    },
  },
  contact_input: {
    marginTop: '22px',
    // '@media (max-width: 638.88px)': {
    //   marginTop: '22px'
    // },
  },
  w_100: {
    width: '100%',
  },
  play_again_button: {
    width: '236px',
    '@media (max-width: 638.88px)': {
      width: '100%',
    },
  },
}));

// const callback = (e) => { return e; };

const TitleBarPaper = ({
  title,
  icon,
  children,
  showButtons,
  yesButtonLabel,
  noButtonLabel,
  callbackYes,
  callbackNo,
  isShupavu,
  callback,
  isGuest, // Destructure the prop here
  premiumCompetition,
}) => {
  const styled = useStyles();
  const { palette, texts } = useTheme();
  // Extract is_subscribed status
  const isSubscribed = premiumCompetition?.is_subscribed === 1;
  let isFreeShupavu = isShupavu && !isGuest && !isSubscribed;
  return (
    <IconPaper
      fullWidth
      iconBg="transparent"
      // title={User.NameResolver()}
      className={styled.profile_container}
    >
      {title && (
        <Grid
          style={{
            background: palette.common.darkBlue,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // padding: '10px',
            height: '56px',
            gap: '12px',
          }}
        >
          <div style={{ width: '45px', paddingTop: '6px' }}>{icon && <img style={{ width: '100%' }} src={icon} alt="icon" />}</div>
          <H3 className={`${styled.title} fredoka-one-400`} fontWeight={typography.fontWeightSemiBold} textAlign="center">
            {title}
          </H3>
        </Grid>
      )}
      {children}
      {showButtons && (
        <Grid className={`${styled.profile_btn_container} ${isFreeShupavu ? styled.profile_btn_custom_width : ''}`}>
          {noButtonLabel && (
            <ButtonBold noTextWrap bgBlue yellowBubble secondaryYellow tag="no" onClick={callbackNo}>
              {noButtonLabel}
            </ButtonBold>
          )}
          {yesButtonLabel && !isFreeShupavu && (
            <ButtonBold
              noTextWrap
              secondaryYellow
              tag="yes"
              {...(isShupavu && !isGuest ? { bgBlue: true, yellowBubble: true } : { yellowBubble: true })}
              onClick={callbackYes}
              className={`${isShupavu ? styled.w_100 : ''} ${isFreeShupavu ? styled.play_again_button : ''}`}
            >
              {isFreeShupavu ? texts.PLAY_AGAIN : yesButtonLabel}
            </ButtonBold>
          )}
          {/* Show "SUBSCRIBE" button only if user is NOT subscribed */}
          {isFreeShupavu && (
            <ButtonBold width="300px" noTextWrap yellowBubble secondaryYellow tag="subscribe" onClick={callback}>
              {texts.SUBSCRIBE_FOR_MORE_GAMES}
            </ButtonBold>
          )}
        </Grid>
      )}
    </IconPaper>
  );
};

export default TitleBarPaper;
