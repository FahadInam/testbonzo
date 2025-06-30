import React from 'react';
import { Box, Button, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Body1, H2, H6 } from 'Components';
import { IMAGES } from 'Constants';
import Fade from 'react-reveal/Fade';
import { useSelector, shallowEqual } from 'react-redux';
import { getInstanceText } from 'Utils';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: '50px',
    paddingBottom: '100px',
    [theme.breakpoints.down('md')]: {
      paddingTop: '100px',
      paddingBottom: '50px',
    },
  },
  content: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'start',
    flexDirection: 'column',
    marginBottom: 20,
    [theme.breakpoints.down('md')]: {
      marginBottom: 0,
    },
  },
  image: {
    width: '100%',
    height: 'auto',
  },
  // marginZero: {
  //   margin: 0,
  // },
  marginAuto: {
    margin: '0 auto',
    width: '46%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  mainTextBox: {
    width: '75%',
    margin: '0 auto',
    textAlign: 'center',
    marginTop: '25px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginTop: '10px',
    },
  },
  mainTitle: {
    fontSize: '48px',
    [theme.breakpoints.up('xl')]: {
      paddingRight: '35px',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '36px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '28px',
    },
  },
  mainText: {
    fontSize: '22px',
    [theme.breakpoints.down('md')]: {
      fontSize: '18px',
    },
  },
  cardTitle: {
    fontSize: '22px',
    [theme.breakpoints.down('md')]: {
      fontSize: '18px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
    },
  },
  container: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    [theme.breakpoints.up('lg')]: {
      maxWidth: '1600px',
    },
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  paperGrid: {
    padding: '28px',
    [theme.breakpoints.down('md')]: {
      padding: '0px',
      marginBottom: '20px',
    },
  },
  paperGridGG: {
    padding: '28px',
    marginBottom: '0px',
    [theme.breakpoints.down('md')]: {
      padding: '16px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0px',
      marginBottom: '15px',
    },
  },
  cardGrid: {
    position: 'relative',
    padding: '20px 40px',
    [theme.breakpoints.down('md')]: {
      padding: '20px',
    },
  },
  paperStyle: {
    border: '1px solid #c0e2f6',
    background: '#dbf1ff',
    minHeight: '316px',
    [theme.breakpoints.down('md')]: {
      minHeight: 'auto',
      textAlign: 'center',
    },
    [theme.breakpoints.up('xl')]: {
      minHeight: 'auto',
    },
  },
  paperStyleGG: {
    minHeight: '180px',
    [theme.breakpoints.down('sm')]: {
      minHeight: 'auto',
    },
  },
  imageTitleContainer: {
    marginBottom: '10px',
    [theme.breakpoints.down('md')]: {
      marginBottom: '20px',
    },
  },
  cardText: {
    fontSize: '16px',
    [theme.breakpoints.down('md')]: {
      fontSize: '14px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
  },
  descriptionGrid: {
    paddingTop: '35px',
    paddingBottom: '0px',
    minHeight: 'auto',
    marginBottom: '0px',
    [theme.breakpoints.down('md')]: {
      minHeight: 'auto',
      paddingTop: '0px',
    },
  },
  linkTitleStyle: {
    fontSize: '18px',
    padding: 0,
    margin: 0,
    [theme.breakpoints.down('md')]: {
      fontSize: '16px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
    },
  },
  featuresItemsGrid: {
    width: '100%',
    padding: '10px 0',
  },
  featuresItemText: {
    fontSize: '16px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
  },
  iconBox: {
    width: '62px',
    height: '62px',
    background: '#02BBFE',
    borderRadius: '100px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '20px',
      width: '50px',
      height: '50px',
      '& img': {
        height: '23px !important',
      },
    },
  },
  marginBottomZero: {
    marginBottom: '0px',
    marginRight: '15px',
    [theme.breakpoints.down('md')]: {
      marginBottom: '0px',
    },
  },
  linkTitleBtnStyle: {
    padding: '0',
    paddingTop: '10px',
    [theme.breakpoints.down('md')]: {
      paddingTop: '0px',
    },
  },
}));

