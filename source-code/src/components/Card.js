import React from 'react';
import { Box, makeStyles, Tooltip, Typography, useTheme } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import { H4, Body1 } from 'Components/Core';
import ButtonBold from 'Components/Core/ButtonBold';
import Paper from 'Components/Paper';
import ImageRotation from './ImageRotation';
import { Cordova } from 'Utils';
import { IMAGES } from 'Constants';
// import Image from './Image';

const useStyles = makeStyles((theme) => ({
  clickableCard: {
    cursor: 'pointer',
    borderRadius: '15px',
    '&:hover': {
      // background: "#EEEEEE",
      outline: '4px ridge rgba(0,0,0,0.5)',
      // boxShadow: '0px 0px 2px 2px rgba(7,88,117,0.78)',
    },
  },
  root: {
    // height: '100%',
    width: '100%',
    minWidth: '284px',
    maxWidth: '284px',
    // minWidth: '450px',
    // maxWidth: '450px',
    overflow: 'hidden',
    position: 'relative',
    margin: 'auto',
    backgroundColor: '#D5DBEA',
    boxShadow: '0px 8px 0px 0px rgba(0,0,0,0.3), 0px 3px 0px 0px rgba(0,0,0,0.8)',
    marginBottom: '15px',
    // minHeight: '240px',
  },
  rootB: {
    height: '100%',
    width: '100%',
    minWidth: '284px',
    maxWidth: '100%',
    overflow: 'hidden',
    position: 'relative',
    margin: 0,
    backgroundColor: '#ffffff',
    marginBottom: '8px',
    borderRadius: '15px',
    // minHeight: '240px',
  },
  image: {
    width: '98%',
    overflow: 'hidden',
    border: '5px solid white',
    textAlign: 'center',
    borderRadius: '15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '3px auto 0px auto',
    background: (props) => props.imgBackground || null,
    [theme.breakpoints.up('md')]: {
      maxWidth: (props) => props.imgWidth || '388px',
      maxHeight: '182px',
    },

    '& img': {
      width: '100%',
      maxWidth: (props) => props.imgWidth || '100%',
    },
  },
  chip: {
    background: 'rgba(0,0,0,0.55)',
    position: 'absolute',
    top: '16px',
    left: '12px',
    zIndex: 3,
    borderRadius: '15px',
    padding: '3px 8px',
    fontWeight: theme.typography.fontWeightMedium,
    minWidth: 44,
    visibility: 'hidden',
    // transform: 'translate3d(0,0,0)',
  },
  secondChip: {
    top: 'auto',
    bottom: '92px',
    right: '12px',
    left: 'auto',
    background: theme.palette.common.darkGreen,
    border: '1px solid rgba(255,255,255,.9)',
    boxShadow: '0 0 12px rgba(255,255,255,.55)',
  },
  thirdChip: {
    top: '16px',
    right: '12px',
    left: 'auto',

    color: '#d2ad29',
    boxShadow: '0 0 12px rgba(155,153,0,.55)',
    // color: theme.palette.common.red,
    background: theme.palette.common.white,
    fontWeight: 'bold',
    // border: '1px solid rgba(255,255,255,.9)',
    // boxShadow: '0 0 12px rgba(255,53,0,.55)',
  },
  skeleton: {
    background: theme.palette.action.skeleton,
    height: '180px',
    width: '272px',
  },
  buttonSkeleton: {
    margin: '0 auto',
    background: theme.palette.action.skeleton,
    borderRadius: '15px',
  },
  imgBackground: {
    width: '100%',
    overflow: 'hidden',
    border: '5px solid white',
    textAlign: 'center',
    borderRadius: '15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    background: theme.palette.grey['100'],
    height: '182px',
    '& img': {
      width: '80px',
    },
  },
  Cancelled: {
    borderRadius: '7px',
    background: theme.palette.common.red,
    padding: '0 15px',
    color: theme.palette.common.white,
  },
  Delivered: {
    borderRadius: '7px',
    background: theme.palette.common.green,
    padding: '0 15px',
    color: theme.palette.common.white,
  },
  Processing: {
    borderRadius: '7px',
    background: theme.palette.common.blue,
    padding: '0 15px',
    color: theme.palette.common.white,
  },
  buttonDisabled: {
    // hoverOpacity: 0.08,
    pointerEvents: 'none',
    cursor: 'default',
    // opacity: '0.5',
  },
  overlayCardTitle: {
    fontSize: '13px',
    fontWeight: '500',
    fontFamily: 'Poppins',
    marginLeft: '12px',
    marginRight: '12px',
    marginBottom: '8px',
    marginTop: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    '& .b': {
      fontWeight: '600!important',
    },
  },
  skeletonImage: {
    maxWidth: '100% !important',
    borderWidth: '10px',
    borderRadius: '25px',
    minHeight: '214px',
  },
  skeletonImageTitle: {
    background: 'rgb(0 0 0 / 5%) !important',
    position: 'absolute',
    width: '200px !important',
    height: '40px !important',
    top: '12px',
    borderRadius: '0 0 20px 20px',
  },
  subjectDetailSkeleton: {
    margin: '0 0 0 auto',
    height: '55px',
    borderRadius: '100px 0 0 100px',
  },
  loaderCardOuter: {
    minWidth: '450px',
    maxWidth: '450px',
    minHeight: '282px',
    height: '282px',
    '@media (max-width: 638.88px)': {
      minWidth: '100%',
      maxWidth: '100%',
      height: 'auto',
    },
  },
  myGamesLoaderCardOuter: {
    minWidth: '430px',
    maxWidth: '430px',
    '@media (max-width: 1630px)': {
      minWidth: '400px',
      maxWidth: '400px',
    },
    '@media (max-width: 1520px)': {
      minWidth: '360px',
      maxWidth: '360px',
    },
    '@media (max-width: 1400px)': {
      minWidth: '340px',
      maxWidth: '340px',
    },
    '@media (max-width: 1350px)': {
      minWidth: '320px',
      maxWidth: '320px',
    },
    '@media (max-width: 1290px)': {
      minWidth: '300px',
      maxWidth: '300px',
    },
    '@media (max-width: 1254px)': {
      minWidth: '290px',
      maxWidth: '290px',
    },
    '@media (max-width: 1207px)': {
      minWidth: '320px',
      maxWidth: '320px',
    },
    '@media (max-width: 1155px)': {
      minWidth: '380px',
      maxWidth: '380px',
    },
    '@media (max-width: 420px)': {
      minWidth: '340px',
      maxWidth: '340px',
    },
    '@media (max-width: 400px)': {
      minWidth: '290px',
      maxWidth: '290px',
    },
  },
  loaderCardOuterPG: {
    minHeight: '244px',
    height: '244px',
  },
  loaderCardInner: {
    minWidth: '450px',
    maxWidth: '450px',
    minHeight: '240px',
    '@media (max-width: 638.88px)': {
      minWidth: '100%',
      maxWidth: '100%',
    },
  },
  myGamesLoaderCardInner: {
    minWidth: '340px',
    '@media (max-width: 1520px)': {
      minWidth: '330px',
    },
    '@media (max-width: 1350px)': {
      minWidth: '310px',
    },
    '@media (max-width: 1290px)': {
      minWidth: '300px',
    },
    '@media (max-width: 1254px)': {
      minWidth: '290px',
    },

    [theme.breakpoints.down('sm')]: {
      minWidth: '100%',
    },
  },
}));

