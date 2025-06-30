import { API_CALLS, CALL_PRIORITY, ALERT } from 'Constants';
import { CompetitionNav } from 'Navigation/Paths';
import axios from 'axios';
import { ExecApiRequest } from './api.action';
import SelectedCompetition from './selectedCompetition.action';
import { Toast } from './app.control.action';
import User from './user.action';

const GetProfile = (competition_id, is_school_based) => {
  return (dispatch) => {
    dispatch(ExecApiRequest(API_CALLS.GetProfile, { is_school_based, competition_id }));
  };
};

const GetProfileClaim = () => {
  return (dispatch) => {
    if (User.IsGuest()) return;
    dispatch(ExecApiRequest(API_CALLS.GetProfileForClaim, {}));
  };
};

const SaveProfile = () => {
  return (dispatch) => {
    dispatch(ExecApiRequest(API_CALLS.SaveProfile, {}));
  };
};

const GetMessage = ({ competition_id, current_grade }, { user_id }, cb, priority) => {
  const dto = {
    competition_id,
    grade: current_grade,
    friend_id: user_id,
  };

  return (dispatch) => {
    dispatch(
      ExecApiRequest(priority === CALL_PRIORITY.LOW ? API_CALLS.GetMessageLowPriority : API_CALLS.GetMessage, dto, (data) => {
        if (data.error_code === -2) {
          Toast.Show(data.error_message, ALERT.INFO, true);
          SelectedCompetition.GotoCompetition();
        } else if (cb) cb(data);
      })
    );
  };
};

const GetUserCertificateDetails = ({ full_name, competition_id, current_grade }, callback) => {
  const dto = {
    competition_id,
    full_name,
    grade: current_grade,
  };
  return (dispatch) => {
    dispatch(ExecApiRequest(API_CALLS.GetUserCertificateDetails, dto, (datax) => {        if(callback) callback(datax) }));
  };
};

const SendMessage = ({ competition_id, current_grade }, { user_id }, message, callback) => {
  const dto = {
    competition_id,
    grade: current_grade,
    friend_id: user_id,
    message,
  };
  return (dispatch) => {
    if (message.length === 0) {
      document.getElementsByClassName('loaderImageUpload')[0].style.display = 'none';
      return;
    }
    dispatch(ExecApiRequest(API_CALLS.SendMessage, dto, callback));
  };
};

const guid = () => {
  const _p8 = (s) => {
    const p = `${Math.random().toString(16)}000000000`.substr(2, 8);
    return s ? `-${p.substr(0, 4)}-${p.substr(4, 4)}` : p;
  };
  return _p8() + _p8(true) + _p8(true) + _p8();
};

const uploadFile = (file, user, callback) => {
  const dtoForm = new FormData();
  dtoForm.append('file', file);
  dtoForm.append('container_id', `bonzo/${guid()}`);
  dtoForm.append('institution_id', 101);
  dtoForm.append('user_id', user.user_id);

  axios
    .post('https://cmsapi.knowledgeplatform.com/api/storage/upload', dtoForm)
    .then((response) => callback(response.data))
    .catch((error) => {
      callback(error);
    });
};

const BlockFriend = ({ competition_id }, { user_id }) => {
  const dto = {
    competition_id,
    friend_id: user_id,
  };
  return (dispatch) => {
    dispatch(
      ExecApiRequest(API_CALLS.BlockFriend, dto, () => {
        SelectedCompetition.GotoCompetition(CompetitionNav.FRIENDS);
      })
    );
  };
};

export { GetProfile, SaveProfile, GetMessage, SendMessage, GetUserCertificateDetails, GetProfileClaim, BlockFriend, uploadFile };
