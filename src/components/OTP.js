import React, {PropTypes} from 'react-native';
import { Icon } from 'react-native-icons';
import LoggedOutWrapper from './LoggedOutWrapper';
import styles from '../styles/login.styles';

var {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableHighlight
} = React;

export default class Otp extends React.Component {
  constructor () {
    super();
    this.state = {
      contentOffset: {x: 0, y: 0}
    };
  }
  onFocus () {
    const { height } = Dimensions.get('window');
    this.setState({
      contentOffset: {
        x: 0,
        y: (height * 1 / 3)
      }
    });
  }

  onBlur () {
    this.setState({
      contentOffset: {x: 0, y: 0}
    });
  }

  render () {
    const {email, otp, isSubmittingOTP, errors} = this.props;
    return (
      <LoggedOutWrapper showLoader={isSubmittingOTP} contentOffset={this.state.contentOffset}>
        <View style={styles.formContainer}>
          <Text style={styles.otpSentTo}>OTP sent to</Text>
          <Text style={styles.otpSentToEmail}>{email}</Text>
          <View style={styles.emailInputBar}>
            <View style={{padding: 10}}>
              <Icon
                name='ion|lock-combination'
                size={28}
                color='#5FC9FC'
                style={styles.iconOTP}
              />
            </View>
            <TextInput
              style={styles.emailInput}
              value={otp}
              placeholder="Enter OTP"
              placeholderTextColor="#69CBF8"
              editable={!isSubmittingOTP}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="numbers-and-punctuation"
              enablesReturnKeyAutomatically={true}
              onFocus={() => this.onFocus()}
              onBlur={() => this.onBlur()}
              onSubmitEditing={() => this.props.onSubmitOTP()}
              onChangeText={(text) => this.props.onChangeOTP({otp: text})}
            />
            <TouchableHighlight style={{padding: 10}} underlayColor="#22446C" onPress={this.props.onSubmitOTP}>
              <Icon
                name="ion|ios-arrow-thin-right"
                size={40}
                color='#fff'
                style={styles.iconRightArrow}
              />
            </TouchableHighlight>
          </View>
          <Text style={styles.emailNotFound}>{errors.otp ? errors.otp : ''}</Text>
          <View style={styles.actionsContainer}>
            <TouchableHighlight onPress={this.props.onResendOTP}>
              <Text style={styles.actionText}>Resend OTP</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.props.onEditEmail}>
              <Text style={styles.actionText}>Change Email ID</Text>
            </TouchableHighlight>
          </View>
        </View>
      </LoggedOutWrapper>
    );
  }
}

Otp.propTypes = {
  email: PropTypes.string.isRequired,
  otp: PropTypes.string.isRequired,
  isSubmittingOTP: PropTypes.bool.isRequired,
  onChangeOTP: PropTypes.func.isRequired,
  onSubmitOTP: PropTypes.func.isRequired,
  onResendOTP: PropTypes.func.isRequired,
  onEditEmail: PropTypes.func.isRequired
};
