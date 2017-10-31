import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, FlatList} from 'react-native';
import {Button} from 'react-native-elements';
import {Masonry, Colors} from '../config';
import Images from '../assets/images';
import {connect} from 'react-redux';
// import Chromecast from 'react-native-google-cast';
var {height, width} = Dimensions.get('window');

const mapStateToProps = state => ({
  castState: state.app.castState
})

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

class CastSessionScreen extends Component {
  static navigationOptions = {
    title: 'Cast Session',
  }

  constructor(props) {
    super(props);
    this.state = {
      devices: []
    }
    this.renderForIsNotConnected = this.renderForIsNotConnected.bind(this);
  }

  componentDidMount() {
    // Chromecast.startScan();
  }

  _renderDeviceItem(item) {
    return (
      <View style={{backgroundColor: Colors.gray1}}>
        <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold'}}> {item} </Text>
      </View>
    )
  }

  getDevices() {

  }

  renderForIsNotConnected() {
    // const devices = Chromecast.getDevices();
    // console.log('Chromecast devices: ');
    // console.log(devices);
    return (
      <View style={[Masonry.fillsContainer, {backgroundColor: Colors.gray0}]}>
      <View style={[Masonry.row, {flex: 0}]}>
        <Text style={[Masonry.labelBlockText, {padding: 16, fontWeight: 'bold', fontSize: 32, marginTop: 24}]}>
          Cast to
        </Text>
      </View>
      <FlatList
        data={this.state.devices}
        renderItem={this._renderDeviceItem} />

      </View>
    );
  }

  renderForIsConnected() {
    return (
      <View style={[Masonry.fillsContainer, {backgroundColor: Colors.gray1}]}>
        <View style={[Masonry.row]}>
          <Text style={[Masonry.labelBlockText, {padding: 16, fontWeight: 'bold', fontSize: 32}]}>
            Cast session
          </Text>
        </View>
        <View style={{flex: 1}} />
      </View>
    )
  }

  render() {
    switch (this.props.castState) {
      case 1:
        return this.renderForIsConnected();
      default:
        return this.renderForIsNotConnected();
    }
  }
}

const styles = StyleSheet.create({
  style: {

  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CastSessionScreen);
