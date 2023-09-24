import { string, func } from 'prop-types';

DeleteButton.propTypes = {
	type: string,
	children: string,
	bg: string,
	text: string,
	onClick: func,
};
function DeleteButton({
	type = 'button',
	children,
	bg = 'bg-ec1',
	text = 'text-ec4',
	onClick = null,
}) {
	return (
		<button
			type={type}
			className={`${text} ${bg} min-w-fit rounded-lg bg-light-ec4 dark:bg-dark-ec1 text-light-ec1 dark:text-dark-ec4 px-2 font-semibold whitespace-nowrap s:px-0.5 transition-transform ease-in-out transform hover:scale-105 hover:text-light-ec4 hover:bg-light-sweetred hover:dark:bg-dark-sweetred`}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default DeleteButton;
