import { string, func } from 'prop-types';

HeartButton.propTypes = {
	checked: string,
	onClick: func,
};

function HeartButton({ checked = 'bg-heartfalse', onClick = null }) {
	return (
		<button
			type="button"
			className={`w-6 h-6 absolute top-4 right-4 ${checked} bg-no-repeat bg-contain`}
			onClick={onClick}
		/>
	);
}

export default HeartButton;
