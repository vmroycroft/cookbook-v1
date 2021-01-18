import { Field, ErrorMessage } from 'formik';
import camelCase from 'lodash/camelCase';

function FormField({ label, type }) {
	const fieldName = camelCase(label);

	let formField;
	switch (type) {
		case 'checkbox':
			formField = (
				<>
					<label className="mr-4">
						<Field className="mr-1" type="checkbox" name="category" value={label} />
						{label}
					</label>
				</>
			);
			break;

		case 'text':
			formField = (
				<div className="mb-4">
					<label htmlFor={fieldName} className="mb-2 inline-block">
						{label}
					</label>
					<ErrorMessage name={fieldName} component="span" className="text-red-700 text-xs ml-4" />
					<Field type="text" name={fieldName} className="block w-full" />
				</div>
			);
			break;

		case 'textarea':
			formField = (
				<div className="mb-4">
					<label htmlFor={fieldName} className="mb-2 inline-block">
						{label}
					</label>
					<ErrorMessage name={fieldName} component="span" className="text-red-700 text-xs ml-4" />
					<Field as="textarea" name={fieldName} rows="5" className="block w-full" />
				</div>
			);
			break;

		default:
			console.log('Unsupported FormField type', type);
	}

	return formField;
}

export default FormField;
