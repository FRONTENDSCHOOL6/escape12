import { string, func } from 'prop-types';

SmallButton.propTypes = {
	type: string,
	children: string,
	bg: string,
	text: string,
	onClick: func,
};
function SmallButton({
	type = 'button',
	children,
	bg = 'bg-ec1',
	text = '',
	onClick = null,
}) {
	return (
		<button
			type={type}
			className={`${text} ${bg} min-w-fit rounded-lg px-2 font-semibold  bg-light-ec4 dark:bg-dark-ec1 text-light-ec1 dark:text-dark-ec4 whitespace-nowrap s:px-1`}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default SmallButton;
