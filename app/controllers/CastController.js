import React, {Component} from 'react';
import Chromecast from 'react-native-google-cast';
import {GoogleCastController} from 'google-cast-controller';

export default class CastController  {

  initController() {
    GoogleCastController.sayHello();
  }

}