const useStyles2 = makeStyles((theme) => ({
  /* game card styling */
  rootGameCard: {
    height: '100%',
    width: '100%',
    minWidth: '450px',
    maxWidth: '450px',
    overflow: 'hidden',
    position: 'relative',
    margin: 'auto',
    cursor: 'pointer',
    borderRadius: '20px',
    boxShadow: ['0px 10px 0px -1px #D5DBEA', '0px 13px 0px -1px #000000'].join(','),
    marginBottom: '10px',
    [theme.breakpoints.down('sm')]: {
      minWidth: '100%',
      maxWidth: '100%',
    },
  },
  rootMyGameCard: {
    minWidth: '430px',
    maxWidth: '430px',
    '@media (max-width: 1650px)': {
      minWidth: '400px',
      maxWidth: '400px',
    },
    '@media (max-width: 1560px)': {
      minWidth: '380px',
      maxWidth: '380px',
    },
    '@media (max-width: 1520px)': {
      minWidth: '358px',
      maxWidth: '358px',
    },
    '@media (max-width: 1400px)': {
      minWidth: '360px',
      maxWidth: '360px',
    },
    '@media (max-width: 1350px)': {
      minWidth: '360px',
      maxWidth: '360px',
    },
    '@media (max-width: 1290px)': {
      minWidth: '355px',
      maxWidth: '355px',
    },
    '@media (max-width: 1254px)': {
      minWidth: '340px',
      maxWidth: '340px',
    },
    '@media (max-width: 1207px)': {
      minWidth: '355px',
      maxWidth: '355px',
    },
    '@media (max-width: 1155px)': {
      minWidth: '380px',
      maxWidth: '380px',
    },
    '@media (max-width: 420px)': {
      minWidth: '340px',
      maxWidth: '340px',
    },
    '@media (max-width: 400px)': {
      minWidth: '290px',
      maxWidth: '290px',
    },
  },
  rootBGameCard: {
    height: '100%',
    width: '100%',
    minWidth: '450px',
    maxWidth: '100%',
    overflow: 'hidden',
    position: 'relative',
    margin: 0,
    borderRadius: '20px',
    minHeight: '220px',
    cursor: 'pointer',
    padding: '15px;',
    [theme.breakpoints.down('sm')]: {
      minWidth: '100%',
    },
  },
  rootBMyGameCard: {
    minWidth: '340px',
    '@media (max-width: 1520px)': {
      minWidth: '330px',
    },
    '@media (max-width: 1350px)': {
      minWidth: '310px',
    },
    '@media (max-width: 1290px)': {
      minWidth: '300px',
    },
    '@media (max-width: 1254px)': {
      minWidth: '290px',
    },

    [theme.breakpoints.down('sm')]: {
      minWidth: '100%',
    },
  },
  gamePlate: {
    padding: '35px 25px 25px 25px',
    borderRadius: '15px',
    position: 'relative',
    minHeight: '214px',
    [theme.breakpoints.down('sm')]: {
      padding: '25px 25px 25px 25px',
      minHeight: '198px',
    },
  },
  subjectName: {
    position: 'absolute',
    background: 'rgb(1,1,1,0.5)',
    top: '0',
    left: '0',
    right: '0',
    //width: '65%',
    textAlign: 'center',
    margin: '0 auto',
    padding: '4px 20px 9px 20px',
    borderRadius: '0 0 20px 20px',
    /* truncate css */
    width: '265px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    /* truncate css */
    [theme.breakpoints.down('sm')]: {
      width: '85%',
      padding: '4px 15px 9px 15px',
      margin: '0px auto',
      left: 0,
      right: 0,
      textAlign: 'center',
    },
    '@media (min-width: 1207px) and (max-width: 1290px)': {
      width: '68%',
    },
  },
  subjectPlate: {
    borderRadius: '20px',
    width: '130px',
    height: '130px',
    minWidth: '130px',
    //background: 'rgb(1,1,1,0.5)',
    //padding: '10px',
    [theme.breakpoints.down('sm')]: {
      width: '90px',
      height: '90px',
      minWidth: '90px',
    },
    [theme.breakpoints.up('md')]: {
      width: '120px',
      height: '120px',
      minWidth: '120px',
    },
  },
  myGameSubjectPlate: {
    '@media (min-width: 1207px) and (max-width: 1290px)': {
      width: '90px',
      height: '90px',
      minWidth: '90px',
      marginRight: '10px !important',
    },
  },
  subjectTopicName: {
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    lineHeight: '32px',
    wordBreak: 'break-word',
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
      lineHeight: '25px',
    },
  },
  subjectTextPlate: {
    width: '100%',
    height: '150px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    // [theme.breakpoints.down('sm')]: {
    //   display: 'block',
    //   textAlign: 'center',
    // },
  },
  ribbonOverlay: {
    [theme.breakpoints.down('sm')]: {
      marginTop: '-25px',
    },
  },
  tickGreen: {
    position: 'absolute',
    zIndex: 100,
    color: 'white',
    backgroundColor: '#0bbc93',
    borderRadius: '100px',
    width: '28px',
    height: '28px',
    textAlign: 'center',
    lineHeight: '29px',
    top: '12px',
    left: '12px',
    boxShadow: '0 0 12px rgba(1, 1, 1, 0.55)',
    [theme.breakpoints.down('sm')]: {
      top: '-9px',
      left: '-9px',
    },
  },
  lessons_badge: {
    backgroundColor: '#29b358',
    // backgroundColor: '#112D70',
    // backgroundColor: 'lightgray',
    width: 'auto',
    height: 'auto',
    padding: '0px 12px',
    boxShadow: 'none',
    top: '220px',
    left: '8px',
    '& span': {
      // color: 'rgba(0, 0, 0, .50)',
      color: 'white',
      // color: 'white',
    },
    [theme.breakpoints.down('sm')]: {
      top: '207px',
      // left: '8px',
    },
  },
  light_opacity: {
    // opacity: '.5',
  },
  disable_cert: {
    pointerEvents: 'none !important',
    cursor: 'default !important',
  },
  // lockedGame: {
  //   opacity: 0.6,
  // },
  lockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    borderRadius: 'inherit',
  },
  lockIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 400,
  },
}));

