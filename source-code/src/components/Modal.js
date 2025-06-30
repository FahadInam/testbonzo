import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles, IconButton, Box, useTheme, Grid } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import { Body1, H3 } from 'Components/Core/Typography';
import Blocker from './Blocker';
import Paper from './Paper';
import { Cordova } from 'Utils';
import ButtonBold from './Core/ButtonBold';
import { StarView } from './Layouts';
import { IMAGES } from 'Constants';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    height: '100%',
    width: '100vw',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: '100vh',
    display: 'flex',
    left: 0,
    top: 0,
    padding: theme.spacing(2),
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  modalBox: {
    position: 'relative',
    width: '100%',
    paddingTop: theme.spacing(5.5),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
      maxWidth: (props) => (props.fullWidth ? null : '590px'),
    },
  },
  modalBox2: {
    position: 'relative',
    width: '100%',
    paddingTop: '0px',
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
      maxWidth: (props) => (props.fullWidth ? null : '590px'),
    },
  },
  selectionModalBox: {
    position: 'relative',
    width: '100%',
    height: '100%',
    // paddingTop: theme.spacing(5.5),
    paddingTop: theme.spacing(1),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
      maxWidth: (props) => (props.fullWidth ? null : '590px'),
    },
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(0),
    },
  },
  circle: {
    height: theme.spacing(13),
    width: theme.spacing(13),
    borderRadius: '50%',
    background: (props) => props.iconBg || theme.palette.secondary.main,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    margin: '0 auto',
    top: theme.spacing(1),
    position: 'absolute',
    zIndex: 2,
    left: '50%',
    marginLeft: theme.spacing(-6.5),
    color: theme.palette.common.white,
    fontSize: '52px',
  },
  fgBox: {
    width: '100%',
    height: '100%',
    padding: '0px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(2),
    },
  },
  fgBox2: {
    width: '100%',
    height: '100%',
    padding: '0px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: theme.spacing(1),
    margin: '24px auto',
  },
  paper: {
    width: '100%',
    // padding: props =>
    //   typeof props.p !== 'undefined' ? theme.spacing(props.p) : theme.spacing(5, 3),
    paddingLeft: (props) => (typeof props.pl !== 'undefined' ? theme.spacing(props.pl) : null),
    paddingRight: (props) => (typeof props.pr !== 'undefined' ? theme.spacing(props.pr) : null),
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.palette.common.white,
    [theme.breakpoints.up('sm')]: {
      maxWidth: '590px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '95%',
    },
  },
  fixedWidth: {
    minWidth: '288px',
    maxWidth: '400px',
  },
  close: {
    position: 'absolute',
    top: (props) => theme.spacing(props.icon ? 7 : 1.25),
    right: theme.spacing(1),
    color: theme.palette.grey['300'],
    fontSize: '20px',
    zIndex: 2,
    // border: '1px solid red',
  },
  close_cross: {
    position: 'absolute',
    cursor: 'pointer',
    top: '16px',
    right: '20px',
    color: theme.palette.grey['300'],
    fontSize: '20px',
    zIndex: 2,
    // border: '1px solid red',
  },
  iconLeft: {
    right: 'auto',
    left: theme.spacing(1),
  },
  title: {
    fontSize: '18px',
    color: 'white',
  },
  profile_btn_container: {
    display: 'flex',
    width: '100%',
    maxWidth: '440px',
    gap: '20px',
    // marginBottom: '24px',
    '@media (max-width: 638.88px)': {
      gap: '10px',
      maxWidth: '84%',
    },
  },
  accountSetting: {
    margin: 0,
    height: '100%',
    width: '100vw',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: '100vh',
    display: 'flex',
    left: 0,
    top: 0,
    overflowX: 'hidden',
    overflowY: 'auto',
    background: 'radial-gradient(circle, rgba(28, 156, 249, 1) 0%, rgba(9, 86, 172, 1) 100%)',
  },
  selection_paper_header: {
    background: theme.palette.grey['220'],
    //padding: theme.spacing(2),
    height: '56px',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    color: '#ffffff',
    zIndex: 1,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      //padding: '8px',
      height: '56px',
    },
  },
  selection_paper_headerTextHeadings: {
    background: theme.palette.grey['220'],
    padding: '16px 20px',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    display: 'flex',
    color: '#fffff',
    zIndex: 1,
  },
  selection_paper_headerHeadingsTitle: {
    // padding: '6px 20px',
    color: '#ffffff',
    whiteSpace: 'nowrap' /* Prevents the text from wrapping */,
    overflow: 'hidden' /* Ensures that the overflow is hidden */,
    textOverflow: 'ellipsis' /* Adds the ellipsis */,
    width: '100%' /* Ensures the element takes up the full width of its container */,
    display: 'block' /* Ensures the element behaves as a block */,
  },
  modeTitleIcon: {
    width: '45px',
    marginRight: '15px',
    [theme.breakpoints.down('md')]: {
      width: '32px',
    },
  },
}));

