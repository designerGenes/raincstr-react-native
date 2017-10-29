import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Images from '../assets/images';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  castState: state.app.castState
})

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

class DJCastButton extends Component {
  buttonStates = [Images.castButtonInactive,
                        Images.castButtonActive,
                        Images.castButtonWorking0,
                        Images.castButtonWorking1,
                        Images.castButtonDefault]

  constructor(props) {
    super(props);
    this.state = {
      buttonState: props.castState
    }
  }

  _onPress() {

    switch (this.props.castState) {
      case 0:
      case 3:
        
        // launch connect screen.  should also eventually cover case 3 (loading)
        break;
      case 1:
        // launch control screen
        break;
    }
    if (this.props.onPress) { this.props.onPress() }
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Image
          source={this.buttonStates[this.state.buttonState]} />
      </TouchableOpacity>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DJCastButton);
