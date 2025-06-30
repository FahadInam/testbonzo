import {
  validateEmail,
  IsEmptyObject,
  Cordova,
  isGreenGuardiansInstance,
  validateKenyanPhoneNumber,
  validOTP,
  getInstanceType,
} from 'Utils';
import sha256 from 'crypto-js/sha256';
import {
  ALERT,
  API_CALLS,
  LIMITS_CONFIG,
  LOGIN_TYPES,
  GetRandomAvatar,
  USER,
  APP_INTERNAL_MESSAGES,
  MCD,
  AD_LOGIN_USER,
  DIRECT_LAUNCH_USER,
  SIGN_UP_USER,
  LOGIN_TYPE,
  REFRESH_STATUS,
  config,
  GetRandomGenericAvatar,
} from 'Constants';
import { GoToLastPage, PageSwitch } from 'Navigation';
import { AccountNav, CompetitionNav, DefaultNav, SettingsNav } from 'Navigation/Paths';
import { store } from 'Store';
import { AccountPopUp, SelectedCompetition } from 'Actions';
import OsProperties from 'Utils/OsProperties';
import { gameDispatch } from 'Utils/ActionCreators';
import { Toast, Spinner } from './app.control.action';
import { ExecApiRequest } from './api.action';
import User from './user.action';
import { checkCompetitionCompatibility, GetAllCompetitions } from './competitions.action';
import Notification from './push.notification.action';
import { GetPaymentStatus } from './payment.action';
import { INSTANCES_ID } from 'Constants/instance.config';

window.userLogOut = false;
window.is_migrated = false;
window.refetchConfig = false;
const CheckEmail = ({ email }, texts) => {
  if (!email) {
    Toast.Show(texts.EMAIL_REQUIRED, ALERT.ERROR);
  } else if (!validateEmail(email)) {
    Toast.Show(texts.EMAIL_INVALID, ALERT.ERROR);
  } else return true;
  return false;
};

const CheckInstitutionInfo = (
  { instituteName, country, instituteCity, instituteAddress, principalName, contact, schoolNetwork },
  texts
) => {
  if (!instituteName) {
    Toast.Show(texts.INSTITUTE_NAME_REQUIRED, ALERT.ERROR);
  } else if (isGreenGuardiansInstance() && !country) {
    Toast.Show(texts.COUNTRY_REQUIRED, ALERT.ERROR);
  } else if (!instituteCity) {
    Toast.Show(texts.INSTITUTE_CITY_REQUIRED, ALERT.ERROR);
  } else if (!instituteAddress) {
    Toast.Show(texts.INSTITUTE_ADDRESS_REQUIRED, ALERT.ERROR);
  } else if (!principalName) {
    Toast.Show(texts.PRINCIPAL_NAME_REQUIRED, ALERT.ERROR);
  } else if (!contact) {
    Toast.Show(texts.CONTACT_REQUIRED, ALERT.ERROR);
  } else {
    return true;
  }
  return false;
};

const CheckProfileInfo = (obj, texts, isShupavu) => {
  const { name } = obj;
  if (typeof name === 'number' || !isNaN(name)) {
    Toast.Show(texts.NAME_REQUIRED_SH, ALERT.ERROR);
  } else if (!name) {
    Toast.Show(texts.NAME_REQUIRED, ALERT.ERROR);
  } else if (!/^[a-zA-Z0-9@.\s]+$/.test(name.trim())) {
    Toast.Show(texts.INVALID_NAME, ALERT.ERROR);
  }
  //  else if (!number) {
  //   Toast.Show(texts.CONTACT_REQUIRED, ALERT.ERROR);
  // } else if (!city && !isShupavu) {
  //   Toast.Show(texts.INSTITUTE_CITY_REQUIRED, ALERT.ERROR);
  // } else if (/\d/.test(city)) {
  //   Toast.Show(texts.INVALID_CITY, ALERT.ERROR); // Show error for invalid city
  // }
  else {
    return true;
  }

  return false;
};

const CheckPassword = (password, texts, checkLength) => {
  if (!password) {
    Toast.Show(texts.REQUIRED_FIELDS, ALERT.ERROR);
  } else if (
    (password.length < LIMITS_CONFIG.PASSWORD_MIN_LENGTH || password.length > LIMITS_CONFIG.PASSWORD_MAX_LENGTH) &&
    !checkLength
  ) {
    Toast.Show(texts.PASSWORD_INVALID, ALERT.ERROR);
  } else return true;
  return false;
};

const ComparePassword = (Password, renterPassword, texts) => {
  if (Password !== renterPassword) {
    Toast.Show(texts.PASSWORD2_INVALID, ALERT.ERROR);
  } else return true;
  return false;
};

const PostSuccessfulLogin = (compData, callback) => {
  let isGradeSelected = false;
  for (let i = 0; i < compData.length; i++) {
    if (compData[i].current_grade) {
      isGradeSelected = true;
      break;
    }
  }
  return (dispatch) => {
    const guestData = User.GuestSavedData();
    if (guestData.competition_id !== -1 && guestData.grade !== -1 && !isGradeSelected) {
      const updatedGuestData = {
        ...guestData,
        points: guestData.points > 200 ? 200 : guestData.points,
      };
      dispatch(
        ExecApiRequest(API_CALLS.SetGradeAndPoints, updatedGuestData, () => {
          AccountPopUp.Hide();
        })
      );
    }
    if (callback) callback({});
  };
};

