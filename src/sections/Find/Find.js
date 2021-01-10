import { useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { updateCurrentRecipe } from '../../recipeSlice';

import SectionTitle from '../../components/SectionTitle';
import CategoryList from '../../components/CategoryList';

import GET_RECIPES from '../../graphql/queries/getRecipes';

function Find() {
	const dispatch = useDispatch();

	/**
	 * -----------------------------
	 * GraphQL
	 * -----------------------------
	 */

	const { loading, error, data } = useQuery(GET_RECIPES, { pollInterval: 500 });
	let recipes = [];
	if (data) {
		recipes = data.recipes.map((recipe) => {
			const { id, name, category } = recipe;

			return (
				<div key={id} onClick={() => viewRecipe(recipe)} className="cursor-pointer mb-4">
					<div>{name}</div>
					<CategoryList categories={category} />
				</div>
			);
		});
	}

	/**
	 * -----------------------------
	 * Functions
	 * -----------------------------
	 */

	function viewRecipe(recipe) {
		dispatch(updateCurrentRecipe(recipe));
	}

	/**
	 * -----------------------------
	 * JSX
	 * -----------------------------
	 */

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<div className="h-screen bg-lime-200">
			<SectionTitle text="Find a recipe" bg="bg-lime-300" />
			<div className="p-4">{recipes}</div>
		</div>
	);
}

export default Find;
