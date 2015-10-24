import React, { StyleSheet, ActivityIndicatorIOS } from 'react-native';
import Overlay from 'react-native-overlay';
import { BlurView } from 'react-native-blur';

class LoadingOverlay extends React.Component {
  constructor () {
    super();
    this.state = {
      isVisible: false
    };
  }
  render () {
    return (
      <Overlay isVisible={this.props.isVisible}>
        <BlurView style={styles.background} blurType="dark">
          <ActivityIndicatorIOS
            size="large"
            animating={true}
          />
        </BlurView>
      </Overlay>
    );
  }
}

export default LoadingOverlay;

var styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
