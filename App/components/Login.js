var React = require('react-native');
var {
  View, Text, StyleSheet, TouchableHighlight, TextInput
} = React;

var API = require('../apis/API');
var Dashboard = require('./Dashboard');

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
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
    fontSize: 23,
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

class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      error: null
    };
  }

  onChangeEmail (e) {
    this.setState({
      email: e.nativeEvent.text
    });
  }

  onSubmitEmail () {
    if (!this.state.email) {
      return this.setState({
        error: 'Please enter a valid email id'
      });
    }

    API.getDashboard(this.state.email)
    .then((dashboardProps) => {
      console.log(dashboardProps);
      this.props.navigator.push({
        component: Dashboard,
        title: 'Dashboard',
        passProps: {dashboardProps}
      });
    });
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Hola! Ready to receive price drop alerts via notifications?</Text>

        <Text>Email Id</Text>
        <TextInput
          style={styles.emailInput}
          value={this.state.email}
          onChange={this.onChangeEmail.bind(this)}
          />

        <TouchableHighlight
          style={styles.button}
          onPress={this.onSubmitEmail.bind(this)}>
            <Text style={styles.buttonText}>Goto Dashboard</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

module.exports = Login;
