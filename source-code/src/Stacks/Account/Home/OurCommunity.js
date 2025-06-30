import React from 'react';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import Fade from 'react-reveal/Fade';
import { H2 } from 'Components';
import { IMAGES } from 'Constants';
import CustomSlider from './CustomSlider';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // backgroundColor: '#E6F8FF',
    color: 'white',
    textAlign: 'center',
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: '100px',
    paddingBottom: '50px',
    marginTop: '100px',
    [theme.breakpoints.down('md')]: {
      paddingTop: '30px',
    },
  },
  marginAuto: {
    width: '80%',
    margin: '0 auto',
    marginTop: '-175px',
    [theme.breakpoints.down('md')]: {
      width: '90%',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '-91px',
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
  container: {
    paddingLeft: theme.spacing(0), // Adjust the spacing as needed
    paddingRight: theme.spacing(0), // Adjust the spacing as needed
    [theme.breakpoints.up('lg')]: {
      maxWidth: '1600px',
    },
  },
}));

const communitySlides = [
  {
    id: 1,
    type: 'content',
    name: 'Maryam Shah',
    designation: 'Language Teacher at KGS',
    iconColor: '#08026B',
    testimonial:
      'Adoption of Knowledge Platform was the best decision KGS ever made. It is an innovative system which is helping teachers to engage the students in grasping the concepts easily.',
  },
  {
    id: 2,
    type: 'content',
    name: 'Miss Nabila Anjum',
    designation: 'Primary Headmistress at Chiniot Islamia School & College, FSD',
    iconColor: '#E406B3',
    testimonial:
      'I thank Knowledge Platform for enhancing my skills and capabilities as a teacher, which will have a positive impact on my students.',
  },
  {
    id: 3,
    type: 'content',
    name: 'Miss Shazia Atta',
    designation: 'Teacher at Kohinoor Grammar School',
    iconColor: '#00C443',
    testimonial:
      'Knowledge platform inculcates cognitive learning and integrated skills simultaneously. is a great and unique platform which provides us the facility to delve deep in the ocean of learning.',
  },
  {
    id: 4,
    type: 'content',
    name: 'Manzoor Ilahi',
    designation: 'Director at Alpine Grammar School, Sialkot',
    iconColor: '#C43B00',
    testimonial:
      'Thank you, KP for assisting us in developing our students to thrive in a competitive era. A supportive environment, active engagement, and effective learning empowered us to overcome the challenges of technological adaptation.',
  },
  {
    id: 5,
    type: 'content',
    name: 'Anonymous',
    designation: 'Teacher at Beaconhouse School System (BSS)',
    iconColor: '#1B00C4',
    testimonial:
      'In the current tech era, the new learning experience is designed to benefit both students and teachers by being easy and convenient. For students, who are increasingly tech-savvy, this approach enhances their learning experience and make it enjoyable.',
  },
];

function OurCommunity({ texts }) {
  const classes = useStyles();
  return (
    <Box className={`${classes.root} community-section`}>
      <Box className="community-section-bg"></Box>
      <Container maxWidth={false} disableGutters className={classes.container}>
        <Grid container spacing={4} direction="column" alignItems="center">
          <Grid item>
            <Box className={classes.marginAuto}>
              <Box>
                <Fade top>
                  <img src={IMAGES.HEART_IMAGE} alt="Bonzo Logo" width="30" height="26" />
                </Fade>
              </Box>
              <Fade>
                <H2 fontWeight="600" className={classes.mainTitle} color="#112D70">
                  {texts.OUR_COMMUNITY_TITLE}
                </H2>
              </Fade>
            </Box>
          </Grid>
          <CustomSlider className="community-slick-arrow cs-arrow-adjustment" slidesData={communitySlides} slidesToShow={3} />
        </Grid>
      </Container>
    </Box>
  );
}

export default OurCommunity;
