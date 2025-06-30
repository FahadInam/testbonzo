import React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, useTheme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { Button } from 'Components';
import { GoToLastPage, LinkToPath, PageSwitch } from 'Navigation';
import { Body1 } from './Core';
import RightMenu from './Header/HeaderBarMenu';

const useStyles = makeStyles((theme) => ({
  bordered: {
    boxShadow: '3px 0px 6px 0px rgba(0, 0, 0, 0.2)',
  },
  root: {
    background: theme.palette.background.default,
    borderRadius: (props) => (props.topRounded ? `${theme.shape.borderRadius} ${theme.shape.borderRadius} 0 0` : 0),
  },
  menuButton: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginRight: -1 * theme.spacing(2),
    },
    '& .MuiButton-root': {
      color: theme.palette.text.icon,
      background: 'unset',
      width: '100px',
      margin: 0,
      padding: '0px',
      display: 'flex',
      justifyContent: 'start',
      opacity: '1 !important',
      '&:hover': {
        boxShadow: 'unset',
        background: 'unset',
      },
      '&:active': {
        boxShadow: 'unset',
        opacity: '0.5',
      },
      '&:focus': {
        boxShadow: 'unset',
        opacity: '0.5',
      },
      '& .MuiButton-iconSizeMedium > *:first-child': {
        fontSize: '1.5rem',
      },
      '& .MuiTouchRipple-root': {
        display: 'none',
      },
    },
  },
  title: {
    flexGrow: 1,
  },
  coinContainer: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '185px',
    background: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: '2px',
    width: 'auto',
  },
}));

const HeaderBar = React.forwardRef(({ headerSet, trigger, topRounded }, ref) => {
  const { path } = useRouteMatch();
  const { palette, texts } = useTheme();
  const { showRight, showLeft, callback, overrideLeftButton, leftTitle, hideCoins } = headerSet;
  const styled = useStyles({ topRounded });
  const pathRef = LinkToPath(path);
  const history = useHistory();
  // console.log('history', history);
  const localCallback = (e) => {
    const t = e.currentTarget.getAttribute('data-tag');
    switch (t) {
      case 'settings':
        if (callback) callback(e);
        break;
      case 'left-btn':
        if (overrideLeftButton && callback) callback('left-btn');
        else if (pathRef) {
          if (pathRef.backLink === 'goBack') {
            GoToLastPage(history);
          } else PageSwitch(pathRef.backLink);
        } else {
          GoToLastPage(history);
        }
        break;
      default:
        break;
    }
  };

  let backBtnUI = null;

  if (showLeft) {
    let backBtnTitle = null;
    if (pathRef && pathRef.backLink && pathRef.backLink.name) {
      backBtnTitle = texts[pathRef.backLink.name];
    }
    if (leftTitle) {
      backBtnTitle = leftTitle;
    }

    backBtnUI = (
      <Box className={styled.menuButton}>
        <Button mt={3} tag="left-btn" type="submit" onClick={localCallback} startIcon={<i className="i i-left" />}>
          {backBtnTitle && <Body1 color={palette.text.icon}>{backBtnTitle}</Body1>}
        </Button>
      </Box>
    );
  }
  return (
    <AppBar elevation={0} position="static" ref={ref} className={`${styled.root} ${trigger ? styled.bordered : ''}`}>
      <Toolbar>
        {backBtnUI}
        {showRight ? (
          <>
            <Grid item className={styled.title} />
            <RightMenu hideCoins={hideCoins} />
          </>
        ) : null}
      </Toolbar>
    </AppBar>
  );
});

export default HeaderBar;
