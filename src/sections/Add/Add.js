import { useMutation, useQuery } from '@apollo/client';
import { ErrorMessage, Formik, Form } from 'formik';
import PerfectScrollbar from 'react-perfect-scrollbar';

import SectionTitle from '../../components/SectionTitle';
import Button from '../../components/Button';
import FormField from '../../components/FormField';

import ADD_RECIPE from '../../graphql/mutations/addRecipe';
import GET_CATEGORIES from '../../graphql/queries/getCategories';

function Add() {
	/**
	 * -----------------------------
	 * GraphQL
	 * -----------------------------
	 */

	const [addRecipe] = useMutation(ADD_RECIPE);

	const { loading, error, data } = useQuery(GET_CATEGORIES, { pollInterval: 500 });

	let categories;

	if (data) {
		const categoryData = data.categories;

		const extraCategories = [
			{ name: 'lunch' },
			{ name: 'beverages' },
			{ name: 'appetizers' },
			{ name: 'soups' },
			{ name: 'salads' },
			{ name: 'beef' },
			{ name: 'poultry' },
			{ name: 'pork' },
			{ name: 'seafood' },
			{ name: 'vegetarian' },
			{ name: 'sides' },
			{ name: 'bread' },
			{ name: 'slow cooker' },
			{ name: 'sandwiches' }
		];

		categories = [...categoryData, ...extraCategories].map((category) => {
			const { name } = category;

			return <FormField key={name} type="checkbox" label={name} />;
		});
	}

	/**
	 * -----------------------------
	 * Variables
	 * -----------------------------
	 */

	const initialValues = { name: '', author: '', category: '', ingredients: '', directions: '' };

	/**
	 * -----------------------------
	 * Functions
	 * -----------------------------
	 */

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

	function validate(values) {
		const errors = {};

		if (!values.name) errors.name = 'Please enter a name for your recipe';
		if (!values.author) errors.author = 'Please enter an author for your recipe';
		if (!values.category) errors.category = 'Please select at least one category for your recipe';
		if (!values.ingredients) errors.ingredients = 'Please enter ingredients for your recipe';
		if (!values.directions) errors.directions = 'Please enter directions for your recipe';

		return errors;
	}

	/**
	 * -----------------------------
	 * JSX
	 * -----------------------------
	 */

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<PerfectScrollbar className="h-screen bg-fuchsia-200">
			<SectionTitle text="Add a recipe" bg="bg-fuchsia-300" />
			<div className="p-4">
				<Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
					{({ isSubmitting, status }) => (
						<Form>
							<FormField type="text" label="Name" />
							<FormField type="text" label="Author" />
							<div className="mb-4">
								<span>Category</span>
								<ErrorMessage name="category" component="span" className="text-red-700 text-xs ml-4" />
								<div className="mt-2 flex flex-wrap">{categories}</div>
							</div>
							<FormField type="textarea" label="Ingredients" />
							<FormField type="textarea" label="Directions" />
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
