import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import difference from 'lodash/difference';
import union from 'lodash/union';

import { setRecipe } from '../../state/recipeSlice';
import SectionTitle from '../../components/SectionTitle';
import Toggle from '../../components/Toggle';

import GET_RECIPES from '../../graphql/queries/getRecipes';

function Find() {
	/**
	 * -----------------------------
	 * Global State
	 * -----------------------------
	 */

	const dispatch = useDispatch();

	/**
	 * -----------------------------
	 * Component State
	 * -----------------------------
	 */

	const [selectedCategories, setSelectedCategories] = useState([]);
	const [recipes, setRecipes] = useState([]);
	const [categories, setCategories] = useState([]);

	/**
	 * -----------------------------
	 * GraphQL
	 * -----------------------------
	 */

	const { loading, error, data } = useQuery(GET_RECIPES, { pollInterval: 500 });

	/**
	 * -----------------------------
	 * Functions
	 * -----------------------------
	 */

	function getCategoriesJsx() {
		return categories.map((category) => {
			return (
				<Toggle key={category} className="mt-2 mr-2" onClick={() => handleCategoryClick(category)} selected={selectedCategories.includes(category)}>
					{category}
				</Toggle>
			);
		});
	}

	function getRecipesJsx() {
		// if no category is selected, show all recipes
		// otherwise, show recipes that belong to all selected categories
		const filteredRecipes = selectedCategories.length === 0 ? recipes : recipes.filter((recipe) => difference(selectedCategories, recipe.category).length === 0);

		return filteredRecipes.map((recipe) => {
			const { id, name } = recipe;

			return (
				<div key={id} onClick={() => viewRecipe(recipe)} className="cursor-pointer py-1">
					{name}
				</div>
			);
		});
	}

	function handleCategoryClick(category) {
		toggleCategory(category);
	}

	function toggleCategory(category) {
		const found = selectedCategories.find((c) => c === category);

		// if the category is not in the array, add it
		if (!found) setSelectedCategories((old) => [...old, category]);
		// otherwise, remove the category
		else setSelectedCategories((old) => old.filter((c) => c !== category));
	}

	function viewRecipe(recipe) {
		dispatch(setRecipe(recipe));
	}

	/**
	 * -----------------------------
	 * Side Effects
	 * -----------------------------
	 */

	useEffect(() => {
		if (!loading && !error && data) {
			const recipeData = data.recipes;

			setRecipes(recipeData);

			// Get all unique category values (e.g. "breakfast", "dessert", etc.) and flatten the 2D array
			const uniqueCategories = union(recipeData.map((recipe) => recipe.category).flat());

			setCategories(uniqueCategories);
		}
	}, [loading, error, data]);

	/**
	 * -----------------------------
	 * JSX
	 * -----------------------------
	 */

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		// <PerfectScrollbar>
		<div className="h-full overflow-y-scroll overflow-x-auto p-2 border-2 border-red-400">
			<SectionTitle text="Find" color="red-400" />
			<div className="p-4">
				{/* <div className="mb-4">Search goes here</div> */}
				<div className="text-2xl text-red-400 uppercase">Categories</div>
				<div className="flex flex-wrap mb-4">{getCategoriesJsx()}</div>
				<div className="text-2xl text-red-400 uppercase">Recipes</div>
				<div className="divide-y">{getRecipesJsx()}</div>
			</div>
		</div>
		// </PerfectScrollbar>
	);
}

export default Find;
