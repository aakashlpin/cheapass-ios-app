import React from 'react-native';
import Swipeout from 'react-native-swipeout';
import RefreshableListView from 'react-native-refreshable-listview';
import { Icon } from 'react-native-icons';

var {
  View,
  PropTypes,
  StyleSheet,
  ListView,
  Image,
  Text,
  AlertIOS,
  LinkingIOS,
  Dimensions
} = React;

var PushManager = require('./RemotePushIOS');

export default class Dashboard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      scrollEnabled: true
    };
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
    this.setState({
      ...this.state,
      productNameDynamicWidth: {width: (Dimensions.get('window').width / 2) - 10}
    });
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
      <RefreshableListView
        scrollEnabled={this.state.scrollEnabled}
        dataSource={listViewDataSource}
        renderSectionHeader={this.renderHeader.bind(this)}
        renderRow={this.renderTrack.bind(this)}
        loadData={this.props.onReloadAlerts}
        refreshDescription="Refreshing Alerts..."
        />
    );
  }

  renderTrack (track) {
    const swipeoutButtons = [
      {
        component: <Icon
          name='ion|ios-cart-outline'
          size={60}
          color='#fff'
          style={styles.iconCart}
        />,
        type: 'primary',
        backgroundColor: '#204A7B',
        onPress: () => {
          LinkingIOS.openURL(track.productURL);
        }
      }
    ];

    return (
      <Swipeout
        right={swipeoutButtons}
        backgroundColor="#fff"
        autoClose={true}
        >
        <View style={styles.listItemContainer}>
          <View style={styles.listItemContainerLeftChild}>
            <Image style={styles.listItemLeftImage} resizeMode="contain" source={{uri: track.productImage}} />
          </View>
          <View style={styles.listItemContainerRightChild}>
            <View style={[styles.listItemProductNameContainer, this.state.productNameDynamicWidth]}>
              <Text style={styles.productDetails}>{track.productName}</Text>
            </View>
            <View style={styles.listItemProductDetailsContainer}>
              <Text style={[styles.productDetails, styles.price]}>₹{track.humanPrice}/-</Text>
              <View style={[styles.sellerTag, track.isFavourable ? styles.favourableBuy : styles.unfavourableBuy]}>
                <Icon name={track.isFavourable ? 'ion|arrow-down-c' : 'ion|arrow-up-c'} size={14} color="#fff" style={{height: 14, width: 8, marginRight: 2}} />
                <Text style={styles.sellerName}>{track.seller}</Text>
              </View>
            </View>
          </View>
        </View>
      </Swipeout>
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
  data: PropTypes.object.isRequired,
  onReloadAlerts: PropTypes.func.isRequired
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
    // backgroundColor: '#0B315B'
  },
  tracksHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F1F3F5',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2
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
    padding: 12
  },
  listItemLeftImage: {
    height: 60,
    width: 60
  },
  listItemContainerRightChild: {
    height: 100,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    padding: 12,
    paddingLeft: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#CECED2'
  },
  listItemProductNameContainer: {
    width: 150,
    paddingRight: 6
  },
  productDetails: {
    // color: '#0E325A'
    // fontWeight: '500'
  },
  iconCart: {
    height: 60,
    width: 60,
    flex: 1
  },
  listItemProductDetailsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  price: {
    marginBottom: 5
  },
  sellerTag: {
    padding: 3,
    borderRadius: 2,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  favourableBuy: {
    backgroundColor: '#30C077'
  },
  unfavourableBuy: {
    backgroundColor: '#FD4B47'
  },
  sellerName: {
    color: '#fff',
    fontSize: 12
  }
});
