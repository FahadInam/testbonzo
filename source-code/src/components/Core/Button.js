import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, CardMedia } from '@material-ui/core';
import { Body1 } from './Typography';
import { isString } from 'Utils';

const useStyles = makeStyles((theme) => ({
  threeColsBtn: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
  lColBtn: {
    width: '100%',
    textAlign: 'end',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  midColBtn: {
    minWidth: '190px',
    textAlign: 'center',
    margin: 'auto',
  },
  rColBtn: {
    width: '100%',
    textAlign: 'start',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  simpleText: {
    fontSize: '24.7px!important',
    fontWeight: '600!important',
    fontFamily: 'Fredoka!important',
    '&.MuiButton-root': {
      fontSize: '24.7px!important',
      fontWeight: '600!important',
      fontFamily: 'Fredoka!important',
    },
    '&.MuiButton-label': {
      fontSize: '24.7px!important',
      fontWeight: '600!important',
      fontFamily: 'Fredoka!important',
    },
  },
  root: {
    // borderRadius: theme.shape.borderRadius,
    borderRadius: (props) => props.borderRadius || 15,
    width: (props) => props.width || 244,
    height: (props) => props.height || 48,
    maxWidth: '100%',
    minWidth: (props) => props.minWidth || null,
    color: (props) => props.color || theme.palette.common.white,
    padding: (props) => props.p && theme.spacing(props.p),
    whiteSpace: 'nowrap',
    border: (props) => props.border || null,

    paddingTop: (props) => (typeof props.pt !== 'undefined' ? theme.spacing(props.pt) : null),
    paddingBottom: (props) => (typeof props.pb !== 'undefined' ? theme.spacing(props.pb) : null),
    paddingLeft: (props) => (typeof props.pl !== 'undefined' ? theme.spacing(props.pl) : null),
    paddingRight: (props) => (typeof props.pr !== 'undefined' ? theme.spacing(props.pr) : null),

    margin: (props) => (typeof props.m === 'undefined' ? theme.spacing(1) : theme.spacing(props.m)),

    marginTop: (props) => props.mt && theme.spacing(props.mt),
    marginRight: (props) => props.mr && theme.spacing(props.mr),
    marginBottom: (props) => props.mb && theme.spacing(props.mb),
    marginLeft: (props) => props.ml && theme.spacing(props.ml),
    fontWeight: (props) => props.fontWeight || null,
    float: (props) => props.float || 'none',
    flexShrink: 0,
    boxShadow: 'unset',
    background: (props) => (props.variant !== 'outlined' ? props.background || theme.palette.secondary.main : null),
    '&:hover': {
      background: (props) => props.background || theme.palette.secondary.main,
      // background: (props) => props.background || theme.palette.primary.blueBonzo,
      boxShadow: (props) =>
        props.variant !== 'text'
          ? '0px 1px 3px -1px rgba(0, 0, 0, 0.1), 0px 2px 3px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
          : null,
    },
    '&:active': {
      background: (props) => props.background || theme.palette.secondary.main,
      // background: (props) => props.background || theme.palette.primary.blueBonzo,
    },
    '& .MuiButton-label': {
      transform: 'translate3d(0,0,0)',
    },
  },
  blackBorder: {
    // border: '3px solid red',
  },
  icon: {
    color: theme.palette.common.white,
  },
}));

// useStyles2 used for CardButton component
const useStyles2 = makeStyles((theme) => ({
  imageStyle: {
    width: (props) => props.imageWidth || '100px',
    // margin: 'auto',
    objectFit: 'contain',
    paddingLeft: (props) => (props.imageAlign === 'left' ? '16px' : '0'),
    marginLeft: (props) => (props.imageAlign === 'left' ? 0 : 'auto'),
    marginRight: (props) => (props.imageAlign === 'right' ? 0 : 'auto'),
    paddingBottom: (props) => props.pb || '0',
    // display: 'block',
    // textAlign: (props) => props.imageAlign || 'center',
  },
  cardStyle: {
    // maxWidth: 345,
    width: (props) => props.cardWidth || '100%',
    height: (props) => props.height,
    margin: (props) => props.margin,
    boxShadow: (props) =>
      props.disableShadow ? 'none !important' : `0px 10px 0px -3px ${props.shadowColor || 'rgba(2,187,254,0.35)'}`,
    border: (props) =>
      props.disableShadow ? `1.3px solid  ${props.borderColor || '#DEDEDE'}` : `2px solid ${props.borderColor || '#DEDEDE'}`,
    transition: 'box-shadow 0.3s ease',
    background: (props) => props.background || '#ffffff',
    // '&:hover': {
    //   background: '#ffffff',
    // },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '&:hover': {
      background: '#ECFAFF',
      borderColor: '#02BBFE !important',
    },
  },
  titleStyle: {
    fontSize: '20px',
    [theme.breakpoints.down('md')]: {
      fontSize: '18px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
    },
  },
  contentStyle: {
    paddingTop: (props) => props.pt || '16px',
  },
  cardActionArea: {
    '& .MuiCardActionArea-focusHighlight': {
      backgroundColor: 'transparent',
    },
  },
  userSelectionCardStyle: {
    borderColor: '#DEDEDE !important',
    background: '#ffffff',
    '&:hover': {
      background: '#ECFAFF',
      borderColor: '#02BBFE !important',
    },
    '& $cardActionArea': {
      display: 'flex !important',
      justifyContent: 'space-evenly',
      minHeight: '190px',
      '& $imageStyle': {
        height: 'auto',
        margin: '15px auto',
        [theme.breakpoints.down('sm')]: {
          width: '85px',
        },
      },
      [theme.breakpoints.down('sm')]: {
        display: 'block !important',
      },
    },
  },
  userSelectionCardTextStyle: {
    display: 'flex',
    flexDirection: 'column',
    width: '55%',
    paddingRight: '35px',
    textAlign: 'left',
    padding: '0',
    '& $titleStyle': {
      fontSize: '24px',
      textTransform: 'uppercase',
      marginBottom: '5px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '20px',
      },
    },
    [theme.breakpoints.down('sm')]: {
      // display: 'block',
      padding: '10px 15px',
      width: '100%',
      textAlign: 'center',
    },
  },
  tagLineTextStyle: {
    paddingRight: '5px',
    [theme.breakpoints.down('sm')]: {
      paddingRight: '0px',
      paddingBottom: '10px',
    },
  },
}));

