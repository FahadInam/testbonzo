import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTheme, Box, Grid } from '@material-ui/core';
import { ALERT, PAGE_STATE, PREMIUM_COMPETITION, USER, config } from 'Constants';
import { SUPPORTED_THEMES } from 'Theme';
import { OnInputChange, GetObjFromObj, IsEmptyObject, McdUser, getInstanceType, getTextForRole } from 'Utils';
import { MenuBuilder, ModalBox, Button, Rules, Input, NoDataFound } from 'Components';
import { CompetitionNav, SettingsNav } from 'Navigation/Paths';
import competitions_icon from 'Assets/images/bonzoui/headings/competitions.png';
import { GetAllCompetitions, AppControl, SelectedCompetition, User, ChangeGrade, AddSecretCode, Account, Toast } from 'Actions';

import { PageSwitch } from 'Navigation';
import LoginModal from 'Stacks/Account/LoginModal';
import useCompetitionLoader from 'Utils/useCompetitionLoader';
import { PageStructure } from '../shared';
import useStyles from './style';
import { CompetitionCard, CompetitionCardLoader, InviteCard } from './LocalComponents';
import addCodeIcon from 'Assets/images/bonzoui/add_code.svg';
import PayCard from 'Components/PayCard';
import defaultNavConstants from 'Navigation/Paths/defaultNav.constants';
import ButtonBold from 'Components/Core/ButtonBold';
import { GetPaymentStatus } from 'Actions/payment.action';
import DemoVideo from 'Components/DemoVideo';
import InfoBanner from '../InfoBanner';
import { INSTANCES_ID } from 'Constants/instance.config';
import { gameDispatch } from 'Utils/ActionCreators';

