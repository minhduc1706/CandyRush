import { createStore } from 'redux';
import candiesReducer from '../features/candies/candiesReducer';

const store = createStore(candiesReducer);

export default store;
