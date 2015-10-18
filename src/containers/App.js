import { connect } from 'react-redux/native';
import React from 'react-native';
import {
  handleInitialAppLoad,
  handleChangeEmail,
  handleSubmitEmail,
  handleLogout
} from '../actions/AppActions';

import Loader from '../components/Loader';
import Login from '../components/Login';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';

class App extends React.Component {
  constructor () {
    super();
  }

  componentDidMount () {
    this.props.dispatch(handleInitialAppLoad());
  }

  onChangeEmail ({email}) {
    this.props.dispatch(handleChangeEmail({email}));
  }

  onSubmitEmail () {
    this.props.dispatch(handleSubmitEmail());
  }

  onLogout () {
    this.props.dispatch(handleLogout());
  }

  render () {
    const { isLoading, isLoggedIn, login: {email, isSubmitting}, tracks } = this.props.app;
    if (isLoading) {
      return <Loader />;
    }

    if (!isLoggedIn) {
      return <Login
        email={email}
        isSubmitting={isSubmitting}
        onChangeEmail={this.onChangeEmail.bind(this)}
        onSubmitEmail={this.onSubmitEmail.bind(this)}
      />;
    }

    return <Dashboard
      data={{dashboardProps: {
        results: tracks,
        email: email
      }}}>
      <Header
        email={email}
        onPressLogout={this.onLogout.bind(this)}
        />
    </Dashboard>;
  }
}

function mapStateToProps (state) {
  const { app } = state;
  return {
    app
  };
}

export default connect(mapStateToProps)(App);
