function Toggle({ className, onClick, selected, children }) {
	let conditionalClasses;

	if (selected) {
		conditionalClasses = 'bg-blue-gray-700 text-white hover:bg-blue-gray-600 hover:border-blue-gray-600';
	} else {
		conditionalClasses = 'bg-white text-blue-gray-700 hover:bg-blue-gray-200';
	}

	return (
		<button
			type="button"
			onClick={onClick}
			className={`${className} ${conditionalClasses} border-2 border-blue-gray-700 uppercase text-xs p-2 shadow-md focus:outline-none focus:ring focus:ring-opacity-30 focus:ring-blue-gray-700`}
		>
			{children}
		</button>
	);
}

export default Toggle;
