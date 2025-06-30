import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { isString } from 'Utils';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.common.white,
  },
  add_btn: {
    width: '100%',
    margin: '0',
    height: 'auto',
    color: 'black',
    border: '2px solid black',
    boxShadow: `${theme.palette.warning.dark} -12px -20px 0px -12px inset, ${theme.palette.warning.dark} 12px -20px 0px -12px inset`,
    position: 'relative',
    '@media (max-width: 638.88px)': {
      // padding: '6px 24px 12px 24px',
    },
    background: `linear-gradient(to top, #FFC700, #FFED48)`,
    '&:hover': {
      background: `linear-gradient(to top, #FFC700, #FFED48)`,
      boxShadow: `${theme.palette.warning.dark} -7px -18px 0px -12px inset, ${theme.palette.warning.dark} 7px -18px 0px -12px inset`,
      '&:before': {
        boxShadow: '#000 0px 7px 2px -1px',
      },
    },
    '&:before': {
      content: "''",
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '7px',
      boxShadow: '#000 0px 6px 2px -1px',
    },
  },
  claim_cert_btn: {
    background: 'linear-gradient(180deg, #B2B2B2 0.29%, #E5E5E5 100.4%)',
    boxShadow: `#A3A3A3 -11.5px -18px 0px -12px inset, 
    #A3A3A3 11.5px -18px 0px -12px inset !important`,
    color: '#000 !important',
    fontFamily: 'Fredoka',
    fontSize: '24.697px',
    fontWeight: 600,
    cursor: 'default',
    letterSpacing: '0.494px',
    textShadow: 'none !important',
    '&:hover': {
      background: 'linear-gradient(180deg, #B2B2B2 0.29%, #E5E5E5 100.4%)',
      boxShadow: `#A3A3A3 -11.5px -18px 0px -12px inset, 
      #A3A3A3 11.5px -18px 0px -12px inset !important`,
    },
  },
  web_btn: {
    display: 'block',
    '@media (max-width: 638.88px)': {
      display: 'none',
    },
  },
  mobile_btn: {
    display: 'none',
    '@media (max-width: 638.88px)': {
      display: 'block',
    },
  },
  secondary_yellow_small_font: {
    fontSize: '18px!important',

    '@media (max-width: 638.88px)': {
      fontSize: '14px!important',
    },
  },
  secondary_yellow: {
    borderRadius: '10px',
    borderBottomRightRadius: '5px',
    borderBottomLeftRadius: '5px',
    margin: '0',
    color: 'white',
    textShadow:
      'rgb(0, 0, 0) 2px 0px 0px, rgb(0, 0, 0) 1.75517px 0.958851px 0px, rgb(0, 0, 0) 1.0806px 1.68294px 0px, rgb(0, 0, 0) 0.141474px 1.99499px 0px, rgb(0, 0, 0) -0.832294px 1.81859px 0px, rgb(0, 0, 0) -1.60229px 1.19694px 0px, rgb(0, 0, 0) -1.97998px 0.28224px 0px, rgb(0, 0, 0) -1.87291px -0.701566px 0px, rgb(0, 0, 0) -1.30729px -1.5136px 0px, rgb(0, 0, 0) -0.421592px -1.95506px 0px, rgb(0, 0, 0) 0.567324px -1.91785px 0px, rgb(0, 0, 0) 1.41734px -1.41108px 0px, rgb(0, 0, 0) 1.92034px -0.558831px 0px, 0px 3px 0px rgba(0,0,0,1), -2px 3px 0px rgba(0,0,0,1), 2px 3px 0px rgba(0,0,0,1)',
    fontSize: '22px',
    fontWeight: 600,
    border: '1px solid black',
    padding: '4px 22px 8px 22px',
    boxShadow: `${theme.palette.warning.dark} -11.5px -18px 0px -12px inset, 
                ${theme.palette.warning.dark} 11.5px -18px 0px -12px inset`,
    '&:before': {
      boxShadow: '#000 0px 3px 0px 0px',
    },
    '&:active': {
      transition: 'all .05s ease-out',
      padding: '4px 22px 4px 22px',
      boxShadow: 'none !important',
      transform: 'translateY(4px)',
      '@media (max-width: 638.88px)': {
        padding: '4.5px 22px 4.5px 22px',
      },
    },
    '&:hover': {
      transition: 'all .05s ease-out',
      boxShadow: `${theme.palette.warning.dark} -11.5px -18px 0px -12px inset, 
      ${theme.palette.warning.dark} 11.5px -18px 0px -12px inset`,
      '&:before': {
        boxShadow: '#000 0px 3px 0px 0px',
      },
    },
    '@media (max-width: 638.88px)': {
      padding: '4.5px 22px 9px 22px',
      fontWeight: 600,
      fontSize: '18px',
      // boxShadow: `${theme.palette.warning.dark} -12px -19px 0px -12px inset, ${theme.palette.warning.dark} 12px -19px 0px -12px inset`,
      '&:active': {
        transition: 'all .05s ease-out',
        padding: '4.5px 22px 4.5px 22px',
        boxShadow: 'none',
      },
    },
  },
  noTranslate: {
    '&:active': {
      // transform: "translateY(0px)"
    },
  },
  btn_container: {
    width: '100%',
    boxShadow: '#7f7f7f 0px 7px 0px 0px',
    borderRadius: '12px',
    borderBottomRightRadius: '10px',
    borderBottomLeftRadius: '10px',
    height: '53px',
    '@media (max-width: 638.88px)': {
      height: '48px',
      boxShadow: '#7f7f7f 0px 6px 0px 0px',
    },
  },
  btn_container_small: {
    width: '100%',
    maxWidth: '110px',
    // boxShadow: '#7f7f7f 0px 5px 0px 0px',
    borderRadius: '12px',
    borderBottomRightRadius: '10px',
    borderBottomLeftRadius: '10px',
    height: '40px',
    '@media (max-width: 638.88px)': {
      height: '32px',
      maxWidth: '100px',
      // boxShadow: '#7f7f7f 0px 6px 0px 0px',
    },
  },
  noShadow: {
    // boxShadow: '#7f7f7f 0px 7px 0px 0px',
    borderRadius: '12px',
    borderBottomRightRadius: '10px',
    borderBottomLeftRadius: '10px',
    boxShadow: 'none !important',
    // height: "auto !important",
    width: '80px',
    height: '40px',
    // '@media (max-width: 638.88px)': {
    //   boxShadow: '#7f7f7f 0px 6px 0px 0px',
    // },
  },
  blackShadow: {
    boxShadow: 'rgba(0, 0, 0, 0.5) 0px 7px 0px 0px',
    '@media (max-width: 638.88px)': {
      boxShadow: 'rgba(0, 0, 0, 0.5) 0px 6px 0px 0px',
    },
  },
  bg_blue: {
    background: `linear-gradient(to top, #09B5FF, #40E8FF)`,
    boxShadow: `#0074DE -11.5px -18px 0px -12px inset, 
                #0074DE 11.5px -18px 0px -12px inset`,
    '&:hover': {
      background: `linear-gradient(to top, #09B5FF, #40E8FF)`,
      boxShadow: `#0074DE -11.5px -18px 0px -12px inset, 
      #0074DE 11.5px -18px 0px -12px inset`,
    },
    '&:active': {
      transition: 'all .05s ease-out',
      boxShadow: 'none',
    },
  },
  notificationButton: {
    height: '100% !important',
    fontSize: '16px !important',
    width: '108px !important',
  },
  rejectButton: {
    boxShadow: `#0074DE -10px -15px 0px -15px inset, #0074DE 4px -15px 0px -12px inset !important`,
  },
  acceptButton: {
    boxShadow: `#f57c00 -10px -15px 0px -15px inset, #f57c00 4px -15px 0px -12px inset !important`,
  },
  noTextWrap: {
    whiteSpace: 'nowrap',
  },
}));