const LoginSuccess = (
  data,
  loginDto,
  directLaunchData,
  loginData,
  callback,
  isSelectedComp,
  selectedComp,
  competition_name,
  isMobileOTP
) => {
  Spinner.Show();
  const guestData = User.GuestSavedData();
  const isGuest = guestData.competition_id !== -1 && guestData.grade !== -1;
  const { type } = loginDto;
  const saveExtra = {};
  if (type === LOGIN_TYPES.NORMAL) {
    saveExtra.conEmail = loginDto.email;
    saveExtra.conPassword = loginDto.autoLogin ? loginDto.password : '';
  }
  const user = User.Info();
  if ((!isGuest || guestData?.points !== 0 || loginData?.mode !== 'demo') && !window.isDemoResult) {
    User.Clear(false, undefined, true);
  } else {
    User.Set({
      ...user,
      ...data[0],
      ...loginDto,
      ...saveExtra,
    });
  }

  if (user.user_id === data.user_id) {
    User.Set({
      ...user,
      ...data[0],
      ...loginDto,
      ...saveExtra,
    });
  } else {
    clearLocalStorageExcept(['config', 'lms:account']);
    User.Set({
      ...user,
      ...data[0],
      ...loginDto,
      ...saveExtra,
    });
  }
  return (dispatch) => {
    dispatch({ type: USER.SET, payload: 1 });
    gameDispatch(USER.IS_LOGGED_IN, true);
    dispatch(
      GetAllCompetitions((compData) => {
        Spinner.Show();
        const { competitions } = compData;

        dispatch(
          PostSuccessfulLogin(competitions, (newCompData) => {
            Spinner.Show();
            // console.log(newCompData, 'newCompData');
            const newData = IsEmptyObject(newCompData) ? competitions : newCompData;
            // console.log(newData, "newData")
            // console.log('PostSuccessfulLogin Data', newData);
            // console.log('loginDto Data', loginDto);
            if (loginDto.isMcd) {
              const result = newData.filter((obj) => {
                return obj.is_semi_private === 1;
              });
              //console.log('result', result);
              SelectedCompetition.Set({ item: result[0], isOnlyCompetition: true });
              // console.log('login test');
              PageSwitch(SettingsNav.CHANGE_GRADE);
              //console.log('GO TO MAC');
            } else if (directLaunchData?.id) {
              // eslint-disable-next-line radix
              const index = newData.findIndex((x) => x.competition_id === parseInt(directLaunchData?.id));
              SelectedCompetition.Set({ item: newData[index], user_id: data.user_id, isOnlyCompetition: true });
              gameDispatch(DIRECT_LAUNCH_USER.DIRECT_LAUNCH_USER, true);
              AccountPopUp.Hide();
              //  console.log('login test');

              PageSwitch(SettingsNav.CHANGE_GRADE);
              Spinner.Hide();
            } else if (data.is_migrated) {
              SelectedCompetition.Set({ item: newData[0], isOnlyCompetition: true });
              PageSwitch(SettingsNav.ACCOUNT_MIGRATED);
              Spinner.Hide();
            } else if (isGuest && (!isMobileOTP || !competition_name)) {
              SelectedCompetition.Set({
                item: { ...selectedComp?.item },
                isOnlyCompetition: selectedComp?.isOnlyCompetition,
              });
              SelectedCompetition.GotoCompetition();
              AccountPopUp.Hide();
            } else if ((loginData?.mode === 'demo' && User.IsGuest()) || competition_name) {
              if (loginData?.url || competition_name) {
                const competitionName = loginData?.url || competition_name;
                window.userLogOut = false;
                window.pageRouteKey = false;
                const competition = checkCompetitionCompatibility(compData.competitions, competitionName);
                if (competition) {
                  SelectedCompetition.Set({
                    item: { ...competition },
                  });
                  if (isMobileOTP && competitionName) {
                    PageSwitch(SettingsNav.CHANGE_GRADE);
                  } else {
                    document.getElementById('preloader').style.display = 'block';
                    PageSwitch(CompetitionNav.COMPETITION_HOME);
                  }
                } else {
                  PageSwitch(DefaultNav.COMPETITIONS);
                  document.getElementById('preloader').style.display = 'none';
                  Spinner.Hide();
                }
              } else {
                Spinner.Hide();
                PageSwitch(DefaultNav.COMPETITIONS);
              }
            } else {
              if (!isSelectedComp) {
                PageSwitch(DefaultNav.COMPETITIONS);
              }
              Spinner.Hide();
            }
          })
        );
      })
    );
    window.firstCompetitionCall = true;
  };
};

const RefreshSuccess = (data) => {
  const user = User.Info();

  if (user.user_id === data[0].user_id) {
    User.Set({
      ...user,
      ...data[0],
    });
  } else {
    clearLocalStorageExcept(['config', 'lms:account']);
    User.Set({
      ...user,
      ...data[0],
    });
  }
  return (dispatch) => {
    dispatch({ type: USER.SET, payload: 1 });
    // PageSwitch(DefaultNav.COMPETITIONS);
  };
};

