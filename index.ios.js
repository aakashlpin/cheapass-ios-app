var React = require('react-native');
var {
  View,
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  AsyncStorage,
  ActivityIndicatorIOS
} = React;

var keys = require('./App/config/keys');
var {
  STORAGE_KEY_IS_LOGGED_IN,
  STORAGE_KEY_EMAIL
} = keys;

var Login = require('./App/components/Login');
var Dashboard = require('./App/components/Dashboard');
var API = require('./App/apis/API');

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  loader: {
    alignSelf: 'center'
  }
});

var App = React.createClass({
  getInitialState () {
    return {
      isLoading: true,
      isLoggedIn: false
    };
  },

  componentDidMount () {
    this._loadInitialState().done();
  },

  componentWillReceiveProps (prev, next) {
    console.log(prev, next);
  },

  async _loadInitialState() {
    try {
      var isLoggedInValue = await AsyncStorage.getItem(STORAGE_KEY_IS_LOGGED_IN);
      var isLoggedIn = isLoggedInValue === null ? false : isLoggedInValue === 'false' ? false : true;
      this.setState({
        isLoggedIn
      });

      if (isLoggedInValue === null || isLoggedInValue === false) {
        return this.setState({
          isLoading: false
        });
      }

      var storedEmail = await AsyncStorage.getItem(STORAGE_KEY_EMAIL);
      API.getDashboard(storedEmail)
      .then((response) => {
        var dashboardProps = {
          email: storedEmail,
          results: response
        };
        this.setState({
          dashboardProps,
          isLoading: false
        });
      });
    } catch (e) {
      console.log('error', e);
      this.setState({
        isLoggedIn: false,
        isLoading: false
      });
    }
  },

  renderLoadingView () {
    return (
      <View style={styles.container}>
        <ActivityIndicatorIOS
          style={styles.loader}
          animating={true}
          size='large'
          />
      </View>
    );
  },

  renderDashboard () {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          component: Dashboard,
          title: 'Cheapass',
          passProps: {dashboardProps: this.state.dashboardProps}
        }}
      />
    );
  },

  renderLogin () {
    return (
      <Login />
    );
  },

  render () {
    if (this.state.isLoading) {
      return this.renderLoadingView();
    }

    if (this.state.isLoggedIn) {
      return this.renderDashboard();
    }

    return this.renderLogin();
  }
});

AppRegistry.registerComponent('cheapassApp', () => App);