const MButton = React.memo((props) => {
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
    // webBtn,
    // mobileBtn,
    secondaryYellow,
    // thirdYellow,
    fixedWidthIcon,
    data_sid,
  } = props;
  // ${yellowBubble && style.add_btn}
  // ${webBtn && style.web_btn} ${mobileBtn && style.mobile_btn}
  // ${secondaryYellow && style.secondary_yellow}`}
  // console.log('children', children?.props?.children);

  const dataSid = data_sid
    ? data_sid.toLowerCase()
    : isString(children?.props?.children)
    ? children.props.children.toLowerCase()
    : isString(children)
    ? children.toLowerCase()
    : '';
  return (
    <Button
      disabled={disabled}
      variant={variant || 'contained'}
      size={size}
      type={type}
      data-tag={tag}
      onClick={onClick}
      endIcon={!fixedWidthIcon && endIcon}
      startIcon={!fixedWidthIcon && startIcon}
      className={`sButton ${className || ''} ${style.root} ${yellowBubble ? style.blackBorder : ''}`}
      style={styleCSS}
      // data-sid={data_sid}
      data-sid={dataSid}
    >
      {yellowBubble && !secondaryYellow && (
        <>
          <span
            style={{
              background: 'white',
              borderRadius: '12px',
              width: '20px',
              height: '5px',
              position: 'absolute',
              top: '-6px',
              right: '2px',
            }}
          ></span>
          <span
            style={{
              background: 'white',
              borderRadius: '12px',
              width: '5px',
              height: '5px',
              position: 'absolute',
              top: '-6px',
              right: '-6px',
            }}
          ></span>
        </>
      )}
      {!fixedWidthIcon && children}
      {fixedWidthIcon && (
        <div className={style.threeColsBtn}>
          <div className={style.lColBtn}>{startIcon || ' '}</div>
          <div className={style.midColBtn}>{children}</div>
          <div className={style.rColBtn}>{endIcon || ' '}</div>
        </div>
      )}
    </Button>
  );
});

