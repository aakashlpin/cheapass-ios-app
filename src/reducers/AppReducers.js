import {
  HANDLE_INITIAL_APP_LOAD,
  INIT_APP_WITH_LOGIN,
  INIT_APP_WITH_DASHBOARD,
  HANDLE_CHANGE_EMAIL,
  HANDLE_SUBMIT_EMAIL,
  HANDLE_OTP_SENT,
  HANDLE_EMAIL_FAILURE,
  HANDLE_CHANGE_OTP,
  HANDLE_RELOAD_ALERTS
} from '../actions/AppActions';

import _ from 'underscore';

const initialState = {
  isLoading: true,
  isLoggedIn: false,
  isOTPSent: false,
  isAppInstalled: false,
  login: {
    isSubmittingEmail: false,
    isSubmittingOTP: false,
    email: '',
    otp: '',
    errors: {}
  },
  tracks: []
};

function sanitizeResponse (response) {
  return _.flatten(response.reduce((clubbed, result) => {
    clubbed.push(result.tracks);
    return clubbed;
  }, []));
}

function app (state = initialState, action) {
  switch (action.type) {
    case HANDLE_INITIAL_APP_LOAD: {
      return {
        ...state,
        isLoading: true
      };
    }
    case INIT_APP_WITH_LOGIN: {
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        isOTPSent: false
      };
    }
    case INIT_APP_WITH_DASHBOARD: {
      const { email, response } = action;
      const flattenedResults = sanitizeResponse(response);
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        login: {
          ...state.login,
          email,
          isSubmittingEmail: false,
          isSubmittingOTP: false
        },
        tracks: flattenedResults
      };
    }

    case HANDLE_CHANGE_EMAIL: {
      const {email} = action;
      return {
        ...state,
        login: {
          ...state.login,
          email
        }
      };
    }

    case HANDLE_SUBMIT_EMAIL: {
      return {
        ...state,
        login: {
          ...state.login,
          isSubmittingEmail: true
        }
      };
    }

    case HANDLE_OTP_SENT: {
      return {
        ...state,
        isOTPSent: true,
        login: {
          ...state.login,
          isSubmittingEmail: false
        }
      };
    }

    case HANDLE_EMAIL_FAILURE: {
      return {
        ...state,
        login: {
          ...state.login,
          isSubmittingEmail: false,
          errors: {
            email: action.error
          }
        }
      };
    }

    case HANDLE_CHANGE_OTP: {
      return {
        ...state,
        login: {
          ...state.login,
          otp: action.otp
        }
      };
    }

    case HANDLE_RELOAD_ALERTS: {
      return {
        ...state,
        tracks: sanitizeResponse(action.response)
      };
    }

    default:
      return state;
  }
}

module.exports = app;
