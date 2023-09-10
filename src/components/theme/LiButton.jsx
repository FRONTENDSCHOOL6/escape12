import { func, string } from 'prop-types';

LiButton.propTypes = {
	onClick: func,
	children: string,
};

function LiButton({ onClick, children }) {
	return (
		<button type="button" onClick={onClick}>
			{children}
		</button>
	);
}

export default LiButton;