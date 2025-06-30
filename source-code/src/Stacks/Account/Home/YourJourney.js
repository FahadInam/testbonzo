import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Grid, makeStyles } from '@material-ui/core';
import Fade from 'react-reveal/Fade';
import { Body1, H2 } from 'Components';
import { IMAGES } from 'Constants';
import { getInstanceText } from 'Utils';
import { shallowEqual, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // paddingTop: '50px',
    paddingBottom: '100px',
    [theme.breakpoints.down('md')]: {
      paddingTop: '0px',
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
    width: '100%',
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
    padding: '28px',
    [theme.breakpoints.down('md')]: {
      padding: '0px',
      marginBottom: '20px',
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
    border: '1px solid #DCDCDC',
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
  /* accordion styling */
  accordionDataGrid: {
    width: '80%',
    margin: '0 auto',
    marginTop: '50px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  singleAccordionBox: {
    width: '100%',
    margin: '0 auto',
    marginBottom: '15px',
    borderRadius: '20px',
    background: '#dbf1ff',
    boxShadow: 'none',
    '&:first-child': {
      borderTopLeftRadius: '20px',
      borderTopRightRadius: '20px',
    },
    '&:last-child': {
      borderBottomLeftRadius: '20px',
      borderBottomRightRadius: '20px',
    },
    '&:before': {
      background: 'transparent',
    },
    [theme.breakpoints.down('md')]: {
      borderRadius: '15px',
      marginBottom: '5px',
      '&:first-child': {
        borderTopLeftRadius: '15px',
        borderTopRightRadius: '15px',
      },
    },
  },
  accordionSummaryBox: {
    height: '70px',
    padding: '0 40px',
    [theme.breakpoints.down('xs')]: {
      padding: '0 20px',
    },
  },
  accordionTitle: {
    fontSize: '24px',
    color: '#0A1E46',
    fontWeight: '600',
    position: 'relative',
    paddingLeft: '20px', // Adjust padding to make space for the circle
    [theme.breakpoints.down('md')]: {
      fontSize: '20px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: '53%',
      transform: 'translateY(-50%)',
      width: '7px', // Width of the circle
      height: '7px', // Height of the circle
      backgroundColor: '#000', // Circle color
      borderRadius: '50%', // Makes the shape a circle
    },
  },
  accordionDetailTitle: {
    fontSize: '20px',
    width: '100%',
    display: 'block',
    color: '#000000',
    [theme.breakpoints.down('md')]: {
      fontSize: '18px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
    },
    '& span': {
      paddingLeft: '5px',
    },
  },
  accordionDetailText: {
    fontSize: '18px',
    // display: 'block',
    width: '100%',
    color: '#000000',

    [theme.breakpoints.down('md')]: {
      fontSize: '16px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '15px',
    },
  },
  accordionDetailBox: {
    padding: '30px 40px',
    width: '100%',
    borderTop: '3px solid #ffffff',
    [theme.breakpoints.down('md')]: {
      padding: '30px 25px',
    },
  },
  accordionDetailSection: {
    padding: '0',
  },
  accordionIcon: {
    width: '28px',
    [theme.breakpoints.down('md')]: {
      width: '22px',
    },
  },
  listItemBox: {
    padding: '10px 0px',
    '& span': {
      display: 'block',
      width: '100%',
      position: 'relative',
      paddingLeft: '20px', // Adjust padding to make space for the circle
      marginBottom: '8px',
      '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        // top: '55%',
        top: '14px',
        transform: 'translateY(-50%)',
        width: '5px', // Width of the circle
        height: '5px', // Height of the circle
        backgroundColor: '#000', // Circle color
        borderRadius: '50%', // Makes the shape a circle
      },
    },
  },
}));

