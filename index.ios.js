var React = require('react-native');
var Router = require('react-native-router');
var { AppRegistry } = React;
var App = require('./App/components/App');

var firstRoute = {
  name: 'Cheapass',
  component: App
};

var cheapassApp = React.createClass({
  render () {
    // TODO have removed react-native from node_modules folder of react-native-router to make this work.
    return (
      <Router firstRoute={firstRoute} />
    );
  }
});

AppRegistry.registerComponent('cheapassApp', () => cheapassApp);
