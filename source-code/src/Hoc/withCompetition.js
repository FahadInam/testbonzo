/* eslint-disable camelcase */
import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTheme } from '@material-ui/core';
import { IsEmptyObject, GetObjFromObj, getInstanceType } from 'Utils';
import { ALERT, config } from 'Constants';
import {
  Toast,
  SelectedCompetition,
  AppControl,
  GetAllCompetitions,
  GetRecommendations,
  checkCompetitionCompatibility,
} from 'Actions';

import User from 'Actions/user.action';
import { PageSwitch } from 'Navigation';
import { DefaultNav, SettingsNav } from 'Navigation/Paths';
import directLink from 'Actions/directLink.action';
import { DotLoader } from 'Components/Loader/dotLoader';
import useCompetitionLoader from 'Utils/useCompetitionLoader';
import { INSTANCES_ID } from 'Constants/instance.config';

export const WithCompetition = React.memo(({ component: Component, ...rest }) => {
  //  console.log('inside change1');
  const [launched, setLaunched] = useState(false);
  const competitionStr = useSelector((state) => state.Competition, shallowEqual);
  const competition = SelectedCompetition.StrToObj(competitionStr);
  const recommendations = useSelector((state) => state.GetRecommendations, shallowEqual);
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const isGlobalClimate = getInstanceType(Inst_config.instance_id, INSTANCES_ID.GLOBAL_CLIMATE_LITERACY_ID);
  const { games, competitions, status, shouldRetry } = useCompetitionLoader(GetAllCompetitions);
  //console.log('call GetAllCompetitions', competitionStr, competition);
  const pageData = useSelector((state) => state.GetCompetitionDetails, shallowEqual);
  // console.log('competition..........', competition, pageData);

  const user = User.Info();
  const dispatch = useDispatch();
  const params = useParams();
  const { texts } = useTheme();

  const directLinkDto = useMemo(() => directLink.process(), []);
  //console.log('params', params);
  useEffect(() => {
    if (competitions && directLinkDto) dispatch(GetRecommendations({ ...competition.item }, false, true));
    //  console.log('call once', competitions, directLinkDto);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [competitions]);

  useEffect(() => {
    const competitionSelected = checkCompetitionCompatibility(competitions, params.CompetitionName);
    const UserData = competition?.user_data;
    SelectedCompetition.Set({
      item: { ...competitionSelected },
    });
    if (UserData) {
      SelectedCompetition.Update({ user_data: UserData });
    }
    if (!competitionSelected) {
      PageSwitch(DefaultNav.COMPETITIONS);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.CompetitionName]);

  //console.log('37 directLinkDto', recommendations);
  // theme applying mechanism
  useEffect(() => {
    if (competition.item && competition.item.theme) {
      AppControl.SetTheme(competition.item.theme);
    }
  }, [competition.item]);

  useEffect(() => {
    if (!status && !shouldRetry && !recommendations) return;
    if (directLinkDto) {
      directLink.setAndRedirect(
        directLinkDto,
        User.IsGuest(),
        dispatch,
        { games, competitions, status, shouldRetry },
        recommendations,
        texts
      );
      return;
    }
    if (!window.userLogOut) {
      if (
        isGlobalClimate &&
        !IsEmptyObject(competition) &&
        competition?.item?.is_public === 0 &&
        competition?.item?.is_voucher_added === 0
      ) {
        Toast.Show('Add a voucher code to unlock this competition.', ALERT.ERROR, true);
        PageSwitch(DefaultNav.MAIN);
      }

      // if (IsEmptyObject(competition) || !competition.item || (competition.item && !competition.item.current_grade)) {
      if (IsEmptyObject(competition) || (!competition.item?.current_grade && !pageData?.current_grade)) {
        if (!params || !params.CompetitionName) {
          Toast.Show(texts.NO_EVENT_SELECTED, ALERT.ERROR, true);
          return;
        }
        console.log('74 test', !launched && User.IsGuest(), window.pageRouteKey);
        if ((!launched && User.IsGuest()) || window.is_first_launch) {
          setTimeout(() => {
            if (window.pageRouteKey === false) {
              // console.log('74');
              document.getElementById('preloader').style.display = 'none';
              PageSwitch(SettingsNav.CHANGE_GRADE);
              // setLaunched(true);
            } else {
              PageSwitch(DefaultNav.COMPETITIONS);
            }
          }, 500);
        } else if (!launched && !User.IsGuest()) {
          // PageSwitch(DefaultNav.COMPETITIONS);

          console.log('params', params);
          if (params) {
            const selectedCompetition1 = GetObjFromObj(competitions, 'url', params.CompetitionName);
            // console.log('params', selectedCompetition1);
            // if (!selectedCompetition1.is_public && selectedCompetition1.is_semi_private) {
            //   SelectedCompetition.Set({
            //     item: selectedCompetition1,
            //     games: competition.games,
            //   });
            //   // should clear all pages and challenge data from redux
            //   SelectedCompetition.GotoCompetition();
            // } else
            if (!selectedCompetition1.is_public && selectedCompetition1.is_code_redeemed === 0) {
              config.private_comp = params.CompetitionName;
            }
          }
        }
        // TODO: before UNDP makes only 1 competition effective
        // console.log('YAHAN');
        AppControl.Params(params);
        setLaunched(true);
      }
    }

    return () => (window.is_first_launch = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [competition, status, shouldRetry, user.user_id]);

  if (!status) {
    return <DotLoader />;
  }

  // if (!IsEmptyObject(competition) && competition.item && competition.item.current_grade) {
  if ((!IsEmptyObject(competition) && competition.item && competition.item.current_grade) || pageData?.current_grade) {
    return (
      <>
        <Component
          {...rest}
          competition={competition.item}
          // games={competition.games}
          isOnlyCompetition={competition.isOnlyCompetition}
          siteConfig={Inst_config}
        />
      </>
    );
  }
  return <DotLoader />;
});

export default WithCompetition;
