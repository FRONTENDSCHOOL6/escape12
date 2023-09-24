import { string, func } from 'prop-types';
import { PropTypes } from 'prop-types';

SmallButton.propTypes = {
	type: string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
	bg: string,
	text: string,
	onClick: func,
	ariaLabel: string,
};
function SmallButton({
	type = 'button',
	children,
	bg = '',
	text = '',
	onClick = null,
	ariaLabel = '',
}) {
	return (
		<button
			aria-label={ariaLabel}
			type={type}
			className={`${text} ${bg} min-w-fit rounded-lg px-2 font-semibold  bg-light-ec4 dark:bg-dark-ec1 text-light-ec1 dark:text-dark-ec4 whitespace-nowrap s:px-1`}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default SmallButton;
