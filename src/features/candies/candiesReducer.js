import { INCREASE_SCORE, SET_CANDIES, UPDATE_CANDIES } from './candiesActions';

const initialState = {
  candies: [],
  currentCandies: [],
  score: 0
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

      case INCREASE_SCORE:
        return{
          ...state,
          score: state.score + action.payload
        }

    default:
      return state;
  }
};

export default candiesReducer;