export const Modal = ({ children, isVisible, callback, isMandatory }) => {
  const styled = useStyles();
  const localCallback = (e) => {
    if (e.target === e.currentTarget && callback && !isMandatory) callback(e);
  };

  return ReactDOM.createPortal(
    <Fade in={isVisible} mountOnEnter unmountOnExit>
      <Blocker className={styled.root} callback={localCallback}>
        {children}
      </Blocker>
    </Fade>,
    document.getElementById('root')
  );
};

export const AccountModal = ({ children, isVisible, callback, isMandatory }) => {
  const styled = useStyles();
  const localCallback = (e) => {
    // console.log(e);
    if (e.target === e.currentTarget && callback && !isMandatory) callback(e);
  };

  return ReactDOM.createPortal(
    <Fade in={isVisible} mountOnEnter unmountOnExit>
      <Blocker className={styled.accountSetting} callback={localCallback}>
        <StarView showGradient showHeader callback={localCallback}>
          {children}
        </StarView>
      </Blocker>
    </Fade>,
    document.getElementById('root')
  );
};

export const ConfirmationBox = ({ children, callback, direction, isVisible, className, allowClose, ...style }) => {
  const styled = useStyles(style);
  const localCallback = (e) => {
    if (callback) callback(e);
  };

  return (
    <Slide direction={direction || 'down'} in={isVisible} mountOnEnter unmountOnExit>
      <Paper className={`${styled.paper} ${className || ''}`}>
        {allowClose && (
          <IconButton data-tag="close" className={styled.close} onClick={localCallback}>
            <i className="i i-cross" />
          </IconButton>
        )}
        {children}
      </Paper>
    </Slide>
  );
};

export const ModalBox = ({
  children,
  child2,
  callback,
  addCodeIcon,
  direction,
  isVisible,
  ADD_CODE,
  allowClose,
  hideCross,
  title_bg,
  fixWidth,
  titleClose,
  fullWidth,
  maxWidth,
  title,
  icon,
  footer,
  rightIcon,
  xIconBold,
  className,
  ...style
}) => {
  const localCallback = (e) => {
    if (callback) callback(e);
  };
  return (
    <Modal isVisible={isVisible} callback={callback} isMandatory={!allowClose}>
      <Slide direction={direction || 'down'} in={isVisible} mountOnEnter unmountOnExit>
        <IconPaper
          callback={localCallback}
          allowClose={allowClose}
          hideCross={hideCross}
          titleClose={titleClose}
          title_bg={title_bg}
          fixWidth={fixWidth}
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          title={title}
          ADD_CODE={ADD_CODE}
          rightIcon={rightIcon}
          footer={footer}
          icon={icon}
          addCodeIcon={addCodeIcon}
          className={className}
          style={style}
          child2={child2}
          xIconBold={xIconBold}
        >
          {children}
        </IconPaper>
      </Slide>
    </Modal>
  );
};

