const defaultState = {
  player: 0,
  remoteDeviceID: 0,
  isPlaying: false,
}

const SET_PLAYER = 'raincstr/app/SET_PLAYER';
const SET_REMOTE_DEVICE = 'raincstr/app/SET_REMOTE_DEVICE';
const SET_IS_PLAYING = 'raincstr/app/SET_IS_PLAYING';

// reducer
export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case SET_PLAYER:
      return {...state,
                 player:  action.player
           };
    case SET_REMOTE_DEVICE:
      return {...state,
                  remoteDeviceID:  action.remoteDeviceID
            };
    case SET_IS_PLAYING:
      return {...state,
                  isPlaying:  action.isPlaying
            };
  }
  return state;
}

// action creators

export function setPlayer(player) {
  return {type: SET_PLAYER, player};
}

export function setRemoteDevice(remoteDeviceID) {
  return {type: SET_REMOTE_DEVICE, remoteDeviceID};
}

export function setIsPlaying(isPlaying) {
  return {type: SET_IS_PLAYING, isPlaying};
}
