var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Image,
  ListView,
  Text,
  View
} = React;

let USER_TRACKS_URL = 'https://cheapass.in/api/dashboard/tracks/aakash.lpin@gmail.com';
var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  thumbnail: {
    height: 81,
    width: 53
  },
  listView: {
    borderStyle: 'solid',
    borderColor: '#ccc',
    borderWidth: 1
  },
  sellerName: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  productName: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold'
  },
  track: {},
  rightContainer: {
    flex: 1
  }
});

var cheapassApp = React.createClass({
  getInitialState: function () {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      isLoaded: false
    };
  },

  componentDidMount: function () {
    this.fetchData();
  },

  fetchData: function () {
    fetch(USER_TRACKS_URL)
    .then((response) => response.json())
    .then((response) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(response),
        isLoaded: true
      });
    })
    .done();
  },

  renderLoadingView: function () {
    return (
      <View style={styles.container}>
        <Text>
          Loading...
        </Text>
      </View>
    );
  },

  renderTrack: function (track) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: track.productImage}}
          style={styles.thumbnail}
          />
        <View style={styles.rightContainer}>
          <Text style={styles.productName}>{track.productName}</Text>
          <Text style={styles.currentPrice}>Rs. {track.currentPrice}</Text>
        </View>
      </View>
    );
  },

  renderSellerTracks: function (sellerTracks) {
    let seller = sellerTracks.seller;
    let tracks = sellerTracks.tracks;
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let dataSource = ds.cloneWithRows(tracks);
    return (
      <View>
        <Text style={styles.sellerName}>{seller.toUpperCase()}</Text>
        {
          tracks.length
          ? <ListView
            dataSource={dataSource}
            renderRow={this.renderTrack}
            />
          : <Text>No Tracks</Text>
        }
      </View>
    );
  },

  render: function() {
    if (!this.state.isLoaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderSellerTracks}
        style={styles.listView}
        />
    );
  }
});


AppRegistry.registerComponent('cheapassApp', () => cheapassApp);
