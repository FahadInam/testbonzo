import React, { useEffect, useRef, useState } from 'react';
import { Box, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import Header from './Header';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import CompetitionsSection from './CompetitionsSection';
import OurCommunity from './OurCommunity';
import Footer from './Footer';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// import { parseHash } from 'Utils/GoogleAuth';
import { GetAllCompetitions } from 'Actions';
// import { useLocation } from 'react-router-dom';
import EducationImpactSection from './EducationImpactSection';
import SkillsIconSlider from './SkillsIconSlider';
import BackToTop from './BackToTop';
import DemoCompetitions from './DemoCompetitions';
import useCompetitionLoader from 'Utils/useCompetitionLoader';
import WhoIsIt from './WhoIsIt';
import YourJourney from './YourJourney';
import ContactUs from './ContactUs';
import { getInstanceType } from 'Utils';
import { GetInstanceConfig } from 'Actions/config.action';
import { INSTANCES_ID } from 'Constants/instance.config';

// import { PageSwitch } from 'Navigation';
// import { DefaultNav } from 'Navigation/Paths';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
  },
  sliderContainer: {
    background: '#F1F5F7',
  },
}));

function Home() {
  const classes = useStyles();
  const { texts } = useTheme();
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const [showBackToTop, setShowBackToTop] = useState(false);

  const { competitions, status } = useCompetitionLoader(GetAllCompetitions);
  const Login_CF = useSelector((state) => state.LoginType.comingFrom, shallowEqual);
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const greenGuardiansInstance = getInstanceType(Inst_config.instance_id, INSTANCES_ID.GLOBAL_CLIMATE_LITERACY_ID);
  const config = useSelector((state) => state.GetInstanceConfig, shallowEqual);
  const theme = useTheme();
  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down('md'));
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const competitionsRef = useRef(null);
  const heroSectionRef = useRef(null);
  const [isPageReload, setIsPageReload] = useState(false);
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  // const scrollToSection = (ref) => {
  //   const paddingTop = 20; // Set your desired padding value
  //   const element = ref.current;
  //   const y = element.getBoundingClientRect().top + window.scrollY - paddingTop;
  //   window.scrollTo({ top: y, behavior: 'smooth' });
  // };

  const [shouldRender, setShouldRender] = useState(false);

  // const landingNavigationCallback = () => {
  //   setShouldRender(true);
  // };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // LandingPageNavigation(Inst_config.instance_id, landingNavigationCallback);
    setShouldRender(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.href]);

  useEffect(() => {
    if (shouldRender) {
      const scrollEl = scrollRef.current;

      window.onresize = () => {
        scrollEl.scroll();
      };

      const handleScroll = () => {
        if (scrollEl.scrollTop > 500) {
          setShowBackToTop(true);
        } else {
          setShowBackToTop(false);
        }
      };

      scrollEl.addEventListener('scroll', handleScroll);

      return () => {
        scrollEl.removeEventListener('scroll', handleScroll);
        window.onresize = null;
      };
    }
  }, [shouldRender]);

  useEffect(() => {
    if (config && !window.isCompLauch && !isPageReload && !greenGuardiansInstance) {
      dispatch(GetAllCompetitions());
    }
    if (!isPageReload) {
      setIsPageReload(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  useEffect(() => {
    if (!config && !greenGuardiansInstance) {
      dispatch(GetInstanceConfig({}, texts));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, Login_CF, config]);

  if (!shouldRender) {
    return null; // Optionally, you can show a loading indicator here
  }

  return (
    <>
      <Box className="full-height">
        <Box ref={scrollRef} className={`${classes.root} scroll`}>
          <Header texts={texts} />
          <Box ref={heroSectionRef}>
            <HeroSection texts={texts} isTabletOrMobile={isTabletOrMobile} />
          </Box>
          <Box className={classes.sliderContainer}>
            <SkillsIconSlider className="skills-slider" />
          </Box>
          <DemoCompetitions
            texts={texts}
            competitions={competitions}
            status={status}
            greenGuardiansInstance={greenGuardiansInstance}
          />
          <Box ref={featuresRef}>
            <FeaturesSection texts={texts} greenGuardiansInstance={greenGuardiansInstance} />
          </Box>
          <WhoIsIt texts={texts} />

          {/* new section comment for now */}
          <Box>
            <CompetitionsSection texts={texts} greenGuardiansInstance={greenGuardiansInstance} />
          </Box>

          {/* new section comment for now */}
          <YourJourney texts={texts} greenGuardiansInstance={greenGuardiansInstance} />
          {!greenGuardiansInstance && <OurCommunity texts={texts} />}
          <EducationImpactSection texts={texts} greenGuardiansInstance={greenGuardiansInstance} />
          <ContactUs texts={texts} greenGuardiansInstance={greenGuardiansInstance} />
          <Footer
            texts={texts}
            scrollToSection={scrollToSection}
            refs={{ heroSectionRef, featuresRef, howItWorksRef, competitionsRef }}
            greenGuardiansInstance={greenGuardiansInstance}
          />
          <BackToTop show={showBackToTop} scrollRef={scrollRef} />
        </Box>
      </Box>
    </>
  );
}

export default Home;
