import { string, func } from 'prop-types';

Button.propTypes = {
	type: string,
	bg: string,
	text: string,
	children: string,
	onClick: func,
};

function Button({
	type = 'button',
	bg = 'bg-ec3',
	text = 'bg-ec1',
	onClick = null,
	children,
}) {
	return (
		<button
			type={type}
			className={`text-center rounded-lg ${bg} ${text} px-8 h-8 font-semibold`}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default Button;
