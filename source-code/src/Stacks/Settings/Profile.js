import React, { useState, useEffect, useCallback } from 'react';
import { useTheme, Grid, makeStyles, IconButton, Box, FormControlLabel, RadioGroup, Radio } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';

import { Button, Input, FlexibleView, Body1, ModalBox, IconPaper } from 'Components';
import Calendar from 'Components/Core/Calendar';
import { AvatarSwitcher, AVATAR_SET, API_CALLS, PAGE_STATE } from 'Constants';
import { OnInputChange } from 'Utils';
import Account from 'Actions/account.action';

import User from 'Actions/user.action';
import { GetProfile } from 'Actions';
import { gameDispatch } from 'Utils/ActionCreators';
import { SingleDataRow } from 'Components/Stats';
import PageStructure from './shared/PageStructure';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'auto',
    width: '100%',
    minWidth: '284px',
    maxWidth: '100%',
    overflow: 'auto',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: '120px',
    marginLeft: '-10px',
  },
  btn: {
    position: 'absolute',
    bottom: '20px',
    right: '12px',
    height: '36px',
    width: '36px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.palette.secondary.main,
    color: theme.palette.common.white,
    '& i': {
      fontSize: '20px',
    },
    '&:hover': {
      background: theme.palette.secondary.main,
      color: theme.palette.common.white,
    },
    '&:active': {
      background: theme.palette.secondary.main,
      color: theme.palette.common.white,
    },
  },
  gender: {
    '& .MuiFormGroup-root': {
      flexDirection: 'row',
    },
  },
  skeleton: {
    background: theme.palette.action.skeleton,
    marginBottom: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
  },
  skeletonCircle: {
    background: theme.palette.action.skeleton,
  },
  skeletonButton: {
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.action.skeleton,
    marginBottom: theme.spacing(1),
  },
  skeletonIcon: {
    background: theme.palette.action.skeleton,
    width: '70px',
    height: '70px',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  grid: {
    marginBottom: theme.spacing(2),
  },
  circle: {
    margin: '-20px',
  },
  radioB: {
    color: theme.palette.grey['400'],
  },
  row: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
  },
}));

const Profile = (props) => {
  let PageState = PAGE_STATE.IS_LOADING;
  let PageUI;
  let PreLoader = null;
  const { texts } = useTheme();
  const pageData = useSelector((state) => state.Profile, shallowEqual);
  const [profile, setProfile] = useState({
    email: '',
    number: '',
    name: '',
    schoolName: '',
    city: '',
    gender: '',
    dob: '',
    profilePicture: '',
  });

  const [stateRef, setStateRef] = useState({ avatarH: false, callSent: false });
  const styled = useStyles();
  const dispatch = useDispatch();
  // const user = User.Info();

  useEffect(() => {
    if (pageData) {
      const { name, phone_number, username, school_name, city, gender, dob, profile_picture } = pageData;
      setProfile({
        email: username || '',
        number: phone_number || '',
        name: name || '',
        schoolName: school_name || '',
        city: city || '',
        gender: gender || '',
        dob: dob || '2000-01-01',
        profilePicture: profile_picture || '',
      });
    }
  }, [pageData]);

  useEffect(() => {
    window.myOnBeforeUnload = () => {
      gameDispatch(API_CALLS.GetProfile.CLEAR);
    };
  }, []);

  const callback = (e) => {
    const t = e.currentTarget.getAttribute('data-tag') || e.target.name;
    switch (t) {
      case 'email':
      case 'number':
      case 'name':
      case 'schoolName':
      case 'city':
        OnInputChange({ name: t, value: e.target.value }, profile, setProfile);
        break;
      case 'gender':
        setProfile({ ...profile, gender: e.target.value });
        break;
      case 'update':
        dispatch(Account.SaveProfile(profile, texts));
        break;
      case 'avatar':
        setStateRef({ ...stateRef, avatarH: true });
        break;
      case 'overlay':
      case 'close':
        setStateRef({ ...stateRef, avatarH: false });
        break;
      case 'AvatarIcon':
        OnInputChange({ name: 'profilePicture', value: e.currentTarget.getAttribute('data') }, profile, setProfile);
        setStateRef({ ...stateRef, avatarH: false });
        break;
      default:
        break;
    }
  };

  const avatarData = AVATAR_SET.map((item) => {
    return (
      <Grid container justifyContent="center" alignItems="center" item xs={4} data-tag={item.id} key={item.id}>
        <IconButton data={item.id} data-tag="AvatarIcon" onClick={callback}>
          <AvatarSwitcher t={`${item.id}`} s={80} />
        </IconButton>
      </Grid>
    );
  });

  const loadData = useCallback(() => {
    dispatch(GetProfile());
  }, [dispatch]);

  useEffect(() => {
    if (!pageData && !stateRef.callSent) {
      loadData();
      setStateRef({ ...stateRef, callSent: true });
    }
  }, [loadData, pageData, stateRef]);

  if (!pageData) {
    PageState = PAGE_STATE.IS_LOADING;
    PreLoader = <ProfileLoader />;
  } else if (pageData.shouldRetry) {
    PageState = PAGE_STATE.RETRY;
  } else if (pageData.length === 0) {
    PageState = PAGE_STATE.NO_DATA_TO_SHOW;
  } else {
    PageState = PAGE_STATE.LOADED;
    PageUI = (
      <>
        <Grid item xs={12} className={styled.row}>
          <IconPaper
            iconBg="transparent"
            title={User.NameResolver()}
            icon={
              <>
                <IconButton mb={4} data-tag="avatar" className={styled.avatarWrapper} onClick={callback}>
                  <AvatarSwitcher className={styled.avatar} t={`${profile.profilePicture}`} s={120} />
                  <Box className={styled.btn}>
                    <i className="i i-avatar" />
                  </Box>
                </IconButton>
              </>
            }
          >
            <Box mb={2} textAlign="center">
              <Input value={profile.name} label={texts.NAME} tag="name" onChange={callback} />
            </Box>
            <Box mb={2} className={styled.gender}>
              <Body1>{texts.GENDER}</Body1>
              <RadioGroup aria-label="gender" name="gender" className={styled.radioB} value={profile.gender} onChange={callback}>
                <FormControlLabel value="m" control={<Radio />} className={styled.radioB} label="Male" />
                <FormControlLabel value="g" control={<Radio />} className={styled.radioB} label="Female" />
                <FormControlLabel value="o" control={<Radio />} className={styled.radioB} label="Other" />
              </RadioGroup>
            </Box>
            <Box mb={2} textAlign="center">
              <Calendar
                className={styled.radioB}
                name="Date of birth"
                format="YYYY-MM-DD"
                disableFuture
                value={profile.dob}
                onChange={(data) => {
                  OnInputChange({ name: 'dob', value: `${data.$y}-${data.$M + 1}-${data.$D}` }, profile, setProfile);
                }}
                onOpen={() => {}}
              />
            </Box>
            <Box mb={2} textAlign="center">
              <Input value={profile.number} label={texts.NUMBER} tag="number" onChange={callback} />
            </Box>
            <Box mb={2} textAlign="center">
              <Input value={profile.city} label={texts.CITY} tag="city" onChange={callback} />
            </Box>
            <Box textAlign="center">
              <Input value={profile.schoolName} label={texts.SCHOOL_NAME} tag="schoolName" onChange={callback} />
            </Box>
            <Button mb={4} mt={4} tag="update" onClick={callback} startIcon={<i className="i i-update" />}>
              {texts.UPDATE}
            </Button>
          </IconPaper>
        </Grid>
        <Box m={2} />
      </>
    );
  }
  return (
    <>
      <ModalBox isVisible={stateRef.avatarH} callback={callback} allowClose fixWidth icon="avatar" title={texts.CHOOSE_AVATAR}>
        <FlexibleView display="flex" height="550px" pl={2} pr={2}>
          <SingleDataRow>{avatarData}</SingleDataRow>
        </FlexibleView>
      </ModalBox>

      <PageStructure
        name={texts.PROFILE}
        PreLoader={PreLoader}
        PageState={PageState}
        PageUI={PageUI}
        callback={loadData}
        className={styled.grid}
      />
    </>
  );
};

