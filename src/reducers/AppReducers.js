import {
  HANDLE_INITIAL_APP_LOAD,
  INIT_APP_WITH_LOGIN,
  HANDLE_CHANGE_EMAIL,
  HANDLE_SUBMIT_EMAIL,
  HANDLE_OTP_SENT,
  HANDLE_EMAIL_FAILURE,
  HANDLE_CHANGE_OTP,
  HANDLE_RELOAD_ALERTS,
  HANDLE_EDIT_EMAIL,
  HANDLE_SUBMIT_OTP,
  HANDLE_SUBMIT_OTP_SUCCESS,
  HANDLE_SUBMIT_OTP_FAILURE,
  HANDLE_RESEND_OTP,
  HANDLE_RESEND_OTP_SUCCESS,
  HANDLE_RESEND_OTP_FAILURE,
  HANDLE_LOAD_DASHBOARD,
  HANDLE_LOAD_DASHBOARD_SUCCESS
} from '../actions/AppActions';

import _ from 'underscore';

const sellerMap = {
  flipkart: 'Flipkart',
  amazon: 'Amazon',
  zivame: 'Zivame',
  fabfurnish: 'FabFurnish',
  healthkart: 'HealthKart',
  jabong: 'Jabong',
  infibeam: 'Infibeam',
  snapdeal: 'Snapdeal'
};

const initialState = {
  isLoading: true,
  isLoggedIn: false,
  isOTPSent: false,
  isAppInstalled: false,
  login: {
    isSubmittingEmail: false,
    isSubmittingOTP: false,
    emailAutoFocus: false,
    email: '',
    otp: '',
    errors: {}
  },
  tracks: []
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function sanitizeResponse (response) {
  return _.flatten(
    response.map(item => {
      return {
        tracks: item.tracks.map(track => {
          return {
            ...track,
            seller: sellerMap[item.seller],
            isFavourable: track.alertToPrice ? track.currentPrice <= track.alertToPrice : true,
            humanPrice: numberWithCommas(track.currentPrice)
          };
        })
      };
    })
    .reduce((clubbed, result) => {
      clubbed.push(result.tracks);
      return clubbed;
    }, [])
  );
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
        isOTPSent: false,
        login: {
          ...state.login,
          email: '',
          otp: ''
        }
      };
    }

    case HANDLE_LOAD_DASHBOARD: {
      return {
        ...state,
        isLoading: true
      };
    }

    case HANDLE_LOAD_DASHBOARD_SUCCESS: {
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
      let {email} = action;
      email = email.trim();
      return {
        ...state,
        login: {
          ...state.login,
          email,
          errors: {}
        }
      };
    }

    case HANDLE_SUBMIT_EMAIL: {
      return {
        ...state,
        login: {
          ...state.login,
          isSubmittingEmail: true,
          emailAutoFocus: false
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
          otp: action.otp.trim(),
          errors: {}
        }
      };
    }

    case HANDLE_RELOAD_ALERTS: {
      return {
        ...state,
        tracks: sanitizeResponse(action.response)
      };
    }

    case HANDLE_EDIT_EMAIL: {
      return {
        ...state,
        isOTPSent: false,
        login: {
          ...state.login,
          emailAutoFocus: true
        }
      };
    }

    case HANDLE_SUBMIT_OTP:
    case HANDLE_RESEND_OTP: {
      return {
        ...state,
        login: {
          ...state.login,
          isSubmittingOTP: true,
          errors: {}
        }
      };
    }

    case HANDLE_SUBMIT_OTP_SUCCESS:
    case HANDLE_RESEND_OTP_SUCCESS:
    case HANDLE_RESEND_OTP_FAILURE: {
      return {
        ...state,
        login: {
          ...state.login,
          isSubmittingOTP: false
        }
      };
    }

    case HANDLE_SUBMIT_OTP_FAILURE: {
      return {
        ...state,
        login: {
          ...state.login,
          isSubmittingOTP: false,
          errors: {
            otp: action.error
          }
        }
      };
    }

    default:
      return state;
  }
}

module.exports = app;
