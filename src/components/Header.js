var React = require('react-native');
var {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  PropTypes
} = React;

export default class Header extends React.Component {
  constructor () {
    super();
  }

  render () {
    var { email } = this.props;
    return (
      <View style={styles.navbarContainer}>
        <View style={styles.header}>
          <Text style={styles.email}>Dashboard of {email}</Text>
          <TouchableHighlight
            onPress={() => this.props.onPressLogout()}
            underlayColor="#eee">
            <Text style={styles.logout}>Logout</Text>
          </TouchableHighlight>
        </View>

      </View>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  onPressLogout: PropTypes.func.isRequired
};

var styles = StyleSheet.create({
  email: {
    fontSize: 12,
    color: '#111'
  },
  header: {
    paddingTop: 32,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
    // backgroundColor: '#eee'
    // position: 'absolute',
    // top: 30
  },
  logout: {
    fontSize: 12,
    color: 'red',
    alignSelf: 'center'
  },
  navbarContainer: {
    // position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: '#5589B7'
  }
});
