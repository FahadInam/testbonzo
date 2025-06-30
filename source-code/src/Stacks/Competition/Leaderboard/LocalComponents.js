import React from 'react';
import { Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { Numbers } from 'Utils';
import { AvatarSwitcher } from 'Constants';
import useStyles from './style';
import PosHex from 'Assets/images/bonzoui/hex_leaderboard.png';
import Pos1 from 'Assets/images/bonzoui/pos1.png';
import Pos2 from 'Assets/images/bonzoui/pos2.png';
import Pos3 from 'Assets/images/bonzoui/pos3.png';
import { shallowEqual, useSelector } from 'react-redux';
import SunRays from 'Assets/images/bonzoui/leaderboard/raysbg.svg';

export const OneListPrimaryText = React.memo((props) => {
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const coinsImage = Inst_config ? Inst_config.images.coin_icon : '';
  const { name, points, points2, schoolName } = props;
  return (
    <Grid container>
      <Grid item xs={points2 || points2 === 0 ? 8 : 10}>
        <div style={{ paddingRight: '2.5px', paddingTop: '0.5px', textOverflow: 'ellipsis', overflow: 'hidden' }}>
          {name}
          {schoolName && ` (${schoolName})`}
        </div>
      </Grid>
      <Grid item xs={2} pt={0.5} container alignItems="center" justifyContent="center">
        <div style={{ paddingTop: '0.25px', display: 'flex', alignContent: 'center' }} className="coin_point_box">
          {points >= 0 && <img src={coinsImage} className="bonzoui__leaderboard__coin__image" alt="coins" />}
          {points === 0 ? 0 : points > 100000 ? Numbers.AbbreviatedNumber(points, 2) : Numbers.ToCommaSeparated(points)}
        </div>
      </Grid>
      {(points2 || points2 === 0) && (
        <Grid item xs={2} pt={0.5} container alignItems="center" justifyContent="center">
          <div style={{ paddingTop: '0.25px' }}>
            {points2 === 0
              ? '-'
              : points2 > 100000
              ? Numbers.AbbreviatedNumber(points2, 2)
              : Numbers.ToCommaSeparated(
                  typeof points2 === 'number' ? (Number.isInteger(points2) ? points2 : parseFloat(points2.toFixed(2))) : '-'
                )}
          </div>
        </Grid>
      )}
    </Grid>
  );
});

export const OneAvatarWithPosition = React.memo((props) => {
  const styled = useStyles();
  const { avatar, position, selfRank, schoolAvatar } = props;
  let imageToShow;
  switch (position) {
    case 1:
      imageToShow = Pos1;
      break;
    case 2:
      imageToShow = Pos2;
      break;
    case 3:
      imageToShow = Pos3;
      break;
    default:
      imageToShow = PosHex;
  }

  function formateRank(position) {
    if (position >= 1e6) {
      return (position / 1e6).toFixed(1) + 'M';
    } else if (position >= 1e3) {
      return (position / 1e3).toFixed(1) + 'k';
    }
    return position;
  }

  return (
    <div className={styled.rootB}>
      <div className={styled.basePosition}>
        <img
          src={imageToShow}
          alt={`Rank#${position}`}
          className={`${styled.positionImage} ${selfRank && styled.positionImageSelf}`}
        />
        <div className={`${styled.position} ${selfRank && position > 999 ? styled.smallSize : ''}`}>
          {position > 3 || selfRank ? formateRank(position) : position === 0 ? 1 : ' '}
        </div>
      </div>
      <AvatarSwitcher t={avatar} s={40} mr={0} schoolAvatar={schoolAvatar} />
    </div>
  );
});

export const OneListPrimaryTextLoader = React.memo(() => {
  const styled = useStyles();
  return (
    <Grid container>
      <Grid item xs={10} pr={1}>
        <div style={{ paddingRight: '2px' }}>
          <Skeleton variant="rect" width="90%" height={16} className={styled.skeleton} />
        </div>
      </Grid>
      <Grid item xs={2} container alignItems="center" justifyContent="flex-end">
        <div style={{ paddingTop: '0.25px' }}>
          <Skeleton variant="rect" width="50px" height={16} className={styled.skeleton} />
        </div>
      </Grid>
    </Grid>
  );
});

export const OneAvatarWithPositionLoader = React.memo(() => {
  const styled = useStyles();
  return (
    <div className={styled.root} style={{ marginRight: '2px' }}>
      <Skeleton variant="circle" width={40} height={40} className={styled.skeletonCircle} />
      <Skeleton variant="circle" width={18} height={18} className={`${styled.skeletonCircle} ${styled.position}`} />
    </div>
  );
});

export const PositionsLoader = React.memo(() => {
  return (
    <div className="bonzo__leaderboard__shell">
      <div className="bonzo__leaderboard__step__mx ">
        {
          <div className="bonzo__leaderboard__step bc__2 loaderCircles">
            <div className="MuiSkeleton-pulse" />
          </div>
        }
        <div className="truncate_text bonzo__leaderboard__txt mw_280"> </div>
      </div>
      <div className="bonzo__leaderboard__step__mx ">
        {
          <div className="bonzo__leaderboard__step bc__1 loaderCircles">
            <div className="MuiSkeleton-pulse" />
            <img src={SunRays} className="bonzo__leaderboard__rays invisible" alt="Rays" />
          </div>
        }
        <div className="truncate_text bonzo__leaderboard__txt mw_280"> </div>
      </div>
      <div className="bonzo__leaderboard__step__mx ">
        {
          <div className="bonzo__leaderboard__step bc__3 loaderCircles">
            <div className="MuiSkeleton-pulse" />{' '}
          </div>
        }
        <div className="truncate_text bonzo__leaderboard__txt mw_280"> </div>
      </div>
    </div>
  );
});
