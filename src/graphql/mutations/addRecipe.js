import { gql } from '@apollo/client';

const ADD_RECIPE = gql`
	mutation AddRecipe(
		$name: String!
		$author: String!
		$category: [String]!
		$ingredients: String!
		$directions: String!
	) {
		addRecipe(name: $name, author: $author, category: $category, ingredients: $ingredients, directions: $directions) {
			success
			message
			recipe {
				id
				name
				author
				category
				ingredients
				directions
			}
		}
	}
`;

export default ADD_RECIPE;
