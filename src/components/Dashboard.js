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

  render () {
    return (
      <View style={styles.container} ref="containerView">
        {this.props.children}
        {this.renderResults.call(this)}
      </View>
    );
  }

  renderResults () {
    var { results } = this.props.data.dashboardProps;
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    var listViewDataSource = ds.cloneWithRows(results);
    return (
      <ListView
        // contentContainerStyle={styles.gridList}
        dataSource={listViewDataSource}
        renderSectionHeader={this.renderHeader.bind(this)}
        renderRow={this.renderTrack.bind(this)}
        />
    );
  }

  renderTrack (track) {
    return (
      <View style={styles.listItemContainer}>
        <View style={styles.listItemContainerLeftChild}>
          <Image style={styles.listItemLeftImage} source={{uri: track.productImage}} />
        </View>
        <View style={styles.listItemContainerRightChild}>
          <View style={styles.listItemProductNameContainer}>
            <Text style={{}}>{track.productName}</Text>
          </View>
          <View style={styles.listItemProductDetailsContainer}>
            <Text style={{}}>Rs. {track.currentPrice}</Text>
            <Text style={{}}>{track.seller}</Text>
          </View>
        </View>
      </View>
    );
  }

  renderHeader () {
    return (
      <View style={styles.tracksHeader}>
        <Text style={styles.tracksHeaderText}>Product Details</Text>
        <Text style={styles.tracksHeaderText}>Current Price</Text>
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
  },
  tracksHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F1F3F5'
  },
  tracksHeaderText: {
    color: '#0E325A',
    opacity: 0.3,
    fontWeight: '500'
  },
  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap'
  },
  listItemContainerLeftChild: {
    // backgroundColor: 'green',
    // alignItems: 'flex-start',
    padding: 12
  },
  listItemLeftImage: {
    height: 60,
    width: 60
  },
  listItemContainerRightChild: {
    // backgroundColor: 'red',
    height: 100,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    padding: 12,
    paddingLeft: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  listItemProductNameContainer: {
    width: 150
  }
});
