import { useMutation } from '@apollo/client';
import { Formik, Form } from 'formik';
import PerfectScrollbar from 'react-perfect-scrollbar';

import SectionTitle from '../../components/SectionTitle';
import Button from '../../components/Button';
import FormField from '../../components/FormField';

import ADD_RECIPE from '../../graphql/mutations/addRecipe';

function Add() {
	const [addRecipe] = useMutation(ADD_RECIPE);

	const initialValues = { recipeName: '', category: '', ingredients: '', directions: '' };

	function validate(values) {
		const errors = {};

		if (!values.recipeName) errors.recipeName = 'Please enter a name for your recipe';
		if (!values.category) errors.category = 'Please select a category for your recipe';
		if (!values.ingredients) errors.ingredients = 'Please enter ingredients for your recipe';
		if (!values.directions) errors.directions = 'Please enter directions for your recipe';

		return errors;
	}

	function onSubmit(values) {
		// addRecipe expects recipeName, category, ingredients, directions
		addRecipe({ variables: { ...values } });
	}

	return (
		<PerfectScrollbar className="h-screen bg-fuchsia-200">
			<SectionTitle text="Add a recipe" bg="bg-fuchsia-300" />
			<div className="p-4">
				<Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
					<Form>
						<FormField label="Recipe name" />
						<FormField label="Category">
							<option value="">Select a category</option>
							<option value="dessert">Dessert</option>
							<option value="breakfast">Breakfast</option>
							<option value="dinner">Dinner</option>
						</FormField>
						<FormField as="textarea" label="Ingredients" />
						<FormField as="textarea" label="Directions" />
						<Button type="submit">Add recipe</Button>
					</Form>
				</Formik>
			</div>
		</PerfectScrollbar>
	);
}

export default Add;
