import { useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { selectCurrentRecipe } from '../../recipeSlice';
import SectionTitle from '../../components/SectionTitle';
import Recipe from './Recipe';

function View() {
	const currentRecipe = useSelector(selectCurrentRecipe);

	let content;
	if (!currentRecipe) content = <div>Select a recipe to view it</div>;
	else {
		content = <Recipe {...currentRecipe} />;
	}

	return (
		<PerfectScrollbar className="h-screen bg-teal-200">
			<SectionTitle text="View a recipe" bg="bg-teal-300" />
			<div className="p-4">{content}</div>
		</PerfectScrollbar>
	);
}

export default View;
