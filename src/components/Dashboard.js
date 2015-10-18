import React from 'react-native';
var {
  View,
  PropTypes,
  StyleSheet,
  ListView,
  Image,
  Text,
  AlertIOS,
  LinkingIOS
} = React;

var PushManager = require('./RemotePushIOS');

export default class Dashboard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  measureMainComponent () {
    this.refs.containerView.measure((ox, oy, width, height) => {
      var itemMargin = 0;
      var availableSpace = width - ( itemMargin * 4 );
      var itemWidth = Math.floor(availableSpace / 2);

      this.setState({
        rootViewWidth: width,
        rootViewHeight: height,
        itemWidth,
        itemMargin
      });
    });
  }

  receiveRemoteNotification (notification) {
    const { productURL } = notification;
    AlertIOS.alert(
      'Cheapass Price Drop Alert',
      notification.aps.alert,
      [{
        text: 'Ok',
        onPress: () => console.log('Ok Pressed')
      }, {
        text: 'Buy Now',
        onPress: () => LinkingIOS.openURL(productURL)
      }]
    );
  }

  componentDidMount () {
    PushManager.setListenerForNotifications(this.receiveRemoteNotification);

    setTimeout(this.measureMainComponent.bind(this));
  }

  getGridItemStyles () {
    return {
      borderWidth: 1,
      borderColor: '#eee',
      height: this.state.itemWidth,
      width: this.state.itemWidth,
      backgroundColor: '#eee'
    };
  }

  getGridImageStyles () {
    return {
      height: this.state.itemWidth,
      width: this.state.itemWidth,
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'transparent'
    };
  }

  renderTrack (track) {
    return (
      <View style={this.getGridItemStyles.call(this)}>
        <View>
          <Image
            style={this.getGridImageStyles.call(this)}
            source={{uri: track.productImage}}
            >
            <View style={{...this.getGridImageStyles.call(this), backgroundColor: 'rgba(0,0,0,0.65)'}}>
              <Text style={styles.trackOverlayText}>{track.productName}</Text>
              <Text style={styles.trackOverlayText}>Rs. {track.currentPrice}</Text>
            </View>
          </Image>
        </View>
      </View>
    );
  }

  renderResults () {
    var { results } = this.props.data.dashboardProps;
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    var listViewDataSource = ds.cloneWithRows(results);
    return (
      <ListView
        contentContainerStyle={styles.gridList}
        dataSource={listViewDataSource}
        renderRow={this.renderTrack.bind(this)}
        />
    );
  }

  render () {
    return (
      <View style={styles.container} ref="containerView">
        {this.props.children}
        {this.renderResults.call(this)}
      </View>
    );
  }
}

Dashboard.propTypes = {
  data: PropTypes.object.isRequired
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
    // paddingTop: 64
  },
  sellerName: {
    paddingLeft: 10,
    marginBottom: 10
  },
  gridList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  trackOverlayText: {
    color: '#ddd',
    fontWeight: 'bold',
    fontSize: 14,
    padding: 10
  }
});
