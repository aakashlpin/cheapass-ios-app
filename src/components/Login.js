import React from 'react-native';
import {Icon, } from 'react-native-icons';

var {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  Dimensions,
  StatusBarIOS
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
        y: (height * 1 / 3) + 50
      }
    });
  }

  onBlur () {
    this.setState({
      contentOffset: {x: 0, y: 0}
    });
  }

  componentDidMount () {
    StatusBarIOS.setHidden(true);
  }

  render () {
    const {email, isSubmitting} = this.props;
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Cheapass</Text>
        <ScrollView contentContainerStyle={{flex: 1}} contentOffset={this.state.contentOffset}>
          <View style={styles.formContainer}>
            <View style={styles.emailInputBar}>
              <Icon
                name='ion|ios-email'
                size={40}
                color='#5FC9FC'
                style={styles.iconEmail}
              />
              <TextInput
                style={styles.emailInput}
                value={email}
                placeholder="Enter Email ID to Login"
                placeholderTextColor="#69CBF8"
                editable={!isSubmitting}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType={'email-address'}
                enablesReturnKeyAutomatically={true}
                onFocus={() => this.onFocus()}
                onBlur={() => this.onBlur()}
                onSubmitEditing={() => this.props.onSubmitEmail()}
                onChangeText={(text) => this.props.onChangeEmail({email: text})}
              />
              <Icon
                name="ion|ios-arrow-thin-right"
                size={40}
                color='#5FC9FC'
                style={styles.iconRightArrow}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

Login.propTypes = {
  email: React.PropTypes.string.isRequired,
  isSubmitting: React.PropTypes.bool.isRequired,
  onChangeEmail: React.PropTypes.func.isRequired,
  onSubmitEmail: React.PropTypes.func.isRequired
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
    marginBottom: 16,
    backgroundColor: '#24456B'
  },
  iconEmail: {
    height: 18,
    width: 25
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
  }
});
