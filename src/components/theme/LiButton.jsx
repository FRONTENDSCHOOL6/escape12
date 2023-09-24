import { func, string } from 'prop-types';

LiButton.propTypes = {
	onClick: func,
	children: string,
	text: string,
};

function LiButton({ onClick, children, text }) {
	return (
		<button
			className={`hover:font-extrabold whitespace-nowrap ${text}`}
			type="button"
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default LiButton;
