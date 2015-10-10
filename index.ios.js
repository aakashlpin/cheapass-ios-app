var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS
} = React;

var Login = require('./App/components/Login');

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111'
  }
});

var App = React.createClass({
  getInitialState () {
    return {
      isLoading: false
    };
  },
  render () {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          component: Login,
          title: 'Cheapass',
          passProps: {}
        }}
      />
    );
  }
});

AppRegistry.registerComponent('cheapassApp', () => App);
