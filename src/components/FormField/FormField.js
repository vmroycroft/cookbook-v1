import { Field, ErrorMessage } from 'formik';
import camelCase from 'lodash/camelCase';

function FormField({ label, as, children }) {
	const fieldName = camelCase(label);

	let field;
	if (!children) {
		if (!as) field = <Field type="text" name={fieldName} className="block w-full" />;
		else {
			if (as === 'textarea') field = <Field as="textarea" name={fieldName} rows="5" className="block w-full" />;
		}
	} else {
		// TODO This assumes any field with children is a select, make this more generic
		field = (
			<Field as="select" name={fieldName} className="block w-full">
				{children}
			</Field>
		);
	}

	return (
		<div className="mb-4">
			<label htmlFor={fieldName} className="mb-2 inline-block">
				{label}
			</label>
			<ErrorMessage name={fieldName} component="span" className="text-red-700 text-xs ml-4" />
			{field}
		</div>
	);
}

export default FormField;
