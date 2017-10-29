import React, { Component } from 'react';
import Carousel from 'react-native-snap-carousel';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Masonry} from '../config';
import {connect} from 'react-redux';
import {tracksFetchData} from '../ducks/tracks';
import {MANIFEST_URL} from '../assets/constants';
import DJPlayPauseButton from './DJPlayPauseButton';
import {Player, MediaStates } from 'react-native-audio-toolkit';

const BASE_TRACK_URL = 'https://s3-us-west-2.amazonaws.com/raincasterapp/audio/';

import store from '../store';


export default class AmbientTrackCell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trackCompletionPercent: 40,
      isPlaying: 0
    }

    var URL = BASE_TRACK_URL + props.track.url
    this.player = new Player(URL);
    this.player.prepare( (err) => {
        var seconds = this.player.duration / 1000;

        this.setState({trackDuration: seconds})
    });

    this._onPressPlayPauseButton = this._onPressPlayPauseButton.bind(this);
  }

  setPlaybackTo(shouldPlay) {


    if (shouldPlay) {
      this.refs.playPauseButton.setButtonState(1);
      this.setState({isPlaying: 1})
      this.player.play(() => {
        // console.log(store.getState());
        var existingPlayer = store.getState().player;
        if (existingPlayer !== 0) {

          if (existingPlayer !== this.player) {
            console.log(existingPlayer);
            existingPlayer.pause();
          }
        }
        store.dispatch({type: 'SET_PLAYER', player: this.player});
      })
    } else {
      this.refs.playPauseButton.setButtonState(0);
      this.player.pause();
      this.setState({isPlaying: 0})
    }
  }



  _onPressPlayPauseButton() {

    this.setPlaybackTo(!this.state.isPlaying);
  }

  render() {
    const track = this.props.track;
    const assocColor = (track.category === 'rain' ? Colors.rainBlue : Colors.spaceRed );
    const completionHeight = (100 * (this.state.trackCompletionPercent / 100)) + '%';

    return (
      <View style={{flex: 0}}>
        <View style={[styles.cellShell, {width: this.props.width, backgroundColor: Colors.gray1}]}>

          <View style={[{height: '30%', width: '100%', paddingTop: 16, paddingLeft: 4, backgroundColor: Colors.gray0, borderTopLeftRadius: 16, borderTopRightRadius: 16} ]}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[styles.trackTitleText]}>  {track.title} </Text>

            </View>
          </View>

          <View style={{flex: 1, backgroundColor: Colors.gray1}}>
            <View style={{position: 'absolute', height: '100%', zIndex: 1, left: 30, top: 20}}>
              <DJPlayPauseButton
                ref='playPauseButton'
                onPress={this._onPressPlayPauseButton}
              />
            </View>
            <View style={{flex: 1}}/>
            <View style={{height: completionHeight, width: '100%', backgroundColor: assocColor, zIndex: 0}}/>
          </View>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cellShell: {
    flex: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: 'gray',
    height: '95%'
  },
  trackTitleText: {
    fontSize: 28,
    fontFamily: 'FilsonSoft-Bold',
    color: 'white',
    padding: 8
  },
});
