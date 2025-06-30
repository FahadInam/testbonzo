/* eslint-disable camelcase */
import { Box, Grid, IconButton, useTheme } from '@material-ui/core';
import { GetProfile, SelectedCompetition, User } from 'Actions';
import Account from 'Actions/account.action';
import { FlexibleView, IconPaper, Input, ModalBox, TAutoComplete } from 'Components';
import ButtonBold from 'Components/Core/ButtonBold';
import Calendar from 'Components/Core/Calendar';
import { SingleDataRow } from 'Components/Stats';
import { API_CALLS, AVATAR_SET, AvatarSwitcher, GENERIC_AVATAR_SET, IMAGES, PAGE_STATE } from 'Constants';
import { GoToLastPage } from 'Navigation';
import { Cordova, OnInputChange, getInstanceType, isNumeric, sortArrayWithOther } from 'Utils';
import { gameDispatch } from 'Utils/ActionCreators';
import React, { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PageStructure from '../shared/PageStructure';
import ProfileLoader from './ProfileLoader';
import useStyles from './style';
import { CountryListGCLC } from 'Constants/country.constants';
import { INSTANCES_ID } from 'Constants/instance.config';
import { TimeZoneList } from 'Constants/timezone.constant';

const Profile = (props) => {
  let PageState = PAGE_STATE.IS_LOADING;
  let PageUI;
  let PreLoader = null;
  const { texts } = useTheme();
  const competitionStr = useSelector((state) => state.Competition, shallowEqual);
  const competition = SelectedCompetition.StrToObj(competitionStr);
  const pageData = useSelector((state) => state.Profile, shallowEqual);
  // const schoolData = useSelector((state) => state.GetCompetitionDetails, shallowEqual);
  // const currentComp = SelectedCompetition.Info();
  const [profile, setProfile] = useState({
    email: '',
    number: '',
    name: '',
    schoolName: '',
    country: '',
    city: '',
    gender: '',
    dob: '',
    profilePicture: '',
    schoolId: '',
    timezone: '',
  });
  const { item } = competition;
  const [stateRef, setStateRef] = useState({ avatarH: false, callSent: false });
  const [timeSelectRef, setTimeSelectRef] = useState({ index: -1, name: '', anchor: null });
  const [citySelectRef, setCitySelectRef] = useState({ index: -1, name: '', anchor: null });
  const [countrySelectRef, setCountrySelectRef] = useState({ index: -1, name: '', anchor: null });
  const [schoolSelectRef, setSchoolSelectRef] = useState({ index: -1, name: '' });
  const styled = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [schoolList, setSchoolList] = useState([]);
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const isMobileOTP = Inst_config.is_mobile_otp;
  const isShupavu = getInstanceType(Inst_config.instance_id, INSTANCES_ID.SHUPAVU_ID);
  const isPocketGames = getInstanceType(Inst_config.instance_id, INSTANCES_ID.POCKET_GAMES_ID);
  const isGlobalClimate = getInstanceType(Inst_config.instance_id, INSTANCES_ID.GLOBAL_CLIMATE_LITERACY_ID);
  const isSGG = getInstanceType(Inst_config.instance_id, INSTANCES_ID.SGG_ID);

  const user = User.Info();
  const [profileName, setProfileName] = useState('');
  useEffect(() => {
    if (pageData?.users?.length > 0) {
      const { name, phone_number, country, city, gender, dob, profile_picture, email, school_name, school_id, timezone } =
        pageData?.users[0];
      const { schools } = pageData;
      setProfile({
        email: email || '',
        number: phone_number || '',
        name: name || '',
        schoolName: school_name || '',
        country: country || '',
        city: city || '',
        gender: gender || '',
        dob: dob || '2000-01-01',
        profilePicture: profile_picture,
        schoolId: school_id || '',
        timezone: timezone || '',
      });
      setSchoolList(schools);
      setProfileName(name);
    }
    return () => {
      setSchoolList([]);
    };
  }, [pageData]);

  const [initialValue, setInitialValue] = useState(null);
  const [initialCountry, setInitialCountry] = useState(null);
  const [initialTime, setInitialTime] = useState(null);

  useEffect(() => {
    if (pageData?.users[0]?.country !== null) {
      const country = CountryListGCLC?.find((country) => country.name === pageData?.users[0]?.country);
      if (country) {
        setInitialCountry(country);
      }
    } else {
      setInitialCountry('');
    }

    if (pageData?.users[0]?.city !== null) {
      const city = Inst_config?.city_list?.find((city) => city.name === pageData?.users[0]?.city);

      if (city) {
        setInitialValue(city);
      }
    } else {
      setInitialValue('');
    }

    if (pageData?.users[0]?.timezone !== null) {
      if (!TimeZoneList || !pageData?.users?.[0]?.timezone) return;
      const timezone = TimeZoneList?.find((time) => time.value === pageData?.users[0]?.timezone);
      if (timezone) {
        setInitialTime(timezone);
      } else {
        setInitialTime(' ');
      }
    } else {
      setInitialTime('');
    }

    return () => {
      setInitialValue(null);
      setInitialCountry(null);
      setInitialTime(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Inst_config?.city_list, CountryListGCLC, profile.city, profile.country, pageData?.users, profile.timezone, TimeZoneList]);

  useEffect(() => {
    gameDispatch(API_CALLS.GetProfile.CLEAR);
  }, []);
  // useEffect(() => {
  //   if (schoolData?.schools?.length > 0 && schoolSelectRef.index === -1) {
  //     setSchoolSelectRef({ index: schoolData.schools[0].id, name: schoolData.schools[0].school_name });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [schoolData]);

  // const [schoolSelectRef, setSchoolSelectRef] = useState({
  //   index: initialSchool ? schoolList.indexOf(initialSchool) : -1,
  //   name: initialSchool ? initialSchool.name : '',
  //   anchor: null,
  // });
  useEffect(() => {
    if (profile.schoolId && schoolList.length > 0) {
      //  console.log('schoolList', schoolList);
      const selectedSchool = schoolList?.find((school) => school.id === profile.schoolId);

      if (selectedSchool) {
        setSchoolSelectRef({
          index: selectedSchool.id,
          name: selectedSchool.name,
        });
      } else {
        setSchoolSelectRef({ index: -1, name: '' });
      }
    }
    return () => {
      setSchoolSelectRef({ index: -1, name: '' });
    };
  }, [profile.schoolId, schoolList]);

  const callback = (e, item) => {
    const value = typeof e === 'string' ? '' : e.target.value;
    const t = typeof e === 'string' ? e : e.currentTarget.getAttribute('data-tag') || e.target.name;
    // console.log('t...', t);
    switch (t) {
      case 'email':
      case 'name':
      case 'schoolName':
      case 'city':
      case 'country':
      case 'timezone':
        OnInputChange({ name: t, value: e.target.value }, profile, setProfile);
        break;
      case 'number':
        if (isNumeric(value)) {
          OnInputChange({ name: t, value: e.target.value }, profile, setProfile);
        }
        break;
      case 'gender':
        setProfile({ ...profile, gender: e.target.value });
        break;
      case 'update':
        // console.log(competition?.item?.competition_id, 'testing....');
        dispatch(Account.SaveProfile(profile, texts, history, competition?.item?.competition_id, isShupavu));
        break;
      case 'cancel':
        // dispatch(Account.SaveProfile(profile, texts));
        GoToLastPage(history);
        break;
      case 'avatar':
        setStateRef({ ...stateRef, avatarH: true });
        break;
      case 'overlay':
      case 'close':
        setStateRef({ ...stateRef, avatarH: false });
        setSelectedAvatar(null);
        break;
      case 'AvatarIcon':
        // OnInputChange({ name: 'profilePicture', value: e.currentTarget.getAttribute('data') }, profile, setProfile);
        const avatarId = e.currentTarget.getAttribute('data'); // Get the ID of the clicked avatar
        setSelectedAvatar({ name: 'profilePicture', value: avatarId }); // Update state
        //setSelectedAvatar({ name: 'profilePicture', value: e.currentTarget.getAttribute('data') });
        break;
      case 'saveAvatar':
        OnInputChange({ name: selectedAvatar?.name, value: selectedAvatar?.value }, profile, setProfile);
        setStateRef({ ...stateRef, avatarH: false });
        break;
      case 'selected-item-country':
        setProfile({ ...profile, country: item.value });
        setCountrySelectRef({ index: item.index, name: item.name, anchor: null });
        break;
      case 'selected-item':
        setProfile({ ...profile, city: item.value });
        setCitySelectRef({ index: item.index, name: item.name, anchor: null });
        break;
      case 'selected-timezone':
        setProfile({ ...profile, timezone: item.value });
        setTimeSelectRef({ index: item.index, name: item.name, anchor: null });
        break;
      case 'profile-school-item':
        setProfile({ ...profile, schoolId: item.index });
        setSchoolSelectRef({ index: item.index, name: item.name });
        break;
      default:
        break;
    }
  };

  const avatarData = (isPocketGames ? GENERIC_AVATAR_SET : AVATAR_SET).map((item) => {
    const isSelected =
      Number(selectedAvatar?.value) === item.id
        ? true
        : profile.profilePicture && !selectedAvatar && +profile?.profilePicture === item?.id
        ? true
        : false; // Ensure data types match
    // console.log('selectedAvatar:', selectedAvatar?.value); // Debugging log
    // console.log('item.id:', item.id); // Debugging log
    // console.log('isSelected:', isSelected); // Debugging log

    return (
      <Box
        key={item.id}
        className={`${styled.modal_avatar_container} sList`}
        container
        justifyContent="center"
        alignItems="center"
        item
        data-tag={item.id}
        data-sid={item?.id + 1}
      >
        <IconButton
          style={{ borderColor: isSelected ? 'white' : item.color }} // Apply dynamic border color
          className={`${styled.modal_avatar} ${isSelected ? styled.selected_modal_avatar : ''}`} // Apply selected class
          data={item.id} // Pass the ID as a data attribute
          data-tag="AvatarIcon"
          onClick={callback} // Trigger callback
        >
          <AvatarSwitcher t={`${item.id}`} s={95} />
        </IconButton>
      </Box>
    );
  });

  // console.log('is school based', item?.is_school_based);
  const loadData = useCallback(() => {
    dispatch(GetProfile(item?.competition_id, item?.is_school_based));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (!pageData && !stateRef.callSent) {
      loadData();
      setStateRef({ ...stateRef, callSent: true });
    }
  }, [loadData, pageData, stateRef]);

  // const loadSchoolData = useCallback(() => {
  //   // if (pageData) dispatch(GetCompetitionDetails(currentComp?.item?.enrolled, currentComp?.item?.competition_id));
  //   if (pageData) dispatch(GetCompetitionDetails(0, currentComp?.item?.competition_id));
  // }, [pageData, dispatch, currentComp]);
  // useEffect(() => {
  //   if (item?.is_school_based) {
  //     if (schoolData?.schools?.length === 0 && pageData) {
  //       loadSchoolData();
  //     }
  //   }
  // }, [schoolData, pageData, loadSchoolData, item]);

  const dataLoaded = item?.is_school_based ? !pageData : !pageData;

  if (dataLoaded) {
    PageState = PAGE_STATE.IS_LOADING;
    PreLoader = <ProfileLoader />;
  } else if (pageData.shouldRetry) {
    PageState = PAGE_STATE.RETRY;
  } else if (pageData.length === 0) {
    PageState = PAGE_STATE.NO_DATA_TO_SHOW;
  } else {
    PageState = PAGE_STATE.LOADED;

    const SchoolList = item?.is_school_based
      ? sortArrayWithOther(schoolList).map((school) => ({
          index: school.id,
          name: school.name,
        }))
      : [];

    // console.log('school list...', SchoolList);

    PageUI = (
      <>
        <Grid item xs={12} className={`sProfilePage ${styled.row}`}>
          <IconPaper
            fullWidth
            ADD_CODE
            title={texts.PERSONAL_DETAILS}
            title_bg="#112d70"
            addCodeIcon={IMAGES.UPDATE_PROFILE_IMG}
            className={styled.profile_container}
          >
            <Grid className={styled.profile_input_container}>
              <Box className={styled.skeleton_column}>
                <Box className={`${styled.profile_pic} ${isMobileOTP ? styled.margin_bottom : ''}`}>
                  <IconButton
                    style={{
                      border: `8px solid ${AVATAR_SET[+profile?.profilePicture]?.color}`,
                    }}
                    className={`${styled.profile_avatar} sButton`}
                    data-tag="avatar"
                    data-sid={'profile img'}
                    onClick={callback}
                  >
                    <AvatarSwitcher
                      className={styled.avatar}
                      t={`${
                        profile.profilePicture ??
                        'data:image/png;base64,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'
                      }`}
                      s={85}
                    />
                    <Box className={`btn ${styled.btn}`}>
                      <img src={Cordova.Path(IMAGES.EDIT_ICON)} alt="edit-icon" />
                    </Box>
                  </IconButton>
                </Box>
                {!isMobileOTP && (
                  <Box mb={2} textAlign="center">
                    <Input disabled value={profile.email} label={texts.EMAIL} tag="name" onChange={callback} />
                  </Box>
                )}

                <Box mb={2} textAlign="center" mt={1}>
                  <Input
                    required
                    value={profile.name}
                    label={isShupavu ? texts.NAME_LABEL_SH : texts.NAME}
                    tag="name"
                    onChange={callback}
                  />
                </Box>
                {(isGlobalClimate || isSGG || isMobileOTP) && (
                  <Box
                    className={`${styled.contact_input} ${isMobileOTP ? styled.contact_input_first : ''}`}
                    mb={2}
                    textAlign="center"
                  >
                    <Input
                      // required
                      placeholder={texts.PHONE_NUMBER}
                      value={profile.number}
                      disabled={isShupavu ? true : false}
                      label={texts.NUMBER}
                      tag="number"
                      onChange={callback}
                    />
                  </Box>
                )}
              </Box>
              <Box className={`${styled.skeleton_column} ${isMobileOTP ? styled.second_col : ''}`}>
                <Box mb={2} textAlign="center">
                  <Input hideInput label={texts.DATE_OF_BIRTH} />
                  <Calendar
                    className={styled.radioB}
                    name="Date of birth"
                    data_sid={texts.DATE_OF_BIRTH.toLowerCase()}
                    format="YYYY-MM-DD"
                    disableFuture
                    value={profile.dob}
                    onChange={(data) => {
                      OnInputChange({ name: 'dob', value: `${data.$y}-${data.$M + 1}-${data.$D}` }, profile, setProfile);
                    }}
                  />
                </Box>
                {!isGlobalClimate && !isSGG && !isMobileOTP && (
                  <Box className={styled.contact_input} mb={2} textAlign="center">
                    <Input
                      // required
                      placeholder={texts.PHONE_NUMBER}
                      value={profile.number}
                      label={texts.NUMBER}
                      tag="number"
                      onChange={callback}
                    />
                  </Box>
                )}
                {isGlobalClimate || isSGG ? (
                  <>
                    {initialCountry != null && (
                      <Box mb={2} textAlign="center">
                        <Input
                          // required
                          hideInput
                          value={profile.country}
                          label={texts.COUNTRY_TERRITORY}
                          tag="country"
                          onChange={callback}
                        />
                        <TAutoComplete
                          // label={texts.PLEASE_SELECT_CITY}
                          label={countrySelectRef.index !== -1 || initialCountry ? '' : texts.SELECT_COUNTRY}
                          data_sid={texts.COUNTRY_TERRITORY.toLowerCase()}
                          list={CountryListGCLC}
                          callback={callback}
                          value={
                            countrySelectRef.index !== -1
                              ? { index: countrySelectRef.index, name: countrySelectRef.name }
                              : initialCountry || ''
                          }
                          tag="selected-item-country"
                        />
                      </Box>
                    )}
                    <Box className={styled.contact_input} mb={2} textAlign="center">
                      <Input
                        // required
                        placeholder={texts.PLEASE_SELECT_CITY}
                        value={profile.city}
                        label={texts.CITY}
                        data_sid={texts.CITY.toLowerCase()}
                        tag="city"
                        onChange={callback}
                      />
                    </Box>
                  </>
                ) : (
                  <>
                    {initialValue != null && (
                      <Box mb={2} textAlign="center">
                        <Input
                          // required={isShupavu ? false : true}
                          hideInput
                          value={profile.city}
                          label={texts.CITY}
                          tag="city"
                          onChange={callback}
                        />
                        <TAutoComplete
                          // label={texts.PLEASE_SELECT_CITY}
                          label={citySelectRef.index !== -1 || initialValue ? '' : texts.PLEASE_SELECT_CITY}
                          data_sid={texts.CITY.toLowerCase()}
                          list={Inst_config?.city_list}
                          callback={callback}
                          value={
                            citySelectRef.index !== -1 ? { index: citySelectRef.index, name: citySelectRef.name } : initialValue || ''
                          }
                          tag="selected-item"
                        />
                      </Box>
                    )}
                  </>
                )}

                {!item?.is_school_based && !isPocketGames && (
                  <Box mb={2} textAlign="center">
                    <Input
                      value={profile.schoolName}
                      placeholder={texts.ENTER_SCHOOL_NAME}
                      disabled
                      label={texts.SCHOOL_LABEL}
                      tag="school"
                      onChange={callback}
                    />
                  </Box>
                )}
                {item?.is_school_based && schoolSelectRef.index !== -1 && !isPocketGames && (
                  <Box mb={2} textAlign="center">
                    <Input required hideInput value={''} label={texts.SCHOOL_LABEL} tag="" />
                    <TAutoComplete
                      label={''}
                      // disabled
                      data_sid={texts.SCHOOL_LABEL.toLowerCase()}
                      list={SchoolList}
                      callback={callback}
                      styleCSS={{ width: '100%' }}
                      value={schoolSelectRef.index !== -1 ? { index: schoolSelectRef.index, name: schoolSelectRef.name } : ''}
                      tag="profile-school-item"
                    />
                  </Box>
                )}
                {initialTime && TimeZoneList && isShupavu && user?.active_role === 'learner' && (
                  <Box mb={2} textAlign="center">
                    <Input
                      // required={isShupavu ? false : true}
                      hideInput
                      value={profile.timezone}
                      label={texts.TIME_ZONE}
                      tag="timezone"
                      onChange={callback}
                    />
                    <TAutoComplete
                      // label={texts.PLEASE_SELECT_CITY}
                      label={timeSelectRef.index !== -1 || initialTime ? '' : texts.PLEASE_SELECT_TIME}
                      data_sid={texts.TIME_ZONE.toLowerCase()}
                      list={TimeZoneList}
                      callback={callback}
                      value={timeSelectRef.index !== -1 ? { index: timeSelectRef.index, name: timeSelectRef.name } : initialTime || ''}
                      tag="selected-timezone"
                    />
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid className={`${styled.profile_btn_container} ${isShupavu ? styled.single_width : ''}`}>
              {!isShupavu && (
                <ButtonBold bgBlue yellowBubble secondaryYellow tag="cancel" onClick={callback}>
                  {texts.CANCEL}
                </ButtonBold>
              )}
              <ButtonBold yellowBubble secondaryYellow tag="update" onClick={callback}>
                {texts.SAVE}
              </ButtonBold>
            </Grid>
          </IconPaper>
        </Grid>
        <Box m={2} />
      </>
    );
  }
  return (
    <>
      <ModalBox
        ADD_CODE
        hideCross
        isVisible={stateRef.avatarH}
        callback={callback}
        allowClose
        fullWidth
        footer
        maxWidth="920px"
        title_bg="#02BBFE"
        addCodeIcon={IMAGES.CHOOSE_AVATAR}
        className={styled.modal_container}
        title={texts.CHOOSE_AVATAR}
      >
        <FlexibleView className={styled.bg_gradient} display="flex" height="420px" pl={2} pr={2}>
          <SingleDataRow className={`${styled.gradient_box} ${isPocketGames ? styled.avatar_box : ''}`}>{avatarData}</SingleDataRow>
        </FlexibleView>
      </ModalBox>
      <PageStructure
        headerSet={{
          showLeft: isShupavu && (typeof profileName === 'number' || !isNaN(profileName)) ? false : true,
          showRight: isShupavu && (typeof profileName === 'number' || !isNaN(profileName)) ? false : true,
          leftTitle: texts.BACK,
        }}
        PreLoader={PreLoader}
        PageState={PageState}
        PageUI={PageUI}
        callback={loadData}
        className={styled.grid}
      />
    </>
  );
};

export default Profile;
