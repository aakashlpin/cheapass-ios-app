export const HANDLE_INITIAL_APP_LOAD = 'HANDLE_INITIAL_APP_LOAD';
export const INIT_APP_WITH_LOGIN = 'INIT_APP_WITH_LOGIN';
export const INIT_APP_WITH_DASHBOARD = 'INIT_APP_WITH_DASHBOARD';
export const HANDLE_CHANGE_EMAIL = 'HANDLE_CHANGE_EMAIL';
export const HANDLE_SUBMIT_EMAIL = 'HANDLE_SUBMIT_EMAIL';

import {
  AsyncStorage
} from 'react-native';

import {
  STORAGE_KEY_IS_LOGGED_IN,
  STORAGE_KEY_EMAIL,
  STORAGE_KEY_IS_INSTALLED
} from '../config/keys';

import API from '../apis/API';
import PushManager from '../components/RemotePushIOS';

function navigateToDashboard ({dispatch, email}) {
  API.getDashboard(email)
  .then((response) => {
    dispatch({
      type: INIT_APP_WITH_DASHBOARD,
      email, response
    });
  });

  PushManager.requestPermissions((err, data) => {
    if (err) {
      console.log('Could not register for push');
    } else {
      API.requestAppInstallation({
        email: email,
        parsePayload: {
          'deviceType': 'ios',
          'deviceToken': data.token,
          'channels': ['global']
        }
      })
      .then((response) => {
        if (response.status === 'ok') {
          AsyncStorage.setItem(STORAGE_KEY_IS_INSTALLED, 'true');
        }
      })
      .catch(e => {
        console.log('exception caught in _handleAppInstallation ', e);
      });
    }
  });
}

export function handleInitialAppLoad () {
  return (dispatch) => {
    dispatch({
      type: HANDLE_INITIAL_APP_LOAD
    });

    AsyncStorage
    .getItem(STORAGE_KEY_IS_LOGGED_IN)
    .then((isLoggedInValue) => {
      if (isLoggedInValue === null || isLoggedInValue === 'false') {
        return dispatch({
          type: INIT_APP_WITH_LOGIN
        });
      }

      // user has a logged in session
      AsyncStorage
      .getItem(STORAGE_KEY_EMAIL)
      .then((email) => {
        navigateToDashboard({dispatch, email});
      });
    });
  };
}

export function handleLogout () {
  return (dispatch) => {
    dispatch({
      type: HANDLE_INITIAL_APP_LOAD
    });
    AsyncStorage
    .setItem(STORAGE_KEY_IS_LOGGED_IN, 'false')
    .then(() => {
      return dispatch({
        type: INIT_APP_WITH_LOGIN
      });
    });
  };
}

export function handleChangeEmail ({email}) {
  return {
    type: HANDLE_CHANGE_EMAIL,
    email
  };
}

export function handleSubmitEmail () {
  return (dispatch, getState) => {
    dispatch({
      type: HANDLE_SUBMIT_EMAIL
    });

    const { email } = getState().app.login;
    AsyncStorage.setItem(STORAGE_KEY_IS_LOGGED_IN, 'true');
    AsyncStorage.setItem(STORAGE_KEY_EMAIL, email);

    navigateToDashboard({dispatch, email});
  };
}
