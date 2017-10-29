import React, { Component } from 'react';
import Carousel from 'react-native-snap-carousel';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Masonry} from '../config';
import {connect} from 'react-redux';
import {tracksFetchData} from '../ducks/tracks';
import {setPlayer, setFocusURL} from '../ducks/app';
import {MANIFEST_URL} from '../assets/constants';
import DJPlayPauseButton from './DJPlayPauseButton';
import {Player, MediaStates } from 'react-native-audio-toolkit';
const uuidv4 = require('uuid/v4');


import store from '../store';

const mapStateToProps = state => ({
  allCells: state.cells
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(tracksFetchData(url))
  }
}

export default class AmbientTrackCell extends Component {
  constructor(props) {
    super(props);
    this.uuid = uuidv4();
    this.state = {
      trackCompletionPercent: 40,
      isPlaying: false
    }

    this.player = new Player(props.track.url);

    this.player.prepare( (err) => {
        var seconds = this.player.duration / 1000;
        this.setState({trackDuration: seconds})
    });

    this._onPressPlayPauseButton = this._onPressPlayPauseButton.bind(this);
  }

  setPlayPauseButtonState(newState) {
    this.refs.playPauseButton.setButtonState(newState);
  }

  setPlaybackTo(shouldPlay) {
    if (shouldPlay) {
      this.refs.playPauseButton.setButtonState(1);
      this.setState({isPlaying: true})
      this.player.play(() => {
        if (this.props.onPlay) { this.props.onPlay(this) }
        var appState = store.getState().app;
        var existingPlayer = appState.player;
        if (existingPlayer) {
          // silence
          if (existingPlayer !== this.player) {
            existingPlayer.pause();
          }
        }

        store.dispatch(setPlayer(this.player));
        store.dispatch(setFocusURL(this.props.track.url));
      })
    } else {
      this.refs.playPauseButton.setButtonState(0);
      this.player.pause(() => {
        if (this.props.onPause) { this.props.onPause(this) }
      });
      this.setState({isPlaying: false})
    }
  }



  _onPressPlayPauseButton() {
    this.setPlaybackTo(!this.state.isPlaying);
  }

  render() {
    const globalState = store.getState();
    const track = this.props.track;
    const assocColor = (track.category === 'rain' ? Colors.rainBlue : Colors.spaceRed );
    const completionHeight = (100 * (this.state.trackCompletionPercent / 100)) + '%';
    const focusURLisCellURL = (globalState.app.focusURL === this.props.track.url) && globalState.app.isPlaying;

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
                buttonState={(focusURLisCellURL ? 1 : 0)}
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
