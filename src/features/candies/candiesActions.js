export const SET_CANDIES = 'SET_CANDIES';
export const UPDATE_CANDIES = 'UPDATE_CANDIES';
export const INCREASE_SCORE = 'INCREASE_SCORE'

export const setCandies = (candies) => ({
  type: SET_CANDIES,
  payload: candies,
});

export const updateCandies = (candies) => ({
  type: UPDATE_CANDIES,
  payload: candies,
});

export const increaseScore = (points) => ({
  type: INCREASE_SCORE,
  payload: points,
});