import {
  HANDLE_INITIAL_APP_LOAD,
  INIT_APP_WITH_LOGIN,
  INIT_APP_WITH_DASHBOARD,
  HANDLE_CHANGE_EMAIL,
  HANDLE_SUBMIT_EMAIL
} from '../actions/AppActions';

import _ from 'underscore';

const initialState = {
  isLoading: true,
  isLoggedIn: false,
  isAppInstalled: false,
  login: {
    isSubmitting: false,
    email: ''
  },
  tracks: []
};

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
        isLoggedIn: false
      };
    }
    case INIT_APP_WITH_DASHBOARD: {
      const { email, response } = action;
      const flattenedResults = _.flatten(response.reduce((clubbed, result) => {
        clubbed.push(result.tracks);
        return clubbed;
      }, []));

      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        login: {
          ...state.login,
          email,
          isSubmitting: false
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
          isSubmitting: true
        }
      };
    }

    default:
      return state;
  }
}

module.exports = app;
