/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Box, Grid, useTheme } from '@material-ui/core';
import { SUPPORTED_THEMES } from 'Theme';
import { AppControl } from 'Actions';
import { Cordova, formatBytes, formatSize, getInstanceType } from 'Utils';
import logo from '../../../Assets/images/pb-web-logo.png';
import webLogoGreenGuardians from 'Assets/home-img/gg-web-logo.svg';
import PageStructure from '../shared/PageStructure';
import useStyles from './style';
import './style.css';
import { INSTANCES_ID } from 'Constants/instance.config';

const CodePushLoader = () => {
  const { texts } = useTheme();
  const styled = useStyles();
  const CodePushData = useSelector((state) => state.GetCodePushData, shallowEqual);
  const { BytesLeft, TotalBytes } = CodePushData || {};
  const BL = formatBytes(BytesLeft);
  const TB = formatBytes(TotalBytes);

  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const isGlobalClimate = getInstanceType(Inst_config.instance_id, INSTANCES_ID.GLOBAL_CLIMATE_LITERACY_ID);

  const progressBarWidth = (BL / TB) * 100;

  useEffect(() => {
    AppControl.SetTheme(SUPPORTED_THEMES.BLUE);
  }, []);

  const PageUI = (
    <Box className="preloader">
      <Box className="container">
        <Grid container spacing={4} direction="column" alignItems="center" justifyContent="center">
          <Grid item xs={12} className={styled.row}>
            <Box justifyContent="center" display="flex" alignItems="center">
              <img src={Cordova.Path(isGlobalClimate ? webLogoGreenGuardians : logo)} width="240" alt="1on1 Quiz" />
            </Box>
          </Grid>
          <Grid item xs={12} className={styled.row}>
            <Box className="containerProgress" mt={4}>
              <Box className="progress-bar__container">
                <Box className="progress-bar" style={{ width: `${progressBarWidth}%` }}>
                  <span className="progress-bar__text">Uploaded Successfully!</span>
                </Box>
              </Box>
            </Box>
            <Box justifyContent="center" display="flex" alignItems="center" m={1}>
              {`Loading Resources [${BL}/${TB}]${formatSize(TB)}`}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
  return (
    <>
      <PageStructure name={texts.ADMIN_PANEL} PageUI={PageUI} />
    </>
  );
};

export default CodePushLoader;
