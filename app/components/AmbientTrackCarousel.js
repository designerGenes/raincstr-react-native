import React, { Component } from 'react';
import Carousel from 'react-native-snap-carousel';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Masonry} from '../config';
import {connect} from 'react-redux';
import {tracksFetchData} from '../ducks/tracks';
import {MANIFEST_URL} from '../assets/constants';
import AmbientTrackCell from './AmbientTrackCell';

const mapStateToProps = state => ({
  tracks: state.tracks,
  hasErrored: state.hasErrored,
  isLoading: state.isLoading,
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(tracksFetchData(url))
  }
}

class AmbientTrackCarousel extends Component {
  componentDidMount() {
    this.props.fetchData(MANIFEST_URL);
  }

  constructor(props) {
    super(props);

    this._renderItem = this._renderItem.bind(this);
  }


  _renderItem({item, index} ) {
    const {height, width} = this.props;
    const cellWidth = width * 0.8;
    return (
      <AmbientTrackCell
        height={height}
        width={cellWidth}
        track={item} />
    )
  }

  renderForHasErrored() {
    return (
      <View style={[Masonry.fillsContainer, {backgroundColor: Colors.unknownGreen}]}>
        <Text style={[Masonry.labelBlockText, {padding: 20}]}> Loading... </Text>
      </View>
    )
  }

  renderForIsLoading() {
    return (
      <View style={[Masonry.fillsContainer, {backgroundColor: Colors.spaceRed}]}>
        <Text style={[Masonry.labelBlockText, {padding: 20}]}> Loading... </Text>
      </View>
    )
  }

  render() {
    const {height, width} = this.props;

    console.log(this.props);

    var tracks = this.props.tracks.tracks || [];

    if (this.props.isLoading) {
      return renderForIsLoading();
    }

    if (this.props.hasErrored) {
      return renderForHasErrored();
    }

    return (
      <View style={[Masonry.fillsContainer]}>
        <Carousel
              ref={(c) => { this._carousel = c;}}
              data={tracks}
              renderItem={this._renderItem}
              sliderWidth={width}
              itemWidth={width * 0.8}
              containerCustomStyle={[Masonry.fillsContainer, styles.carouselContainer]}
              activeSlideAlignment='start'
              contentContainerStyle={[{backgroundColor: 'black'}]}/>
      </View>
     )

  }
}

const styles = StyleSheet.create({
  carouselContainer: {
    backgroundColor: 'black',
    padding: '10%',
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AmbientTrackCarousel);
