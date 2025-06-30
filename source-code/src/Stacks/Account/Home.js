import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, ButtonText } from 'Components';
import Fade from 'react-reveal/Fade';
import smoothscroll from 'smoothscroll-polyfill';
import config from 'react-reveal/globals';
import { useDispatch } from 'react-redux';
import { useTheme, Box, Grid } from '@material-ui/core';
import phoneImage from 'Assets/home-img/phone-image.png';
import icon1 from 'Assets/home-img/icon-1.png';
import icon2 from 'Assets/home-img/icon-2.png';
import icon3 from 'Assets/home-img/icon-3.png';
import laptop1b from 'Assets/home-img/laptop_1b.png';
import gaming1b from 'Assets/home-img/gaming_1b.png';
import rewards1b from 'Assets/home-img/rewards_1b.png';
import LSPImage from 'Assets/home-img/lsp.png';
import review1 from 'Assets/home-img/review1.jpg';
import review2 from 'Assets/home-img/review2.jpg';

import appStoreIcon from 'Assets/home-img/app-store-icon.png';
import googlePlayIcon from 'Assets/home-img/google-play-icon.png';
import quotes1 from 'Assets/home-img/quotes-1.jpg';
import quotes2 from 'Assets/home-img/quotes-2.jpg';
import mobileDownload from 'Assets/home-img/mobile_download.png';

import 'Assets/css/home-style.css';
import { PageSwitch } from 'Navigation';
import { AccountNav, DefaultNav } from 'Navigation/Paths';
import { AppControl } from 'Actions';
config({ ssrFadeout: true });
smoothscroll.polyfill();

