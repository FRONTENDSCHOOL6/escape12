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
	text = 'text-ec4',
	onClick = null,
}) {
	return (
		<button
			type={type}
			className={`${text} ${bg} min-w-fit rounded-lg px-2 font-semibold whitespace-nowrap s:px-0.5 transition-transform ease-in-out transform hover:scale-105 hover:bg-ec5`}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default SmallButton;