export const Card = React.memo(
  ({
    item,
    callback,
    chip,
    iconImg,
    secondChip,
    thirdChip,
    extendedPrimaryTextHeight = false,
    imageAutoHeight = false,
    titleOverlay = false,
    noButton = false,
    heightFull,
  }) => {
    //console.log('item', item);

    const {
      id,
      game_image_url,
      name,
      primary,
      secondary,
      buttonTitle,
      code,
      status,
      index,
      image,
      showClaim,
      desc,
      topic,
      game_name_alias,
    } = item;
    const styled = useStyles();
    // console.log('primary: ', primary);
    // console.log('secondary: ', secondary);
    // console.log('buttonTitle: ', buttonTitle);
    // console.log('item: ', item);
    let classColor = '';
    const { palette } = useTheme();
    if (status) {
      if (status === 'Processing') {
        classColor = styled.Processing;
      } else if (status === 'Delivered') {
        classColor = styled.Delivered;
      } else if (status === 'Cancelled') {
        classColor = styled.Cancelled;
      }
    }
    const localCallback = (e) => {
      if (callback) callback(e, item, index);
    };

    // console.log('item', item);

    return (
      <Paper
        p={0}
        className={`${styled.root} ${noButton ? styled.clickableCard : ''}`}
        onClick={localCallback}
        styleCSS={{ height: heightFull ? '100%' : '' }}
        tag={id}
      >
        <div className={styled.rootB}>
          <Box
            className={iconImg ? styled.imgBackground : styled.image}
            style={{ background: imageAutoHeight ? 'white' : 'inherit', position: 'relative' }}
          >
            {chip && <Box className={styled.chip}>{chip}</Box>}
            {/* <Image src={image} alt={name} loader={<Skeleton variant="rect" width="100%" height="175px" className={styled.skeleton} />} /> */}
            <ImageRotation srcList={game_image_url || image} name={name} rotationSpeed={5000} autoHeight={imageAutoHeight} />
            {thirdChip && <Box className={`${styled.thirdChip} ${styled.chip}`}>{thirdChip}</Box>}
            {secondChip && (
              <Box className={`${styled.secondChip} ${styled.chip}`}>
                <i className="i i-tick" />
              </Box>
            )}
            {primary && titleOverlay && (
              <Box
                sx={{
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  fontSize: '13px',
                  position: 'absolute',
                  left: '0',
                  right: '0',
                  display: 'flex',
                  alignItems: 'center',
                  height: '50px',
                  maxHeight: '80px',
                  bottom: '0',
                }}
                height={extendedPrimaryTextHeight ? '130px' : '75px'}
                overflow="auto"
              >
                <span className={`${styled.overlayCardTitle} trim_two_lines`}>
                  <span className="b truncate_text_2 text-left">{primary}</span>
                  <span className="truncate_text text-left">{desc}</span>
                </span>
              </Box>
            )}
          </Box>
          {noButton && <div className="card__ribbon__overlay">Drag & Drop</div>}
          <Box style={{ height: heightFull ? '63px' : '' }} display="flex" mt={1}>
            {code && (
              <Body1 mr={2} ml={2} pr={2} pl={2} className={classColor}>
                {code}
              </Body1>
            )}
          </Box>

          <Box textAlign={`${noButton ? 'left' : 'center'}`} pb={2} pt={1.5}>
            {primary && !titleOverlay && (
              <Box height={extendedPrimaryTextHeight ? '130px' : '75px'} overflow="auto">
                <H4 ml={1} mr={1} mt={2} color={palette.text.secondary}>
                  {primary}
                </H4>
              </Box>
            )}

            {noButton && <div className="b truncate_text card__title">{topic || game_name_alias}</div>}

            {secondary && secondary}
            {buttonTitle && !noButton && (
              <div style={{ width: '90%', margin: 'auto', transform: heightFull ? 'translateY(15px)' : '' }}>
                <ButtonBold
                  secondaryYellow
                  yellowBubble
                  m={0}
                  onClick={localCallback}
                  tag={id}
                  // className={!showClaim && item.reward_id ? `${styled.buttonDisabled}` : ''}
                  isClaimCert={!showClaim && item.reward_id ? true : false}
                  className={!showClaim && item.reward_id ? `${styled.buttonDisabled}` : ''}
                >
                  {buttonTitle}
                </ButtonBold>
              </div>
            )}
          </Box>
        </div>
      </Paper>
    );
  }
);

