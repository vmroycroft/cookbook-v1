import CategoryList from '../../components/CategoryList';
import Ingredients from './Ingredients';
import Directions from './Directions';

function Recipe({ id, name, category, ingredients, directions }) {
	return (
		<>
			<h2>{name}</h2>
			<CategoryList categories={category} />
			<Ingredients ingredients={ingredients} />
			<Directions directions={directions} />
		</>
	);
}

export default Recipe;
