function Directions({ directions }) {
	return (
		<div className="mt-4">
			<div className="text-2xl text-teal-500 uppercase">Directions</div>
			<div className="whitespace-pre-wrap">{directions}</div>
		</div>
	);
}

export default Directions;