const ProfileLoader = React.memo((props) => {
  const style = useStyles(props);
  return (
    <Grid item xs={12} className={style.row}>
      <IconPaper
        iconBg="transparent"
        icon={
          <Box mb={2} mt={2} position="relative">
            <Skeleton variant="circle" width={120} height={120} className={style.skeletonCircle} />
            <Skeleton variant="circle" width={48} height={48} className={style.skeletonIcon} />
          </Box>
        }
      >
        <Box mb={2} mt={2}>
          <Skeleton variant="rect" width={200} height="24px" className={style.skeleton} />
        </Box>
        <Box mb={2} width="300px" height="52px">
          <Skeleton variant="rect" width="100%" height="100%" className={style.skeleton} />
        </Box>
        <Box mb={2} width="300px">
          <Box width="300px" display="flex">
            <Box width="100px" display="flex">
              <Skeleton variant="circle" width={25} height={25} className={style.skeletonCircle} />
              <Box ml={1}>
                <Skeleton ml={1} variant="rect" height="24px" width="50px" className={style.skeleton} />
              </Box>
            </Box>
            <Box width="100px" display="flex">
              <Skeleton variant="circle" width={25} height={25} className={style.skeletonCircle} />
              <Box ml={1}>
                <Skeleton ml={1} variant="rect" height="24px" width="50px" className={style.skeleton} />
              </Box>
            </Box>
            <Box width="100px" display="flex">
              <Skeleton variant="circle" width={25} height={25} className={style.skeletonCircle} />
              <Box ml={1}>
                <Skeleton ml={1} variant="rect" height="24px" width="50px" className={style.skeleton} />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box mb={2} width="300px" height="52px">
          <Skeleton variant="rect" width="100%" height="100%" className={style.skeleton} />
        </Box>
        <Box mb={2} width="300px" height="52px">
          <Skeleton variant="rect" width="100%" height="100%" className={style.skeleton} />
        </Box>
        <Box mb={2} width="300px" height="52px">
          <Skeleton variant="rect" width="100%" height="100%" className={style.skeleton} />
        </Box>
        <Box mb={2} width="300px" height="52px">
          <Skeleton variant="rect" width="100%" height="100%" className={style.skeleton} />
        </Box>
        <Box mb={4} mt={4} textAlign="center" width="250px" height="42px">
          <Skeleton variant="rect" width="250px" height="42px" className={style.skeletonButton} />
        </Box>
      </IconPaper>
    </Grid>
  );
});

export default Profile;
