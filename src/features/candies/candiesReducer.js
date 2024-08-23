import { SET_CANDIES, UPDATE_CANDIES } from './candiesActions';

const initialState = {
  candies: [],
  currentCandies: [],
};

const candiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CANDIES:
      return {
        ...state,
        candies: action.payload,
        currentCandies: action.payload,
      };

      case UPDATE_CANDIES:
      return {
        ...state,
        currentCandies: action.payload,
      };

    default:
      return state;
  }
};

export default candiesReducer;
