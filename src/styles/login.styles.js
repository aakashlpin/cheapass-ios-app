import { StyleSheet } from 'react-native';

const LoginStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#0B315B'
  },
  logo: {
    height: 47,
    width: 188,
    alignSelf: 'center',
    marginTop: 48,
    marginBottom: 10
  },
  tagLine: {
    alignSelf: 'center',
    textAlign: 'center',
    width: 250,
    color: 'rgba(255, 255, 255, 0.65)',
    fontSize: 16
    // fontWeight: '600'
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
    backgroundColor: '#24456B'
  },
  iconEmail: {
    height: 18,
    width: 25
  },
  iconOTP: {
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
    padding: 10,
    paddingLeft: 0,
    flex: 1
  },
  emailNotFound: {
    fontWeight: '600',
    color: '#FF5E84',
    fontSize: 16,
    padding: 10,
    paddingBottom: 0,
    height: 50
  },
  otpError: {
    height: 30
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60
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
    fontWeight: '500',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16
  }
});

export default LoginStyles;
