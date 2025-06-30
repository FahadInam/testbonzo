import {
  AppBar,
  Toolbar,
  Hidden,
  Drawer,
  List,
  ListItem,
  Box,
  makeStyles,
  Container,
  Grid,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  //useMediaQuery,
} from '@material-ui/core';
import { Body1, ButtonText } from 'Components';
import { IMAGES } from 'Constants';
import { Button } from 'Components';
import React, { useEffect, useState } from 'react';
import { PageSwitch } from 'Navigation';
import { AccountNav, DefaultNav } from 'Navigation/Paths';
import { AppControl } from 'Actions';
import { InlineButton } from 'Components/Core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { useLocation } from 'react-router-dom';
import { getInstanceType, getTabIndexFromPath, isGreenGuardiansInstance } from 'Utils';
import { shallowEqual, useSelector } from 'react-redux';
import { INSTANCES_ID, PATHS } from 'Constants/instance.config';

const useStyles = makeStyles((theme) => ({
  menuItem: {
    padding: '0 15px',
    marginLeft: '20px',
    marginRight: '20px',
    [theme.breakpoints.down('lg')]: {
      padding: '0',
      marginLeft: '10px',
      marginRight: '10px',
    },
  },
  gclc_menuItem: {
    padding: '0 15px',
    marginLeft: '10px',
    marginRight: '10px',
    '@media (max-width: 1342px)': {
      padding: '0 10px',
      marginLeft: '5px',
      marginRight: '5px',
    },
    '@media (max-width: 1232px)': {
      padding: '0 10px',
      marginLeft: '2px',
      marginRight: '2px',
    },
  },
  appBarContainer: {
    paddingTop: 12,
    paddingBottom: 12,
    borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
    // marginRight: 7,
    [theme.breakpoints.down('md')]: {
      marginRight: 0,
      paddingTop: 5,
      paddingBottom: 5,
    },
  },
  container: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    [theme.breakpoints.up('lg')]: {
      maxWidth: '1600px',
    },
  },
  burgerContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    cursor: 'pointer',
    backgroundColor: '#F1F5F7',
    borderRadius: '15px',
    padding: '14px',
    marginLeft: '15px',
    '&:hover': {
      backgroundColor: '#e3f8fe !important',
    },
  },
  bar: {
    width: '25px',
    height: '3px',
    backgroundColor: '#25221e',
    margin: '2.5px 0',
    transition: '0.4s',
    borderRadius: '100px',
  },
  drawerMenu: {
    width: '100%',
    maxWidth: '100%',
    margin: '0 auto',
    padding: '0 48px',
    [theme.breakpoints.down('sm')]: {
      padding: '0',
    },
  },
  listItem: {
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 25,
    borderRadius: 10,
    '&:hover': {
      backgroundColor: '#e3f8fe',
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: 15,
      paddingBottom: 15,
    },
  },
  toolbarStyle: {
    paddingLeft: '70px',
    paddingRight: '70px',
    [theme.breakpoints.down('md')]: {
      paddingLeft: '20px',
      paddingRight: '20px',
    },
  },
  drawerFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '25px 0',
    [theme.breakpoints.down('sm')]: {
      padding: '15px',
    },
  },
  closeIconBtn: {
    borderRadius: '15px',
    backgroundColor: '#F1F5F7',
    '&:hover': {
      backgroundColor: '#e3f8fe !important',
    },
  },
  closeIcon: {
    color: '#25221e',
    fontSize: '28px',
  },
  drawerMenuHeader: {
    padding: '16px 0',
    paddingBottom: '0',
    [theme.breakpoints.down('sm')]: {
      padding: '16px',
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
  },
  listStyle: {
    padding: '15px 0',
  },
  responsiveLogo: {
    height: '35px',
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0px',
    },
  },
  backdrop: {
    backdropFilter: 'blur(8px)',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  headerLogo: {
    cursor: 'pointer',
    width: '178px',
    // height: '48px',
    [theme.breakpoints.down('md')]: {
      width: '140px',
      // height: '38px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '110px',
      // height: '38px',
    },
  },
  headerLogoGG: {
    cursor: 'pointer',
    width: '230px',
    // height: '48px',
    [theme.breakpoints.down('md')]: {
      width: '170px',
      // height: '38px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '140px',
      // height: '38px',
    },
  },
  menuWithSubMenu: {
    marginTop: '50px',
    marginLeft: '10px',
    borderRadius: '15px',
  },
  downArrow: {
    display: 'inline-block',
    width: '12px',
    marginLeft: '8px',
  },
  downArrowImage: {
    width: '100%',
  },
  subMenuItem: {
    fontWeight: '600',
    borderRadius: '10px !important',
    width: '160px',
    color: '#000 !important',
    '&:hover': {
      backgroundColor: '#00BCFF !important',
      borderRadius: '4px !important',
    },
    [theme.breakpoints.down('md')]: {
      width: '260px',
    },
  },
  iframeBox: {
    top: '90px',
    paddingBottom: '70px',
    [theme.breakpoints.down('md')]: {
      top: '76px',
    },
    [theme.breakpoints.down('xs')]: {
      top: '68px',
    },
  },
  selected: {
    backgroundColor: '#00bbff', // Selected background color
    color: '#ffffff', // Selected text color
    [theme.breakpoints.down('lg')]: {
      padding: '0 10px',
    },
    '&:hover': {
      backgroundColor: '#00bbff', // Hover background color
      color: '#ffffff', // Hover text color (you can change this if needed)
    },
  },
  selectedText: {
    color: '#ffffff',
  },
  nonSelected: {
    backgroundColor: '#ffffff', // Non-selected background color
    color: '#000000', // Non-selected text color
  },
  login_btn: {
    marginLeft: '30px',
    width: '130px',
  },
  gclc_login_btn: {
    marginLeft: '30px',
    width: '130px',
    '@media (max-width: 1342px)': {
      marginLeft: '15px',
      width: '110px',
    },
  },
  signup_btn: {
    marginLeft: '16px',
    width: '130px',
  },
  gclc_signup_btn: {
    marginLeft: '16px',
    width: '130px',
    '@media (max-width: 1342px)': {
      marginLeft: '12px',
      width: '110px',
    },
  },
}));

