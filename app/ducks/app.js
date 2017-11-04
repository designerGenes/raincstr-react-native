const defaultState = {
  player: null,
  cells: [],
  remoteDeviceID: 0,
  isPlaying: false,
  focusURL: ''
}

const SET_ACTIVE_CELL = 'raincstr/app/SET_ACTIVE_CELL';
const SET_PLAYER = 'raincstr/app/SET_PLAYER';
const SET_REMOTE_DEVICE = 'raincstr/app/SET_REMOTE_DEVICE';
const SET_IS_PLAYING = 'raincstr/app/SET_IS_PLAYING';
const SET_FOCUS_URL = 'raincstr/app/SET_FOCUS_URL';

// reducer
export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case SET_ACTIVE_CELL:
      return {...state,
               cellIndex: action.cellIndex
         };
    case SET_PLAYER:
      return {...state,
                 player: action.player
           };
    case SET_REMOTE_DEVICE:
      return {...state,
                  remoteDeviceID: action.remoteDeviceID
            };
    case SET_IS_PLAYING:
      return {...state,
                  isPlaying: action.isPlaying
            };
    case SET_FOCUS_URL:
      return {...state,
                  focusURL: action.focusURL
            };
  }
  return state;
}

// action creators

export function setPlayer(player) {
  return {type: SET_PLAYER, player};
}

export function setActiveCell(cellIndex) {
  return {type: SET_ACTIVE_CELL, cellIndex};
}


export function setRemoteDevice(remoteDeviceID) {
  return {type: SET_REMOTE_DEVICE, remoteDeviceID};
}

export function setIsPlaying(isPlaying) {
  return {type: SET_IS_PLAYING, isPlaying};
}

export function setFocusURL(focusURL) {
  return {type: SET_FOCUS_URL, focusURL};
}
