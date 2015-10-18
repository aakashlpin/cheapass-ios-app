var redux = require('redux');
var { combineReducers } = redux;
var app = require('./AppReducers');

const rootReducer = combineReducers({
  app
});

module.exports = rootReducer;
