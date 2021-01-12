import { createSlice } from '@reduxjs/toolkit';

const categoriesSlice = createSlice({
	name: 'categories',
	initialState: [],
	reducers: {
		toggleCategory(state, { payload }) {
			const found = state.findIndex((category) => category === payload);

			if (found === -1) state.push(payload);
			else state.splice(found, 1);

			return state;
		}
	}
});

export const getCategories = (state) => state.categories;
export const { toggleCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
