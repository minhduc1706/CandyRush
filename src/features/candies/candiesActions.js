export const SET_CANDIES = 'SET_CANDIES';
export const UPDATE_CANDIES = 'UPDATE_CANDIES';

export const setCandies = (candies) => ({
  type: SET_CANDIES,
  payload: candies,
});

export const updateCandies = (candies) => ({
  type: UPDATE_CANDIES,
  payload: candies,
});
