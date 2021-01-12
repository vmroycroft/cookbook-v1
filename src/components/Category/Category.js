import classNames from 'classnames';

function Category({ text, className, onClick, selected }) {
	const conditionalClasses = classNames({
		'bg-amber-300': selected
	});

	return (
		<span
			className={`${className} ${conditionalClasses} text-xs text-white border-2 border-amber-300 mr-2 rounded p-1`}
			onClick={onClick}
		>
			{text}
		</span>
	);
}

export default Category;
