import { string } from 'prop-types';
import { Link } from 'react-router-dom';

PlusButton.propTypes = {
	path: string,
};

function PlusButton({ path }) {
	return (
		<Link to={path}>
			<button
				type="button"
				className="text-center bg-ec1 text-ec3 rounded-full text-6xl font-semibold  pb-2 px-1 hover:bg-ec3 hover:text-ec1"
			>
				＋
			</button>
		</Link>
	);
}

export default PlusButton;
