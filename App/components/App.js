var React = require('react-native');
var {
  AsyncStorage
} = React;

var keys = require('../config/keys');
var {
  STORAGE_KEY_IS_LOGGED_IN,
  STORAGE_KEY_EMAIL
} = keys;

var API = require('../apis/API');

var Loader = require('./Loader');
var Login = require('./Login');
var Dashboard = require('./Dashboard');

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isLoading: true,
      isLoggedIn: false
    };
  }

  componentDidMount () {
    this._loadInitialState().done();
  }

  async _loadInitialState() {
    try {
      var isLoggedInValue = await AsyncStorage.getItem(STORAGE_KEY_IS_LOGGED_IN);
      var isLoggedIn = isLoggedInValue === null ? false : isLoggedInValue === 'false' ? false : true;
      if (!isLoggedIn) {
        return this.props.toRoute({
          name: 'Login',
          component: Login
        });
      }

      var storedEmail = await AsyncStorage.getItem(STORAGE_KEY_EMAIL);
      API.getDashboard(storedEmail)
      .then((response) => {
        var dashboardProps = {
          email: storedEmail,
          results: response
        };

        this.props.toRoute({
          name: 'Dashboard',
          component: Dashboard,
          data: {dashboardProps}
        });
      });

    } catch (e) {
      console.log('error _loadInitialState', e);
      this.props.toRoute({
        name: 'Login',
        component: Login
      });
    }
  }

  render () {
    return (
      <Loader />
    );
  }
}

module.exports = App;
