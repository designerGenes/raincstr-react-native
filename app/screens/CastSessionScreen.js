import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions} from 'react-native';
import {Button} from 'react-native-elements';
import {Masonry, Colors} from '../config';
import Images from '../assets/images';
import {connect} from 'react-redux';
var {height, width} = Dimensions.get('window');

class CastSessionScreen extends Component {
  static navigationOptions = {
    title: 'Cast Session',
  }
  render() {
    return (
      <View style={[Masonry.fillsContainer, {backgroundColor: Colors.spaceRed}]}>
        <View style={[Masonry.row]}>
          <Text style={{backgroundColor: 'black', padding: 16, margin: 16, color: 'white', fontSize: 30, fontWeight: 'bold'}}>
            Cast session
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})

export default CastSessionScreen;