function Header({ texts, scrollToSection }) {
  const classes = useStyles();
  const location = useLocation();

  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const webLogoSrc = Inst_config ? Inst_config.logo.web_dark : '';
  const isGlobalClimate = getInstanceType(Inst_config.instance_id, INSTANCES_ID.GLOBAL_CLIMATE_LITERACY_ID);

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const tabIndex = getTabIndexFromPath(location.pathname, Inst_config.landing_navigation);

    setSelectedTab(tabIndex);
  }, [location.pathname, Inst_config.landing_navigation]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const currentPath = location.pathname;
  const navigateToPage = (targetPath, navigationConstant) => {
    if (currentPath === targetPath) {
      return;
    } else {
      PageSwitch(navigationConstant);
    }
  };

  const closeIframeAndNavigate = (ref, name, index) => {
    if (isGlobalClimate) {
      setSelectedTab(name);
    }

    if (isGreenGuardiansInstance && name === 'Competitions') {
      navigateToPage(PATHS.PROGRAM_GLC, DefaultNav.PROGRAM_GLC);
    } else {
      PageSwitch(DefaultNav.MAIN);
      if (ref && ref.current) {
        scrollToSection(ref);
      }
    }
  };

  const handleSubMenuClick = (item, index) => {
    //console.log('item--->', item);
    switch (item.id) {
      case 'PROGRAM_SITAREY':
        navigateToPage(PATHS.PROGRAM_SITAREY, DefaultNav.PROGRAM_LAUNCH);
        break;
      case 'PROGRAM_GLC':
        navigateToPage(PATHS.PROGRAM_GLC, DefaultNav.PROGRAM_GLC);
        break;
      case 'CONTACT_US':
        navigateToPage(PATHS.CONTACT_US, DefaultNav.CONTACT_US);
        break;
      case 'GCLC_RESULT':
        navigateToPage(PATHS.GCLC_RESULT, DefaultNav.GCLC_RESULT);
        break;
      case 'GREEN_STAR_SCHOOLS':
        navigateToPage(PATHS.GREEN_STAR_SCHOOLS, DefaultNav.GREEN_STAR_SCHOOL);
        break;
      default:
        break;
    }

    setAnchorEl(null);
  };

  return (
    <Box className={classes.appBarBox}>
      <AppBar position="fixed" className={classes.appBarContainer} elevation={0}>
        <Container maxWidth={false} disableGutters className={classes.container}>
          <Toolbar className={`${classes.toolbarStyle} ${isGlobalClimate ? 'gclc_toolbar_box' : ''}`}>
            <Box display="flex" alignItems="center" className="fadeInDown animated" flexGrow={1}>
              <img
                src={webLogoSrc}
                className={`${classes.headerLogo} sImage ${isGlobalClimate ? classes.headerLogoGG : ''}`}
                data-sid="bonzo"
                alt="Bonzo"
                onClick={() => PageSwitch(DefaultNav.MAIN)}
              />
            </Box>
            <Hidden only={isGreenGuardiansInstance ? ['xs', 'sm', 'md', 'lg'] : ['xs', 'sm', 'md']} implementation="css">
              {Inst_config.landing_navigation.map((item, index) =>
                item.hasSubMenu && !isGlobalClimate ? (
                  <React.Fragment key={index}>
                    <InlineButton
                      className={`${classes.menuItem} fadeInDown animated`}
                      onClick={handleMenuClick}
                      data_sid={item?.name?.toLowerCase()}
                    >
                      <Body1 color="#000" fontSize="18px" fontWeight="600">
                        {item.name}
                        <span className={classes.downArrow}>
                          <img src={IMAGES.DOWN_ARROW} alt="Game-based learning" className={classes.downArrowImage} />
                        </span>
                      </Body1>
                    </InlineButton>
                    <Menu
                      className={classes.menuWithSubMenu}
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      {item.subMenuItems &&
                        item.subMenuItems.map((subItem, subIndex) => (
                          <MenuItem
                            key={subIndex}
                            className={`${classes.subMenuItem} sList`}
                            onClick={() => handleSubMenuClick(subItem, subIndex)}
                            data-sid={subItem?.name?.toLowerCase()}
                          >
                            {subItem.name}
                          </MenuItem>
                        ))}
                    </Menu>
                  </React.Fragment>
                ) : (
                  <InlineButton
                    key={index}
                    className={`${isGlobalClimate ? classes.gclc_menuItem : classes.menuItem} fadeInDown  animated  ${
                      selectedTab === item?.name ? classes.selected : classes.nonSelected
                    }`}
                    data_sid={item?.name?.toLowerCase()}
                    onClick={() => (item.ref ? handleSubMenuClick(item, index) : closeIframeAndNavigate(item.ref, item.name, index))}
                  >
                    <Body1
                      color="#000"
                      fontSize="18px"
                      fontWeight="600"
                      className={`${selectedTab === item?.name ? classes.selectedText : classes.nonSelectedText}`}
                    >
                      {isGreenGuardiansInstance ? (item.name === 'Competitions' ? 'Competition' : item.name) : item.name}
                    </Body1>
                  </InlineButton>
                )
              )}

              <Button
                className={`fadeInDown animated ${isGlobalClimate ? classes.gclc_login_btn : classes.login_btn}`}
                data-wow-delay="0.85s"
                border="2px solid #02BBFE"
                background="#fff"
                // width="130px"
                borderRadius={15}
                onClick={() => {
                  PageSwitch(AccountNav.LOGIN);
                  AppControl.SetLoginType(false);
                  AppControl.SetLoginComingFrom('login');
                }}
                m={0}
                // ml={5}
              >
                <ButtonText color="#02BBFE" fontSize="18px" fontWeight="600" letterSpacing="0.5px">
                  {texts.LOGIN}
                </ButtonText>
              </Button>

              <Button
                className={`fadeInDown animated ${isGlobalClimate ? classes.gclc_signup_btn : classes.signup_btn}`}
                data-wow-delay="0.85s"
                tag="forLearners"
                borderRadius={15}
                // width="130px"
                background="#00BBFF"
                onClick={() => {
                  PageSwitch(AccountNav.SIGN_UP);
                  AppControl.SetLoginType(false);
                  AppControl.SetLoginComingFrom('signUp');
                  AppControl.SetSignUpComingFrom(false);
                }}
                m={0}
                // ml={2}
              >
                <ButtonText color="#fff" fontSize="18px" fontWeight="600" letterSpacing="0.5px">
                  {texts.SIGN_UP}
                </ButtonText>
              </Button>
            </Hidden>
            <Hidden only={isGreenGuardiansInstance ? ['xl'] : ['lg', 'xl']} implementation="css">
              <div style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}>
                <Grid container direction="column" className={classes.burgerContainer} onClick={handleDrawerToggle}>
                  <Grid item className={classes.bar}></Grid>
                  <Grid item className={classes.bar}></Grid>
                  <Grid item className={classes.bar}></Grid>
                </Grid>
                <Box>
                  <Button
                    border="2px solid #02BBFE"
                    background="#fff"
                    width="120px"
                    borderRadius={15}
                    onClick={() => {
                      PageSwitch(AccountNav.LOGIN);
                      AppControl.SetLoginType(false);
                      AppControl.SetLoginComingFrom('login');
                    }}
                    m={0}
                  >
                    <ButtonText color="#02BBFE" fontSize="18px" fontWeight="600" letterSpacing="0.5px">
                      {texts.LOGIN}
                    </ButtonText>
                  </Button>
                </Box>
              </div>
            </Hidden>
          </Toolbar>
          <Drawer
            anchor="top"
            open={drawerOpen}
            onClose={handleDrawerToggle}
            classes={{ paper: classes.drawerMenu }}
            ModalProps={{
              BackdropProps: {
                classes: {
                  root: classes.backdrop,
                },
              },
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" className={classes.drawerMenuHeader}>
              <img src={webLogoSrc} alt="Bonzo" className={classes.responsiveLogo} />
              <IconButton onClick={handleDrawerToggle} className={classes.closeIconBtn}>
                <CloseIcon className={classes.closeIcon} />
              </IconButton>
            </Box>
            <List className={classes.listStyle}>
              {Inst_config.landing_navigation.map((item, index) =>
                item.hasSubMenu && !isGlobalClimate ? (
                  <div key={index}>
                    <ListItem button onClick={handleMenuClick} className={classes.listItem}>
                      <Body1 color="#000" fontSize="18px" fontWeight="400">
                        {item.name}
                        <span className={classes.downArrow}>
                          <img src={IMAGES.DOWN_ARROW} alt="Game-based learning" className={classes.downArrowImage} />
                        </span>
                      </Body1>
                    </ListItem>
                    <Menu
                      className={classes.menuWithSubMenu}
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      {item.subMenuItems &&
                        item.subMenuItems.map((subItem, subIndex) => (
                          <MenuItem
                            key={subIndex}
                            className={classes.subMenuItem}
                            onClick={() => {
                              handleDrawerToggle();
                              handleSubMenuClick(subItem);
                            }}
                          >
                            {subItem.name}
                          </MenuItem>
                        ))}
                    </Menu>
                  </div>
                ) : (
                  <ListItem
                    button
                    key={index}
                    onClick={() => {
                      handleDrawerToggle();
                      item.ref ? handleSubMenuClick(item) : closeIframeAndNavigate(item.ref, item.name);
                    }}
                    className={classes.listItem}
                  >
                    <Body1 color="#000" fontSize="18px" fontWeight="400">
                      {isGreenGuardiansInstance ? (item.name === 'Competitions' ? 'Competition' : item.name) : item.name}
                    </Body1>
                  </ListItem>
                )
              )}
            </List>
            <Divider />
            <Grid container className={classes.drawerFooter}>
              <Grid item xs={6}>
                <Button
                  border="2px solid #02BBFE"
                  background="#fff"
                  width="100%"
                  borderRadius={15}
                  onClick={() => {
                    setDrawerOpen(!drawerOpen);
                    PageSwitch(AccountNav.LOGIN);
                    AppControl.SetLoginType(false);
                    AppControl.SetLoginComingFrom('login');
                  }}
                  m={0}
                  mr={1}
                >
                  <ButtonText color="#02BBFE" fontSize="18px" fontWeight="600" letterSpacing="0.5px">
                    {texts.LOGIN}
                  </ButtonText>
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  tag="forLearners"
                  borderRadius={15}
                  width="100%"
                  background="#00BBFF"
                  onClick={() => {
                    setDrawerOpen(!drawerOpen);
                    PageSwitch(AccountNav.SIGN_UP);
                    AppControl.SetLoginType(false);
                    AppControl.SetLoginComingFrom('signUp');
                    AppControl.SetSignUpComingFrom(false);
                  }}
                  m={0}
                  ml={1}
                >
                  <ButtonText color="#fff" fontSize="18px" fontWeight="600" letterSpacing="0.5px">
                    {texts.SIGN_UP}
                  </ButtonText>
                </Button>
              </Grid>
            </Grid>
          </Drawer>
        </Container>
      </AppBar>
    </Box>
  );
}

export default Header;
