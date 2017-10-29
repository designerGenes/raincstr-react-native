import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Images from '../assets/images';




export default class DJCastButton extends Component {
  buttonStates = [Images.castButtonInactive,
                        Images.castButtonActive,
                        Images.castButtonWorking0,
                        Images.castButtonWorking1,
                        Images.castButtonDefault]

  constructor(props) {
    super(props);
    this.state = {
      buttonState: 0
    }
  }

  render() {
    console.log('button state: ' + this.state.buttonState);
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Image
          source={this.buttonStates[this.state.buttonState]} />
      </TouchableOpacity>
    )
  }
}
