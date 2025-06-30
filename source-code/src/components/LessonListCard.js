/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import { Body1 } from 'Components/Core';
import { Cordova, validURL } from 'Utils';
// import Image from './Image';

const useStyles = makeStyles((theme) => ({
  clickableCard: {
    borderRadius: '15px',
    cursor: 'pointer',
    '&:hover': {
      // background: "#EEEEEE",
      outline: '4px ridge rgba(0,0,0,0.5)',
      // boxShadow: '0px 0px 2px 2px rgba(7,88,117,0.78)',
    },
  },
  root: {
    cursor: 'pointer',
    height: '100%',
    width: '100%',
    minWidth: '284px',
    // height: '264px',
    maxWidth: '284px',
    overflow: 'hidden',
    position: 'relative',
    // margin: 0,
    background: 'rgb(255, 255, 255)',
    // display: 'flex',
    // flexDirection: 'column',
    margin: 'auto',
    // boxShadow: 'rgb(0 0 0 / 5 %) 0px 1px 2px 0px, rgb(0 0 0 / 5 %) 0px 1px 4px 0px, rgb(0 0 0 / 5 %) 0px 2px 8px 0px',
    borderRadius: '15px',
    backgroundColor: '#D5DBEA',
    boxShadow: '0px 8px 0px 0px rgba(0,0,0,0.3), 0px 3px 0px 0px rgba(0,0,0,0.8)',
  },
  rootB: {
    height: '100%',
    width: '100%',
    minWidth: '284px',
    maxWidth: '284px',
    overflow: 'hidden',
    position: 'relative',
    margin: 'auto',
    backgroundColor: '#ffffff',
    marginBottom: '8px',
    borderRadius: '15px',
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
    flex: '1',
    background: (props) => props.imgBackground || null,
    [theme.breakpoints.up('md')]: {
      maxWidth: (props) => props.imgWidth || '288px',
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
    top: '12px',
    left: '12px',
    zIndex: 3,
    borderRadius: '15px',
    padding: '3px 12px',
    fontWeight: theme.typography.fontWeightMedium,
    minWidth: 44,
    visibility: 'hidden',
    // transform: 'translate3d(0,0,0)',
  },
  secondChip: {
    top: 'auto',
    bottom: '98px',
    right: '12px',
    left: 'auto',
    background: theme.palette.common.darkGreen,
    border: '1px solid rgba(255,255,255,.9)',
    divShadow: '0 0 12px rgba(255,255,255,.55)',
  },
  thirdChip: {
    top: '12px',
    right: '12px',
    left: 'auto',

    color: '#d2ad29',
    divShadow: '0 0 12px rgba(155,153,0,.55)',
    // color: theme.palette.common.red,
    background: theme.palette.common.white,
    fontWeight: 'bold',
    // border: '1px solid rgba(255,255,255,.9)',
    // divShadow: '0 0 12px rgba(255,53,0,.55)',
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
  ButtonUI: {
    textAlign: 'center',
    paddingTop: '12px',
    paddingBottom: '16px',
  },
  MainButton: {
    cursor: 'pointer',
    width: '244px',
    height: '44px',
    maxWidth: '95%',
    color: (props) => props.color || theme.palette.common.white,
    padding: '6px 16px',
    fontSize: '1rem',
    whiteSpace: 'nowrap',
    borderRadius: '15px',
    fontWeight: '400',
    lineHeight: '1.75',
    float: (props) => props.float || 'none',
    flexShrink: 0,
    boxShadow: 'unset',
    background: (props) => (props.variant !== 'outlined' ? props.background || theme.palette.secondary.main : null),
    // background: theme.palette.secondary.main,
    '&:hover': {
      background: theme.palette.secondary.main,
      boxShadow: '1px 1px 3px 0px rgba(0,0,0,0.35)',
    },
    // '&:active': {
    //   background: (props) => props.background || theme.palette.secondary.main,
    // },
  },
  MainButtonLabel: {
    width: '100%',
    display: 'inherit',
    transform: 'translate3d(0,0,0)',
    alignItems: 'inherit',
    justifyContent: 'inherit',
  },
  MainButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '12px',
    // paddingBottom: '16px',
  },
}));

export const LessonListCard = React.memo(
  ({
    item,
    callback,
    chip,
    iconImg,
    secondChip,
    thirdChip,
    fourthChip,
    extendedPrimaryTextHeight = false,
    imageAutoHeight = false,
  }) => {
    const { id, image, primary, secondary, code, status, index, topic, game_name_alias } = item;
    // console.log('primary: ', primary);
    // console.log('secondary: ', secondary);
    // console.log('buttonTitle: ', buttonTitle);
    const styled = useStyles();
    const orgRef = useRef(null);
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

    // console.log('image', image);
    const SrcCheck = validURL(image);
    return (
      <div
        p={0}
        tag={id}
        className={`${styled.root} cid-${item?.content_id || ''}  ${styled.clickableCard}`}
        tabIndex="-1"
        role="button"
        onClick={() => {
          localCallback();
        }}
      >
        <div className={styled.rootB}>
          <div className={iconImg ? styled.imgBackground : styled.image} style={{ background: imageAutoHeight ? 'white' : 'inherit' }}>
            {chip && <div className={styled.chip}>{chip}</div>}
            {/* <Image src={image} alt={name} loader={<Skeleton variant="rect" width="100%" height="175px" className={styled.skeleton} />} /> */}
            {/* <ImageRotation srcList={image} name={name} rotationSpeed={5000} autoHeight={imageAutoHeight} /> */}

            {
              <img
                ref={orgRef}
                src={SrcCheck ? image : Cordova.Path(image, true)}
                style={{
                  height: '100%',
                  width: 'auto',
                }}
              />
            }

            {thirdChip && <div className={`${styled.thirdChip} ${styled.chip}`}>{thirdChip}</div>}
            {secondChip && (
              <div className={`${styled.secondChip} ${styled.chip}`}>
                <i className="i i-tick" />
              </div>
            )}
            {fourthChip !== 'undefined' && <div className={`${styled.thirdChip} ${styled.chip}`}>{fourthChip}</div>}
          </div>
          {<div className="card__ribbon__overlay">Drag & Drop</div>}
          <div display="flex" mt={1}>
            {code && (
              <Body1 mr={2} ml={2} pr={2} pl={2} className={classColor}>
                {code}
              </Body1>
            )}
          </div>
          <div className={styled.ButtonUI}>
            {primary && (
              <div height={extendedPrimaryTextHeight ? '130px' : '75px'} overflow="auto">
                <div ml={1} mr={1} mt={2} color={palette.text.secondary}>
                  {primary}
                </div>
              </div>
            )}

            {secondary && secondary}
            <div className="b truncate_text card__title">{topic || game_name_alias}</div>
            {/* {buttonTitle && (
            <div className={styled.MainButtonContainer}>
              <Button
                className={styled.MainButton}
                onClick={() => {
                  localCallback();
                }}
                tag={id}
              >
                <div>{buttonTitle}</div>
              </Button>
            </div>
          )} */}
          </div>
        </div>
      </div>
    );
  }
);

export const CardLoader = React.memo(({ item: { primary, secondary }, chip }) => {
  const styled = useStyles();
  return (
    <div p={0} className={styled.root}>
      {chip && <div className={`${styled.chip} ${styled.buttonSkeleton}`} height="26px" width="90px" />}
      <div className={styled.image}>
        <Skeleton variant="rect" width="100%" height="175px" className={styled.skeleton} />
      </div>
      <div padding={2} pt={1.5}>
        {primary && (
          <div m={2}>
            <Skeleton variant="rect" width="100%" height="25px" className={styled.buttonSkeleton} />
          </div>
        )}
        {secondary && <>{secondary}</>}
        <Skeleton variant="rect" width="232px" height="44px" className={styled.buttonSkeleton} />
      </div>
    </div>
  );
});
