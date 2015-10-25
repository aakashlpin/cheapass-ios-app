import { connect } from 'react-redux/native';
import React from 'react-native';
import {
  handleInitialAppLoad,
  handleChangeEmail,
  handleSubmitEmail,
  handleLogout,
  handleChangeOTP,
  handleSubmitOTP,
  handleResendOTP,
  handleEditEmail,
  handleReloadAlerts
} from '../actions/AppActions';

import Loader from '../components/Loader';
import Login from '../components/Login';
import Otp from '../components/OTP';
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

  onChangeOTP ({otp}) {
    this.props.dispatch(handleChangeOTP({otp}));
  }

  onSubmitOTP () {
    this.props.dispatch(handleSubmitOTP());
  }

  onLogout () {
    this.props.dispatch(handleLogout());
  }

  onResendOTP () {
    this.props.dispatch(handleResendOTP());
  }

  onEditEmail () {
    this.props.dispatch(handleEditEmail());
  }

  onReloadAlerts () {
    this.props.dispatch(handleReloadAlerts());
  }

  render () {
    const { isLoading, isLoggedIn, isOTPSent, login: {email, otp, isSubmittingEmail, isSubmittingOTP, emailAutoFocus, errors}, tracks } = this.props.app;
    if (isLoading) {
      return <Loader isVisible={true} />;
    }

    if (!isLoggedIn) {
      if (!isOTPSent) {
        return <Login
                email={email}
                autoFocus={emailAutoFocus}
                errors={errors}
                isSubmittingEmail={isSubmittingEmail}
                onChangeEmail={this.onChangeEmail.bind(this)}
                onSubmitEmail={this.onSubmitEmail.bind(this)}
              />;
      }
      return <Otp
              otp={otp}
              email={email}
              errors={errors}
              isSubmittingOTP={isSubmittingOTP}
              onChangeOTP={this.onChangeOTP.bind(this)}
              onSubmitOTP={this.onSubmitOTP.bind(this)}
              onResendOTP={this.onResendOTP.bind(this)}
              onEditEmail={this.onEditEmail.bind(this)}
            />;
    }

    return (
      <Dashboard data={{dashboardProps: { results: tracks, email: email }}} onReloadAlerts={this.onReloadAlerts.bind(this)}>
        <Header email={email} onPressLogout={this.onLogout.bind(this)} />
      </Dashboard>
    );
  }
}

function mapStateToProps (state) {
  const { app } = state;
  return {
    app
  };
}

export default connect(mapStateToProps)(App);
