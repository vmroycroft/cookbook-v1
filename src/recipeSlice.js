import { createSlice } from '@reduxjs/toolkit';

export const recipeSlice = createSlice({
	name: 'recipe',
	initialState: {
		currentRecipe: null
	},
	reducers: {
		updateCurrentRecipe(state, action) {
			state.currentRecipe = action.payload;
		}
	}
});

export const { updateCurrentRecipe } = recipeSlice.actions;

export const selectCurrentRecipe = (state) => state.recipe.currentRecipe;

export default recipeSlice.reducer;