const McdLoginSuccess = (data, loginDto) => {
  // console.log('We are inside MCD LoginSuccess', data, loginDto);
  const guestData = User.GuestSavedData();
  const isGuest = guestData.competition_id !== -1 && guestData.grade !== -1;
  const { type } = loginDto;
  const saveExtra = {};
  if (type === LOGIN_TYPES.NORMAL) {
    saveExtra.conEmail = loginDto.email;
    saveExtra.conPassword = loginDto.autoLogin ? loginDto.password : '';
  }
  const user = User.Info();
  if (!isGuest) {
    User.Clear(false, undefined, true);
    User.GuestSavedData('reset');
  } else {
    User.Set({
      ...user,
      ...data[0],
      ...loginDto,
      ...saveExtra,
    });
  }

  if (user.user_id === data.user_id) {
    User.Set({
      ...user,
      ...data[0],
      ...loginDto,
      ...saveExtra,
    });
  } else {
    clearLocalStorageExcept(['config', 'lms:account']);
    User.Set({
      ...user,
      ...data[0],
      ...loginDto,
      ...saveExtra,
    });
  }
  return (dispatch) => {
    dispatch({ type: USER.SET, payload: 1 });
    dispatch(
      GetAllCompetitions((compData) => {
        // console.log('GetAllCompetitions call', compData);
        const { competitions } = compData;
        dispatch(
          PostSuccessfulLogin(competitions, (newCompData) => {
            const newData = IsEmptyObject(newCompData) ? competitions : newCompData;
            // console.log('PostSuccessfulLogin Data', newData);
            // console.log('loginDto Data', loginDto);
            if (loginDto.isMcd) {
              const result = newData.filter((obj) => {
                return obj.is_semi_private === 1;
              });
              // console.log('result.....', result);
              SelectedCompetition.Set({ item: result[0] });
              // console.log('GO TO MAC', user);
              PageSwitch(SettingsNav.CHANGE_GRADE);
            }
          })
        );
      })
    );
  };
};

const AdditionalLoginSuccess = (data, loginDto) => {
  const guestData = User.GuestSavedData();
  const isGuest = guestData.competition_id !== -1 && guestData.grade !== -1;
  const { type } = loginDto;
  const saveExtra = {};
  if (type === LOGIN_TYPES.NORMAL) {
    saveExtra.conEmail = loginDto.email;
    saveExtra.conPassword = loginDto.autoLogin ? loginDto.password : '';
  }
  const user = User.Info();
  if (!isGuest) {
    User.Clear(false, undefined, true);
    User.GuestSavedData('reset');
  } else {
    User.Set({
      ...user,
      ...data[0],
      ...loginDto,
      ...saveExtra,
    });
  }

  if (user.user_id === data.user_id) {
    User.Set({
      ...user,
      ...data[0],
      ...loginDto,
      ...saveExtra,
    });
  } else {
    clearLocalStorageExcept(['config', 'lms:account']);
    User.Set({
      ...user,
      ...data[0],
      ...loginDto,
      ...saveExtra,
    });
  }
  return (dispatch) => {
    dispatch({ type: USER.SET, payload: 1 });
    gameDispatch(AD_LOGIN_USER.AD_LOGIN_USER, true);
    dispatch(
      GetAllCompetitions((compData) => {
        const { competitions } = compData;
        dispatch(
          PostSuccessfulLogin(competitions, (newCompData) => {
            const newData = IsEmptyObject(newCompData) ? competitions : newCompData;
            if (loginDto.isAdd) {
              const result = newData.filter((obj) => {
                return obj.competition_id === 74;
              });
              SelectedCompetition.Set({ item: result[0], isOnlyCompetition: true });
              PageSwitch(SettingsNav.CHANGE_GRADE);
            }
          })
        );
      })
    );
  };
};

const GuestLogin = ({ email, password, autoLogin, mode, url }, texts, callback) => {
  return (dispatch) => {
    if (CheckEmail({ email }, texts)) {
      if (CheckPassword(password, texts)) {
        dispatch(
          ExecApiRequest(
            API_CALLS.Login,
            {
              username: email,
              password: sha256(password).toString(),
            },
            (data) => {
              User.Clear(false, undefined, true);
              User.Set();
              User.GuestSavedData('reset');
              const loginData = {
                email: email,
                password: password,
                mode: mode,
                url: url,
              };

              dispatch(LoginSuccess(data, { type: 0 }, true, loginData, callback));
            }
          )
        );
      }
    }
  };
};

