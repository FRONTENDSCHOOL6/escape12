import { Link } from 'react-router-dom';
import { string } from 'prop-types';
import { string } from 'prop-types';

Button.propTypes = {
	path: string.isRequired,
	children: string.isRequired,
};

function Button({ path, children }) {
	return (
		<Link to={path}>
			<button
				type="button"
				className="text-center rounded-lg bg-ec3 text-ec1 w-32 h-8 font-semibold text-sm"
			>
				{children}
			</button>
		</Link>
	);
}

export default Button;
