import { string } from 'prop-types';

Button.propTypes = {
	type: string,
	bg: string,
	text: string,
	children: string,
};

function Button({ type = 'button', bg = 'bg-ec3', text = 'bg-ec1', children }) {
	return (
		<button
			type={type}
			className={`text-center rounded-lg ${bg} ${text} w-32 h-8 font-semibold`}
		>
			{children}
		</button>
	);
}

export default Button;
