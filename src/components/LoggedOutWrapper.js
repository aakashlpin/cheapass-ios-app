import React, { PropTypes } from 'react-native';
import LoadingOverlay from './LoadingOverlay';
import styles from '../styles/login.styles';

var {
  ScrollView,
  View,
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
        <Text style={styles.title}>Cheapass</Text>
        <ScrollView contentContainerStyle={{flex: 1}} contentOffset={this.props.contentOffset} keyboardShouldPersistTaps={true}>
          {this.props.children}
        </ScrollView>
        <LoadingOverlay isVisible={this.props.showLoader} />
      </View>
    );
  }
}

LoggedOutWrapper.propTypes = {
  showLoader: PropTypes.bool.isRequired,
  contentOffset: PropTypes.number.isRequired
};

export default LoggedOutWrapper;
