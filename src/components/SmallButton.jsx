import { string } from 'prop-types';

SmallButton.propTypes = {
	children: string,
	bg: string,
	text: string,
};
function SmallButton({ children, bg = 'bg-ec1', text = 'text-ec4' }) {
	return (
		<button
			type="button"
			className={`${text} ${bg} min-w-fit rounded-lg px-2 font-semibold leading-7 whitespace-nowrap s:px-1`}
		>
			{children}
		</button>
	);
}

export default SmallButton;
