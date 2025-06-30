import { API_CALLS, DEMO_USER } from 'Constants';
import ExecApiRequest from './api.action';
import { GetAllCompetitions } from './competitions.action';
import Account from './account.action';
import { User } from 'Actions';
import { isGreenGuardiansInstance } from 'Utils';

const getDomainName = (url) => {
  try {
    const { hostname, port } = new URL(url);
    return port ? `${hostname}:${port}` : hostname.replace(/^www\./, '');
  } catch (e) {
    console.error('Invalid URL:', url);
    return null;
  }
};

export const GetInstanceConfig = ({ competition_id }, texts, callback) => {
  const domain_name = getDomainName(window.location.href);
  const user = User.Info();

  const dto = {
    domain_name,
  };

  return (dispatch) => {
    dispatch(
      ExecApiRequest(API_CALLS.GetInstanceConfig, dto, (data) => {
        localStorage.setItem('config', JSON.stringify(data));
        if (window.isCompLauch) {
          dispatch(
            Account.GuestLogin(
              { email: DEMO_USER.email, password: DEMO_USER.password, mode: DEMO_USER.mode, url: window.compUrl },
              texts
            )
          );
        }
        if (!window.isCompLauch && user?.name === 'Guest' && !isGreenGuardiansInstance()) {
          window.firstCompetitionCall = false;
          dispatch(GetAllCompetitions());
        }

        if (callback) {
          callback(data);
        }
      })
    );
  };
};