const ButtonBold = React.memo((props) => {
  const style = useStyles(props);
  const {
    children,
    variant,
    tag,
    onClick,
    size,
    className,
    disabled,
    endIcon,
    startIcon,
    type,
    styleCSS,
    yellowBubble,
    webBtn,
    mobileBtn,
    hideBubble,
    secondaryYellow,
    bgBlue,
    noTranslate,
    blackShadow,
    noShadow,
    notificationButton,
    rejectButton,
    acceptButton,
    smallContainer,
    noTextWrap,
    hideBtn,
    isClaimCert,
    data_sid,
  } = props;

  const dataSid = data_sid ? data_sid.toLowerCase() : isString(children) ? children.toLowerCase() : '';
  // const dataSid = data_sid
  // ? data_sid.toLowerCase()
  // : isString(children?.props?.children)
  // ? children.props.children.toLowerCase()
  // : isString(children)
  // ? children.toLowerCase()
  // : '';

  return (
    <Box
      style={{ opacity: hideBtn ? '0' : '' }}
      className={`${smallContainer ? style.btn_container_small : style.btn_container}  ${blackShadow && style.blackShadow}
      ${webBtn && style.web_btn} ${mobileBtn && style.mobile_btn}  ${noShadow && style.noShadow} ${noTextWrap && style.noTextWrap}
    `}
    >
      <Button
        disabled={disabled}
        variant={variant || 'contained'}
        data-sid={dataSid}
        size={size}
        type={type}
        data-tag={tag}
        onClick={onClick}
        endIcon={endIcon}
        startIcon={startIcon}
        className={`sButton ${className || ''} ${style.root} ${yellowBubble ? style.blackBorder : ''} ${yellowBubble && style.add_btn} 
        ${secondaryYellow && style.secondary_yellow} ${secondaryYellow && smallContainer && style.secondary_yellow_small_font}
        ${bgBlue && style.bg_blue} ${noTranslate && style.noTranslate} ${notificationButton && style.notificationButton} 
        ${rejectButton && style.rejectButton} ${acceptButton && style.acceptButton} ${isClaimCert && style.claim_cert_btn} 
      `}
        style={styleCSS}
      >
        {yellowBubble && !hideBubble && (
          <>
            <span
              style={{
                background: 'white',
                borderRadius: '12px',
                width: '20px',
                height: '5px',
                position: 'absolute',
                top: '1px',
                right: '14px',
              }}
            ></span>
            <span
              style={{
                background: 'white',
                borderRadius: '12px',
                width: '5px',
                height: '5px',
                position: 'absolute',
                top: '1px',
                right: '6px',
              }}
            ></span>
          </>
        )}
        {children}
      </Button>
    </Box>
  );
});

export default ButtonBold;
