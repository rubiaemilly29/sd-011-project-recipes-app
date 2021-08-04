import { combineReducers } from 'redux';
import user from './user';
import searchItems from './searchItems';
import detailsId from './detailsId';
import mainPageRecipe from './mainPageRecipe';
import randomRecipe from './randomRecipe';
import areaReducer from './areaReducer';

const rootReducer = combineReducers({
  user,
  searchItems,
  detailsId,
  mainPageRecipe,
  randomRecipe,
  areaReducer,
});

export default rootReducer;