const Login = ({ email, password, autoLogin, mode, url }, texts, directLaunchData, compressName, isMobileOTP, comp_url) => {
  const isSelectedComp = SelectedCompetition.IsSelected();
  const selectedComp = SelectedCompetition.Info();
  const competition_name = compressName?.toLowerCase() || comp_url;
  return (dispatch) => {
    if (typeof email === 'number' || !isNaN(email) ? true : CheckEmail({ email }, texts)) {
      if (CheckPassword(password, texts, true)) {
        Notification.Init((token) => {
          if (!email || email === '+254') {
            Toast.Show(texts.REQUIRED_FIELDS, ALERT.ERROR);
            return;
          }

          dispatch(
            ExecApiRequest(
              API_CALLS.Login,
              {
                username: email,
                password: sha256(password).toString(),
                push_notification_type: OsProperties.MobileOsType,
                push_notification_id: token,
              },
              (data) => {
                let nData = data[0];

                if (mode === 'demo') {
                  User.Clear(false, undefined, true);
                  User.Set();
                  User.GuestSavedData('reset');
                  const loginData = {
                    email: email,
                    password: password,
                    mode: mode,
                    url: url,
                  };
                  dispatch(LoginSuccess(data, { type: 0 }, true, loginData));
                  return;
                }
                if (
                  nData.active_role === SIGN_UP_USER.LEARNER ||
                  (nData.active_role === SIGN_UP_USER.PRINCIPAL && nData.profile_completion_step === 1)
                ) {
                  if (nData.active_role === SIGN_UP_USER.PRINCIPAL) {
                    window.pageRouteKey = true;
                  }

                  // dispatch(
                  //   GetPaymentStatus(
                  //     { competition_id: data[0].school_id, current_grade: '0', auth_token: data[0].auth_token },
                  //     (data) => {
                  //       if (data.is_subscribed === 0) {
                  //         if (!isSelectedComp && (!isMobileOTP || !compressName)) {
                  //           PageSwitch(DefaultNav.COMPETITIONS);
                  //         }
                  //       }
                  //     }
                  //   )
                  // );

                  // Only call GetPaymentStatus if isMobileOTP is false
                  if (!isMobileOTP) {
                    dispatch(
                      GetPaymentStatus(
                        { competition_id: data[0].school_id, current_grade: '0', auth_token: data[0].auth_token },
                        (data) => {
                          if (data.is_subscribed === 0) {
                            if (!isSelectedComp && !compressName) {
                              PageSwitch(DefaultNav.COMPETITIONS);
                            }
                          }
                        }
                      )
                    );
                  }

                  dispatch(
                    LoginSuccess(
                      data,
                      { email, password, autoLogin, type: LOGIN_TYPES.NORMAL },
                      directLaunchData,
                      null,
                      null,
                      isSelectedComp,
                      selectedComp,
                      competition_name,
                      isMobileOTP
                    )
                  );
                } else {
                  nData = {
                    ...nData,
                    email,
                    password,
                    autoLogin,
                    type: LOGIN_TYPES.NORMAL,
                    ...directLaunchData,
                  };
                  // const isGuest = guestData.competition_id !== -1 && guestData.grade !== -1;
                  if (User.IsLoggedInUser()) {
                    User.Clear(false, undefined, true);
                  }
                  gameDispatch(LOGIN_TYPE.USER_DETAILS, nData);
                  PageSwitch(AccountNav.INSTITUTE_DETAIL);
                }
                return;
              },
              {},
              isMobileOTP
            )
          );
        });
      }
    }
  };
};

const GetRefreshToken = (data) => {
  // console.log(data, "GetRefreshToken")

  return (dispatch) => {
    if (data) {
      // console.log(data?.refresh_token, 'data?.refresh_token');
      const apiConfig = {
        header: {
          Authorization: `Bearer ${data?.refresh_token}`,
        },
      };
      // console.log(apiConfig, "apiConfig")
      const dto = {
        // refresh_token: data.refresh_token,
      };
      if (!User.IsGuest() || data.active_role === 'principal') {
        gameDispatch(REFRESH_STATUS.START_REFRESH_TOKEN);
        dispatch(
          ExecApiRequest(
            API_CALLS.RefreshToken,
            dto,
            (data) => {
              dispatch(RefreshSuccess(data));
            },
            apiConfig
          )
        );
      }
    }
  };
};

// FOR MCD
// eslint-disable-next-line camelcase
const ExternalLogin = ({ email, name, phone_number, mcd_id, device_id, autoLogin }) => {
  return (dispatch) => {
    // console.log('Device id', email, name, phone_number, mcd_id, device_id, autoLogin);
    if (email) {
      dispatch(
        ExecApiRequest(
          API_CALLS.LoginExternal,
          {
            email,
            name,
            phone_number,
            mcd_id,
            device_id,
          },
          (data) => {
            // console.log('data id', data);
            dispatch(McdLoginSuccess(data, { email, password: '', autoLogin, type: LOGIN_TYPES.NORMAL, isMcd: true }));
          }
        )
      );
    }
  };
};

// FOR UNIVERSITY
const ExternalLoginAD = ({ email, name }) => {
  // console.log('email, name', email, name);
  return (dispatch) => {
    //  console.log('dispatch', dispatch);
    dispatch(
      ExecApiRequest(
        API_CALLS.LoginExternalAD,
        {
          email,
          name,
        },
        (data) => {
          // console.log('data', data);
          dispatch(AdditionalLoginSuccess(data, { email, password: '', name, type: LOGIN_TYPES.NORMAL, isAdd: true }));
        }
      )
    );
  };
};

// Old Signup with password and reenterPassword field
// const Signup = ({ email, password, reenterPassword }, texts, directLaunchData) => {
//   return (dispatch) => {
//     if (CheckPassword(password, texts) && CheckPassword(reenterPassword, texts)) {
//       if (ComparePassword(password, reenterPassword, texts))
//         dispatch(
//           ExecApiRequest(
//             API_CALLS.SignUp,
//             {
//               username: email,
//               password: sha256(password).toString(),
//               profile_picture: GetRandomAvatar().toString(),
//               name: '',
//             },
//             () => {
//               dispatch(Login({ email, password }, texts, directLaunchData));
//             }
//           )
//         );
//     }
//   };
// };

