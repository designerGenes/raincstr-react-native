import {combineReducers} from 'redux';

const TRACKS_HAS_ERRORED = 'raincstr/tracks/TRACKS_HAS_ERRORED';
const TRACKS_IS_LOADING = 'raincstr/tracks/TRACKS_IS_LOADING';
const TRACKS_FETCH_DATA_SUCCESS = 'raincstr/tracks/TRACKS_FETCH_DATA_SUCCESS';

// reducers
export default function reducer(state = {}, action) {
  switch (action.type) {
    case TRACKS_FETCH_DATA_SUCCESS:
      return {...state, tracks: action.tracks};
    case TRACKS_IS_LOADING:
      return {...state, isLoading: action.isLoading};
    case TRACKS_HAS_ERRORED:
      return {...state, hasErrored: action.hasErrored};
  }
  return state;
}


// action creators
function setTracksHasErrored(hasErrored) {
  return { type: TRACKS_HAS_ERRORED, hasErrored: hasErrored };
}

export function setTracksIsLoading(isLoading) {
  return { type: TRACKS_IS_LOADING, isLoading: isLoading };
}

export function tracksFetchDataSuccess(response) {
  return { type: TRACKS_FETCH_DATA_SUCCESS, tracks: response.items }
};

export function tracksFetchData(url) {
  console.log('FETCHING DATA at ' + url);
  return (dispatch) => {
    // console.log(dispatch.TrackReducer);
    dispatch(setTracksIsLoading(true));
    fetch(url)
      .then( (response) => {
        dispatch(setTracksIsLoading(false));
        return response;
      })
      .then( (response) => response.json() )
      .then( (response) => {
        dispatch(tracksFetchDataSuccess(response))
        return response;
      })
    .catch(() => {
        console.log('an error occurred!');
    });
  }
}
