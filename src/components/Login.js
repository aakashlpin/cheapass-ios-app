import React from 'react-native';
var {
  ScrollView,
  Text,
  StyleSheet,
  TouchableHighlight,
  TextInput
} = React;

export default class Login extends React.Component {
  constructor () {
    super();
    this.state = {
      contentOffset: {x: 0, y: 0}
    };
  }
  onFocus () {
    this.setState({
      contentOffset: {
        x: 0,
        y: 150
      }
    });
  }

  onBlur () {
    this.setState({
      contentOffset: {x: 0, y: 0}
    });
  }

  render () {
    const {email, isSubmitting} = this.props;
    return (
      <ScrollView contentContainerStyle={styles.mainContainer} contentOffset={this.state.contentOffset}>
        <Text style={styles.title}>Log In</Text>

        <Text>Email Id</Text>
        <TextInput
          style={styles.emailInput}
          value={email}
          editable={!isSubmitting}
          autoCapitalize="none"
          autoFocus={true}
          autoCorrect={false}
          keyboardType={'email-address'}
          enablesReturnKeyAutomatically={true}
          onFocus={() => this.onFocus()}
          onBlur={() => this.onBlur()}
          onSubmitEditing={() => this.props.onSubmitEmail()}
          onChangeText={(text) => this.props.onChangeEmail({email: text})}
        />

        <TouchableHighlight
          style={styles.button}
          onPress={this.props.onSubmitEmail.bind(this)}>
            <Text style={styles.buttonText}>Goto Dashboard</Text>
        </TouchableHighlight>
      </ScrollView>
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
  container: {
    flex: 1,
    backgroundColor: '#111111'
  },
  mainContainer: {
    flex: 1,
    padding: 30,
    // marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  emailInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});
