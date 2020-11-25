export const initialState = {
  user: {
    displayName: "no user",
    photoURL: "http://placehold.it/80x80",
    friends: [],
    favourites: [],
  },
  currentChannel: {
    name: "no channel",
  },
  showAllChannels: false,
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_CURRENT_CHANNEL: "SET_CURRENT_CHANNEL",
  SET_TOGGLE_ALL_CHANNELS: "SET_TOGGLE_ALL_CHANNELS",
  CLEAR_USER: "CLEAR_USER",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actionTypes.CLEAR_USER:
      return {
        ...initialState,
      };

    case actionTypes.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.currentChannel,
      };

    case actionTypes.SET_TOGGLE_ALL_CHANNELS:
      return {
        ...state,
        showAllChannels: action.showAllChannels,
      };

    default:
      return state;
  }
};

export default reducer;
