import React from 'react-native';
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

export default class Login extends React.Component {
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
        y: height * 1 / 3
      }
    });
  }

  onBlur () {
    this.setState({
      contentOffset: {x: 0, y: 0}
    });
  }

  render () {
    const {email, isSubmittingEmail, autoFocus = false, errors} = this.props;
    return (
      <LoggedOutWrapper showLoader={isSubmittingEmail} scrollViewcontentOffset={this.state.contentOffset}>
        <View style={styles.formContainer}>
          <View style={styles.emailInputBar}>
            <View style={{padding: 10}}>
              <Icon
                name='ion|ios-email'
                size={40}
                color='#5FC9FC'
                style={styles.iconEmail}
              />
            </View>
            <TextInput
              style={styles.emailInput}
              value={email}
              placeholder="Enter Email ID to Login"
              placeholderTextColor="#69CBF8"
              editable={!isSubmittingEmail}
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={autoFocus}
              returnKeyType={'next'}
              keyboardType={'email-address'}
              enablesReturnKeyAutomatically={true}
              onFocus={() => this.onFocus()}
              onBlur={() => this.onBlur()}
              onSubmitEditing={() => this.props.onSubmitEmail()}
              onChangeText={(text) => this.props.onChangeEmail({email: text})}
            />
            <TouchableHighlight style={{padding: 10}} underlayColor="#22446C" onPress={this.props.onSubmitEmail}>
              <Icon
                name="ion|ios-arrow-thin-right"
                size={40}
                color='#fff'
                style={styles.iconRightArrow}
              />
            </TouchableHighlight>
          </View>
          <Text style={styles.emailNotFound}>{errors.email ? errors.email : ''}</Text>
        </View>
      </LoggedOutWrapper>
    );
  }
}

Login.propTypes = {
  email: React.PropTypes.string.isRequired,
  isSubmittingEmail: React.PropTypes.bool.isRequired,
  onChangeEmail: React.PropTypes.func.isRequired,
  onSubmitEmail: React.PropTypes.func.isRequired
};
