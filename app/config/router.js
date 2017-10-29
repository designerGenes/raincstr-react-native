import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import PlaybackScreen from '../screens/PlaybackScreen';

export default StackNavigator({
  PlaybackScreen: {screen: PlaybackScreen},
  OtherPlaybackScreen: {screen: PlaybackScreen}
},
  { navigationOptions: {
     headerTintColor: 'blue'
  }
});
