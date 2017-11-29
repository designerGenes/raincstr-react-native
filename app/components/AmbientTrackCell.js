import React, { Component } from 'react';
import Carousel from 'react-native-snap-carousel';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Masonry} from '../config';
import {connect} from 'react-redux';
import {tracksFetchData} from '../ducks/tracks';
import {setPlayer, setFocusURL, addCell, setIsPlaying} from '../ducks/app';
import {MANIFEST_URL} from '../assets/constants';
import DJPlayPauseButton from './DJPlayPauseButton';
import {Player, MediaStates } from 'react-native-audio-toolkit';
const uuidv4 = require('uuid/v4');

const mapStateToProps = state => ({
  entireState: state.app,
  player: state.app.player,
  focusURL: state.app.focusURL,
  globalPlayerIsPlaying: state.app.isPlaying
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(tracksFetchData(url)),
    addCell: (cell) => dispatch(addCell(cell)),
    setPlayer: (player) => dispatch(setPlayer(player)),
    setIsPlaying: (isPlaying) => dispatch(setIsPlaying(isPlaying)),
    setFocusURL: (url) => dispatch(setFocusURL(url)),
  }
}

class AmbientTrackCell extends Component {
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


  }

  setPlayPauseButtonState(newState) {
    this.refs.playPauseButton.setButtonState(newState);
  }

  setPlaybackTo(shouldPlay) {
    if (shouldPlay) {


      // this.refs.playPauseButton.setButtonState(1);
      this.setState({isPlaying: true})
      this.player.play(() => {
        if (this.props.onPlay) { this.props.onPlay(this) }
        var existingPlayer = this.props.player;
        if (existingPlayer) {
          // silence
          if (existingPlayer !== this.player) {
            existingPlayer.pause();
          }
        }

        this.props.setPlayer(this.player);
        this.props.setFocusURL(this.props.track.url);
        this.props.setIsPlaying(true);
      })
    } else {
      // this.refs.playPauseButton.setButtonState(0);
      this.player.pause(() => {
        if (this.props.onPause) { this.props.onPause(this) }
      });
      if (this.props.focusURL === this.props.track.url) {
        this.props.setIsPlaying(false);
      }
      this.setState({isPlaying: false})
    }
  }

  _onPressPlayPauseButton = () => {
    this.setPlaybackTo(!this.state.isPlaying);
  }

  render() {
    const track = this.props.track;
    const assocColor = (track.category === 'rain' ? Colors.rainBlue : Colors.spaceRed );
    const completionHeight = (100 * (this.state.trackCompletionPercent / 100)) + '%';
    const focusURLisCellURL = (this.props.focusURL === track.url) && this.props.globalPlayerIsPlaying;
    console.log('is playing: ' + this.props.isPlaying);
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
                buttonState={(this.props.isPlaying ? 1 : 0)}
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

export default connect(mapStateToProps, mapDispatchToProps)(AmbientTrackCell);