const Home = () => {
  const { texts } = useTheme();
  const scrollRef = useRef();
  const location = useLocation();
  const buttonUp = useRef();
  const buttonUp2 = useRef();
  const pageWrap = useRef();
  const gameOnEntryWrapper = useRef();
  const navbarSupportedContent = useRef();

  const mainImage1 = useRef();
  const gameOnAboutPage = useRef();
  const MainFeaturesBoxes1 = useRef();
  const MainFeaturesBoxes2 = useRef();
  const MainFeaturesBoxes3 = useRef();

  const pImage1 = useRef();
  const pImage2 = useRef();
  const pImage3 = useRef();
  const pImage4 = useRef();

  const ua = window.navigator.userAgent;
  const iOS = ua.match(/iPad/i) || ua.match(/iPhone/i);
  const webkit = ua.match(/WebKit/i);
  const iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

  const toggleNavBar = () => {
    const x = document.getElementsByClassName('navbarSupportedContent')[0];
    if (!x) return;
    if (x.className.indexOf('navbarSupportedContent collapse wow animated fadeInDown navbar-collapse') > -1) {
      x.className = 'navbarSupportedContent wow animated fadeInDown navbar-collapse';
    } else {
      x.className = 'navbarSupportedContent collapse wow animated fadeInDown navbar-collapse';
    }
  };

  useEffect(() => {
    const scrollEl = scrollRef.current;
    const MainImage = mainImage1.current;
    const btn = buttonUp.current;
    const btn2 = buttonUp2.current;

    window.onresize = () => {
      scrollEl.scroll();
    };

    scrollEl.addEventListener('scroll', () => {
      // FOR GOTO TOP BUTTON
      if (scrollEl.scrollTop > 600) {
        if (btn.className.indexOf(' show') === -1) btn.className += ' show';
        if (btn2.className.indexOf(' show') === -1) btn2.className += ' show';
      } else {
        if (btn.className.indexOf(' show') > -1) btn.className = btn.className.replace(' show', '');
        if (btn2.className.indexOf(' show') > -1) btn2.className = btn2.className.replace(' show', '');
      }
      // scrollEl.scrollTop

      if (iOSSafari) {
        MainImage.style.marginTop = '0px';
        MainImage.style.Top = '0px';
      } else {
        const scrT = scrollEl.scrollTop * -0.8;
        MainImage.style.top = `${scrT}px`;
      }
    });

    return () => {
      scrollEl.removeEventListener('scroll', null);
      window.onresize = null;
    };
  }, [iOSSafari]);

  const goToTop = (e) => {
    e.preventDefault();
    document.querySelector('.gameOn-entry-wrapper').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Box className="fullHeight">
        <Box ref={scrollRef} className="scroll">
          <button className="btn buttonUp btnTOC" ref={buttonUp} type="button" onClick={goToTop}>
            <i className="i i-top insideButtonUpArrow" />
            <small className="btt-text">{texts.BACK_TO_TOP}</small>
          </button>
          <button
            type="button"
            className="btn btnTOC buttonUp buttonUp2"
            ref={buttonUp2}
            onClick={() => {
              PageSwitch(AccountNav.SIGN_UP);
            }}
          >
            <i className="i insideButtonUpArrow insideButtonSingUpSymbol i-enter" />
            <small className="btt-text">{texts.SIGN_UP}</small>
          </button>
          <div ref={pageWrap}>
            <Box className="gameOn-entry-wrapper" ref={gameOnEntryWrapper}>
              <nav className="container navbar navbar-expand-lg main-navbar-nav navbar-light navBgGrad noWrapDiv">
                <a data-scroll href="# " role="button" className="navbar-brand">
                  <div className="gameOn-logo-image" />
                </a>
                <div className="wrapDiv">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    onClick={toggleNavBar}
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon" />
                  </button>

                  <div
                    className="navbarSupportedContent collapse wow animated fadeInDown navbar-collapse"
                    ref={navbarSupportedContent}
                  >
                    <div className="cssNavMenu">
                      <ul className="navbar-nav nav-items-center ml-auto mr-12">
                        <li className="nav-item">
                          <a
                            href="# "
                            role="button"
                            className="nav-link gameOn-menu-links"
                            onClick={(e) => {
                              e.preventDefault();
                              document.querySelector('.gameOn-advantages-outer').scrollIntoView({ behavior: 'smooth' });
                            }}
                          >
                            {texts.FRONT_MENU_ABOUT}
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="# "
                            role="button"
                            className="nav-link gameOn-menu-links"
                            onClick={(e) => {
                              e.preventDefault();
                              document.querySelector('.gameOn-features-outer').scrollIntoView({ behavior: 'smooth' });
                            }}
                          >
                            {texts.FRONT_MENU_FEATURES}
                          </a>
                        </li>

                        <li className="nav-item">
                          <a
                            href="# "
                            role="button"
                            className="nav-link gameOn-menu-links"
                            onClick={(e) => {
                              e.preventDefault();
                              document.querySelector('.gameOn-bottom-outer').scrollIntoView({ behavior: 'smooth' });
                            }}
                          >
                            {texts.FRONT_MENU_APP}
                          </a>
                        </li>
                      </ul>
                    </div>
                    {/* <div className="social-icons-header">
                      <div
                        className="nav-item active gameOn-navbar-login-button"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          PageSwitch(AccountNav.LOGIN);
                        }}
                      >
                        <a
                          data-scroll
                          href="!#"
                          type="button"
                          className="nav-link signup-text"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          {texts.LOGIN}
                        </a>
                      </div>
                    </div> */}
                  </div>
                </div>
              </nav>
              <div className="container gameOn-entry-inner">
                <h1 className="animated fadeIn wow" data-wow-delay="0.4s">
                  {texts.FRONT_MAIN_HEADING_1}
                </h1>
                <p className="animated fadeIn wow" data-wow-delay="0.67s">
                  {texts.FRONT_MAIN_SUB_HEADING_1}
                  <br />
                  {texts.FRONT_MAIN_SUB_HEADING_2}
                  <br />
                  {texts.FRONT_MAIN_SUB_HEADING_3}
                </p>

                <Grid>
                  <Grid item>
                    <Button
                      className="animated fadeInLeft wow"
                      data-wow-delay="0.85s"
                      tag="signUp"
                      background="#fff"
                      width="150px"
                      height="56px"
                      onClick={() => {
                        PageSwitch(AccountNav.LOGIN);
                        AppControl.SetLoginType(false);
                        AppControl.SetLoginComingFrom('login');
                      }}
                    >
                      <ButtonText>{texts.LOGIN}</ButtonText>
                    </Button>

                    <Button
                      className="animated fadeInLeft wow"
                      data-wow-delay="0.85s"
                      tag="signUp"
                      width="170px"
                      height="56px"
                      onClick={() => {
                        PageSwitch(AccountNav.SIGN_UP);
                        AppControl.SetLoginType(false);
                        AppControl.SetLoginComingFrom('signUp');
                      }}
                    >
                      <ButtonText color="#fff">{texts.SIGN_UP}</ButtonText>
                    </Button>

                    <Button
                      className="animated fadeInLeft wow"
                      data-wow-delay="0.95s"
                      tag="playAsGuest"
                      background="#00BBFF"
                      width="180px"
                      height="56px"
                      onClick={() => {
                        // dispatch(Account.GuestEntrance());
                        // AppControl.SetLoginComingFrom('guest');
                      }}
                    >
                      <ButtonText color="#fff">{texts.PLAY_AS_GUEST}</ButtonText>
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      className="fadeInLeft animated"
                      data-wow-delay="0.85s"
                      tag="forLearners"
                      borderRadius={15}
                      width="190px"
                      height="56px"
                      background="#00BBFF"
                      onClick={() => {
                        PageSwitch(AccountNav.LOGIN);
                        AppControl.SetLoginType(false);
                        AppControl.SetLoginComingFrom('forLearners');
                      }}
                    >
                      <ButtonText fontWeight="700" color="#fff">
                        {texts.FOR_LEARNERS}
                      </ButtonText>
                    </Button>
                    <Button
                      className="fadeInLeft animated"
                      data-wow-delay="0.85s"
                      tag="forInstitutions"
                      width="210px"
                      height="56px"
                      borderRadius={15}
                      background="#fff"
                      onClick={() => {
                        PageSwitch(AccountNav.LOGIN);
                        AppControl.SetLoginType(true);
                        AppControl.SetLoginComingFrom('forInstitutions');
                      }}
                    >
                      <ButtonText fontWeight="700" color="#00BBFF">
                        {texts.FOR_INSTITUTIONS}
                      </ButtonText>
                    </Button>
                  </Grid>
                </Grid>

                {/* <Parallax y={[-200, 200]} tagOuter="figure"> */}
                <img
                  src={phoneImage}
                  className="gameOn-entry-smartphone animated fadeInRight wow"
                  data-wow-delay="1s"
                  ref={mainImage1}
                  alt="my img"
                />
                {/* </Parallax> */}
              </div>
            </Box>
            <section className="gameOn-advantages-outer">
              <div className="container">
                <Fade>
                  <h1 ref={gameOnAboutPage} className="second-title">
                    <span className="span-perfect">{texts.FRONT_ROTE_LEARNING_HEADING_1}</span>
                    <span className="span-features">{texts.FRONT_ROTE_LEARNING_HEADING_2}</span>
                  </h1>
                  <small>{texts.FRONT_ROTE_LEARNING_SUB_HEADING}</small>
                </Fade>
                <Grid container spacing={4} className="row gameOn-advantages-grid-columns wow animated fadeIn" data-wow-delay="0.36s">
                  <Grid item md={4} xs={12} className="col-sm-4 image-main-feature">
                    <Fade left>
                      <div ref={MainFeaturesBoxes1} className="MainFeaturesBoxes ">
                        <img loading="lazy" className="grid-image" src={icon1} alt="Icon-1" />
                        <h1 className="grid-title">{texts.FRONT_ROTE_BOX_1_TITLE}</h1>
                        <p className="grid-desc">{texts.FRONT_ROTE_BOX_1_DESCRIPTION}</p>
                      </div>
                    </Fade>
                  </Grid>
                  <Grid item md={4} xs={12} className="col-sm-4 image-main-feature">
                    <Fade bottom>
                      <div
                        className="MainFeaturesBoxes wow animated slideInUp"
                        ref={MainFeaturesBoxes2}
                        style={{ backgroundColor: '#FF6377' }}
                        data-wow-duration="2s"
                      >
                        <img loading="lazy" className="grid-image" src={icon2} alt="Icon-2" />
                        <h1 className="grid-title">{texts.FRONT_ROTE_BOX_2_TITLE}</h1>
                        <p className="grid-desc">{texts.FRONT_ROTE_BOX_2_DESCRIPTION}</p>
                      </div>
                    </Fade>
                  </Grid>
                  <Grid item md={4} xs={12} className="col-sm-4 image-main-feature">
                    <Fade right>
                      <div
                        className="MainFeaturesBoxes wow animated slideInRight"
                        ref={MainFeaturesBoxes3}
                        style={{
                          backgroundColor: '#00DBAA',
                        }}
                        data-wow-duration="1s"
                      >
                        <img loading="lazy" className="grid-image" src={icon3} alt="Icon-3" />
                        <h1 className="grid-title">{texts.FRONT_ROTE_BOX_3_TITLE}</h1>
                        <p className="grid-desc">
                          {texts.FRONT_ROTE_BOX_3_DESCRIPTION}
                          <br />
                          <br />
                          &nbsp;
                        </p>
                      </div>
                    </Fade>
                  </Grid>
                </Grid>
              </div>
            </section>
            <div className="curved-bg-div" />
            <section id="gameOn-features" className="gameOn-features-outer">
              <div className="container">
                <Grid container justifyContent="center" spacing={10} className="row gameOn-features-grid-columns">
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    className="col-sm-6 in-order-1 each-row-space wow animated fadeInLeft"
                    data-wow-delay="0.22s"
                  >
                    <Fade left>
                      <Box display="flex" justifyContent="center" direction="column">
                        <div className="col-sm-image-container">
                          <img
                            loading="lazy"
                            className="img-float-left image-main-feature"
                            src={laptop1b}
                            alt="laptop-1"
                            ref={pImage1}
                          />
                          <span className="span-new image-main-feature2 span-new2">{texts.FRONT_F1_C1}</span>
                          <span className="span-free image-main-feature2">{texts.FRONT_F1_C2}</span>
                        </div>
                      </Box>
                    </Fade>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    className="col-sm-6 in-order-2 sm-6-content wow animated fadeInRight"
                    data-wow-delay="0.22s"
                  >
                    <Fade right cascade>
                      <Box display="flex" justifyContent="flex-start" alignItems="flex-start" m={6} flexDirection="column">
                        <h1>{texts.FRONT_F1_HEADING}</h1>
                        <div className="uvp-list">
                          {/* <p> */}
                          <ul>
                            <li>{texts.FRONT_F1_P1}</li>
                            <li className="secondImageList">{texts.FRONT_F1_P2}</li>
                            <li className="thirdImageList">{texts.FRONT_F1_P3}</li>
                          </ul>
                          {/* </p> */}
                        </div>
                      </Box>
                    </Fade>
                  </Grid>
                  <Grid item xs={12}>
                    &nbsp;
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    className="col-sm-6 in-order-3 each-row-space sm-6-content wow animated fadeInLeft"
                    data-wow-delay="0.22s"
                  >
                    <Fade left>
                      <Box
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                        m={8}
                        flexDirection="column"
                        style={{ textAlign: 'right' }}
                      >
                        <h1>{texts.FRONT_F2_HEADING}</h1>
                        <p>{texts.FRONT_F2_P1}</p>
                      </Box>
                    </Fade>
                  </Grid>
                  <Grid item xs={12} sm={6} className="col-sm-6 in-order-4 wow animated fadeInRight" data-wow-delay="0.22s">
                    <Fade right>
                      <Box display="flex" justifyContent="center" alignItems="center">
                        <img
                          loading="lazy"
                          className="img-float-right image-main-feature"
                          src={gaming1b}
                          style={{ marginTop: '70px' }}
                          alt="gaming-2"
                          ref={pImage2}
                        />
                      </Box>
                    </Fade>
                  </Grid>
                  <Grid item xs={12}>
                    &nbsp;
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    className="col-sm-6 in-order-5 each-row-space wow animated fadeInLeft"
                    data-wow-delay="0.22s"
                  >
                    <Fade left>
                      <Box display="flex" justifyContent="center" alignItems="center" m={8}>
                        <div className="col-sm-image-container">
                          <img
                            loading="lazy"
                            className="img-float-left image-main-feature2 m-rewards-image"
                            src={rewards1b}
                            style={{ marginLeft: '0px!important' }}
                            alt=" rewards-3"
                            ref={pImage3}
                          />
                          <span className="span-data image-main-feature2">{texts.FRONT_F3_C1}</span>
                          <span className="span-percent image-main-feature2">{texts.FRONT_F3_C2}</span>
                        </div>
                      </Box>
                    </Fade>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    className="col-sm-6 in-order-6 sm-6-content wow animated fadeInRight"
                    data-wow-delay="0.22s"
                  >
                    <Fade left cascade>
                      <Box display="flex" justifyContent="left" alignItems="flex-start" m={8} flexDirection="column">
                        <h1>{texts.FRONT_F3_HEADING}</h1>

                        <div className="uvp-list">
                          {/* <p> */}
                          <ul>
                            <li className="fourthImageList">{texts.FRONT_F3_P1}</li>
                            <li className="fifthImageList">{texts.FRONT_F3_P2}</li>
                            <li className="sixthImageList">{texts.FRONT_F3_P3}</li>
                          </ul>
                          {/* </p> */}
                        </div>
                      </Box>
                    </Fade>
                  </Grid>
                </Grid>
              </div>
              <div className="curved-bgInv-div" />
            </section>
            <section className="gameOn-LSP-outer" style={{ maxWidth: '1600px', margin: 'auto' }}>
              <Grid
                spacing={8}
                container
                className="wow fadeIn animated"
                data-wow-delay="0.25s"
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12} sm={12} md={12} lg={6}>
                  <Fade>
                    <Box mt={12} ml={6} mr={6}>
                      <h1 className="gameOn-LSP-heading">{texts.FRONT_LSP_HEADING}</h1>
                      <small className="gameOn-lsp-sub-line">{texts.FRONT_LSP_SUB_HEADING}</small>
                    </Box>
                  </Fade>
                  <Fade left cascade>
                    <Box mt={2} mr={6} ml={6}>
                      <ul className="gameOn-lsp-list">
                        <li>{texts.FRONT_LSP_P1}</li>
                        <li>{texts.FRONT_LSP_P2}</li>
                        <li>{texts.FRONT_LSP_P3}</li>
                        <li>{texts.FRONT_LSP_P4}</li>
                        <li>{texts.FRONT_LSP_P5}</li>
                      </ul>
                    </Box>
                  </Fade>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                  <Fade right>
                    <Box className="gameOn-lsp-right" mt={12} ml={4} mr={4}>
                      <img className="gameOn-lsp-img" loading="lazy" src={LSPImage} alt="LSP" />
                    </Box>
                  </Fade>
                  <Fade bottom>
                    <Box className="gameOn-lsp-right" mt={-4} ml={5} mr={5}>
                      <Button
                        className="btn btn-md btnTOC gameOn-lsp-join-button"
                        onClick={() => {
                          window.open('https://www.learnsmartpakistan.org/');
                        }}
                      >
                        {texts.FRONT_LSP_BTN}
                      </Button>
                    </Box>
                  </Fade>
                </Grid>
              </Grid>
            </section>

            <div id="gameOn-reviews" className="gameOn-reviews-outer">
              <Fade>
                <h1>{texts.FRONT_REVIEWS_HEADING}</h1>
                <small>{texts.FRONT_REVIEWS_SUB_HEADING}</small>
              </Fade>
              <div className="container gameOn-reviews-inner">
                <Grid container justifyContent="center" spacing={10} className="row justify-content-center">
                  <Grid item xs={12} sm={6} className="col-sm-5 testimonial wow fadeIn animated" data-wow-delay="0.25s">
                    <Fade left>
                      <img loading="lazy" className="float-left" src={quotes1} alt="Quote 1" />
                      <div className="gameOn-review-col">
                        <div className="gameOn-review-imgCol">
                          <img src={review1} loading="lazy" className="gameOn-review-img" alt="" />
                        </div>
                        <Box className="each-testimonial-text-author-pair">
                          <p className="testimonial-desc">{texts.FRONT_REVIEW_1_TEXT}</p>
                          <small className="testimonial-author">{texts.FRONT_REVIEW_1_AUTHOR}</small>
                        </Box>
                      </div>
                      <img loading="lazy" className="float-right" src={quotes2} alt="Quote 2" />
                    </Fade>
                  </Grid>
                  <Grid item xs={12} sm={6} className="col-sm-5 testimonial testimonial-2 wow fadeIn animated" data-wow-delay="0.67s">
                    <Fade right>
                      <img loading="lazy" className="float-left" src={quotes1} alt="Quote 1" />
                      <div className="gameOn-review-col">
                        <div className="gameOn-review-imgCol">
                          <img src={review2} loading="lazy" className="gameOn-review-img" alt="" />
                        </div>
                        <Box className="each-testimonial-text-author-pair">
                          <p className="testimonial-desc">{texts.FRONT_REVIEW_2_TEXT}</p>
                          <small className="testimonial-author">{texts.FRONT_REVIEW_2_AUTHOR}</small>
                        </Box>
                      </div>
                      <img loading="lazy" className="float-right" src={quotes2} alt="Quote 2" />
                    </Fade>
                  </Grid>
                </Grid>
              </div>
              <Box mt={12}>&nbsp;</Box>
            </div>
            <div className="curved-bg-div bottom-div-bg" />
            <section id="gameOn-download" className="gameOn-bottom-outer">
              <div className="container gameOn-bottom-inner">
                <Grid container className="row" display="flex">
                  <Grid item xs={12} md={6} className="col-lg-6">
                    <Fade left>
                      <Box display="flex" justifyContent="center" m="5%" spacing={0} alignItems="center" flexDirection="column">
                        <h1>{texts.FRONT_MOBILE_APP_HEADING}</h1>
                        <p>{texts.FRONT_MOBILE_APP_DESC}</p>
                        <Box className="gameOn-coming-soon" style={{ display: 'none' }}>
                          {texts.FRONT_MOBILE_APP_BTN}
                        </Box>
                        <Box display="flex" justifyContent="flex-start" alignItems="flex-start" m={0} spacing={0} flexDirection="row">
                          <Grid container className="row" spacing={2} display="flex">
                            <Grid item xs={12} md={6}>
                              <a
                                data-scroll
                                className="wow fadeIn animated"
                                data-wow-delay="0.67s"
                                href="!#"
                                onClick={() => {
                                  window.open('https://play.google.com/store/apps/details?id=com.knowledgeplatform.oneonone_quiz');
                                }}
                              >
                                <img loading="lazy" className="google-play-btn" src={googlePlayIcon} alt="Google Play Icon" />
                              </a>
                            </Grid>

                            <Grid item xs={12} md={6}>
                              <a data-scroll className="wow fadeIn animated" data-wow-delay="0.25s" href="!#">
                                <img loading="lazy" className="app-store-btn" src={appStoreIcon} alt="App Store Icon" />
                              </a>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                    </Fade>
                  </Grid>
                  <Grid item xs={12} md={6} className="col-lg-6 col-sm-6">
                    <Fade bottom>
                      <img
                        loading="lazy"
                        className="image_mobile_stores wow animated fadeInRight"
                        src={mobileDownload}
                        ref={pImage4}
                        alt="Download for Mobile"
                      />
                    </Fade>
                  </Grid>
                </Grid>
                {/* </div> */}
              </div>
            </section>
            <footer className="footer-outer">
              <div className="container footer-inner">
                <div className="footer-three-grid wow fadeIn animated" data-wow-delay="0.66s">
                  <div className="column-1-3">
                    <div className="gameOn-logo-image gameOn-logo-footer mt0" />
                  </div>
                  <div className="column-2-3">
                    <nav className="footer-nav">
                      <ul className="bottom-ul-footer">
                        <a
                          href="# "
                          role="button"
                          onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('.gameOn-entry-wrapper').scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          <li>{texts.HOME}</li>
                        </a>
                        <a
                          href="# "
                          role="button"
                          onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('.gameOn-features-outer').scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          <li>{texts.FRONT_MENU_FEATURES}</li>
                        </a>
                        <a
                          data-scroll
                          href="# "
                          role="button"
                          onClick={() => {
                            PageSwitch(AccountNav.SIGN_UP);
                          }}
                        >
                          <li>{texts.SIGN_UP}</li>
                        </a>
                        <a
                          href="# "
                          role="button"
                          onClick={(e) => {
                            e.preventDefault();
                            const btn = buttonUp.current;
                            const btn2 = buttonUp2.current;
                            btn.className = btn.className.replace(' show', '');
                            btn2.className = btn2.className.replace(' show', '');
                            PageSwitch(DefaultNav.PRIVACY_POLICY);
                            // setPopUpVisible(true);
                          }}
                        >
                          <li>{texts.FRONT_FOOTER_PRIVACY_LABEL}</li>
                        </a>
                      </ul>
                    </nav>
                  </div>
                  <div className="column-3-3">
                    <div className="social-icons-footer">
                      <a href="https://www.facebook.com/knowledgeplatform/" target="_blank" rel="noreferrer noopener">
                        <div className="sm-bottom-icons facebook_icon" />
                      </a>
                      <a href="https://twitter.com/kplearning" target="_blank" rel="noreferrer noopener">
                        <div className="sm-bottom-icons twitter_icon" />
                      </a>
                      <a href="https://www.linkedin.com/company/knowledge-platform" target="_blank" rel="noreferrer noopener">
                        <div className="sm-bottom-icons linkedIn_icon" />
                      </a>
                      <a href="https://www.youtube.com/channel/UC5LwaQtX1wKakNJqgUNG2jQ" target="_blank" rel="noreferrer noopener">
                        <div className="sm-bottom-icons youtube_icon" />
                      </a>
                      <a href="https://www.instagram.com/knowledge.platform/" target="_blank" rel="noreferrer noopener">
                        <div className="sm-bottom-icons instagram_icon" />
                      </a>
                    </div>
                  </div>
                </div>
                <p className="copyright">
                  {texts.FRONT_FOOTER_CC_PRE}
                  {new Date().getFullYear()}
                  &nbsp;
                  <a
                    href="http://www.knowledgeplatform.com/"
                    className="footer-company-link"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {texts.FRONT_FOOTER_CC_NAME}
                  </a>
                  {texts.FRONT_FOOTER_CC_POST}
                </p>
                {/* <div style={{ minHeight: '120px' }}>&nbsp;</div> */}
              </div>
            </footer>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Home;
