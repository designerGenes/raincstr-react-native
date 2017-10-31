import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import PlaybackScreen from '../screens/PlaybackScreen';
import CastSessionScreen from '../screens/CastSessionScreen';

export default StackNavigator({
  PlaybackScreen: {screen: PlaybackScreen},
  CastSessionScreen: {screen: CastSessionScreen},  
},
  { navigationOptions: {
     headerTintColor: 'black'
  }
});
