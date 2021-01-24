import Ingredients from './Ingredients';
import Directions from './Directions';

function Recipe({ id, name, author, category, ingredients, directions }) {
	return (
		<>
			<h2 className="text-2xl mb-1">{name}</h2>
			<div className="text-teal-500 text-xs uppercase">by {author}</div>
			<Ingredients ingredients={ingredients} />
			<Directions directions={directions} />
		</>
	);
}

export default Recipe;
