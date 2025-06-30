import { Account, SetUserTimeReward } from 'Actions';
import { PageSwitch } from 'Navigation';
import { DefaultNav } from 'Navigation/Paths';
import { ALERT } from 'Constants';
import { actionDispatch } from './ActionCreators';
import { Dotted, Toast } from '../Actions/app.control.action';

const SetPortrait = () => {
  // console.log('MCD SetPortrait');
  const system = window?.mcd?.bridge.message('system');
  system.send({ appOrientation: 'portrait' });
};

const SetLandscape = () => {
  // console.log('MCD SetLandscape');
  const system = window.mcd.bridge.message('system');
  system.send({ appOrientation: 'landscape' });
};

const ToggleFullScreen = (state = false) => {
  // console.log('MCD ToggleFullScreen', state);
  const system = window.mcd.bridge.message('system');
  system.send({ fullscreen: state });

  system.on('done', () => {
    actionDispatch(Account.MCDFullScreen(state));
  });
};

const ClaimRewards = (secondaryId, competition_id, current_grade, reward_id) => {
  const grade = current_grade;
  actionDispatch(
    SetUserTimeReward(competition_id, grade, reward_id, 1, (d) => {
      // console.log('secondaryId', secondaryId);

      var offerActivation = window.mcd.bridge.message('offerActivation');

      offerActivation.send({ loyaltyId: 4471, autoActivate: false, rewardId: secondaryId });

      //alert('secondary id ' + secondaryId);
      offerActivation.on('data', (data) => {
        //console.log(` offer activate data: ${JSON.stringify(data)}`);
        // alert(`offer activate data: ${JSON.stringify(data)}`);

        if (data?.success) {
          actionDispatch(SetUserTimeReward(competition_id, grade, reward_id, 2));
          // Toast.Show('2', ALERT.SUCCESS);
        } else {
          Toast.Show('Unable to claim the reward. Please try again in a moment.', ALERT.ERROR);
          actionDispatch(SetUserTimeReward(competition_id, grade, reward_id, 0));
        }
      });

      offerActivation.on('error', (error) => {
        //  console.log(` offer activate error: ${JSON.stringify(error)}`);
        // alert(` error: ${error}`);
        actionDispatch(SetUserTimeReward(competition_id, grade, reward_id, 0));
        if (error?.code) {
          Toast.Show(
            `An error occurred while claiming the reward. Please try again in a moment. (Error code: ${error.code})`,
            ALERT.ERROR
          );
        } else {
          Toast.Show('An error occurred while claiming the reward. Please try again in a moment.', ALERT.ERROR);
        }
        // alert(` offer activate error: ${JSON.stringify(error)}`);
      });
      offerActivation.on('done', () => {
        // alert(` offer activate done`);
        // console.log(' offer activate done');
        Dotted.Hide();
      });
    })
  );
};

const Login = () => {
  // setTimeout(() => {
  //   actionDispatch(
  //     Account.ExternalLogin({
  //       email: 'sanjum@knowledgeplatform.com',
  //       name: ' Sajid Anjum',
  //       phone_number: '03435843638',
  //       mcd_id: 'Bearer 0b806352606af74dd69dc4e3d5a7b30f1d44c88201ab5fda694f8d8d939f3e8e',
  //     })
  //   );
  // }, 500);
  // return;

  const user = window.mcd.bridge.message('user');
  user.send({ promptlogin: true });

  user.on('data', (data) => {
    // console.log(`promptlogin data: ${JSON.stringify(data)}`);
    const UserData = JSON.parse(JSON.stringify(data));
    // console.log('UserData', UserData);

    const { mcdonaldsId, firstname, lastname, email, deviceId } = UserData;
    const name = `${firstname} ${lastname}`;
    // console.log('name', name);
    actionDispatch(Account.ExternalLogin({ email, name, phone_number: '03435843638', mcd_id: mcdonaldsId, device_id: deviceId }));
  });
  user.on('error', (error) => {
    // console.log(`promptlogin error: ${JSON.stringify(error)}`);
    PageSwitch(DefaultNav.MCDError);
  });
  user.on('done', () => {
    console.log('promptlogin done');
  });
};

const McdUser = {
  Login,
  SetLandscape,
  SetPortrait,
  ToggleFullScreen,
  ClaimRewards,
};

export default McdUser;
