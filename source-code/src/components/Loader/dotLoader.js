import { Box, Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Cordova } from 'Utils';

export const DotLoader = ({ isMCD, TopLogo, BottomLogo, kp }) => {
  return (
    <div className="preloader">
      <div className="container" style={{ display: 'flex', height: isMCD ? '100%' : 'inherit' }}>
        {isMCD ? <MCDLoader TopLogo={TopLogo} BottomLogo={BottomLogo} kp={kp} /> : <LinearLoader isMCD={isMCD} />}
      </div>
    </div>
  );
};

export const LinearLoader = ({ paddingTop, isMCD = false }) => {
  return (
    <div className="loader" style={{ paddingTop: paddingTop || null }}>
      <div className="loader--dot" />
      <div className="loader--dot" />
      <div className="loader--dot" />
      <div className="loader--dot" />
      <div className="loader--dot" />
      <div className="loader--dot" />
      <div className="loader--text" />
    </div>
  );
};

export const MCDLoader = ({ TopLogo, BottomLogo, kp }) => {
  return (
    <Grid
      container
      display="flex"
      justifyContent="center"
      alignItems="center"
      direction="column"
      style={{ height: '40%', minHeight: '200px', margin: 'auto' }}
    >
      <Grid item xs mb={8} p={6} display="flex" style={{ textAlign: 'center', margin: 'auto' }}>
        <Box
          display="flex"
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{ textAlign: 'center', margin: 'auto', height: '100%' }}
        >
          <img display="flex" src={Cordova.Path(TopLogo)} style={{ maxWidth: '300px', width: '70%' }} alt="1on1 Quiz" />
        </Box>
      </Grid>
      <Grid item display="flex" xs>
        <div className="loader">
          <div className="loader--dot" />
          <div className="loader--dot" />
          <div className="loader--dot" />
          <div className="loader--dot" />
          <div className="loader--dot" />
          <div className="loader--dot" />
          {/* <div className="loader--text" /> */}
        </div>
      </Grid>
      <Grid item display="flex" xs mt={2}>
        <Box
          display="flex"
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{ textAlign: 'center', margin: 'auto', height: '100%' }}
        >
          <Box m={2}>
            <img src={Cordova.Path(BottomLogo)} height={30} alt="McDonald's" />
          </Box>
          <Box m={2} style={{ borderRight: '2px solid #FFFFFF', height: '48px' }} />
          <Box m={2}>
            <img src={Cordova.Path(kp)} height={40} alt="Kp" />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export const BarLoader = () => {
  return (
    <div className="bar_loader">
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
    </div>
  );
};
export const SuspenseWrapper = ({ children }) => {
  useEffect(() => {
    document.getElementById('preloader').style.display = 'block';
    return () => (document.getElementById('preloader').style.display = 'none');
  }, []);
  return children;
};
