import { useSelector } from 'react-redux';
// import PerfectScrollbar from 'react-perfect-scrollbar';

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
		// <PerfectScrollbar>
		<div className="h-full overflow-y-scroll overflow-x-auto p-2 border-2 border-teal-500">
			<SectionTitle text="View" color="teal-500" />
			<div className="p-4">{content}</div>
		</div>
		// </PerfectScrollbar>
	);
}

export default View;
