function SectionTitle({ text, color }) {
	const bgColor = `bg-${color}`;
	const textColor = `text-${color}`;

	return (
		<h1 className={`${textColor} text-3xl font-serif mb-2`}>
			<span className={`${bgColor} px-1 text-white mr-1`}>{text}</span>
			<span>a recipe</span>
		</h1>
	);
}

export default SectionTitle;
