function Button({ type = 'button', onClick, className, children }) {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`${className} bg-amber-300 py-2 px-4 rounded-md shadow-md hover:bg-amber-400 focus:outline-none focus:ring focus:ring-opacity-30 focus:ring-amber-400`}
		>
			{children}
		</button>
	);
}

export default Button;
