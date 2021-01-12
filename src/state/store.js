import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from './recipeSlice';
import categoriesReducer from './categoriesSlice';

export default configureStore({
	reducer: {
		recipe: recipeReducer,
		categories: categoriesReducer
	}
});
