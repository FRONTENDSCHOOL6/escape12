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
			className={`${text} ${bg} min-w-fit w-[20%] rounded-lg px-2 font-semibold leading-7 whitespace-nowrap s:px-1`}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default SmallButton;
