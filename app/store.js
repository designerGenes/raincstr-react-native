import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import Images from './assets/images';
import app from './ducks/app';
import tracks from './ducks/tracks';


const middlewares = [ thunk ];
const allReducers = combineReducers({
    app,
    tracks
  })

export default createStore(allReducers,
                        {},
                        applyMiddleware(...middlewares));