const SignupRequest = ({ email }, texts, directLaunchData, user_role, turnstileToken, message, competition_name) => {
  return (dispatch) => {
    if (CheckEmail({ email }, texts)) {
      // if turnstileToken is not available/null, show error message
      if (!turnstileToken) {
        Toast.Show('Please complete the CAPTCHA to proceed.', ALERT.WARNING);
        return;
      }

      dispatch(
        ExecApiRequest(
          API_CALLS.SignUpRequest,
          {
            email: email,
            t_token: turnstileToken,
            competition_name: competition_name,
            role: user_role,
          },
          () => {
            if (message) {
              Toast.Show(texts.EMAIL_SENT, ALERT.SUCCESS);
            } else {
              PageSwitch(AccountNav.VERIFY, { email, t_token: turnstileToken });
            }
          }
        )
      );
    }
  };
};

const SignupVerify = (
  { password },
  texts,
  directLaunchData,
  user_role,
  turnstileToken,
  change_code,
  index,
  compressName,
  isMobileOTP,
  callback
) => {
  return (dispatch) => {
    const Inst_config = window.instanceConfig;
    const isPocketGames = getInstanceType(Inst_config.instance_id, INSTANCES_ID.POCKET_GAMES_ID);
    if (CheckPassword(password, texts)) {
      // if turnstileToken is not available/null, show error message
      if (!turnstileToken) {
        Toast.Show('Please complete the CAPTCHA to proceed.', ALERT.WARNING);
        return;
      }

      dispatch(
        ExecApiRequest(
          API_CALLS.SignUpVerify,
          {
            index: +index,
            password: sha256(password).toString(),
            profile_picture: (isPocketGames ? GetRandomGenericAvatar() : GetRandomAvatar()).toString(),
            role: user_role,
            change_code: change_code,
            t_token: turnstileToken,
          },
          (data) => {
            callback();
            if (compressName) {
              window.is_first_launch = true;
            }
            config.cf_sitarey = 0;
            dispatch(Login({ email: data?.email, password }, texts, directLaunchData, compressName, isMobileOTP));
          }
        )
      );
    }
  };
};

const Signup = ({ email, password }, texts, directLaunchData, userRole, turnstileToken, isMobileOTP, callback) => {
  // console.log('userRole->', userRole);
  const Inst_config = window.instanceConfig;
  const isPocketGames = getInstanceType(Inst_config.instance_id, INSTANCES_ID.POCKET_GAMES_ID);

  return (dispatch) => {
    if (CheckEmail({ email }, texts)) {
      if (CheckPassword(password, texts)) {
        // if turnstileToken is not available/null, show error message
        if (!turnstileToken) {
          Toast.Show('Please complete the CAPTCHA to proceed.', ALERT.WARNING);
          return;
        }
        dispatch(
          ExecApiRequest(
            API_CALLS.SignUp,
            {
              username: email,
              password: sha256(password).toString(),
              profile_picture: (isPocketGames ? GetRandomGenericAvatar() : GetRandomAvatar()).toString(),
              name: '',
              role: userRole,
              t_token: turnstileToken,
            },
            () => {
              callback();
              config.cf_sitarey = 0;
              config.cf_gclc = 0;
              dispatch(Login({ email, password }, texts, directLaunchData, '', isMobileOTP));
            }
          )
        );
      }
    }
  };
};

const InstitutionalInfo = (
  { instituteName, country, instituteCity, instituteAddress, heardAboutUs, principalName, contact, schoolNetwork },
  userDetails,
  texts,
  directLaunchData
) => {
  const header = {
    auth_token: userDetails.auth_token,
  };

  const { email, password, autoLogin } = userDetails;
  const nData = [{ ...userDetails }];

  return (dispatch) => {
    if (
      CheckInstitutionInfo({ instituteName, country, instituteCity, instituteAddress, principalName, contact, schoolNetwork }, texts)
    ) {
      dispatch(
        ExecApiRequest(
          API_CALLS.InstitutionalInfo,
          {
            institution_name: instituteName,
            country: country,
            institution_city: instituteCity,
            institution_network: schoolNetwork,
            institution_address: instituteAddress,
            principal_name: principalName,
            phone_number: contact,
            heard_about_us: heardAboutUs,
          },
          (data) => {
            // console.log(data, 'data to check info');
            if (data.profile_completion_step) {
              dispatch(Account.GetRefreshToken(userDetails));
              dispatch(
                GetPaymentStatus(
                  { competition_id: userDetails.school_id, current_grade: '0', auth_token: userDetails.auth_token },
                  (data) => {
                    // console.log(data, "status data")
                    if (data.is_subscribed === 0) {
                      PageSwitch(DefaultNav.COMPETITIONS);
                    }
                  }
                )
              );
              dispatch(LoginSuccess(nData, { email, password, autoLogin, type: LOGIN_TYPES.NORMAL }, directLaunchData));
            }
          },
          header
        )
      );
    }
  };
};

