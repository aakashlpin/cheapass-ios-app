var React = require('react-native');
var Login = require('./Login');
var {
  View,
  Text,
  TouchableHighlight,
  AsyncStorage,
  StyleSheet,
  PropTypes
} = React;

var keys = require('../config/keys');
var {
  STORAGE_KEY_IS_LOGGED_IN
} = keys;

var styles = StyleSheet.create({
  email: {
    fontSize: 12,
    color: '#111'
  },
  header: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#eee'
  },
  logout: {
    fontSize: 12,
    color: 'red',
    alignSelf: 'center'
  }
});

class Header extends React.Component {
  constructor () {
    super();
  }

  async _onLogout () {
    try {
      await AsyncStorage.setItem(STORAGE_KEY_IS_LOGGED_IN, 'false');
      this.props.toRoute({
        name: 'Login',
        component: Login
      });
    } catch (e) {
      console.log(e);
    }
  }

  onPressLogout () {
    this._onLogout.call(this);
  }

  render () {
    var { email } = this.props;
    return (
      <View style={styles.header}>
        <Text style={styles.email}>Dashboard of {email}</Text>
        <TouchableHighlight
          onPress={this.onPressLogout.bind(this)}
          underlayColor="#eee">
          <Text style={styles.logout}>Logout</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired
};

module.exports = Header;
