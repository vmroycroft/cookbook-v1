import { useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { getRecipe } from '../../state/recipeSlice';
import SectionTitle from '../../components/SectionTitle';
import Recipe from './Recipe';

function View() {
	const recipe = useSelector(getRecipe);

	let content;
	if (!recipe) content = <div>Select a recipe to view it</div>;
	else {
		content = <Recipe {...recipe} />;
	}

	return (
		<PerfectScrollbar className="h-screen bg-teal-200">
			<SectionTitle text="View a recipe" bg="bg-teal-300" />
			<div className="p-4">{content}</div>
		</PerfectScrollbar>
	);
}

export default View;
