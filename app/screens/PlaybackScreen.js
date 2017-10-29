import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions} from 'react-native';
import {Button} from 'react-native-elements';
import {Masonry, Colors} from '../config';
import Images from '../assets/images';
import {DJCastButton, AmbientTrackCarousel} from '../components';
var {height, width} = Dimensions.get('window');


class PlaybackScreen extends Component {
  static navigationOptions = {
    title: 'Playback',
    header: null
  }
  constructor(props) {
    super(props);
    this._onPressSettings = this._onPressSettings.bind(this);
    this._onPressCast = this._onPressCast.bind(this);
  }

  _onPressSettings() {
    const {navigate} = this.props.navigation;
  }

  _onPressCast() {
    const {navigate} = this.props.navigation;
    navigate('CastSessionScreen');
  }

  render() {
    return (
      <View style={[Masonry.container, {backgroundColor: Colors.gray0}]}>
        <View style={[Masonry.row, styles.titleAndControlRow, {flex: 0, backgroundColor: Colors.gray1}]}>
          <Text style={[styles.logoTitleText, {color: Colors.whiteText}]}> raincstr </Text>

          <View style={{flex: 1}}/>
          <DJCastButton onPress={this._onPressCast}/>
          <TouchableOpacity onPress={this._onPressSettings}>
            <Image source={Images.settingsButton} />
          </TouchableOpacity>
          <View style={{width: 16}}/>

        </View>

        <View style={[Masonry.row, {flex: 1, backgroundColor: 'black'}]} >
          <AmbientTrackCarousel
            height={height * 0.8}
            width={width}
            />
        </View>
        <View style={{width: '100%', height: '8%', backgroundColor: 'black'}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleAndControlRow: {
    // flex: 1,
    marginBottom: 24,
    padding: 0,
    width: '100%',
    paddingTop: 36,
    paddingBottom: 16
  },
  logoTitleText: {
    fontSize: 52,
    fontFamily: 'FilsonSoft-Bold'
  },
});

export default PlaybackScreen;
