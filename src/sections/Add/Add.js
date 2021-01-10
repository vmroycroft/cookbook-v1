import { useMutation } from '@apollo/client';
import { Formik, Form } from 'formik';
import PerfectScrollbar from 'react-perfect-scrollbar';

import SectionTitle from '../../components/SectionTitle';
import Button from '../../components/Button';
import FormField from '../../components/FormField';

import ADD_RECIPE from '../../graphql/mutations/addRecipe';

function Add() {
	const [addRecipe] = useMutation(ADD_RECIPE);

	const initialValues = { name: '', author: '', category: '', ingredients: '', directions: '' };

	function validate(values) {
		const errors = {};

		if (!values.name) errors.name = 'Please enter a name for your recipe';
		if (!values.author) errors.author = 'Please enter an author for your recipe';
		if (!values.category) errors.category = 'Please select a category for your recipe';
		if (!values.ingredients) errors.ingredients = 'Please enter ingredients for your recipe';
		if (!values.directions) errors.directions = 'Please enter directions for your recipe';

		return errors;
	}

	/**
	 *
	 * @param {*} values Form values passed from Formik
	 * @param {*} actions Form actions passed from Formik
	 */
	function onSubmit(values, actions) {
		// addRecipe expects name, author, category, ingredients, directions
		addRecipe({ variables: { ...values } });

		actions.resetForm();
		actions.setStatus('Your recipe has been added!');
	}

	return (
		<PerfectScrollbar className="h-screen bg-fuchsia-200">
			<SectionTitle text="Add a recipe" bg="bg-fuchsia-300" />
			<div className="p-4">
				<Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
					{({ isSubmitting, status }) => (
						<Form>
							<FormField label="Name" />
							<FormField label="Author" />
							<FormField label="Category">
								<option value="">Select a category</option>
								<option value="dessert">Dessert</option>
								<option value="breakfast">Breakfast</option>
								<option value="dinner">Dinner</option>
							</FormField>
							<FormField as="textarea" label="Ingredients" />
							<FormField as="textarea" label="Directions" />
							<Button type="submit" disabled={isSubmitting}>
								Add recipe
							</Button>
							<span className="ml-4 text-green-600">{status}</span>
						</Form>
					)}
				</Formik>
			</div>
		</PerfectScrollbar>
	);
}

export default Add;