const ContactUs = ({ texts, greenGuardiansInstance }) => {
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);

  // Base steps array
  const steps = [
    {
      icon: `${IMAGES.EMAIL_ICON}`,
      title: `${texts.EMAIL_US_TITLE}`,
      description: `${texts.EMAIL_US_TEXT}`,
      linkTitle: `${texts.EMAIL_US_LINK_TITLE}`,
      linkHref: '/',
    },
    {
      icon: `${IMAGES.PHONE_ICON}`,
      title: `${texts.CALL_US_TITLE}`,
      description: `${texts.CALL_US_TEXT}`,
      linkTitle: `${texts.CALL_US_LINK_TITLE}`,
      linkHref: '/',
    },
    {
      icon: `${IMAGES.WHATSAPP_ICON}`,
      title: `${texts.WHATSAPP_NOW_TITLE}`,
      description: `${texts.WHATSAPP_NOW_TEXT}`,
      linkTitle: `${texts.WHATSAPP_NOW_LINK_TITLE}`,
      linkHref: 'https://wa.me/923320484200',
    },
  ];

  const greenGuardianSteps = [
    {
      icon: `${IMAGES.EMAIL_ICON}`,
      title: `${texts.EMAIL_US_TITLE}`,
      description: `${texts.EMAIL_US_TEXT}`,
      linkTitle: `${texts.GG_EMAIL_US_LINK_TITLE}`,
      linkHref: '/',
    },
    {
      icon: `${IMAGES.WHITE_LINKEDIN_ICON}`,
      title: `${texts.LINKED_IN_TITLE}`,
      description: `${texts.CALL_US_TEXT}`,
      linkTitle: `${texts.LINKEDIN_LINK_TITLE}`,
      linkHref: 'https://www.linkedin.com/company/greenguardiansed/',
    },
    {
      icon: `${IMAGES.WHITE_INSTAGRAM_ICON}`,
      title: `${texts.INSTAGRAM_TITLE}`,
      description: `${texts.WHATSAPP_NOW_TEXT}`,
      linkTitle: `${texts.INSTAGRAM_LINK_TITLE}`,
      linkTitleSecond: `${texts.INSTAGRAM_SECOND_LINK_TITLE}`,
      linkHref: 'https://www.instagram.com/greenguardiansed/',
      linkHrefSecond: 'https://www.instagram.com/singaporegreenguardians/',
    },
    {
      icon: `${IMAGES.WHITE_FACEBOOK_ICON}`,
      title: `${texts.FACEBOOK_TITLE}`,
      description: `${texts.WHATSAPP_NOW_TEXT}`,
      linkTitle: `${texts.FACEBOOK_LINK_TITLE}`,
      linkTitleSecond: `${texts.FACEBOOK_SECOND_LINK_TITLE}`,
      linkHref: 'https://www.facebook.com/GreenGuardiansEd',
      linkHrefSecond: 'https://www.facebook.com/singaporegreenguardians/',
    },
  ];

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Container maxWidth={false} disableGutters className={classes.container}>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Fade>
              <Box className={`${classes.header}`} data-wow-delay="0.4s">
                <Box className={classes.marginAuto}>
                  <H2 fontWeight="600" className={classes.mainTitle} color="#112D70">
                    {texts.CONTACT_US_TITLE}
                  </H2>
                </Box>
                <Box className={classes.mainTextBox}>
                  <Body1 className={`${classes.mainText} poppins-font-400`} textAlign="left" color="#5E5E5E">
                    {getInstanceText(texts, 'CONTACT_US_TEXT', Inst_config.instance_id)}
                  </Body1>
                </Box>
              </Box>
            </Fade>
          </Grid>
        </Grid>
        <Grid item container justifyContent="center" className={classes.cardGrid}>
          {greenGuardiansInstance ? (
            <>
              {greenGuardianSteps.map((step, index) => (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                  xl={6}
                  key={index}
                  className={`${classes.positionIndex} ${classes.paperGrid} ${greenGuardiansInstance ? classes.paperGridGG : ''}`}
                >
                  <Paper
                    elevation={3}
                    style={{ padding: '20px', textAlign: 'start' }}
                    className={`${classes.paperStyle} ${greenGuardiansInstance ? classes.paperStyleGG : ''}`}
                  >
                    <Grid container alignItems="center" spacing={1} className={classes.imageTitleContainer}>
                      <Grid item xs="auto">
                        <Fade top>
                          <Box className={`${classes.iconBox} ${greenGuardiansInstance ? classes.marginBottomZero : ''}`}>
                            <img src={step.icon} alt="Bonzo" style={{ height: '30px', marginRight: '0px' }} />
                          </Box>
                        </Fade>
                      </Grid>

                      <Grid item xs>
                        <H6 fontWeight="600" color="#313644" className={classes.cardTitle}>
                          {step.title}
                        </H6>
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center" className={classes.keyFeaturesGrid}>
                      <Grid item style={{ width: '100%' }}>
                        <Button
                          href={step.linkHref !== '/' ? step.linkHref : undefined}
                          target="_blank"
                          color="primary"
                          style={{
                            wordBreak: 'break-word',
                            cursor: step.linkHref === '/' ? 'default' : 'pointer',
                            pointerEvents: step.linkHref === '/' ? 'none' : 'auto',
                          }}
                          className={classes.linkTitleBtnStyle}
                        >
                          <Body1 fontWeight="600" color="#112D70" className={classes.linkTitleStyle}>
                            {step.linkTitle}
                          </Body1>
                          {step.linkHref !== '/' && (
                            <svg
                              style={{ marginLeft: '5px' }}
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5 12h14m0 0l-6-6m6 6l-6 6"
                                stroke="#112D70"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </Button>
                      </Grid>
                      {step.linkTitleSecond && (
                        <Grid item style={{ width: '100%' }}>
                          <Button
                            //href={step.linkHrefSecond}
                            href={step.linkHrefSecond !== '/' ? step.linkHrefSecond : undefined}
                            target="_blank"
                            color="primary"
                            style={{
                              wordBreak: 'break-word',
                              cursor: step.linkHrefSecond === '/' ? 'default' : 'pointer',
                              pointerEvents: step.linkHrefSecond === '/' ? 'none' : 'auto',
                            }}
                            className={classes.linkTitleBtnStyle}
                          >
                            <Body1 fontWeight="600" color="#112D70" className={classes.linkTitleStyle}>
                              {step.linkTitleSecond}
                            </Body1>
                            {step.linkHrefSecond !== '/' && (
                              <svg
                                style={{ marginLeft: '5px' }}
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M5 12h14m0 0l-6-6m6 6l-6 6"
                                  stroke="#112D70"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  </Paper>
                </Grid>
              ))}
            </>
          ) : (
            <>
              {steps.map((step, index) => (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={4}
                  xl={4}
                  key={index}
                  className={`${classes.positionIndex} ${classes.paperGrid}`}
                >
                  <Paper elevation={3} style={{ padding: '20px', textAlign: 'start' }} className={classes.paperStyle}>
                    <Grid container alignItems="center">
                      <Grid item>
                        <Fade top>
                          <Box className={classes.iconBox}>
                            <img src={step.icon} alt="Bonzo" style={{ height: '30px', marginRight: '0px' }} />
                          </Box>
                        </Fade>
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item>
                        <H6 fontWeight="600" color="#313644" className={classes.cardTitle}>
                          {step.title}
                        </H6>
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center" className={classes.descriptionGrid}>
                      <Grid item>
                        <Body1 className={`${classes.cardText} poppins-font-400`} textAlign="left" color="#777777">
                          {step.description}
                        </Body1>
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center" className={classes.keyFeaturesGrid}>
                      <Grid item style={{ width: '100%' }}>
                        <Button
                          href={step.linkHref !== '/' ? step.linkHref : undefined}
                          color="primary"
                          style={{
                            wordBreak: 'break-word',
                            cursor: step.linkHref === '/' ? 'default' : 'pointer',
                            pointerEvents: step.linkHref === '/' ? 'none' : 'auto',
                          }}
                          className={classes.linkTitleBtnStyle}
                        >
                          <Body1 fontWeight="600" color="#112D70" className={classes.linkTitleStyle}>
                            {step.linkTitle}
                          </Body1>
                          {step.linkHref !== '/' && (
                            <svg
                              style={{ marginLeft: '5px' }}
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5 12h14m0 0l-6-6m6 6l-6 6"
                                stroke="#112D70"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactUs;
