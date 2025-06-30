/* eslint-disable camelcase */
import { API_CALLS } from 'Constants';
import { ExecApiRequest } from './api.action';

const InstitutionalSummary = ({ competition_id, current_grade, cms_course_id }) => {
  return (dispatch) => {
    dispatch(
      ExecApiRequest(API_CALLS.InstitutionalSummary, {
        competition_id,
        grade: current_grade,
        cms_course_id
      })
    );
  };
};

const InstitutionalPerformers = ({ competition_id, current_grade, cms_course_id }) => {
  return (dispatch) => {
    dispatch(
      ExecApiRequest(API_CALLS.InstitutionalPerformers, {
        competition_id,
        grade: current_grade,
        cms_course_id
      })
    );
  };
};

const InstitutionalPlayers = ({ competition_id, current_grade }) => {
  return (dispatch) => {
    dispatch(
      ExecApiRequest(API_CALLS.InstitutionalPlayers, {
        competition_id,
        grade: current_grade,
      })
    );
  };
};

const InstitutionalReport = ({ competition_id, current_grade, cms_course_id }) => {
  return (dispatch) => {
    dispatch(
      ExecApiRequest(API_CALLS.InstitutionalReport, {
        competition_id,
        grade: current_grade,
        cms_course_id
      })
    );
  };
};

const InstitutionalGamesReport = ({ competition_id, current_grade, cms_course_id }) => {
  return (dispatch) => {
    dispatch(
      ExecApiRequest(API_CALLS.InstitutionalGamesReport, {
        competition_id,
        grade: current_grade,
        cms_course_id
      })
    );
  };
};

export { InstitutionalSummary, InstitutionalPlayers, InstitutionalPerformers, InstitutionalReport, InstitutionalGamesReport };
