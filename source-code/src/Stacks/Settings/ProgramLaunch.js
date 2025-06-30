import React, { useState, useEffect } from 'react';
// import { config } from 'Constants';
import { Box, makeStyles, useTheme } from '@material-ui/core';
import Header from 'Stacks/Account/Home/Header';
import { useLocation } from 'react-router-dom';
import { findUrlByPathname, isGreenGuardiansInstance } from 'Utils';
import { GetInstanceConfig } from 'Actions/config.action';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  iframeBox: {
    top: '90px',
    paddingBottom: '70px',
    background: 'white',
    [theme.breakpoints.down('md')]: {
      top: '76px',
    },
    [theme.breakpoints.down('xs')]: {
      top: '68px',
    },
  },
}));

const ProgramLaunch = () => {
  const location = useLocation();

  let GG_url = '';
  if (isGreenGuardiansInstance && location.pathname === '/program/glc') {
    GG_url = 'https://knowledgeplatform.com.pk/gclc/?embedded';
  } else if (isGreenGuardiansInstance && location.pathname === '/green-star-school') {
    GG_url = 'https://knowledgeplatform.com.pk/green-star-schools/?embedded'; // Updated link for Green Star School will be added here.
  }

  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);

  const iframe_url = GG_url || findUrlByPathname(location.pathname, Inst_config.landing_navigation);
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);
  const [iframeSrc, setIframeSrc] = useState('');
  const { texts } = useTheme();
  const classes = useStyles();
  const config = useSelector((state) => state.GetInstanceConfig, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    document.getElementById('preloader').style.display = 'block';
    const timer = setTimeout(() => {
      setShouldLoadIframe(true);
    }, 500); // Delay of 0.5 seconds

    if (location.pathname) {
      setIframeSrc(iframe_url);
    }
    return () => {
      // Component will unmount, clearing iframe src
      setIframeSrc('');
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [location.state]);

  useEffect(() => {
    if (!config) {
      dispatch(GetInstanceConfig({}, texts));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Box>
        <Header texts={texts} />
      </Box>
      {shouldLoadIframe && (
        <Box position="fixed" left={0} width="100%" height="100%" zIndex={1300} className={classes.iframeBox}>
          <iframe
            className="border-none"
            title="unique"
            src={iframeSrc}
            width="100%"
            height="100%"
            allow="autoplay; fullscreen; accelerometer"
            data-allow="autoplay; fullscreen"
            onLoad={() => (document.getElementById('preloader').style.display = 'none')} // Hide the loader when iframe loads
          />
        </Box>
      )}
    </div>
  );
};

export default ProgramLaunch;
