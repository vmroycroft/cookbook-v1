import { gql } from '@apollo/client';

const ADD_RECIPE = gql`
	mutation AddRecipe($name: String!, $category: [String]!, $ingredients: String!, $directions: String!) {
		addRecipe(name: $name, category: $category, ingredients: $ingredients, directions: $directions) {
			success
			message
			recipe {
				id
				name
				category
				ingredients
				directions
			}
		}
	}
`;

export default ADD_RECIPE;
