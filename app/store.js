import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import Images from './assets/images';
import allReducers from './reducers';

const middlewares = [ thunk ];



let store = createStore(allReducers,
                        {},
                        applyMiddleware(...middlewares));
export default store;
