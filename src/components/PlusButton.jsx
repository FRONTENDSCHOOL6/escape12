import pencil from '@/assets/plusbutton-pencil.png';
import { object } from 'prop-types';

PlusButton.propTypes = {
	onButtonClick: object,
};

function PlusButton(onButtonClick = {}) {
	return (
		<button
			type="button"
			className="s:w-14 w-16 text-center bg-ec1 rounded-full text-6xl font-semibold p-1 absolute right-4 bottom-20"
			onClick={onButtonClick}
		>
			<img src={pencil} alt="테마 기록하기" aria-hidden />
		</button>
	);
}

export default PlusButton;
