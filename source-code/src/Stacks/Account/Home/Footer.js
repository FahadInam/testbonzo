import React from 'react';
import { Box, Grid, makeStyles, Container, Link } from '@material-ui/core';
import { IMAGES } from 'Constants';
// import { PageSwitch } from 'Navigation';
// import { AccountNav } from 'Navigation/Paths';
import { Body1, ButtonText } from 'Components';
import { PageSwitch } from 'Navigation';
import { AccountNav, DefaultNav } from 'Navigation/Paths';
import { AppControl } from 'Actions';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#094a90',
    [theme.breakpoints.down('sm')]: {
      // paddingLeft: 15,
      // paddingRight: 15,
    },
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    width: '200px',
    '& img': {
      width: '100%',
      height: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      width: '130px',
    },
    [theme.breakpoints.down('md')]: {
      width: '180px',
      margin: '0 auto',
      marginBottom: '20px',
    },
  },
  section: {
    marginBottom: theme.spacing(2),
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    marginBottom: theme.spacing(1),
    display: 'block',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  bottomFooter: {
    color: '#fff',
    borderTop: '1px solid #fff',
    flexWrap: 'wrap',
    paddingTop: '15px',
    paddingBottom: '15px',
  },
  bottomLinks: {
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  container: {
    paddingLeft: theme.spacing(0), // Adjust the spacing as needed
    paddingRight: theme.spacing(0), // Adjust the spacing as needed
    [theme.breakpoints.up('lg')]: {
      maxWidth: '1600px',
    },
  },
  footerContainer: {
    paddingLeft: '70px',
    paddingRight: '70px',
    [theme.breakpoints.down('md')]: {
      paddingLeft: '20px',
      paddingRight: '20px',
    },
  },
  linkStyle: {
    margin: '0 20px',
    [theme.breakpoints.down('md')]: {
      margin: '0 10px',
    },
    [theme.breakpoints.down('md')]: {
      margin: '0 7px',
    },
    '&:hover': {
      textDecoration: 'none',
      color: '#f7c72e',
    },
  },
  linkTextStyle: {
    borderBottom: '1px dotted #fff',
    paddingBottom: '5px',
    '&:hover': {
      color: '#f7c72e',
      borderBottom: '1px dotted #ff0',
      transition: '.2s ease-in-out',
    },
  },
  linksBox: {
    [theme.breakpoints.down('md')]: {
      marginBottom: '20px',
    },
  },
}));

const Footer = ({ texts, scrollToSection, refs, greenGuardiansInstance }) => {
  const socialMediaLinks = [
    {
      url: 'https://www.facebook.com/knowledgeplatform/',
      icon: 'facebook_icon',
    },
    {
      url: 'https://twitter.com/kplearning',
      icon: 'twitter_icon',
    },
    {
      url: 'https://www.linkedin.com/company/knowledge-platform',
      icon: 'linkedIn_icon',
    },
    {
      url: 'https://www.youtube.com/channel/UC5LwaQtX1wKakNJqgUNG2jQ',
      icon: 'youtube_icon',
    },
    {
      url: 'https://www.instagram.com/knowledge.platform/',
      icon: 'instagram_icon',
    },
  ];

  const classes = useStyles();
  return (
    <Box className={classes.footer}>
      <Container maxWidth={false} disableGutters className={classes.container}>
        <Grid container alignItems="center" className={`${classes.footerContainer} footer-outer`}>
          <Grid item xs={12} sm={12} md={12} lg={3}>
            <Box className={classes.logo} justifyContent="center">
              <img src={greenGuardiansInstance ? IMAGES.GG_TAGLINE_WHITE_LOGO : IMAGES.TAGLINE_WHITE_LOGO} alt="Bonzo Logo" />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={7} lg={6}>
            <Box className={`${classes.linksBox} footer-nav text-center`}>
              <Link
                component="button"
                variant="body2"
                onClick={() => scrollToSection(refs.heroSectionRef)}
                className={`${classes.linkStyle} sButton`}
                data-sid={texts.HOME.toLowerCase()}
              >
                <ButtonText className={classes.linkTextStyle} color="#fff" fontSize="16px" fontWeight="400">
                  {texts.HOME}
                </ButtonText>
              </Link>
              <Link
                component="button"
                variant="body2"
                onClick={() => scrollToSection(refs.featuresRef)}
                className={`${classes.linkStyle} sButton`}
                data-sid={texts.FRONT_MENU_FEATURES.toLowerCase()}
              >
                <ButtonText className={classes.linkTextStyle} color="#fff" fontSize="16px" fontWeight="400">
                  {texts.FRONT_MENU_FEATURES}
                </ButtonText>
              </Link>
              <Link
                component="button"
                data-sid={texts.SIGN_UP.toLowerCase()}
                variant="body2"
                onClick={() => {
                  PageSwitch(AccountNav.SIGN_UP);
                  AppControl.SetLoginType(false);
                  AppControl.SetLoginComingFrom('signUp');
                }}
                className={`${classes.linkStyle} sButton`}
              >
                <ButtonText className={classes.linkTextStyle} color="#fff" fontSize="16px" fontWeight="400">
                  {texts.SIGN_UP}
                </ButtonText>
              </Link>

              {!greenGuardiansInstance && (
                <>
                  <Link
                    component="button"
                    data-sid={texts.FRONT_FOOTER_PRIVACY_LABEL.toLowerCase()}
                    variant="body2"
                    onClick={() => {
                      PageSwitch(DefaultNav.PRIVACY_POLICY);
                    }}
                    className={`${classes.linkStyle} sButton`}
                  >
                    <ButtonText className={classes.linkTextStyle} color="#fff" fontSize="16px" fontWeight="400">
                      {texts.FRONT_FOOTER_PRIVACY_LABEL}
                    </ButtonText>
                  </Link>
                </>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={3}>
            <Box className="social-icons-footer d-flex" justifyContent="center">
              {socialMediaLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="sLink"
                  data-sid={link.icon.toLowerCase()}
                >
                  <Box
                    className={`sm-bottom-icons ${link.icon}`}
                    component="div" // Use `component="div"` to render the Box as a div
                  />
                </a>
              ))}
            </Box>
          </Grid>
        </Grid>
        <Grid container alignItems="center" justifyContent="center" className={classes.bottomFooter}>
          <Body1 color="#fff" className="poppins-font-400" fontSize="14px">
            {texts.FRONT_FOOTER_CC_PRE}
            {new Date().getFullYear()}
            &nbsp;
            <a
              href="http://www.knowledgeplatform.com/"
              className="footer-company-link sLink"
              target="_blank"
              rel="noreferrer noopener"
              data-sid={texts.FRONT_FOOTER_CC_NAME.toLowerCase()}
            >
              {texts.FRONT_FOOTER_CC_NAME}
            </a>
            {texts.FRONT_FOOTER_CC_POST}
          </Body1>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