export const IconPaper = React.forwardRef(
  (
    {
      allowClose,
      title_bg,
      hideCross,
      addCodeIcon,
      ADD_CODE,
      fixWidth,
      title,
      icon,
      className,
      callback,
      children,
      rightIcon,
      leftIcon,
      style,
      fullWidth,
      maxWidth,
      iconBg,
      footer,
      child2,
      xIconBold,
      titleClose,
    },
    ref
  ) => {
    const styled = useStyles({ ...style, icon, fullWidth, iconBg });
    const { palette, typography, texts } = useTheme();
    return (
      <Box
        style={{ maxWidth: maxWidth ?? '' }}
        ref={ref}
        className={`${child2 ? styled.modalBox2 : styled.modalBox}  ${fixWidth ? styled.fixedWidth : ''}`}
      >
        {icon && !child2 && <Box className={styled.circle}>{typeof icon === 'string' ? <i className={`i i-${icon}`} /> : icon}</Box>}
        <Paper className={`${child2 ? styled.fgBox2 : styled.fgBox} ${className || ''}`}>
          {(title === texts.SYSTEM_MSG || xIconBold) && (
            <Box data-tag="close" onClick={callback} className={styled.close_cross}>
              <img width={20} height={20} src={Cordova.Path(IMAGES.CROSS_ICON)} alt="icon" />
            </Box>
          )}
          {rightIcon && <Box className={styled.close}>{rightIcon}</Box>}
          {leftIcon && <Box className={`${styled.close} ${styled.iconLeft}`}>{leftIcon}</Box>}

          {allowClose && !hideCross && !titleClose && title !== texts.SYSTEM_MSG && (
            <IconButton data-tag="close" className={styled.close} onClick={callback}>
              <i className="i i-cross" />
            </IconButton>
          )}
          {allowClose && !hideCross && titleClose && title !== texts.SYSTEM_MSG && (
            <IconButton data-tag="close" className={styled.close} onClick={callback}>
              <svg width="19" height="19" viewBox="0 0 19 19" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18.2985 0.701504C18.078 0.479221 17.8157 0.30279 17.5267 0.182389C17.2377 0.0619882 16.9278 0 16.6147 0C16.3016 0 15.9916 0.0619882 15.7026 0.182389C15.4136 0.30279 15.1513 0.479221 14.9309 0.701504L9.5 6.1561L4.06912 0.701504C3.62255 0.25493 3.01686 0.00404757 2.38531 0.00404758C1.75376 0.00404759 1.14808 0.25493 0.701504 0.701504C0.254929 1.14808 0.00404759 1.75376 0.00404758 2.38531C0.00404757 3.01686 0.25493 3.62255 0.701504 4.06912L6.1561 9.5L0.701504 14.9309C0.479221 15.1513 0.30279 15.4136 0.182389 15.7026C0.0619882 15.9916 0 16.3016 0 16.6147C0 16.9278 0.0619882 17.2377 0.182389 17.5267C0.30279 17.8157 0.479221 18.078 0.701504 18.2985C0.921971 18.5208 1.18427 18.6972 1.47327 18.8176C1.76226 18.938 2.07224 19 2.38531 19C2.69839 19 3.00836 18.938 3.29736 18.8176C3.58636 18.6972 3.84865 18.5208 4.06912 18.2985L9.5 12.8439L14.9309 18.2985C15.1513 18.5208 15.4136 18.6972 15.7026 18.8176C15.9916 18.938 16.3016 19 16.6147 19C16.9278 19 17.2377 18.938 17.5267 18.8176C17.8157 18.6972 18.078 18.5208 18.2985 18.2985C18.5208 18.078 18.6972 17.8157 18.8176 17.5267C18.938 17.2377 19 16.9278 19 16.6147C19 16.3016 18.938 15.9916 18.8176 15.7026C18.6972 15.4136 18.5208 15.1513 18.2985 14.9309L12.8439 9.5L18.2985 4.06912C18.5208 3.84865 18.6972 3.58636 18.8176 3.29736C18.938 3.00836 19 2.69839 19 2.38531C19 2.07224 18.938 1.76226 18.8176 1.47327C18.6972 1.18427 18.5208 0.921971 18.2985 0.701504Z"
                  fill="white"
                />
              </svg>
            </IconButton>
          )}

          {title && ADD_CODE && (
            <Grid
              style={{
                background: title_bg ?? '#00A3FF',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '8px',
                gap: '12px',
              }}
            >
              {addCodeIcon && (
                <img
                  style={{ background: ADD_CODE && '', borderRadius: ADD_CODE && '' }}
                  width={40}
                  height={40}
                  src={Cordova.Path(addCodeIcon)}
                  alt="icon"
                />
              )}
              <H3
                className={styled.title}
                color={palette.secondary.main}
                fontWeight={typography.fontWeightSemiBold}
                textAlign="center"
              >
                {title}
              </H3>
            </Grid>
          )}
          {title && !ADD_CODE && (
            <H3 color={palette.secondary.main} fontWeight={typography.fontWeightSemiBold} mb={3} textAlign="center">
              {title}
            </H3>
          )}
          {children}
          {footer && (
            <Grid
              style={{
                background: '#fff',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '14px',
                gap: '12px',
                // borderTop: '4px solid black',
              }}
            >
              <Grid className={styled.profile_btn_container}>
                <ButtonBold bgBlue yellowBubble secondaryYellow tag="close" onClick={callback}>
                  {texts.CANCEL}
                </ButtonBold>
                <ButtonBold yellowBubble secondaryYellow tag="saveAvatar" onClick={callback}>
                  {texts.SAVE}
                </ButtonBold>
              </Grid>
            </Grid>
          )}
        </Paper>
        {child2 && <Paper className={`${child2 ? styled.fgBox2 : styled.fgBox} ${className || ''}`}>{child2}</Paper>}
      </Box>
    );
  }
);

