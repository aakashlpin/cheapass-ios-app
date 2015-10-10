var React = require('react-native');
var {
  View,
  Text,
  PropTypes,
  StyleSheet
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  email: {
    textAlign: 'left',
    fontSize: 12,
    color: '#111',
    marginTop: 60,
    paddingTop: 10,
    paddingLeft: 10
  }
});

class Dashboard extends React.Component {
  render () {
    var { email } = this.props.dashboardProps;
    return (
      <View style={styles.container}>
        <Text style={styles.email}>Dashboard of {email}</Text>
      </View>
    );
  }
}

Dashboard.propTypes = {
  dashboardProps: PropTypes.object.isRequired
};

module.exports = Dashboard;