const YourJourney = ({ texts, greenGuardiansInstance }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState('panel1');
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box className={classes.root}>
      <Container maxWidth={false} disableGutters className={classes.container}>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Fade>
              <Box className={`${classes.header}`} data-wow-delay="0.4s">
                <Box className={classes.marginAuto}>
                  <H2 fontWeight="600" className={classes.mainTitle} color="#112D70">
                    {getInstanceText(texts, 'START_YOUR_JOURNEY_TITLE', Inst_config.instance_id)}
                  </H2>
                </Box>
              </Box>
            </Fade>
          </Grid>
        </Grid>

        <Grid item container justifyContent="center" className={classes.accordionDataGrid}>
          {/* Accordion panel 1 */}
          <Accordion className={classes.singleAccordionBox} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
              className={classes.accordionSummaryBox}
              //   expandIcon={<ExpandMoreIcon />}
              expandIcon={
                expanded === 'panel1' ? (
                  <img src={IMAGES.ACCORDION_MINUS_ICON} className={classes.accordionIcon} alt="minus icon" />
                ) : (
                  <img src={IMAGES.ACCORDION_PLUS_ICON} className={classes.accordionIcon} alt="plus icon" />
                )
              }
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Body1 className={classes.accordionTitle}>How can my organisation get started?</Body1>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetailSection}>
              <Box className={classes.accordionDetailBox}>
                <Box mb={2}>
                  <Body1 className={`${classes.accordionDetailTitle} poppins-font-600`}>
                    {greenGuardiansInstance
                      ? 'Sign up for any or all of our four competitions held throughout the year.​'
                      : 'Sign Up for Existing Competitions'}
                  </Body1>
                  <Body1 className={`${classes.accordionDetailText} poppins-font-400`}>
                    {greenGuardiansInstance
                      ? 'Participate in our Global Climate Literacy Competitions for Grades 6, 7, and 8.'
                      : 'Participate in Bonzo’s competitions – perfect for organizations looking to quickly launch interactive and impactful learning experiences.'}
                  </Body1>
                </Box>
                {!greenGuardiansInstance && (
                  <>
                    <Box>
                      <Body1 className={`${classes.accordionDetailTitle} poppins-font-600`}>Launch Your Own Competition</Body1>
                      <Body1 className={`${classes.accordionDetailText} poppins-font-400`}>
                        Customise and host your own competition with the following options:
                      </Body1>
                    </Box>
                    <Box className={classes.listItemBox}>
                      <Body1
                        className={`${classes.itemCentered} ${classes.cardText} poppins-font-400`}
                        textAlign="left"
                        color="#000000"
                      >
                        Choose from our extensive library of interactive games.
                      </Body1>
                      <Body1
                        className={`${classes.itemCentered} ${classes.cardText} poppins-font-400`}
                        textAlign="left"
                        color="#000000"
                      >
                        Host a competition using our ready-made competitions to engage your participants.
                      </Body1>
                      <Body1
                        className={`${classes.itemCentered} ${classes.cardText} poppins-font-400`}
                        textAlign="left"
                        color="#000000"
                      >
                        Design and host your own games and competitions tailored to your specific needs.
                      </Body1>
                    </Box>
                  </>
                )}
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Accordion panel 2 */}
          <Accordion className={classes.singleAccordionBox} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary
              className={classes.accordionSummaryBox}
              expandIcon={
                expanded === 'panel2' ? (
                  <img src={IMAGES.ACCORDION_MINUS_ICON} className={classes.accordionIcon} alt="minus icon" />
                ) : (
                  <img src={IMAGES.ACCORDION_PLUS_ICON} className={classes.accordionIcon} alt="plus icon" />
                )
              }
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Body1 className={classes.accordionTitle}>What is the learner’s journey?</Body1>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetailSection}>
              <Box className={classes.accordionDetailBox}>
                <Box mb={2}>
                  <Body1 className={`${classes.accordionDetailTitle} poppins-font-600`}>Introduction and Sign-up</Body1>
                  <Body1 className={`${classes.accordionDetailText} poppins-font-400`}>
                    {greenGuardiansInstance
                      ? 'Learners sign up and create their profiles.'
                      : 'Learners sign up and create their profiles on Bonzo.'}
                  </Body1>
                </Box>
                <Box mb={2}>
                  <Body1 className={`${classes.accordionDetailTitle} poppins-font-600`}>Participate in Competitions</Body1>
                  <Body1 className={`${classes.accordionDetailText} poppins-font-400`}>
                    They engage in interactive games and challenges.
                  </Body1>
                </Box>
                <Box mb={2}>
                  <Body1 className={`${classes.accordionDetailTitle} poppins-font-600`}>Track Progress and Earn Rewards</Body1>
                  <Body1 className={`${classes.accordionDetailText} poppins-font-400`}>
                    They track their progress, see their rankings, and earn rewards and badges.
                  </Body1>
                </Box>
                <Box mb={2}>
                  <Body1 className={`${classes.accordionDetailTitle} poppins-font-600`}> Receive Feedback and Improve </Body1>
                  <Body1 className={`${classes.accordionDetailText} poppins-font-400`}>
                    They receive feedback on their performance to identify areas for improvement.
                  </Body1>
                </Box>
                <Box mb={2}>
                  <Body1 className={`${classes.accordionDetailTitle} poppins-font-600`}> Complete the Competition </Body1>
                  <Body1 className={`${classes.accordionDetailText} poppins-font-400`}>
                    Learners finish the competition, review their results, and reflect on their journey.
                  </Body1>
                </Box>
                <Box mb={2}>
                  <Body1 className={`${classes.accordionDetailTitle} poppins-font-600`}> Ongoing Learning and Engagement </Body1>
                  <Body1 className={`${classes.accordionDetailText} poppins-font-400`}>
                    They continue to engage with new games and competitions, promoting continuous learning and growth.
                  </Body1>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Accordion panel 3 */}
          <Accordion className={classes.singleAccordionBox} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummary
              className={classes.accordionSummaryBox}
              expandIcon={
                expanded === 'panel3' ? (
                  <img src={IMAGES.ACCORDION_MINUS_ICON} className={classes.accordionIcon} alt="minus icon" />
                ) : (
                  <img src={IMAGES.ACCORDION_PLUS_ICON} className={classes.accordionIcon} alt="plus icon" />
                )
              }
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Body1 className={classes.accordionTitle}>How can you partner and sponsor with us?</Body1>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetailSection}>
              <Box className={classes.accordionDetailBox}>
                {greenGuardiansInstance ? (
                  <>
                    <Box mb={2}>
                      <Body1 className={`${classes.accordionDetailTitle} poppins-font-600`}>Co-branding Partnerships</Body1>
                      <Body1 className={`${classes.accordionDetailText} poppins-font-400`}>
                        Partner with the Global Climate Literacy Competitions to co-brand competitions and reach a broad audience of
                        learners. Enhance your brand visibility with innovative, game-based learning.
                      </Body1>
                    </Box>
                    <Box mb={2}>
                      <Body1 className={`${classes.accordionDetailTitle} poppins-font-600`}>Content Partnerships</Body1>
                      <Body1 className={`${classes.accordionDetailText} poppins-font-400`}>
                        Collaborate as a Content Partner to develop engaging climate literacy games and educational material.
                        Contribute your expertise to help shape the learning experience and make a lasting impact on students
                        worldwide.
                      </Body1>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box mb={2}>
                      <Body1 className={`${classes.accordionDetailTitle} poppins-font-600`}>Co-Branding Opportunities</Body1>
                      <Body1 className={`${classes.accordionDetailText} poppins-font-400`}>
                        Partner with Bonzo to co-brand competitions and reach a broad audience of learners. Enhance your brand
                        visibility with innovative, game-based learning. 
                      </Body1>
                    </Box>
                  </>
                )}
                <Box mb={2}>
                  <Body1 className={`${classes.accordionDetailTitle} poppins-font-600`}>Sponsor Prizes</Body1>
                  <Body1 className={`${classes.accordionDetailText} poppins-font-400`}>
                    Sponsor prizes for our competitions to motivate and reward participants. Your sponsorship can include branded
                    merchandise, scholarships, or other valuable rewards.
                  </Body1>
                </Box>
                {!greenGuardiansInstance && (
                  <Box mb={2}>
                    <Body1 className={`${classes.accordionDetailTitle} poppins-font-600`}>Engage a Wide Network of Students</Body1>
                    <Body1 className={`${classes.accordionDetailText} poppins-font-400`}>
                      Use Bonzo to engage with a diverse network of students. Our proven success in driving engagement and learning
                      outcomes ensures your partnership will have a meaningful impact.
                    </Body1>
                    <Body1 className={`${classes.accordionDetailText} poppins-font-400`}>
                      Our partnerships have consistently led to increased brand recognition and positive educational outcomes. Join us
                      to contribute to and benefit from our success.
                    </Body1>
                  </Box>
                )}
              </Box>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Container>
    </Box>
  );
};

export default YourJourney;
