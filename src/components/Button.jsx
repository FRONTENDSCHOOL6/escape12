import { Link } from 'react-router-dom';
import { string } from 'prop-types';

Button.propTypes = {
	path: string,
	type: string,
	bg: string,
	text: string,
	children: string,
};

function Button({
	path = '',
	type = 'button',
	bg = 'bg-ec3',
	text = 'bg-ec1',
	children,
}) {
	return (
		<Link to={path}>
			<button
				type={type}
				className={`text-center rounded-lg ${bg} ${text} w-32 h-8 font-semibold`}
			>
				{children}
			</button>
		</Link>
	);
}

export default Button;