export const GameCard = React.memo(
  ({
    item,
    callback,
    chip,
    iconImg,
    secondChip,
    thirdChip,
    extendedPrimaryTextHeight = false,
    imageAutoHeight = false,
    titleOverlay = false,
    noButton = false,
    subjectStyle,
    gameContentType,
    isRecommendationCard,
    isPocketGames,
    competition,
  }) => {
    const {
      id,
      primary,
      secondary,
      buttonTitle,
      code,
      status,
      index,
      showClaim,
      desc,
      lessons_completed,
      total_lessons,
      isCalledFromGames,
      skill,
    } = item;
    const { Topic, color, icon, subjectName } = subjectStyle; // Destructure properties (Topic, color, icon, subjectName) from the subjectStyle object
    const isLocked = competition?.is_daily_learning && item?.is_locked;
    console.log('gameContentType', gameContentType);
    const { content_type_label, content_type_image } = gameContentType; // Destructure properties (content_type_icon, content_type_title) from the gameContentType object
    const styled = useStyles2();
    let classColor = '';
    const { palette } = useTheme();
    if (status) {
      if (status === 'Processing') {
        classColor = styled.Processing;
      } else if (status === 'Delivered') {
        classColor = styled.Delivered;
      } else if (status === 'Cancelled') {
        classColor = styled.Cancelled;
      }
    }
    const localCallback = (e) => {
      if (callback) callback(e, item, index);
    };
    //console.log('isPocketGames-->card-->', isPocketGames);

    return (
      <Paper
        p={0}
        className={`sGameCard ${styled.rootGameCard} ${noButton ? styled.clickableCard : ''} ${
          isCalledFromGames ? styled.rootMyGameCard : ''
        }`}
        onClick={localCallback}
        tag={id}
        data_sid={Topic?.toLowerCase()}
      >
        <div className={`${styled.rootBGameCard} ${isCalledFromGames ? styled.rootBMyGameCard : ''}`}>
          {isLocked ? (
            <div className={styled.lockOverlay}>
              <img src={IMAGES.LOCK_ICON_2} alt="Locked" className={styled.lockIcon} />
            </div>
          ) : null}

          <Box
            className={iconImg ? styled.imgBackground : styled.image}
            style={{ background: imageAutoHeight ? 'white' : 'inherit', position: 'relative' }}
          >
            {/* {chip && <Box className={styled.chip}>{chip}</Box>} */}
            <Box className={styled.gamePlate} style={{ backgroundColor: color }}>
              {!isPocketGames && (
                <Box className={styled.subjectName}>
                  <Tooltip title={subjectName} placement="top">
                    <Typography style={{ color: '#FAFC54', fontSize: '16px', fontWeight: '500' }} noWrap>
                      {subjectName}
                    </Typography>
                  </Tooltip>
                </Box>
              )}
              <Box className={styled.subjectTextPlate}>
                <Box
                  className={`${styled.subjectPlate} ${isCalledFromGames ? styled.myGameSubjectPlate : ''}`}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mr={3}
                >
                  <img src={Cordova.Path(icon)} alt="Subject" style={{ width: '100%', height: '100%' }} />
                </Box>
                <Box>
                  <Body1
                    fontSize={isCalledFromGames ? '20px' : '22px'}
                    color="#fff"
                    fontWeight="600"
                    className={styled.subjectTopicName}
                  >
                    {isCalledFromGames ? skill : Topic}
                  </Body1>
                </Box>
              </Box>
            </Box>
            {/* <Image
                src={image}
                alt="Game Competition"
                loader={<Skeleton variant="rect" width="100%" height="175px" className={styled.skeleton} />}
              /> */}
            {/* <ImageRotation srcList={game_image_url || image} name={name} rotationSpeed={5000} autoHeight={imageAutoHeight} /> */}
            {thirdChip && <Box className={`${styled.thirdChip} ${styled.chip}`}>{thirdChip}</Box>}
            {secondChip && !isRecommendationCard && (
              <Box className={`${styled.secondChip} ${styled.chip} ${styled.tickGreen} tick-green`}>
                <i className="i i-tick" />
              </Box>
            )}
            {isRecommendationCard && !isPocketGames && (
              <Box className={`${styled.chip} ${styled.secondChip} ${styled.tickGreen} ${styled.lessons_badge}`}>
                <Body1>
                  {lessons_completed ?? ''}
                  <span className={styled.light_opacity}>/{total_lessons ?? ''}</span>
                </Body1>
              </Box>
            )}
            {primary && titleOverlay && (
              <Box
                sx={{
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  fontSize: '13px',
                  position: 'absolute',
                  left: '0',
                  right: '0',
                  display: 'flex',
                  alignItems: 'center',
                  height: '50px',
                  maxHeight: '80px',
                  bottom: '0',
                }}
                height={extendedPrimaryTextHeight ? '130px' : '75px'}
                overflow="auto"
              >
                <span className={`${styled.overlayCardTitle} trim_two_lines`}>
                  <span className="b truncate_text_2">{primary}</span>
                  <span className="truncate_text">{desc}</span>
                </span>
              </Box>
            )}
          </Box>
          {noButton && !isPocketGames && (
            <div className={`${styled.ribbonOverlay} game_card__ribbon__overlay`}>
              {/* <span style={{ marginRight: '25px' }}>Image</span> */}
              <div className="game_card__ribbon__image">
                <img src={Cordova.Path(content_type_image)} alt="Subject" style={{ width: '100%', height: '100%' }} />
              </div>
              {content_type_label}
            </div>
          )}

          <Box display="flex" mt={0}>
            {code && (
              <Body1 mr={2} ml={2} pr={2} pl={2} className={classColor}>
                {code}
              </Body1>
            )}
          </Box>

          {!isPocketGames && (
            <Box textAlign={`${noButton ? 'left' : 'center'}`} pb={2} pt={1.5}>
              {primary && !titleOverlay && (
                <Box height={extendedPrimaryTextHeight ? '130px' : '75px'} overflow="auto">
                  <H4 ml={1} mr={1} mt={2} color={palette.text.secondary}>
                    {primary}
                  </H4>
                </Box>
              )}

              {/* {noButton && <div className="b truncate_text card__title">{topic || game_name_alias}</div>} */}

              {secondary && secondary}
              {buttonTitle && !noButton && (
                <div style={{ width: '90%', margin: 'auto' }}>
                  <ButtonBold
                    secondaryYellow
                    yellowBubble
                    m={0}
                    onClick={localCallback}
                    tag={id}
                    className={!showClaim && item.reward_id ? `${styled.buttonDisabled}` : ''}
                  >
                    {buttonTitle}
                  </ButtonBold>
                </div>
              )}
            </Box>
          )}
        </div>
      </Paper>
    );
  }
);

