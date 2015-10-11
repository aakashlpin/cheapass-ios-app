var React = require('react-native');
var _ = require('underscore');
var {
  View,
  Text,
  PropTypes,
  StyleSheet,
  ListView,
  Image,
  TouchableHighlight,
  AsyncStorage
} = React;

var keys = require('../config/keys');
var {
  STORAGE_KEY_IS_LOGGED_IN
} = keys;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
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
  trackOverlay: {
    // flex: 1,
    // height: 100,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  trackProductName: {
    fontSize: 12,
    color: '#222',
    left: 0,
    bottom: 10,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  trackCurrentPrice: {
    fontSize: 12,
    left: 0,
    bottom: 0,
    color: '#333',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  email: {
    // textAlign: 'left',
    fontSize: 12,
    color: '#111'
  },
  header: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#eee'
  },
  logout: {
    fontSize: 12,
    color: 'red',
    alignSelf: 'center'
  }
});

class Dashboard extends React.Component {
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

  componentDidMount () {
    setTimeout(this.measureMainComponent.bind(this));
  }

  async _onLogout () {
    try {
      await AsyncStorage.setItem(STORAGE_KEY_IS_LOGGED_IN, 'false');
    } catch (e) {
      console.log(e);
    }
  }

  onPressLogout () {
    this._onLogout.call(this);
  }

  renderFooter () {
    var { email } = this.props.dashboardProps;
    return (
      <View style={styles.header}>
        <Text style={styles.email}>Dashboard of {email}</Text>
        <TouchableHighlight
          onPress={this.onPressLogout.bind(this)}
          underlayColor="#eee">
          <Text style={styles.logout}>Logout</Text>
        </TouchableHighlight>
      </View>
    );
  }

  getGridItemStyles () {
    return {
      borderWidth: 1,
      borderColor: '#eee',
      height: this.state.itemWidth,
      width: this.state.itemWidth,
      backgroundColor: '#f0f'
    };
  }

  getGridImageStyles () {
    return {
      height: this.state.itemWidth,
      width: this.state.itemWidth
    };
  }

  renderTrack (track) {
    return (
      <View style={this.getGridItemStyles.call(this)}>
        <Image
          style={this.getGridImageStyles.call(this)}
          source={{uri: track.productImage}}
          />
      </View>
    );
  }

  renderResults () {
    var { results } = this.props.dashboardProps;
    var flattenedResults = _.flatten(results.reduce((clubbed, result) => {
      clubbed.push(result.tracks);
      return clubbed;
    }, []));

    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    var listViewDataSource = ds.cloneWithRows(flattenedResults);
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
        {this.renderFooter.call(this)}
        {this.renderResults.call(this)}
      </View>
    );
  }
}

Dashboard.propTypes = {
  dashboardProps: PropTypes.object.isRequired
};

module.exports = Dashboard;
