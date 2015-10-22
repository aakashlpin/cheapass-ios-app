import React from 'react-native';
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
            <TextInput
              style={styles.emailInput}
              value={email}
              placeholder="Enter Email Id"
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

            <View style={styles.submitContainer}>
              <TouchableHighlight
                style={styles.button}
                onPress={this.props.onSubmitEmail.bind(this)}>
                  <Text style={styles.buttonText}>Login</Text>
              </TouchableHighlight>
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
  submitContainer: {
    marginLeft: 32,
    marginRight: 32
  },
  formContainer: {
    position: 'absolute',
    bottom: 36,
    left: 0,
    right: 0
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  emailInput: {
    height: 48,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 32,
    paddingRight: 32,
    marginBottom: 16,
    fontSize: 18,
    color: 'white',
    backgroundColor: '#24456B'
  },
  buttonText: {
    alignSelf: 'center',
    color: '#0E325A',
    fontSize: 18,
    fontWeight: '500'
  },
  button: {
    height: 48,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: 4
  }
});
