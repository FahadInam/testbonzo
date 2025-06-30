import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { H3 } from './Typography';
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
    gap: '16px',
    // textShadow:
    //   ' -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 2px 2px 0 black, 0px 4px 2px rgba(0, 0, 0, 0.22), 0px 4px 2px rgba(0, 0, 0, 0.22), 0px 4px 2px rgba(0, 0, 0, 0.22)',
    // '@media (max-width: 638.88px)': {
    //   textShadow:
    //     '-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black, 0px 2px 2px rgba(0, 0, 0, 0.22), 0px 4px 2px rgba(0, 0, 0, 0.22), 0px 4px 2px rgba(0, 0, 0, 0.22)',
    // },
  },
  title_container_no_margins: {
    maxWidth: '1000px',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
    // textShadow:
    //   ' -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 2px 2px 0 black, 0px 4px 2px rgba(0, 0, 0, 0.22), 0px 4px 2px rgba(0, 0, 0, 0.22), 0px 4px 2px rgba(0, 0, 0, 0.22)',
    // '@media (max-width: 638.88px)': {
    //   textShadow:
    //     '-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black, 0px 2px 2px rgba(0, 0, 0, 0.22), 0px 4px 2px rgba(0, 0, 0, 0.22), 0px 4px 2px rgba(0, 0, 0, 0.22)',
    // },
  },
  page_title: {
    margin: 0,
    padding: 0,
    lineHeight: '52px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
      lineHeight: '24px',
    },
  },
  pageTitleShadow: {
    textShadow:
      '2px 2px 0px #000, -2px 2px 0px #000, 2px -2px 0px #000, -2px -2px 0px #000,  0px 2px 0px #000, 2px 0px 0px #000, -2px 0px 0px #000, 0px -2px 0px #000, 0px 4px 1px rgba(0, 0, 0, 0.6)',
    '@media (max-width: 638.88px)': {
      textShadow:
        '1px 1px 0px #000, -1px 1px 0px #000, 1px -1px 0px #000, -1px -1px 0px #000,  0px 1px 0px #000, 1px 0px 0px #000, -1px 0px 0px #000, 0px -1px 0px #000, 0px 3px 0px rgba(0, 0, 0, 0.6)',
    },
  },
}));

const PageSubTitle = React.memo((props) => {
  const style = useStyles(props);
  const { logo, name, noMargins } = props;
  return (
    <Box className={noMargins ? style.title_container_no_margins : style.title_container}>
      <img src={Cordova.Path(logo)} alt="icon" style={{ display: 'none' }} />
      <H3 color="#fff" className={style.page_title}>
        <span className={style.pageTitleShadow}>{name}</span>
      </H3>
    </Box>
  );
});

export default PageSubTitle;
