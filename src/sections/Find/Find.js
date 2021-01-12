import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import union from 'lodash/union';
import filter from 'lodash/filter';

import { getCategories, toggleCategory } from '../../state/categoriesSlice';
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
	const selectedCategories = useSelector(getCategories);

	/**
	 * -----------------------------
	 * GraphQL
	 * -----------------------------
	 */

	const { loading, error, data } = useQuery(GET_RECIPES, { pollInterval: 500 });

	let categories = [];
	let recipes = [];

	if (data) {
		const recipeData = data.recipes;
		const categoryData = formatDataForCategories(recipeData);

		categories = categoryData.map((category) => {
			const { name } = category;

			return (
				<Category
					key={name}
					text={name}
					className="cursor-pointer"
					onClick={() => handleCategoryClick(name)}
					selected={selectedCategories.includes(name)}
				/>
			);
		});

		// when no categories are selected, show all recipes
		// when one or more categories are selected, show only recipes for those categories
		recipes = selectedCategories.length ? getFilteredRecipes(categoryData) : getAllRecipes(categoryData);
	}

	/**
	 * -----------------------------
	 * Functions
	 * -----------------------------
	 */

	function getAllRecipes(data) {
		return data.map((category) => {
			const { recipes } = category;

			return recipes.map((recipe) => {
				const { id, name } = recipe;

				return (
					<div key={id} onClick={() => viewRecipe(recipe)} className="cursor-pointer">
						<div>{name}</div>
					</div>
				);
			});
		});
	}

	/**
	 *
	 * @param {object} data Data by category
	 */
	function getFilteredRecipes(data) {
		const filtered = data.filter((category) => selectedCategories.includes(category.name));

		return getAllRecipes(filtered);
	}

	function formatDataForCategories(recipeData) {
		// Get all unique category values (e.g. "breakfast", "dessert", etc.) and flatten the 2D array
		const uniqueCategories = union(recipeData.map((recipe) => recipe.category).flat());

		// Create a category-focused view of the data
		return uniqueCategories.map((category) => {
			return {
				name: category,
				recipes: filter(recipeData, (r) => r.category.includes(category))
			};
		});
	}

	function handleCategoryClick(category) {
		dispatch(toggleCategory(category));
	}

	function viewRecipe(recipe) {
		dispatch(setRecipe(recipe));
	}

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
				<div>{categories}</div>
				<div className="text-lg mt-8">Recipes</div>
				<div>{recipes}</div>
			</div>
		</PerfectScrollbar>
	);
}

export default Find;