export const SelectionPaper = React.forwardRef(
  (
    {
      allowClose,
      title_bg,
      hideCross,
      addCodeIcon,
      ADD_CODE,
      fixWidth,
      title,
      icon,
      className,
      callback,
      children,
      rightIcon,
      leftIcon,
      style,
      fullWidth,
      maxWidth,
      iconBg,
      footer,
    },
    ref
  ) => {
    const styled = useStyles({ ...style, icon, fullWidth, iconBg });
    // const { palette, typography } = useTheme();
    return (
      <Box
        style={{ maxWidth: maxWidth ?? '' }}
        ref={ref}
        className={`${styled.modalBox}  ${styled.selectionModalBox} ${fixWidth ? styled.fixedWidth : ''}`}
      >
        <Paper className={`${styled.fgBox} ${className || ''}`}>
          {icon && (
            <Box className={styled.selection_paper_header}>
              <img src={Cordova.Path(icon)} alt="icon" className={styled.modeTitleIcon} />
              <Body1 className="paper_header_title fredoka-one-400">{title}</Body1>
            </Box>
          )}
          {rightIcon && <Box className={styled.close}>{rightIcon}</Box>}
          {leftIcon && <Box className={`${styled.close} ${styled.iconLeft}`}>{leftIcon}</Box>}

          {allowClose && !hideCross && (
            <IconButton data-tag="close" className={styled.close} onClick={callback}>
              <i className="i i-cross" />
            </IconButton>
          )}

          {children}
          {footer && (
            <Grid
              style={{
                background: '#fff',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '12px',
                gap: '12px',
                borderTop: '4px solid black',
              }}
            >
              <Grid className={styled.profile_btn_container}>
                <ButtonBold bgBlue yellowBubble secondaryYellow tag="close" onClick={callback}>
                  {'Cancel'}
                </ButtonBold>
                <ButtonBold
                  yellowBubble
                  secondaryYellow
                  // tag="AvatarIcon" onClick={callback}
                >
                  {'Save'}
                </ButtonBold>
              </Grid>
            </Grid>
          )}
        </Paper>
      </Box>
    );
  }
);
