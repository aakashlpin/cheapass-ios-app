var React = require('react-native');
var {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  PropTypes,
  StatusBarIOS
} = React;

export default class Header extends React.Component {
  constructor () {
    super();
  }

  componentDidMount () {
    StatusBarIOS.setHidden(false, 'slide');
    StatusBarIOS.setStyle('light-content', true);
  }

  render () {
    return (
      <View style={styles.navbarContainer}>
        <View style={styles.header}>
          <Text style={styles.navbarTitle}>Cheapass</Text>
          <Text>&nbsp;</Text>
          <TouchableHighlight onPress={() => this.props.onPressLogout()} underlayColor="#eee">
            <Text style={styles.navbarRightButton}>Logout</Text>
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
  header: {
    paddingTop: 32,
    paddingBottom: 10,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between'
  },
  navbarTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 12,
    height: 64
  },
  navbarRightButton: {
    fontSize: 16,
    color: '#69CBF8',
    fontWeight: '500',
    paddingRight: 10,
    height: 64,
    textAlign: 'center'
  },
  navbarContainer: {
    top: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: '#204A7B'
  }
});