export default MButton;

export const InlineButton = React.memo(({ children, tag, onClick, className, p, data_sid, styleCSS }) => {
  const { palette } = useTheme();
  return (
    <MButton
      variant="text"
      background="transparent"
      tag={tag}
      onClick={onClick}
      color={palette.common.lightBlue}
      width="unset"
      height="unset"
      p={typeof p !== 'undefined' ? p : 0.5}
      m={0}
      className={className || ''}
      data_sid={data_sid}
      styleCSS={styleCSS}
    >
      {children}
    </MButton>
  );
});

export const OutlinedButton = ({
  children,
  tag,
  onClick,
  endIcon,
  className,
  startIcon,
  width,
  borderRadius,
  fixedWidthIcon = false,
  data_sid,
}) => {
  const { palette } = useTheme();
  return (
    <MButton
      variant="outlined"
      background="transparent"
      border={`2px solid ${palette.grey['300']}`}
      tag={tag}
      onClick={onClick}
      color={palette.grey['400']}
      endIcon={endIcon}
      startIcon={startIcon}
      className={className}
      width={width}
      borderRadius={borderRadius}
      m={0}
      fixedWidthIcon={fixedWidthIcon}
      data_sid={data_sid}
    >
      {children}
    </MButton>
  );
};

export const RoundedIconButton = ({ tag, onClick, iconName, className, background }) => {
  return (
    <IconButton
      data-tag={tag}
      onClick={onClick}
      className={`${className}`}
      style={{
        color: 'white',
        backgroundColor: background,
        padding: '12px',
        margin: '0!important',
        width: '44px!important',
        height: '44px!important',
      }}
    >
      <i className={`${iconName}`} />
    </IconButton>
  );
};

export const CardButton = ({
  tag,
  imageUrl,
  title,
  titleTagLine,
  userSelectionCard,
  onClick,
  titleCenter,
  imageWidth,
  shadowColor,
  background,
  borderColor,
  imageAlign,
  cardWidth,
  height,
  margin,
  pt,
  pb,
  disableShadow,
}) => {
  const classes = useStyles2({
    imageWidth,
    shadowColor,
    background,
    borderColor,
    imageAlign,
    cardWidth,
    height,
    margin,
    pt,
    pb,
    disableShadow,
  });
  return (
    <Card
      className={`${classes.cardStyle} ${userSelectionCard ? classes.userSelectionCardStyle : ''} sButton`}
      onClick={onClick}
      data-tag={tag}
      data-sid={tag ?? ''}
    >
      <CardActionArea className={classes.cardActionArea}>
        <CardMedia className={classes.imageStyle} component="img" height="130" image={imageUrl} alt="Image" />
        {!titleTagLine && (
          <CardContent className={classes.contentStyle} align={titleCenter ? 'center' : 'left'}>
            <Body1 color="#494D61" fontWeight="600" className={classes.titleStyle}>
              {title}
            </Body1>
          </CardContent>
        )}
        {titleTagLine && (
          <CardContent className={classes.userSelectionCardTextStyle}>
            <Body1 color="#494D61" fontWeight="600" className={classes.titleStyle}>
              {title}
            </Body1>
            <Body1 className={`${classes.tagLineTextStyle} poppins-font-400`} fontSize="14px" color="#777777">
              {titleTagLine}
            </Body1>
          </CardContent>
        )}
      </CardActionArea>
    </Card>
  );
};