export const CardLoader = React.memo(({ item: { primary, secondary }, chip }) => {
  const styled = useStyles();
  return (
    <Paper p={0} className={styled.root}>
      <div className={styled.rootB}>
        {chip && <Box className={`${styled.chip} ${styled.buttonSkeleton}`} height="26px" width="90px" />}
        <Box className={styled.image}>
          <Skeleton variant="rect" width="100%" height="175px" className={styled.skeleton} />
        </Box>
        <Box padding={2} pt={0}>
          {primary && (
            <Box m={2}>
              <Skeleton variant="rect" width="100%" height="25px" className={styled.buttonSkeleton} />
            </Box>
          )}
          {secondary && <>{secondary}</>}
          <Skeleton
            variant="rect"
            width="232px"
            height="44px"
            className={`${styled.buttonSkeleton} ${styled.subjectDetailSkeleton}`}
          />
        </Box>
      </div>
    </Paper>
  );
});

export const RecommendationCardLoader = React.memo(({ item: { primary, secondary }, chip, isPocketGames, isCalledFromGames }) => {
  const styled = useStyles();
  return (
    <Paper
      p={0}
      className={`${styled.root} ${styled.loaderCardOuter} ${isPocketGames ? styled.loaderCardOuterPG : ''} ${
        isCalledFromGames ? styled.myGamesLoaderCardOuter : ''
      }`}
    >
      <div className={`${styled.rootB} ${styled.loaderCardInner} ${isCalledFromGames ? styled.myGamesLoaderCardInner : ''}`}>
        {chip && <Box className={`${styled.chip} ${styled.buttonSkeleton}`} height="26px" width="90px" />}
        <Box className={`${styled.image} ${styled.skeletonImage}`}>
          <Skeleton variant="rect" width="100%" height="214px" className={styled.skeleton} />
          {!isPocketGames && <Skeleton variant="rect" width="100%" height="175px" className={styled.skeletonImageTitle} />}
        </Box>
        {!isPocketGames && (
          <Box padding={2} pt={0}>
            {primary && (
              <Box m={2}>
                <Skeleton variant="rect" width="100%" height="25px" className={styled.buttonSkeleton} />
              </Box>
            )}
            {secondary && <>{secondary}</>}
            <Skeleton
              variant="rect"
              width="232px"
              height="44px"
              className={`${styled.buttonSkeleton} ${styled.subjectDetailSkeleton}`}
            />
          </Box>
        )}
      </div>
    </Paper>
  );
});
