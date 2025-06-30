import React from 'react';
import { AppBar, Box, Container, Grid, Tab, Tabs, Typography, makeStyles, useTheme } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Body1, H2, H4 } from 'Components';
import { IMAGES } from 'Constants';
import Fade from 'react-reveal/Fade';
import { getInstanceText } from 'Utils';
import { shallowEqual, useSelector } from 'react-redux';
// import { Account, AppControl } from 'Actions';
// import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 100,
  },
  customAppBar: {
    backgroundColor: '#fff', // Change the color here
    padding: '50px 0 0px 0',
    borderBottom: '2px solid #C6CBDE',
    width: '90%',
    margin: '0 auto',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  image: {
    width: '100%',
    height: 'auto',
  },
  marginZero: {
    margin: 0,
  },
  marginAuto: {
    margin: '0 auto',
    width: '450px',
    [theme.breakpoints.down('md')]: {
      width: '90%',
    },
  },
  marginAutoGG: {
    margin: '0 auto',
    width: '650px',
    [theme.breakpoints.down('md')]: {
      width: '90%',
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
  container: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    [theme.breakpoints.up('lg')]: {
      maxWidth: '1600px',
    },
  },
  tabStyle: {
    // marginBottom: '15px',
    '& .MuiTabs-flexContainer': {
      justifyContent: 'space-between',
      paddingBottom: '10px',
      // borderBottom: '2px solid #C6CBDE',
    },
  },
  bannerImagesBox: {
    padding: '50px',
    width: '550px',
    margin: '0 auto',
    [theme.breakpoints.down('md')]: {
      width: '400px',
      padding: '0px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '300px',
    },
  },
  fadeContent: {
    textAlign: 'left',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },
  bannerCardTitle: {
    fontSize: '40px',
    [theme.breakpoints.down('md')]: {
      fontSize: '32px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '28px',
    },
  },
  bannerCardText: {
    display: 'block',
    marginTop: '30px',
    marginRight: '200px',
    color: '#414141',
    fontSize: '20px',
    [theme.breakpoints.down('lg')]: {
      marginRight: '0px',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '18px',
      marginRight: '0px',
      marginTop: '10px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
      marginRight: '0px',
      marginTop: '10px',
    },
  },
  tabsTitle: {
    fontSize: '20px',
    color: '#A3A8B5',
    fontWeight: '500',
    [theme.breakpoints.down('md')]: {
      fontSize: '16px',
    },
  },
  tabSectionHeight: {
    minHeight: '670px',
    [theme.breakpoints.down('md')]: {
      minHeight: '620px',
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: '550px',
    },
  },
}));

const tabLabels = ['Personalised', 'Measurable', 'Gamified', 'Adaptive', 'Social', 'Bitesized'];

const panelContents = [
  {
    title: 'Personalised',
    text: 'Tailored learning experiences for maximum engagement.',
    image: IMAGES.BANNER_IMAGE_ONE,
  },
  {
    title: 'Measurable',
    text: 'Track progress with detailed analytics.',
    image: IMAGES.BANNER_IMAGE_TWO,
  },
  {
    title: 'Gamified',
    text: 'Enjoy fun competitions with leaderboards and rewards.',
    image: IMAGES.BANNER_IMAGE_THREE,
  },
  {
    title: 'Adaptive',
    text: 'Customised learning pathways to fit your needs.',
    image: IMAGES.BANNER_IMAGE_FOUR,
  },
  {
    title: 'Social',
    text: 'Build a vibrant learning community.',
    image: IMAGES.BANNER_IMAGE_FIVE,
  },
  {
    title: 'Bitesized',
    text: 'Focused content for quick, effective learning.',
    image: IMAGES.BANNER_IMAGE_SIX,
  },
];

function CompetitionsSection({ texts, greenGuardiansInstance }) {
  // const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={classes.root}>
      <Container maxWidth={false} disableGutters className={classes.container}>
        <Box className={`${classes.header} animated fadeIn wow`} data-wow-delay="0.4s">
          <Box className={greenGuardiansInstance ? classes.marginAutoGG : classes.marginAuto}>
            <H2 fontWeight="600" className={classes.mainTitle} color="#112D70">
              {getInstanceText(texts, 'COMPETITIONS_SECTION_TITLE', Inst_config.instance_id)}
            </H2>
          </Box>
          <Box margin="30px auto" className={classes.mainTextBox}>
            <Body1 className={`${classes.mainText} poppins-font-400`} textAlign="left" color="#5E5E5E">
              {texts.COMPETITIONS_SECTION_TEXT}
            </Body1>
          </Box>
        </Box>
        <Box className={classes.tabSectionHeight}>
          <AppBar position="static" color="default" elevation={0} className={classes.customAppBar}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="scrollable"
              scrollButtons="on" // Force scroll buttons to always appear
              aria-label="full width tabs example"
              className={classes.tabStyle}
            >
              {tabLabels.map((label, index) => (
                <Tab className={classes.tabsTitle} key={index} label={label} {...a11yProps(index)} />
              ))}
            </Tabs>
          </AppBar>

          {panelContents.map((content, index) => (
            <TabPanel key={index} value={value} index={index} dir={theme.direction}>
              {typeof content === 'string' ? (
                content
              ) : (
                <Grid container spacing={3} alignItems="center" justifyContent="space-between" className={classes.gridBottom}>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={6}
                    className={`${classes.responsiveCard} ${classes.orderImageFirst} animated fadeInRight wow`}
                  >
                    <Fade left>
                      <Box className={classes.bannerImagesBox}>
                        <img src={content.image} alt="Game-based learning" className={classes.image} />
                      </Box>
                    </Fade>
                  </Grid>
                  <Grid item xs={12} md={12} lg={5} className={`${classes.content} ${classes.orderContentFirst} fadeInLeft animated`}>
                    <Box className={classes.fadeContent}>
                      <Fade right>
                        <Box className={classes.cardTitleBox}>
                          <H4 fontWeight="600" color="#313644" className={classes.bannerCardTitle}>
                            {content.title}
                          </H4>
                          <Body1 className={`${classes.bannerCardText} poppins-font-400`}>{content.text}</Body1>
                        </Box>
                      </Fade>
                    </Box>
                  </Grid>
                </Grid>
              )}
            </TabPanel>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default CompetitionsSection;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
