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
      // this.setState({
      //   isLoggedIn
      // });

      if (!isLoggedIn) {
        // this.setState({
        //   isLoading: false
        // });
        return this.props.toRoute({
          name: 'Login',
          component: Login
        });
      }

      var storedEmail = await AsyncStorage.getItem(STORAGE_KEY_EMAIL);
      API.getDashboard(storedEmail, this.props.toRoute);

    } catch (e) {
      console.log('error', e);
      // this.setState({
      //   isLoggedIn: false,
      //   isLoading: false
      // });
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
