import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import difference from 'lodash/difference';
import union from 'lodash/union';

import { setRecipe } from '../../state/recipeSlice';
import SectionTitle from '../../components/SectionTitle';
import Category from '../../components/Category';

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
				<Category
					key={category}
					text={category}
					className="cursor-pointer mt-2"
					onClick={() => handleCategoryClick(category)}
					selected={selectedCategories.includes(category)}
				/>
			);
		});
	}

	function getRecipesJsx() {
		// if no category is selected, show all recipes
		// otherwise, show recipes that belong to all selected categories
		const filteredRecipes =
			selectedCategories.length === 0
				? recipes
				: recipes.filter((recipe) => difference(selectedCategories, recipe.category).length === 0);

		return filteredRecipes.map((recipe) => {
			const { id, name } = recipe;

			return (
				<div key={id} onClick={() => viewRecipe(recipe)} className="cursor-pointer">
					<div>{name}</div>
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
		<PerfectScrollbar className="h-screen bg-lime-200">
			<SectionTitle text="Find a recipe" bg="bg-lime-300" />
			<div className="p-4">
				<div className="text-lg">Categories</div>
				<div className="flex flex-wrap">{getCategoriesJsx()}</div>
				<div className="text-lg mt-8">Recipes</div>
				<div>{getRecipesJsx()}</div>
			</div>
		</PerfectScrollbar>
	);
}

export default Find;
