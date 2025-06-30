/* eslint-disable camelcase */
import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTheme } from '@material-ui/core';
import { IsEmptyObject, GetObjFromObj } from 'Utils';
import { ALERT, config } from 'Constants';
import { Toast, SelectedCompetition, AppControl, GetAllCompetitions, GetRecommendations } from 'Actions';

import User from 'Actions/user.action';
import { PageSwitch } from 'Navigation';
import { DefaultNav, SettingsNav } from 'Navigation/Paths';
import directLink from 'Actions/directLink.action';
import { DotLoader } from 'Components/Loader/dotLoader';
import useCompetitionLoader from 'Utils/useCompetitionLoader';

export const ConnectedWithCompetition = React.memo(({ component: Component, ...rest }) => {
  const [launched, setLaunched] = useState(false);
  const competitionStr = useSelector((state) => state.Competition, shallowEqual);
  const competition = SelectedCompetition.StrToObj(competitionStr);
  const recommendations = useSelector((state) => state.GetRecommendations, shallowEqual);
  const { games, competitions, status, shouldRetry } = useCompetitionLoader(GetAllCompetitions);

  const user = User.Info();
  const dispatch = useDispatch();
  const params = useParams();
  const { texts } = useTheme();

  const directLinkDto = useMemo(() => directLink.process(), []);

  useEffect(() => {
    if (competitions && directLinkDto) dispatch(GetRecommendations({ ...competition.item }, false, true));
    // console.log('call once', games, competitions, status, shouldRetry);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log('30 directLinkDto', recommendations);
  // theme applying mechanism
  useEffect(() => {
    if (competition.item && competition.item.theme) {
      AppControl.SetTheme(competition.item.theme);
    }
  }, [competition.item]);

  useEffect(() => {
    if (!status && !shouldRetry) return;
    if (directLinkDto) {
      directLink.setAndRedirect(
        directLinkDto,
        User.isGuest(),
        dispatch,
        { games, competitions, status, shouldRetry },
        recommendations,
        texts
      );
      return;
    }

    if (!window.userLogOut) {
      if (IsEmptyObject(competition) || !competition.item || (competition.item && !competition.item.current_grade)) {
        if (!params || !params.CompetitionName) {
          Toast.Show(texts.NO_EVENT_SELECTED, ALERT.ERROR, true);
          return;
        }

        if (!launched && User.IsGuest()) {
          setTimeout(() => {
            if (window.pageRouteKey === false) {
              PageSwitch(SettingsNav.CHANGE_GRADE);
            } else {
              PageSwitch(DefaultNav.COMPETITIONS);
            }
          }, 500);
        } else if (!launched && !User.IsGuest()) {
          PageSwitch(DefaultNav.COMPETITIONS);
          //  console.log('IDHR ISSUE');
          if (params) {
            const selectedCompetition1 = GetObjFromObj(competitions, 'url', params.CompetitionName);
            if (!selectedCompetition1.is_public && selectedCompetition1.is_code_redeemed === 0) {
              config.private_comp = params.CompetitionName;
              //  console.log('67 IDHR ISSUE');
            }
          }
        }
        // TODO: before UNDP makes only 1 competition effective
        AppControl.Params(params);
        setLaunched(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [competition, status, shouldRetry, user.user_id]);

  if (!status) {
    return <DotLoader />;
  }

  if (!IsEmptyObject(competition) && competition.item && competition.item.current_grade) {
    return (
      <>
        <Component
          {...rest}
          competition={competition.item}
          // games={competition.games}
          isOnlyCompetition={competition.isOnlyCompetition}
        />
      </>
    );
  }
  return <DotLoader />;
});

export default ConnectedWithCompetition;
