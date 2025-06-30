import React from 'react';
import Fade from 'react-reveal/Fade';
import { Box, makeStyles } from '@material-ui/core';
import { Account } from 'Actions';
import { Button, ButtonText, H2 } from 'Components';
import { PageSwitch } from 'Navigation';
import { DefaultNav } from 'Navigation/Paths';
import { DEMO_USER } from 'Constants';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: 'white',
    textAlign: 'center',
    paddingLeft: 0,
    paddingRight: 0,
  },
  container: {
    paddingLeft: theme.spacing(0), // Adjust the spacing as needed
    paddingRight: theme.spacing(0), // Adjust the spacing as needed
    [theme.breakpoints.up('lg')]: {
      maxWidth: '1600px',
    },
  },
  impactText: {
    zIndex: '1',
    width: '100%',
  },
  impactTextInner: {
    width: '605px',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: '380px',
    },
  },
  mainTitle: {
    fontSize: '48px',
    marginBottom: '50px',
    marginTop: '100px',
    [theme.breakpoints.down('md')]: {
      fontSize: '36px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '28px',
    },
  },
  impactTextBtn: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
}));

function EducationImpactSection({ texts, greenGuardiansInstance }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleDemo = () => {
    dispatch(Account.GuestLogin(DEMO_USER, texts));
  };

  return (
    <>
      <Box className={`${classes.root} impact-section`}>
        <Box className={greenGuardiansInstance ? '' : 'impact-section-curve'}></Box>
        <Box className="impact-section-overlay"></Box>
        <Box className={classes.impactText}>
          <Box className={classes.impactTextInner}>
            <Fade top>
              {greenGuardiansInstance ? (
                <>
                  <H2 fontWeight="700" className={classes.mainTitle} color="#fff">
                    {texts.GG_IMPACT_TEXT_1} <br />
                  </H2>
                </>
              ) : (
                <>
                  <H2 fontWeight="700" className={classes.mainTitle} color="#fff">
                    {texts.IMPACT_TEXT_1} <br />
                    {texts.IMPACT_TEXT_2}
                    <span style={{ color: '#02BBFE', paddingLeft: 8 }}>{texts.IMPACT_TEXT_3} </span>
                  </H2>
                </>
              )}
            </Fade>
          </Box>
          <Box className={classes.impactTextBtn}>
            <Fade bottom>
              <Button
                className="fadeInLeft animated"
                data-wow-delay="0.85s"
                tag="forLearners"
                borderRadius={15}
                width="290px"
                height="48px"
                background="#00BBFF"
                // onClick={handleDemo}
                onClick={greenGuardiansInstance ? () => PageSwitch(DefaultNav.PROGRAM_GLC) : handleDemo}
              >
                <ButtonText color="#fff" fontSize="18px" fontWeight="600" letterSpacing="0.5px">
                  {/* {texts.EXPLORE_FREE_COMPETITIONS} */}
                  {greenGuardiansInstance ? texts.GG_FIND_OUT_MORE : texts.EXPLORE_FREE_COMPETITIONS}
                </ButtonText>
              </Button>             
            </Fade>

            {!greenGuardiansInstance && (
              <>
                <Fade bottom>
                  <Button
                    className="fadeInLeft animated"
                    data-wow-delay="0.85s"
                    tag="forLearners"
                    borderRadius={15}
                    width="290px"
                    height="48px"
                    background="#ffffff"
                    onClick={() => {
                      PageSwitch(DefaultNav.CONTACT_US);
                    }}
                  >
                    <ButtonText color="#00BBFF" fontSize="18px" fontWeight="600" letterSpacing="0.5px">
                      {texts.SCHEDULE_A_DEMO}
                    </ButtonText>
                  </Button>
                </Fade>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default EducationImpactSection;
