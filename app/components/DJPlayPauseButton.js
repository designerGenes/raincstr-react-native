import React, {Component} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Images from '../assets/images';

export default class DJPlayPauseButton extends Component {
  buttonStates = [Images.suspended,
                  Images.playing,
                ]
  constructor(props) {
    props.style = props.style || {};
    super(props);
    this.state = {
      buttonState: 0
    }
    this._onPress = this._onPress.bind(this);
    this.toggleButtonState = this.toggleButtonState.bind(this);
    this.setButtonState = this.setButtonState.bind(this);
  }

  setButtonState(newState) {
      this.setState({ buttonState: newState });
  }

  toggleButtonState() {
      this.setState({ buttonState: !this.state.buttonState })
  }

  _onPress() {
    var newButtonState = (this.state.buttonState < this.buttonStates.length - 1 ?  this.state.buttonState + 1 : 0);
    this.setState({buttonState: newButtonState});
    if (this.props.onPress !== undefined) {
      this.props.onPress();
    }
  }

  render() {
    return (
        <TouchableOpacity onPress={this._onPress}>
          <Image
            style={[{height: '50%', aspectRatio: 1}, this.props.style]}
            source={this.buttonStates[this.state.buttonState]} />
        </TouchableOpacity>

    )
  }
}
