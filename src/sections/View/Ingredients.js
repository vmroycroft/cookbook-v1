import { useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';

/**
 * TODO Why doesn't the 'Copied!' message go away after clicking on a different recipe?
 */
function Ingredients({ ingredients }) {
	const [copied, setCopied] = useState(false);

	function copy() {
		navigator.clipboard.writeText(ingredients).then(() => setCopied(true));
	}

	return (
		<div className="mt-4">
			<h3>
				Ingredients
				<FaRegCopy title="Copy" className="cursor-pointer inline-block ml-2" onClick={copy}>
					Copy
				</FaRegCopy>
				{copied && <span className="text-xs ml-2 text-green-600">Copied!</span>}
			</h3>
			<div className="whitespace-pre-wrap">{ingredients}</div>
		</div>
	);
}

export default Ingredients;
