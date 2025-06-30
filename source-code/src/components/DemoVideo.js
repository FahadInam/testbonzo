import { Paper, Box, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { Body1 } from './Core';
import { getInstanceText, getInstanceType } from 'Utils';
import { shallowEqual, useSelector } from 'react-redux';
import { INSTANCES_ID } from 'Constants/instance.config';

const useStyles = makeStyles((theme) => ({
  cardOuterShadow: {
    boxShadow: '#000 0px 13px 1px -1px',
    borderRadius: '24px',
    marginBottom: '16px',
  },
  cardInnerShadow: {
    boxShadow: '#D5DBEA 0px 10px 0px -1px',
  },
  titleStyle: {
    display: 'block',
    paddingTop: '15px',
    paddingLeft: '5px',
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: '18px',
    [theme.breakpoints.down('md')]: {
      fontSize: '16px',
    },
  },
  iframeWrapper: {
    position: 'relative',
    width: '100%',
    paddingTop: '56.25%', // 16:9 aspect ratio (9 / 16 * 100)
    borderRadius: '20px',
    overflow: 'hidden',
  },
  iframeStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 0,
  },
}));

const DemoVideo = ({ texts }) => {
  const style = useStyles();
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const isGlobalClimate = getInstanceType(Inst_config.instance_id, INSTANCES_ID.GLOBAL_CLIMATE_LITERACY_ID);

  return (
    <Grid item xs={12}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        marginBottom="2rem"
        className={style.cardOuterShadow}
      >
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'left', width: '100%' }} className={style.cardInnerShadow}>
          <div className={style.iframeWrapper}>
            <iframe
              className={style.iframeStyle}
              src={
                isGlobalClimate
                  ? 'https://player.vimeo.com/video/1018226363?h=fb809ecf76'
                  : 'https://player.vimeo.com/video/1018288891?'
              }
              title={getInstanceText(texts, 'OVERVIEW_TEXT', Inst_config.instance_id)}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <Body1 className={style.titleStyle}>{getInstanceText(texts, 'OVERVIEW_TEXT', Inst_config.instance_id)}</Body1>
        </Paper>
      </Box>
    </Grid>
  );
};

export default DemoVideo;
