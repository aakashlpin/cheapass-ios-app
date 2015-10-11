var React = require('react-native');
var {
  View,
  Text,
  PropTypes,
  StyleSheet,
  ListView,
  ScrollView,
  Image
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapper: {
    paddingTop: 10
  },
  flex: {
    flex: 1
  },
  email: {
    textAlign: 'left',
    fontSize: 12,
    color: '#111',
    marginTop: 60
  },
  listView: {
    flex: 1
    // backgroundColor: '#F2F5F8'
  },
  sellerName: {
    paddingLeft: 10,
    marginBottom: 10
  },
  trackContainer: {
    flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  trackLeftContainer: {
    width: 100,
    paddingRight: 20
  },
  trackRightContainer: {
    flex: 1
  },
  trackThumbnail: {
    paddingLeft: 10,
    height: 60,
    width: 53
  },
  trackProductName: {
    fontSize: 16,
    color: '#222',
    marginBottom: 10
  },
  trackCurrentPrice: {
    fontSize: 14,
    color: '#333'
  },
  scrollView: {
    height: 600,
    backgroundColor: '#6A85B1'
  }
});

class Dashboard extends React.Component {
  constructor (props) {
    super(props);
  }

  renderFooter () {
    var { email } = this.props.dashboardProps;
    return (
      <Text style={styles.email}>Dashboard of {email}</Text>
    );
  }

  renderTrack (track) {
    return (
      <View style={styles.trackContainer}>
        <View style={styles.trackLeftContainer}>
          <Image
            source={{uri: track.productImage}}
            style={styles.trackThumbnail}
            />
        </View>
        <View style={styles.trackRightContainer}>
          <Text style={styles.trackProductName}>{track.productName}</Text>
          <Text style={styles.trackCurrentPrice}>Rs. {track.currentPrice}</Text>
        </View>
      </View>
    );
  }

  renderSellerView (sellerTracks) {
    let seller = sellerTracks.seller;
    let tracks = sellerTracks.tracks;
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    let dataSource = ds.cloneWithRows(tracks);
    if (!tracks.length) {
      return (
        <View style={styles.flex}>
        </View>
      );
    }

    return (
      <View style={styles.flex}>
        <ListView
          renderHeader={() => <Text style={styles.sellerName}>{seller.toUpperCase()}</Text>}
          dataSource={dataSource}
          renderRow={this.renderTrack.bind(this)}
          style={styles.listView}
          />
      </View>
    );
  }

  renderResults () {
    var { results } = this.props.dashboardProps;
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    var listViewDataSource = ds.cloneWithRows(results);
    return (
      <ListView
        dataSource={listViewDataSource}
        renderRow={this.renderSellerView.bind(this)}
        style={styles.listView}
        />
    );
  }
  render () {
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.wrapper}>
            {this.renderResults.call(this)}
            {this.renderFooter.call(this)}
          </View>
        </View>
    </ScrollView>
    );
  }
}

Dashboard.propTypes = {
  dashboardProps: PropTypes.object.isRequired
};

module.exports = Dashboard;
