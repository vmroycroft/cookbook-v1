function Button({ type = 'button', onClick, className, children }) {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`${className} bg-blue-gray-700 uppercase text-xs text-white p-2 shadow-md hover:bg-blue-gray-600 focus:outline-none focus:ring focus:ring-opacity-30 focus:ring-blue-gray-700`}
		>
			{children}
		</button>
	);
}

export default Button;
