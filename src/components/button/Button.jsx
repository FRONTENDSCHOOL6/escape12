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
			className={`text-center rounded-lg ${bg} ${text} px-8 h-8 font-semibold shadow-xl dark:shadow-darkMode bg-light-ec4 dark:bg-dark-ec4 text-light-ec1 dark:text-dark-ec1`}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default Button;