const GuestEntrance = () => {
  window.userLogOut = false;
  return (dispatch) => {
    User.Clear(false, undefined, true);
    User.Set();
    dispatch(LoginSuccess({}, {}, true));
  };
};

const ProfileUpdate = ({ email, number, name, schoolName, city, gender, dob }, texts) => {
  return (dispatch) => {
    if (CheckEmail({ email }, texts)) {
      dispatch(
        ExecApiRequest(API_CALLS.SaveProfile, {
          email,
          number,
          name,
          schoolName,
          city,
          gender,
          dob,
        })
      );
    }
  };
};

const SaveProfile = (
  { number, name, country, city, timezone, gender, dob, profilePicture, schoolId },
  texts,
  history,
  competition_id,
  isShupavu
) => {
  return (dispatch) => {
    if (CheckProfileInfo({ name, number, city }, texts, isShupavu)) {
      let dto = {
        // username: email,
        phone_number: number,
        name,
        school_id: schoolId || 0,
        // school_name: schoolName,
        gender,
        dob,
        country,
        timezone,
        // city: city?.length > 0 ? city : null,
        profile_picture: profilePicture,
        competition_id: competition_id || 0,
      };
      if (city?.length > 0) {
        dto.city = city;
      }
      dispatch(
        ExecApiRequest(API_CALLS.SaveProfile, dto, () => {
          const user = User.Info();
          Toast.Show(texts.PROFILE_UPDATED, ALERT.SUCCESS);

          user.name = name;
          user.profile_picture = profilePicture;
          user.timezone = timezone;
          User.Set({ ...user });
          User.UpdateUser('timezone', timezone);
          GoToLastPage(history);
        })
      );
    }
  };
};

const ChangePassword = ({ enterNewPassword, reenterNewPassword }, texts) => {
  return (dispatch) => {
    if (CheckPassword(enterNewPassword, texts) && CheckPassword(reenterNewPassword, texts)) {
      if (ComparePassword(enterNewPassword, reenterNewPassword, texts))
        dispatch(ExecApiRequest(API_CALLS.ChangePassword, { enterNewPassword, reenterNewPassword }));
    }
  };
};

const Logout = () => {
  window.userLogOut = true;
  return (dispatch) => {
    User.Clear();
    config.cf_sitarey = 0;
    config.cf_gclc = 0;
    clearLocalStorageExcept('lms:account');
    window.refetchConfig = true;
    // Dispatch action to clear user state
    gameDispatch(API_CALLS.GetInstanceConfig.CLEAR);
    dispatch({ type: USER.CLEAR });
    dispatch({ type: USER.IS_LOGGED_IN, payload: false });
  };
};

const ForgotPassword = ({ email }, texts, token, callback) => {
  const dto = {
    email: email,
    t_Token: token,
  };
  return (dispatch) => {
    if (CheckEmail({ email }, texts)) {
      dispatch(ExecApiRequest(API_CALLS.ForgotPassword, dto, callback));
    }
  };
};

const ResetPassword = ({ password, reenterPassword }, texts, userId, changeCode, callback) => {
  const dto = {
    user_id: userId,
    change_code: changeCode,
    password: sha256(password).toString(),
  };
  return (dispatch) => {
    if (CheckPassword(password, texts) && CheckPassword(reenterPassword, texts)) {
      if (ComparePassword(password, reenterPassword, texts)) dispatch(ExecApiRequest(API_CALLS.ResetPassword, dto, callback));
    }
  };
};

const OTPSignup = ({ email, password, reenterPassword }, texts, otpValue, directLaunchData, isMobileOTP) => {
  const Inst_config = window.instanceConfig;
  const isPocketGames = getInstanceType(Inst_config.instance_id, INSTANCES_ID.POCKET_GAMES_ID);

  return (dispatch) => {
    if (CheckPassword(password, texts) && CheckPassword(reenterPassword, texts)) {
      if (ComparePassword(password, reenterPassword, texts))
        dispatch(
          ExecApiRequest(
            API_CALLS.OTPSignup,
            {
              email: email,
              password: sha256(password).toString(),
              otp: otpValue,
              profile_picture: (isPocketGames ? GetRandomGenericAvatar() : GetRandomAvatar()).toString(),
            },
            () => {
              dispatch(Login({ email, password }, texts, directLaunchData, '', isMobileOTP));
            }
          )
        );
    }
  };
};

const OTPSend = ({ email }, texts, callback) => {
  const dto = {
    email: email,
  };
  return (dispatch) => {
    if (CheckEmail({ email }, texts)) {
      dispatch(ExecApiRequest(API_CALLS.OTPSend, dto, callback));
    }
  };
};

const OTPVerify = ({ email }, otpValue, texts, callback) => {
  const dto = {
    email: email,
    otp: otpValue,
  };
  return (dispatch) => {
    if (CheckEmail({ email }, texts)) {
      dispatch(
        ExecApiRequest(API_CALLS.OTPVerify, dto, (data) => {
          callback(data);
        })
      );
    }
  };
};

const OTPSendForgotPassword = ({ email }, texts, callback) => {
  const dto = {
    email: email,
  };
  return (dispatch) => {
    if (CheckEmail({ email }, texts)) {
      dispatch(ExecApiRequest(API_CALLS.OTPSendForgotPassword, dto, callback));
    }
  };
};

