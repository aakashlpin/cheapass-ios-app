import React, { PropTypes } from 'react-native';
import LoadingOverlay from './LoadingOverlay';
import styles from '../styles/login.styles';

var {
  ScrollView,
  View,
  Image,
  Text,
  StatusBarIOS
} = React;

class LoggedOutWrapper extends React.Component {
  componentDidMount () {
    StatusBarIOS.setHidden(true);
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Image
          style={styles.logo}
          source={require('image!logo')}
        />
        <Text style={styles.tagLine}>Simplest Price Drop Alerts via Push Notifications</Text>
        <ScrollView contentContainerStyle={{flex: 1}} contentOffset={this.props.scrollViewcontentOffset} keyboardShouldPersistTaps={true}>
          {this.props.children}
        </ScrollView>
        <LoadingOverlay isVisible={this.props.showLoader} />
      </View>
    );
  }
}

LoggedOutWrapper.propTypes = {
  showLoader: PropTypes.bool.isRequired,
  scrollViewcontentOffset: PropTypes.object.isRequired
};

export default LoggedOutWrapper;
