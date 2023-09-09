import { object, string } from 'prop-types';

PlusButton.propTypes = {
	onClick: object,
	src: object,
	alt: string,
	location: string,
	hidden: string,
};

function PlusButton({ onClick, src, alt, location, hidden = '' }) {
	return (
		<button
			type="button"
			className={`s:w-14 w-16 text-center bg-ec1 rounded-full text-6xl font-semibold p-1 absolute ${location} ${hidden}`}
			onClick={onClick}
		>
			<img src={src} alt={alt} aria-hidden />
		</button>
	);
}

export default PlusButton;
