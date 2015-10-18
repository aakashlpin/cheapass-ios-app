var React = require('react-native');
var {
  View,
  StyleSheet,
  ActivityIndicatorIOS
} = React;

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

class Loader extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <ActivityIndicatorIOS
          style={styles.loader}
          animating={true}
          size='large'
          />
      </View>
    );
  }
}

module.exports = Loader;
