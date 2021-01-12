import { createSlice } from '@reduxjs/toolkit';

const recipeSlice = createSlice({
	name: 'recipe',
	initialState: null,
	reducers: {
		setRecipe(state, { payload }) {
			state = payload;
			return state;
		}
	}
});

export const getRecipe = (state) => state.recipe;
export const { setRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
