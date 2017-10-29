import { combineReducers } from 'redux';
import app  from './ducks/app';
import tracks from './ducks/tracks';

export default combineReducers({
    app,
    tracks
  })
