var React = require('react-native');
var _ = require('underscore');
var {
  View,
  PropTypes,
  StyleSheet,
  ListView,
  Image
} = React;

var Header = require('./Header');

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
    var { results } = this.props.data.dashboardProps;
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
        <Header {...this.props} email={this.props.data.dashboardProps.email} />
        {this.renderResults.call(this)}
      </View>
    );
  }
}

Dashboard.propTypes = {
  data: PropTypes.object.isRequired
};

module.exports = Dashboard;