const AllCompetitions = () => {
  let PageState = PAGE_STATE.IS_LOADING;
  let PageUI;
  let PreLoader = null;
  const { texts } = useTheme();
  const dispatch = useDispatch();
  const styled = useStyles();
  const stateChange = useSelector((state) => state.User);

  const UserSubscription = useSelector((state) => state.UserSubscription.data, shallowEqual);
  const Login_Type = useSelector((state) => state.LoginType.is_inst_based, shallowEqual);
  const { competitions, status, shouldRetry, resetApi } = useCompetitionLoader(GetAllCompetitions);
  const [competitionsList, setCompetitionsList] = useState([]);
  const [isPrivateCompEnable, setIsPrivateCompEnable] = useState(config.private_comp);
  const [activeBtn, setActiveBtn] = useState('all');
  const [isPremiumUser, setIsPremiumUser] = useState(null);
  const [isPremiumData, setPremiumData] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const Instance_config = useSelector((state) => state.GetInstanceConfig, shallowEqual);
  const isShupavu = getInstanceType(Inst_config.instance_id, INSTANCES_ID.SHUPAVU_ID);
  const isGlobalClimate = getInstanceType(Inst_config.instance_id, INSTANCES_ID.GLOBAL_CLIMATE_LITERACY_ID);
  const user = User.Info();

  const { text1, text2, text3, text4, text5, text6 } = getTextForRole(
    user.active_role,
    isPremiumData?.is_subscribed,
    Instance_config?.current_stage,
    Inst_config?.text_object
  );

  // Define separate variables for "Add" and "Voucher Code"
  const addText = 'Add';
  const voucherText = 'Voucher Code';

  useEffect(() => {
    if (competitions) {
      setCompetitionsList(competitions);
    }
    if (user.active_role === 'principal' && competitions) {
      dispatch(
        GetPaymentStatus({ competition_id: user.school_id, current_grade: '0' }, (data) => {
          setIsPremiumUser(data.is_subscribed);
          setPremiumData(data);
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [competitions]);

  useEffect(() => {
    const handlePopState = () => {
      if (User.IsGuest() && User.IsLoggedInUser()) {
        User.Clear(false);
        dispatch(Account.Logout(user));
        dispatch({ type: USER.CLEAR });
        dispatch({ type: USER.IS_LOGGED_IN, payload: false });
      }
    };

    window.addEventListener('popstate', handlePopState);

    window.history.pushState({}, '');

    return () => {
      //  console.log('PAGE EXIT');
      window.removeEventListener('popstate', handlePopState);
      console.log('EventListener removed');
      window.firstCompetitionCall = false;
      setCompetitionsList([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const [selectedCompetition, setSelectedCompetition] = useState({
    gradeList: [],
    item: {},
    anchorEl: null,
  });
  const [rulesPopUpVisible, setRulesPopUpVisible] = useState({
    anchor: false,
    rules: '',
    addCompAnchor: false,
  });
  const [SecretCode, setSecretCode] = useState({ codeSecret: '' });
  const [CustomItem, setCustomItem] = useState({ item: {} });

  const afterCodeEntry = (data) => {
    setRulesPopUpVisible({
      ...rulesPopUpVisible,
      addCompAnchor: false,
    });
    setSecretCode({ codeSecret: '' });
  };

  useEffect(() => {
    localStorage.removeItem('compName');
    AppControl.SetTheme(SUPPORTED_THEMES.LIGHT);
    const hash = window.location.hash;
    if (hash && hash.includes('error')) {
      return;
    }
    if (hash) {
      SelectedCompetition.GotoCompetition();
    } else {
      SelectedCompetition.Clear();
    }
    dispatch(GetAllCompetitions());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (isPrivateCompEnable && !User.IsGuest() && competitionsList) {
      const selectedCompetition1 = GetObjFromObj(competitionsList, 'url', isPrivateCompEnable);
      if (!IsEmptyObject(selectedCompetition1) && selectedCompetition1.is_code_redeemed === 0) {
        setRulesPopUpVisible({ ...rulesPopUpVisible, addCompAnchor: true });
        setIsPrivateCompEnable(null);
      }
    }
    if (isShupavu) {
      gameDispatch(PREMIUM_COMPETITION.CLEAR_DATA);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateChange]);

  const agreeRules = (item, from) => {
    let coming_from = { from, competition_id: item.competition_id };
    setRulesPopUpVisible({ ...rulesPopUpVisible, anchor: false });
    SelectedCompetition.Set({
      item: { ...(item || CustomItem.item) },
    });
    const comp = SelectedCompetition.Info();
    config.private_comp = null;
    if (comp.item?.is_school_based === 1 && comp.item.enrolled === 0) {
      PageSwitch(SettingsNav.SELECT_SCHOOL);
    } else {
      if (from === 'view_progress') {
        PageSwitch(SettingsNav.CHANGE_GRADE, coming_from);
      } else {
        PageSwitch(SettingsNav.CHANGE_GRADE, (coming_from = { competition_id: item.competition_id }));
      }
    }
  };

  const filterCompetitions = (btnType) => {
    if (btnType === 'my') {
      const filteredCompetitions = competitions?.filter((item) => item.enrolled);
      if (filteredCompetitions.length === 0) {
        setCompetitionsList([]);
      } else {
        setCompetitionsList(filteredCompetitions);
      }
      setActiveBtn('my');
    } else if (btnType === 'all') {
      setCompetitionsList(competitions);
      setActiveBtn('all');
    }
  };

  const addVoucher = (item) => {
    callback('addComp-btn', item);
  };

  const unlockCompetition = (item) => {
    callback('unlock-comp', item);
  };

  const callback = (e, item) => {
    const t = typeof e === 'string' ? e : e.currentTarget.getAttribute('data-tag') || e.target.name;
    switch (t) {
      case 'school-selection':
        SelectedCompetition.Set({
          item,
          isOnlyCompetition: competitionsList.length === 1,
        });
        config.private_comp = null;
        PageSwitch(SettingsNav.SELECT_SCHOOL);
        break;
      case 'competition':
        if (
          Inst_config?.comp_banner_locked &&
          item?.is_private_comp_enabled === 1 &&
          item?.is_public === 0 &&
          item?.is_voucher_added === 0
        ) {
          addVoucher(item);
        } else {
          SelectedCompetition.Set({
            item,
            isOnlyCompetition: competitionsList.length === 1,
          });
          // should clear all pages and challenge data from redux
          config.private_comp = null;
          SelectedCompetition.GotoCompetition();
          window.pageRouteKey = false;
        }
        break;

      case 'test':
        McdUser.Login();
        break;
      case 'selected-item':
        setRulesPopUpVisible({ ...rulesPopUpVisible, anchor: false });
        dispatch(
          ChangeGrade(
            {
              item: selectedCompetition.item,
              isOnlyCompetition: competitionsList.length === 1,
            },
            item.index,
            false,
            config.friend_id
          )
        );
        setSelectedCompetition({ ...selectedCompetition, anchorEl: null });
        break;
      case 'addComp-btn':
        setRulesPopUpVisible({ ...rulesPopUpVisible, addCompAnchor: true });
        setCurrentItem(item);
        break;
      case 'codeSecret':
        OnInputChange({ name: t, value: e.target.value }, SecretCode, setSecretCode);
        break;
      case 'overlay':
      case 'close':
        setRulesPopUpVisible({ ...rulesPopUpVisible, anchor: false, addCompAnchor: false });
        break;
      case 'continue-addComp':
        window.firstCompetitionCall = false;
        dispatch(
          AddSecretCode(
            SecretCode,
            texts,
            (data) => {
              afterCodeEntry(data);
              Toast.Show('Voucher code added!', ALERT.SUCCESS);
              Inst_config?.comp_banner_locked &&
                dispatch(
                  GetAllCompetitions(() => {
                    unlockCompetition(currentItem);
                  })
                );
            },
            currentItem?.competition_id,
            Inst_config?.comp_banner_locked
          )
        );
        break;
      case 'I_DISAGREE-rules':
        setRulesPopUpVisible({ ...rulesPopUpVisible, anchor: false });
        SelectedCompetition.Clear();
        break;
      case 'I_AGREE-rules':
        agreeRules();
        break;
      case 'view-progress':
        agreeRules({ ...item }, 'view_progress');
        if (!window.cordova) {
          SelectedCompetition.Set({
            item: { ...(item || CustomItem.item) },
          });
        } else if (item.rules) {
          setRulesPopUpVisible({ ...rulesPopUpVisible, anchor: true, rules: item.rules });
          setCustomItem({
            item: { ...item },
          });
          window.pageRouteKey = false;
        }
        break;
      case 'show-rules':
        // console.log("I'm call now...")
        if (user.active_role === 'principal') {
          break;
        } else {
          if (
            Inst_config?.comp_banner_locked &&
            item?.is_private_comp_enabled === 1 &&
            item?.is_public === 0 &&
            item?.is_voucher_added === 0
          ) {
            addVoucher(item);
          } else {
            unlockCompetition(item);
          }
          break;
        }
      case 'unlock-comp':
        if (!item.rules) {
          agreeRules({ ...item });
        } else if (!window.cordova) {
          SelectedCompetition.Set({
            item: { ...(item || CustomItem.item) },
          });
          PageSwitch(CompetitionNav.RULES);
        } else if (item.rules) {
          setRulesPopUpVisible({ ...rulesPopUpVisible, anchor: true, rules: item.rules });
          setCustomItem({
            item: { ...item },
          });
          window.pageRouteKey = false;
        }
        break;
      case 'Payment':
        PageSwitch(defaultNavConstants.PAYMENT);
        break;
      default:
        setSelectedCompetition({ ...selectedCompetition, anchorEl: null });
        break;
    }
  };

  const PayCardUI = UserSubscription?.is_subscribed === 0 && user.active_role === 'principal' && (
    <>
      <PayCard callback={callback} texts={texts} is_disable={isGlobalClimate} />
      <DemoVideo texts={texts} />
    </>
  );

  if (!status) {
    PageState = PAGE_STATE.IS_LOADING;
    PreLoader = [0, 1, 2, 3, 4, 5, 6, 7].map((item) => {
      return <CompetitionCardLoader key={item} />;
    });
  } else if (shouldRetry && UserSubscription?.is_subscribed && user.active_role === 'principal') {
    PageState = PAGE_STATE.RETRY;
  } else if (
    competitionsList?.length === 0 &&
    UserSubscription?.is_subscribed &&
    user.active_role === 'principal' &&
    !isGlobalClimate
  ) {
    PageState = PAGE_STATE.NO_DATA_TO_SHOW;
  } else if (competitions?.length === 0 && user.active_role === 'learner') {
    PageState = PAGE_STATE.NO_DATA_TO_SHOW;
  } else {
    PageState = PAGE_STATE.LOADED;
    PageUI = (
      <>
        <MenuBuilder list={selectedCompetition.gradeList} callback={callback} anchorRef={selectedCompetition.anchorEl} />
        {PayCardUI && PayCardUI}

        {isPremiumUser === 1 && user.active_role === 'principal' && <InviteCard premiumData={isPremiumData} />}
        {isGlobalClimate && isPremiumUser === 1 && user.active_role === 'principal' && <DemoVideo texts={texts} />}

        {user.active_role === 'principal' ? (
          UserSubscription?.is_subscribed === 1 &&
          competitionsList.map((item) => {
            if (!item.is_public && item.enrolled !== 1 && item.is_code_redeemed === 0) return null;
            // if (User.IsGuest() && item.competition_id === 36) return null;
            return (
              <CompetitionCard
                Login_Type={Login_Type}
                key={item.competition_id}
                item={item}
                callback={callback}
                user={user}
                isPremiumUser={isPremiumUser}
                texts={texts}
              />
            );
          })
        ) : competitionsList.length === 0 ? (
          <NoDataFound noDataMsg="You haven’t enrolled in any competitions yet." />
        ) : (
          competitionsList.map((item) => (
            <CompetitionCard
              Login_Type={Login_Type}
              key={item.competition_id}
              item={item}
              callback={callback}
              user={user}
              isPremiumUser={isPremiumUser}
              texts={texts}
            />
          ))
        )}
      </>
    );
  }

  const SecondaryButtons = !User.IsGuest() && user.active_role !== 'principal' && !Inst_config?.comp_banner_locked && !isShupavu && (
    <Box mr={1} data-tag="addComp-btn" onClick={callback}>
      <ButtonBold
        webBtn // ==> it means this button will hide in mobile (below 638px)
        yellowBubble
        secondaryYellow
        blackShadow
        data_sid={`${addText} ${voucherText}`}
      >
        <span>
          <span className={styled.titleStyle}>{addText}</span>
          <span>{voucherText}</span>
        </span>
      </ButtonBold>
      <ButtonBold
        mobileBtn // ==> this button will show in mobile (below 638px)
        yellowBubble
        secondaryYellow
        blackShadow
      >
        {texts.ADD_CODE}
      </ButtonBold>
    </Box>
  );

  const TopBanner = Inst_config?.banner_text && text1 && (
    <InfoBanner text1={text1} text2={text2} text3={text3} text4={text4} text5={text5} text6={text6} />
  );

  const ButtonsUI = !isPremiumUser && user.active_role !== 'principal' && !User.IsGuest() && (
    <Grid className={styled.buttons_container}>
      <Button className={activeBtn === 'all' ? styled.active_btn : styled.btn} height={38} onClick={() => filterCompetitions('all')}>
        {texts.ALL_COMPETITIONS}
      </Button>
      <Button className={activeBtn === 'my' ? styled.active_btn : styled.btn} height={38} onClick={() => filterCompetitions('my')}>
        {texts.MY_COMPETITIONS}
      </Button>
    </Grid>
  );

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      window.firstCompetitionCall = false;
      dispatch(
        AddSecretCode(
          SecretCode,
          texts,
          (data) => {
            afterCodeEntry(data);
            Toast.Show('Voucher code added!', ALERT.SUCCESS);
            Inst_config?.comp_banner_locked &&
              dispatch(
                GetAllCompetitions(() => {
                  unlockCompetition(currentItem);
                })
              );
          },
          currentItem?.competition_id,
          Inst_config?.comp_banner_locked
        )
      );
    }
  };

  return (
    <>
      <Rules callback={callback} menuAnchor={rulesPopUpVisible.anchor} competitionRules={rulesPopUpVisible.rules} />
      <LoginModal />
      <ModalBox
        isVisible={rulesPopUpVisible.addCompAnchor}
        allowClose
        ADD_CODE
        callback={() => {
          setRulesPopUpVisible({ ...rulesPopUpVisible, addCompAnchor: false });
          config.private_comp = null;
          setSecretCode({ codeSecret: '' });
        }}
        addCodeIcon={addCodeIcon}
        title={
          <span>
            <span className={styled.titleStyle}>{addText}</span>
            <span>{voucherText}</span>
          </span>
        }
        className={`${styled.modal_container} voucherModalCrossIcon`}
      >
        <Grid className={styled.modal_input_box}>
          <Input
            tag="codeSecret"
            name="codeSecret"
            ADD_CODE
            value={SecretCode.codeSecret}
            onChange={callback}
            label={isGlobalClimate ? texts.ENTER_VOUCHER_CODE_GG : texts.ENTER_VOUCHER_CODE}
            autoFocus={process.env.REACT_APP_IS_APP === '0'}
            onKeyPress={handleEnter}
            callback={callback}
            placeholder={texts.ENTER_CODE}
            isShowText2={true}
            isGlobalClimate={isGlobalClimate}
          />
        </Grid>
      </ModalBox>
      <PageStructure
        headerSet={{
          showRight: true,
          hideCoins: true,
          showLeft: User.IsGuest() ? true : false,
          hideLeftTitle: User.IsGuest() ? true : false,
          overrideLeftButton: false,
          showLogo: true,
          SecondaryButtons,
          handlePopState: User.IsGuest() ? true : false,
          showFloatingFAQ: true,
        }}
        name={PayCardUI ? (!isGlobalClimate ? texts.PAY_FOR_ACCESS : texts.COMPETITIONS) : texts.COMPETITIONS}
        logo={competitions_icon}
        PageState={PageState}
        PreLoader={PreLoader}
        TopBanner={TopBanner}
        ButtonsUI={ButtonsUI}
        PageUI={PageUI}
        callback={resetApi}
      />
    </>
  );
};

export default AllCompetitions;
