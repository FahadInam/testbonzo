import React from 'react';
import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Body1, H2, H6 } from 'Components';
import Fade from 'react-reveal/Fade';
import { IMAGES } from 'Constants';

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
      padding: '0 25px',
      display: 'block',
      textAlign: 'center',
    },
  },
  cardTitle: {
    fontSize: '28px',
    [theme.breakpoints.down('md')]: {
      fontSize: '20px',
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
    padding: '20px',
    [theme.breakpoints.down('md')]: {
      padding: '0px',
      marginBottom: '20px',
    },
    [theme.breakpoints.down('lg')]: {
      paddingBottom: '0px',
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
    padding: '25px',
    textAlign: 'start',
    border: '1px solid #DCDCDC',
    minHeight: 'auto',
    [theme.breakpoints.up('xl')]: {
      minHeight: '547px',
    },
    '@media (min-width:1300px)': {
      minHeight: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '20px',
    },
  },
  cardText: {
    fontSize: '18px',
    [theme.breakpoints.down('md')]: {
      fontSize: '16px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
    },
  },
  descriptionGrid: {
    padding: '30px 0',
    minHeight: '170px',
    marginBottom: '30px',
    borderBottom: '1px solid #DCDCDC',
    [theme.breakpoints.down('lg')]: {
      minHeight: 'auto',
    },
  },
  keyFeatureCardTitle: {
    fontSize: '18px',
    marginBottom: '15px',
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
  featuresImageLeft: {
    [theme.breakpoints.up('xl')]: {
      flexGrow: '0',
      maxWidth: '8.333333%',
      flexBasis: '8.333333%',
    },
  },
  featuresImageRight: {
    [theme.breakpoints.up('xl')]: {
      flexGrow: '0',
      maxWidth: '91.666667%',
      flexBasis: '91.666667%',
    },
  },
  featuresImageStyle: {
    height: '17px',
    marginRight: '10px',
    marginTop: '4px',
    [theme.breakpoints.down('sm')]: {
      height: '16px',
      marginRight: '5px',
      marginTop: '2px',
    },
  },
}));

const WhoIsIt = ({ texts }) => {
  const steps = [
    {
      icon: `${IMAGES.WHO_IS_IT_STUDENTS_ICON}`,
      title: `${texts.WHO_IS_IT_FIRST_CARD_TITLE}`,
      description: `${texts.WHO_IS_IT_FIRST_CARD_TEXT}`,
      keyFeatureTitle: `${texts.FIRST_KEY_FEATURES_TITLE}`,
      keyFeaturesItems: [
        {
          icon: `${IMAGES.KEY_FEATURES_ICON}`,
          title: `${texts.FIRST_KEY_FEATURES_TITLE_ONE}`,
        },
        {
          icon: `${IMAGES.KEY_FEATURES_ICON}`,
          title: `${texts.FIRST_KEY_FEATURES_TITLE_TWO}`,
        },
        {
          icon: `${IMAGES.KEY_FEATURES_ICON}`,
          title: `${texts.FIRST_KEY_FEATURES_TITLE_THREE}`,
        },
      ],
    },
    {
      icon: `${IMAGES.WHO_IS_IT_SCHOOL_ICON}`,
      title: `${texts.WHO_IS_IT_SECOND_CARD_TITLE}`,
      description: `${texts.WHO_IS_IT_SECOND_CARD_TEXT}`,
      keyFeatureTitle: `${texts.SECOND_KEY_FEATURES_TITLE}`,
      keyFeaturesItems: [
        {
          icon: `${IMAGES.KEY_FEATURES_ICON}`,
          title: `${texts.SECOND_KEY_FEATURES_TITLE_ONE}`,
        },
        {
          icon: `${IMAGES.KEY_FEATURES_ICON}`,
          title: `${texts.SECOND_KEY_FEATURES_TITLE_TWO}`,
        },
        {
          icon: `${IMAGES.KEY_FEATURES_ICON}`,
          title: `${texts.SECOND_KEY_FEATURES_TITLE_THREE}`,
        },
      ],
    },
    {
      icon: `${IMAGES.WHO_IS_IT_ORGANIZATIONS_ICON}`,
      title: `${texts.WHO_IS_IT_THIRD_CARD_TITLE}`,
      description: `${texts.WHO_IS_IT_THIRD_CARD_TEXT}`,
      keyFeatureTitle: `${texts.THIRD_KEY_FEATURES_TITLE}`,
      keyFeaturesItems: [
        {
          icon: `${IMAGES.KEY_FEATURES_ICON}`,
          title: `${texts.THIRD_KEY_FEATURES_TITLE_ONE}`,
        },
        {
          icon: `${IMAGES.KEY_FEATURES_ICON}`,
          title: `${texts.THIRD_KEY_FEATURES_TITLE_TWO}`,
        },
        {
          icon: `${IMAGES.KEY_FEATURES_ICON}`,
          title: `${texts.THIRD_KEY_FEATURES_TITLE_THREE}`,
        },
      ],
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
                    {texts.WHO_IS_IT_MAIN_TITLE}
                  </H2>
                </Box>
                <Box className={classes.mainTextBox}>
                  <Body1 className={`${classes.mainText} poppins-font-400`} textAlign="left" color="#5E5E5E">
                    {texts.WHO_IS_IT_MAIN_TEXT}
                  </Body1>
                </Box>
              </Box>
            </Fade>
          </Grid>
        </Grid>
        <Grid item container justifyContent="center" className={classes.cardGrid}>
          {steps.map((step, index) => (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={4} key={index} className={`${classes.positionIndex} ${classes.paperGrid}`}>
              <Paper elevation={3} className={classes.paperStyle}>
                <Grid container alignItems="center">
                  <Grid item>
                    <Fade top>
                      <img src={step.icon} alt="Bonzo" style={{ height: '38px', marginRight: '10px' }} />
                    </Fade>
                  </Grid>
                  <Grid item>
                    <H6 fontWeight="600" color="#313644" className={classes.cardTitle}>
                      {step.title}
                    </H6>
                  </Grid>
                </Grid>
                <Grid container alignItems="center" className={classes.descriptionGrid}>
                  <Grid item>
                    <Body1 className={`${classes.cardText} poppins-font-400`} textAlign="left" color="#5E5E5E">
                      {step.description}
                    </Body1>
                  </Grid>
                </Grid>
                <Grid container alignItems="center" className={classes.keyFeaturesGrid}>
                  <Grid item style={{ width: '100%' }}>
                    <H6 fontWeight="600" color="#313644" className={classes.keyFeatureCardTitle}>
                      {step.keyFeatureTitle}
                    </H6>
                  </Grid>
                  {step.keyFeaturesItems.map((feature, index) => (
                    <Grid item key={index} className={classes.featuresItemsGrid}>
                      <Grid container alignItems="flex-start">
                        <Grid item style={{ display: 'flex' }} className={classes.featuresImageLeft}>
                          <img src={feature.icon} alt="Key Feature" className={classes.featuresImageStyle} />
                        </Grid>
                        <Grid item className={classes.featuresImageRight}>
                          <Body1 className={`${classes.featuresItemText} poppins-font-400`}>{feature.title}</Body1>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default WhoIsIt;
