var React = require('react-native');
var {
  View,
  Text,
  PropTypes
} = React;

class Dashboard extends React.Component {
  render () {
    console.log(this.props.dashboardProps);
    return (
      <View>
        <Text>Dashboard!</Text>
      </View>
    );
  }
}

Dashboard.propTypes = {
  dashboardProps: PropTypes.array.isRequired
};

module.exports = Dashboard;
