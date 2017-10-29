import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import PlaybackScreen from '../screens/PlaybackScreen';
import CastSessionScreen from '../screens/CastSessionScreen';

export default StackNavigator({
  CastSessionScreen: {screen: CastSessionScreen},
  PlaybackScreen: {screen: PlaybackScreen},
  
},
  { navigationOptions: {
     headerTintColor: 'black'
  }
});
