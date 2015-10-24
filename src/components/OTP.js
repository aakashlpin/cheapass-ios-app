import React, {PropTypes} from 'react-native';
import { Icon } from 'react-native-icons';

var {
  ScrollView,
  View,
  Text,
  StyleSheet,
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
        y: (height * 1 / 3) + 20
      }
    });
  }

  onBlur () {
    this.setState({
      contentOffset: {x: 0, y: 0}
    });
  }

  render () {
    const {email, otp, isSubmittingOTP} = this.props;
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Cheapass</Text>
        <ScrollView contentContainerStyle={{flex: 1}} contentOffset={this.state.contentOffset}>

          <View style={styles.formContainer}>
            <Text style={styles.otpSentTo}>OTP sent to</Text>
            <Text style={styles.otpSentToEmail}>{email}</Text>
            <View style={styles.emailInputBar}>
              <Icon
                name='ion|lock-combination'
                size={28}
                color='#5FC9FC'
                style={styles.iconEmail}
              />
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
              <Icon
                name="ion|ios-arrow-thin-right"
                size={40}
                color='#5FC9FC'
                style={styles.iconRightArrow}
              />
            </View>
            <View style={styles.actionsContainer}>
              <TouchableHighlight onPress={this.props.onResendOTP}>
                <Text style={styles.actionText}>Resend OTP</Text>
              </TouchableHighlight>
              <TouchableHighlight onPress={this.props.onEditEmail}>
                <Text style={styles.actionText}>Change Email ID</Text>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
      </View>
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

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 48,
    flexDirection: 'column',
    backgroundColor: '#0B315B'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  otpSentTo: {
    color: 'rgba(255,255,255,0.35)',
    alignSelf: 'center',
    fontWeight: '500'
  },
  otpSentToEmail: {
    color: 'rgba(255,255,255,0.35)',
    alignSelf: 'center',
    paddingBottom: 12,
    fontWeight: '500'
  },
  actionText: {
    color: '#69CBF8',
    fontWeight: '500'
  },
  formContainer: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0
  },
  emailInputBar: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    padding: 10,
    backgroundColor: '#24456B'
  },
  iconEmail: {
    height: 30,
    width: 30
  },
  iconRightArrow: {
    height: 18,
    width: 26
  },
  emailInput: {
    fontSize: 18,
    color: 'white',
    paddingLeft: 10,
    flex: 1
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60
  }
});
