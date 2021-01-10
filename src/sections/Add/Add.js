import { useMutation } from '@apollo/client';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import SectionTitle from '../../components/SectionTitle';

import ADD_RECIPE from '../../graphql/mutations/addRecipe';

function Add() {
	const [addRecipe] = useMutation(ADD_RECIPE);

	const initialValues = { name: '', category: '', ingredients: '', directions: '' };

	function validate(values) {
		const errors = {};

		if (!values.name) errors.name = 'Please enter a name for your recipe';
		if (!values.category) errors.category = 'Please select a category for your recipe';
		if (!values.ingredients) errors.ingredients = 'Please enter ingredients for your recipe';
		if (!values.directions) errors.directions = 'Please enter directions for your recipe';

		return errors;
	}

	function onSubmit(values) {
		// addRecipe expects name, category, ingredients, directions
		addRecipe({ variables: { ...values } });
	}

	return (
		<div className="h-screen bg-fuchsia-200">
			<SectionTitle text="Add a recipe" bg="bg-fuchsia-300" />
			<div className="p-4">
				<Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
					<Form>
						<div className="mb-4">
							<label htmlFor="name">Recipe name </label>
							<Field type="text" name="name" />
							<ErrorMessage name="name" component="div" />
						</div>
						<div className="mb-4">
							<label htmlFor="category">Category </label>
							<Field as="select" name="category">
								<option value="">Select a category</option>
								<option value="dessert">Dessert</option>
								<option value="breakfast">Breakfast</option>
								<option value="dinner">Dinner</option>
							</Field>
							<ErrorMessage name="category" component="div" />
						</div>
						<div className="mb-4">
							<label htmlFor="ingredients">Ingredients </label>
							<Field as="textarea" name="ingredients" />
							<ErrorMessage name="ingredients" component="div" />
						</div>
						<div className="mb-4">
							<label htmlFor="directions">Directions </label>
							<Field as="textarea" name="directions" />
							<ErrorMessage name="directions" component="div" />
						</div>
						<button type="submit">Add recipe</button>
					</Form>
				</Formik>
			</div>
		</div>
	);
}

export default Add;
