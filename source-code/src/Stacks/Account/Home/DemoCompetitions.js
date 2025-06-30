import React from 'react';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import Fade from 'react-reveal/Fade';
import { Body1, H2 } from 'Components';
import { IMAGES } from 'Constants';
import CustomSlider from './CustomSlider';
import { getInstanceText } from 'Utils';
import { shallowEqual, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: '100px',
    paddingBottom: '50px',
    [theme.breakpoints.down('md')]: {
      paddingTop: '50px',
      paddingBottom: '0px',
    },
  },
  image: {
    width: '100%',
  },
  marginAuto: {
    width: '60%',
    margin: '0 auto',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  titleMarginAuto: {
    width: '44%',
    margin: '30px auto',
    [theme.breakpoints.down('md')]: {
      width: '100%',

      margin: '0px auto',
    },
  },
  mainTitle: {
    fontSize: '48px',
    maxWidth: '100%',
    margin: '0 auto',
    marginBottom: '30px',
    [theme.breakpoints.down('md')]: {
      fontSize: '36px',
      maxWidth: '100%',
      marginBottom: '15px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '28px',
      maxWidth: '100%',
      marginBottom: '15px',
    },
  },
  mainText: {
    fontSize: '22px',
    [theme.breakpoints.down('md')]: {
      fontSize: '18px',
    },
  },
  container: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    [theme.breakpoints.up('lg')]: {
      maxWidth: '1600px',
    },
    [theme.breakpoints.down('md')]: {
      paddingLeft: '20px',
      paddingRight: '20px',
    },
  },
  containerInner: {
    // paddingLeft: '70px',
    // paddingRight: '70px',
    // [theme.breakpoints.down('md')]: {
    //   paddingLeft: '20px',
    //   paddingRight: '20px',
    // },
  },
}));

function DemoCompetitions({ texts, competitions, status, greenGuardiansInstance }) {
  const classes = useStyles();
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);

  // console.log('competitions-->', competitions);
  const playSlides = [
    { id: 1, src: `${IMAGES.GAME_SLIDER_IMAGE_1}`, type: 'thumbnail', alt: 'Matching' },
    { id: 2, src: `${IMAGES.GAME_SLIDER_IMAGE_2}`, type: 'thumbnail', alt: 'Crossword' },
    { id: 3, src: `${IMAGES.GAME_SLIDER_IMAGE_3}`, type: 'thumbnail', alt: 'Drag and Drop' },
    { id: 4, src: `${IMAGES.GAME_SLIDER_IMAGE_4}`, type: 'thumbnail', alt: 'Matching' },
    { id: 5, src: `${IMAGES.GAME_SLIDER_IMAGE_5}`, type: 'thumbnail', alt: 'Crossword' },
    { id: 6, src: `${IMAGES.GAME_SLIDER_IMAGE_6}`, type: 'thumbnail', alt: 'Drag and Drop' },
    { id: 7, src: `${IMAGES.GAME_SLIDER_IMAGE_7}`, type: 'thumbnail', alt: 'Drag and Drop' },
    { id: 8, src: `${IMAGES.GAME_SLIDER_IMAGE_8}`, type: 'thumbnail', alt: 'Matching' },
  ];

  return (
    <Box className={classes.root}>
      <Container maxWidth={false} disableGutters className={classes.container}>
        <Grid className={classes.containerInner}>
          <Box className={`${classes.header} animated fadeIn wow`} data-wow-delay="0.4s">
            <Fade>
              <Box>
                <H2 fontWeight="600" className={classes.mainTitle} color="#112D70">
                  {getInstanceText(texts, 'DEMO_COMPETITIONS_TITLE', Inst_config.instance_id)}
                </H2>
              </Box>
              {greenGuardiansInstance ? (
                <>
                  <Box className={classes.titleMarginAuto}>
                    <Body1 className={`${classes.mainText} poppins-font-400`} textAlign="left" color="#5E5E5E">
                      {texts.GG_DEMO_COMPETITIONS_TEXT}
                    </Body1>
                  </Box>
                </>
              ) : (
                ''
              )}
            </Fade>
          </Box>
          <Box>
            <CustomSlider
              texts={texts}
              className="competition-dot center"
              slidesData={playSlides}
              slidesToShow={1}
              is_demo_competitions
              competitions={competitions}
              status={status}
            />
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

export default DemoCompetitions;
