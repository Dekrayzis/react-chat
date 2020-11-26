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
  isPrivateChannel: false,
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_CURRENT_CHANNEL: "SET_CURRENT_CHANNEL",
  SET_TOGGLE_ALL_CHANNELS: "SET_TOGGLE_ALL_CHANNELS",
  SET_PRIVATE_CHANNEL: "SET_PRIVATE_CHANNEL",
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

    case actionTypes.SET_PRIVATE_CHANNEL:
      return {
        ...state,
        isPrivateChannel: action.isPrivateChannel,
      };

    default:
      return state;
  }
};

export default reducer;