const OTPRecoverPassword = ({ password, reenterPassword }, userId, otpValue, texts, callback) => {
  const dto = {
    user_id: userId,
    otp: otpValue,
    password: sha256(password).toString(),
  };
  return (dispatch) => {
    if (CheckPassword(password, texts) && CheckPassword(reenterPassword, texts)) {
      if (ComparePassword(password, reenterPassword, texts))
        dispatch(
          ExecApiRequest(API_CALLS.OTPRecoverPassword, dto, (data) => {
            callback(data);
          })
        );
    }
  };
};

const SocialLogin = (socialData, directLaunchData, demoMode) => {
  // console.log('SocialLogin directLaunchData', directLaunchData);
  return (dispatch) => {
    Notification.Init((token) => {
      const { accessToken, type, email } = socialData;
      console.log('socialData', socialData);
      let { userRole } = socialData;
      // console.log(socialData, "socialDatasocialData")
      let action = null;

      if (userRole === 'forLearners') {
        userRole = SIGN_UP_USER.LEARNER;
      } else if (userRole === 'forInstitutions') {
        userRole = SIGN_UP_USER.PRINCIPAL;
      } else if (userRole === SIGN_UP_USER.GOOGLE_ACTION) {
        action = SIGN_UP_USER.GOOGLE_ACTION;
      }
      // console.log(action, userRole, "actiontest")
      const dto = {
        email,
        // profile_picture: '3',
        // push_notification_type: OsProperties.MobileOsType,
        // push_notification_id: token,
      };
      if (type === LOGIN_TYPES.FACEBOOK) {
        dto.token = accessToken;
        dto.login_type = 2;
        dto.role = userRole;
        if (action !== null) {
          dto.action_type = action;
        }
      } else if (type === LOGIN_TYPES.GOOGLE) {
        // dto.social_user_id = userId;
        dto.token = accessToken;
        dto.login_type = 3;
        dto.role = userRole;
        if (action !== null) {
          dto.action_type = action;
        }
      } else if (type === LOGIN_TYPES.LMS) {
        dto.token = accessToken;
        dto.login_type = 7;
        dto.role = 'learner';
        if (action !== null) {
          dto.action_type = action;
        }
      }
      dispatch(
        ExecApiRequest(API_CALLS.SocialLogin, dto, (data) => {
          //  console.log(data, 'social data');
          let nData = data[0];

          if (nData.profile_completion_step === 0) {
            if (User.IsLoggedInUser()) {
              User.Clear(false, undefined, true);
            }
            gameDispatch(LOGIN_TYPE.USER_DETAILS, nData);
            PageSwitch(AccountNav.INSTITUTE_DETAIL);
          } else if (nData.active_role === 'principal' && nData.profile_completion_step === 1) {
            dispatch(
              GetPaymentStatus({ competition_id: nData.school_id, current_grade: '0', auth_token: nData.auth_token }, (data) => {
                // console.log(data, "status data")
                if (data.is_subscribed === 0) {
                  PageSwitch(DefaultNav.COMPETITIONS);
                }
              })
            );
            dispatch(LoginSuccess(data, { ...socialData }, directLaunchData));
          } else {
            const isSelectedComp = SelectedCompetition.IsSelected();
            // if (isSelectedComp) {
            // SelectedCompetition.GotoCompetition();
            // } else {
            // PageSwitch(DefaultNav.COMPETITIONS);
            // }
            const selectedComp = SelectedCompetition.Info();
            dispatch(LoginSuccess(data, { ...socialData }, directLaunchData, null, null, isSelectedComp, selectedComp));
          }
        })
      );
    });
  };
};

const LoginWithFacebook = (res, autoLogin) => {
  Spinner.Show();
  if (!res.email || !res.accessToken) {
    Spinner.Hide();
    if (Cordova.IsCordova) {
      Toast.Show(APP_INTERNAL_MESSAGES.FACEBOOK_INVALID, ALERT.ERROR, true);
    }
  } else {
    store.dispatch(SocialLogin({ ...res, type: LOGIN_TYPES.FACEBOOK, autoLogin: Boolean(autoLogin) }));
  }
};

const LoginWithGoogle = (res, autoLogin, directLaunchData) => {
  // console.log('LoginWithGoogle directLaunchData', directLaunchData);
  Spinner.Show();
  if (!res.accessToken || !res.profileObj || (res.profileObj && !res.profileObj.email)) {
    Spinner.Hide();
    if (process.env.NODE_ENV === 'production') {
      if (Cordova.IsCordova) {
        Toast.Show(APP_INTERNAL_MESSAGES.GOOGLE_INVALID, ALERT.ERROR, true);
      }
    }
    return;
  }
  const loginData = {
    email: res.profileObj.email,
    accessToken: res.accessToken,
    type: LOGIN_TYPES.GOOGLE,
    expiresIn: res.tokenObj.expires_at,
    dataExpiryTime: -1,
    autoLogin: Boolean(autoLogin),
    userId: res.googleId,
    name: res.profileObj.name,
  };
  // console.log(loginData, 'loginData');
  store.dispatch(SocialLogin(loginData, directLaunchData));
};

