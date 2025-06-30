import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { H1 } from './Typography';
import { Cordova } from 'Utils';

const useStyles = makeStyles((theme) => ({
  title_container: {
    maxWidth: '1000px',
    margin: 'auto',
    marginTop: '12px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (max-width: 638.88px)': {
      gap: '2px',
      // textShadow:
      //   '-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black, 0px 2px 2px rgba(0, 0, 0, 0.22), 0px 4px 2px rgba(0, 0, 0, 0.22), 0px 4px 2px rgba(0, 0, 0, 0.22)',
    },
    // textShadow:
    //   ' -3px -3px 0 black, 3px -3px 0 black, -3px 3px 0 black, 3px 3px 0 black, 0px 8px 2px rgba(0, 0, 0, 0.22), 0px 8px 2px rgba(0, 0, 0, 0.22), 0px 8px 2px rgba(0, 0, 0, 0.22)', // old text shadow
    // textShadow:
    //   '2px 2px 0 black, -1px 2px 0 black, 2px -2px 0 black, -2px -2px 0 black, 2px 0 0 black, -2px 0 0 black, 0 2px 0 black, 0 -2px 0 black, 0px 6px 1px rgba(0,0,0,0.50)', // new text shadow
  },
  title_container_no_margins: {
    maxWidth: '1000px',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
    // textShadow:
    //   ' -3px -3px 0 black, 3px -3px 0 black, -3px 3px 0 black, 3px 3px 0 black, 0px 8px 2px rgba(0, 0, 0, 0.22), 0px 8px 2px rgba(0, 0, 0, 0.22), 0px 8px 2px rgba(0, 0, 0, 0.22)',
    // '@media (max-width: 638.88px)': {
    //   textShadow:
    //     '-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black, 0px 2px 2px rgba(0, 0, 0, 0.22), 0px 4px 2px rgba(0, 0, 0, 0.22), 0px 4px 2px rgba(0, 0, 0, 0.22)',
    // },
  },
  page_title: {
    margin: 0,
    padding: 0,
    lineHeight: '52px',
    fontSize: '30px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
      lineHeight: '24px',
    },
    // '@media (max-width: 638.88px)': {
    //   fontSize: '1.4rem',
    //   lineHeight: '1.6rem',
    // },
  },
  pageTitleIcon: {
    width: '50px',
    marginRight: '10px',
    filter: 'drop-shadow(0px 5px 0px rgba(0,0,2,0.4))',
    '@media (max-width: 638.88px)': {
      width: '25px',
      filter: 'drop-shadow(0px 3px 0px rgba(0,0,2,0.4))',
    },
  },
  rewardsTitleIcon: {
    width: '40px !important',
    '@media (max-width: 638.88px)': {
      width: '22px !important',
    },
  },
  pageTitleShadow: {
    textShadow: ' rgb(0, 0, 0) 3px 0px 0px, rgb(0, 0, 0) 2.83487px 0.981584px 0px, rgb(0, 0, 0) 2.35766px 1.85511px 0px, rgb(0, 0, 0) 1.62091px 2.52441px 0px, rgb(0, 0, 0) 0.705713px 2.91581px 0px, rgb(0, 0, 0) -0.287171px 2.98622px 0px, rgb(0, 0, 0) -1.24844px 2.72789px 0px, rgb(0, 0, 0) -2.07227px 2.16926px 0px, rgb(0, 0, 0) -2.66798px 1.37182px 0px, rgb(0, 0, 0) -2.96998px 0.42336px 0px, rgb(0, 0, 0) -2.94502px -0.571704px 0px, rgb(0, 0, 0) -2.59586px -1.50383px 0px, rgb(0, 0, 0) -1.96093px -2.27041px 0px, rgb(0, 0, 0) -1.11013px -2.78704px 0px, rgb(0, 0, 0) -0.137119px -2.99686px 0px, rgb(0, 0, 0) 0.850987px -2.87677px 0px, rgb(0, 0, 0) 1.74541px -2.43999px 0px, rgb(0, 0, 0) 2.44769px -1.73459px 0px, rgb(0, 0, 0) 2.88051px -0.838247px 0px',
    // textShadow:
      // '2px 2px 0px #000, -2px 2px 0px #000, 2px -2px 0px #000, -2px -2px 0px #000,  0px 2px 0px #000, 2px 0px 0px #000, -2px 0px 0px #000, 0px -2px 0px #000, 0px 4px 1px rgba(0, 0, 0, 0.6)',
    '@media (max-width: 638.88px)': {
      textShadow:
        '1px 1px 0px #000, -1px 1px 0px #000, 1px -1px 0px #000, -1px -1px 0px #000,  0px 1px 0px #000, 1px 0px 0px #000, -1px 0px 0px #000, 0px -1px 0px #000',
    },
  },
  pageTitleShadowBelow: {
    position: 'absolute',
    left: 0,
    opacity: '0.3',
    top: '3px',
    filter: 'brightness(-100%)',
    zIndex: '-1',
  },
}));

const PageTitle = React.memo((props) => {
  const style = useStyles(props);
  const { logo, name, noMargins } = props;

  // Check if logo matches the specific value
  const isRewardsLogo = logo && logo.includes('rewards');

  return (
    <Box className={noMargins ? style.title_container_no_margins : style.title_container}>
      {logo && (
        <img src={Cordova.Path(logo)} alt="icon" className={`${style.pageTitleIcon} ${isRewardsLogo ? style.rewardsTitleIcon : ''}`} />
      )}
      <H1 color="#fff" className={style.page_title}>
        <span className={style.pageTitleShadow}>{name}</span>
        <span className={`${style.pageTitleShadow} ${style.pageTitleShadowBelow}`}>{name}</span>
      </H1>
    </Box>
  );
});

export default PageTitle;
