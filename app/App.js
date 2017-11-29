import React, {Component} from 'react';
import RaincstrStack from './config/router';
import {View} from 'react-native';
import store from './store';
import {Provider} from 'react-redux';

import GoogleCastController from 'google-cast-controller';

const bootstrap = () => {
  
}

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <RaincstrStack />
      </Provider>
    );
  }
}


bootstrap();