const SsoLogin = (socialData) => {
  Spinner.Show();
  return (dispatch) => {
    Notification.Init((token) => {
      const { authToken, pl, user } = socialData;
      const dto = {
        user,
        authToken,
        pl,
        push_notification_type: OsProperties.MobileOsType,
        push_notification_id: token,
      };
      dispatch(
        ExecApiRequest(API_CALLS.SocialLogin, dto, (data) => {
          dispatch(LoginSuccess(data, { ...socialData }));
          Spinner.Hide();
        })
      );
    });
  };
};

const MCDFullScreen = (state) => {
  return () => {
    gameDispatch(MCD.MCD_FULLSCREEN, state);
  };
};

const clearLocalStorageExcept = (keepKeys) => {
  if (!Array.isArray(keepKeys)) {
    keepKeys = [keepKeys];
  }

  const keepValues = {};
  keepKeys.forEach((key) => {
    const value = localStorage.getItem(key);
    if (value !== null) {
      keepValues[key] = value;
    }
  });
  // Clear localStorage
  localStorage.clear();

  Object.keys(keepValues).forEach((key) => {
    localStorage.setItem(key, keepValues[key]);
  });
};

const OTPSmsSend = ({ phone }, texts, callback, user_role = null, t_token, otp_type) => {
  const dto = {
    phone_number: `+254${phone}`,
    t_token,
    otp_type,
  };

  return (dispatch) => {
    if (!t_token) {
      Toast.Show('Please complete the CAPTCHA to proceed.', ALERT.WARNING);
      return;
    }

    const validationResult = validateKenyanPhoneNumber(dto.phone_number, texts);
    if (validationResult === 'empty') {
      Toast.Show('Please fill out all required fields.', ALERT.ERROR);
    } else if (validationResult) {
      dispatch(ExecApiRequest(API_CALLS.OTPMobileSend, dto, callback));
    } else {
      Toast.Show('Invalid phone number', ALERT.ERROR);
    }
  };
};

const VerifyOTP = (phone, otpValue, texts, callback) => {
  const dto = {
    email: '',
    phone_number: `+254${phone}`,
    otp: otpValue,
  };
  return (dispatch) => {
    if (validOTP(otpValue, texts)) {
      dispatch(
        ExecApiRequest(API_CALLS.OTPVerify, dto, (data) => {
          callback(data);
        })
      );
    }
  };
};

const RecoverPassword = ({ password, otpValue, user_id, phone_number }, texts, callback, directLaunchData, isMobileOTP, comp_url) => {
  const dto = {
    user_id: user_id,
    password: sha256(password).toString(),
    otp: otpValue,
  };
  return (dispatch) => {
    if (validOTP(otpValue, texts)) {
      dispatch(
        ExecApiRequest(API_CALLS.RecoverPassword, dto, (data) => {
          callback(data);
          dispatch(Login({ email: `+254${phone_number}`, password }, texts, directLaunchData, '', isMobileOTP, comp_url));
        })
      );
    }
  };
};

const SignupOTP = (
  { phone_number, password },
  texts,
  directLaunchData,
  userRole,
  turnstileToken,
  competition_name,
  isMobileOTP,
  userType,
  callback
) => {
  return (dispatch) => {
    const Inst_config = window.instanceConfig;
    const isPocketGames = getInstanceType(Inst_config.instance_id, INSTANCES_ID.POCKET_GAMES_ID);

    // if (CheckEmail({ email }, texts)) {
    if (CheckPassword(password, texts)) {
      dispatch(
        ExecApiRequest(
          API_CALLS.SignUp,
          {
            username: '',
            phone_number: `+254${phone_number}`,
            password: sha256(password).toString(),
            profile_picture: (isPocketGames ? GetRandomGenericAvatar() : GetRandomAvatar()).toString(),
            name: '',
            role: userRole,
            t_token: turnstileToken,
            user_type: userType,
          },
          (data) => {
            //console.log('first data-->', data);
            callback();
            config.cf_sitarey = 0;
            config.cf_gclc = 0;
            dispatch(Login({ email: `+254${phone_number}`, password }, texts, directLaunchData, competition_name, isMobileOTP));
          }
        )
      );
    }
    // }
  };
};

const UpdateTimezone = (timezone, callback) => {
  const dto = {
    timezone,
  };
  return (dispatch) => {
    dispatch(
      ExecApiRequest(API_CALLS.UpdateTime, dto, (data) => {
        callback(data);
      })
    );
  };
};

const Account = {
  UpdateTimezone,
  SignupOTP,
  RecoverPassword,
  VerifyOTP,
  SignupRequest,
  SignupVerify,
  Signup,
  GuestEntrance,
  Login,
  ExternalLogin,
  McdLoginSuccess,
  MCDFullScreen,
  ProfileUpdate,
  ChangePassword,
  Logout,
  ForgotPassword,
  OTPSend,
  OTPVerify,
  OTPSignup,
  OTPSendForgotPassword,
  OTPRecoverPassword,
  ResetPassword,
  CheckEmail,
  LoginWithFacebook,
  LoginWithGoogle,
  SaveProfile,
  SocialLogin,
  SsoLogin,
  ExternalLoginAD,
  GetRefreshToken,
  InstitutionalInfo,
  clearLocalStorageExcept,
  GuestLogin,
  OTPSmsSend,
};

export default Account;
