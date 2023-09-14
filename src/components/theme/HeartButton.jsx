import { string, func } from 'prop-types';

HeartButton.propTypes = {
	checked: string,
	onClick: func,
};

function HeartButton({ checked = 'bg-heartfalse', onClick = null }) {
	return (
		<button
			type="button"
			className={`w-6 h-6 absolute top-4 right-4 ${checked} bg-no-repeat bg-contain s:w-4 s:h-4`}
			onClick={onClick}
		/>
	);
}

export default HeartButton;
