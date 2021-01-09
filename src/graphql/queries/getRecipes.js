import { gql } from '@apollo/client';

const GET_RECIPES = gql`
	query GetRecipes {
		recipes {
			id
			name
			category
			ingredients
			directions
		}
	}
`;

export default GET_RECIPES;
