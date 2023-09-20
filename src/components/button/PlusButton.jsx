import { Tooltip } from '@mui/material';
import { func, string } from 'prop-types';

PlusButton.propTypes = {
	onClick: func,
	src: string,
	alt: string,
	location: string,
	hidden: string,
};

function PlusButton({ onClick, src, alt, location, hidden = {} }) {
	return (
		<Tooltip title={`${alt}` === '위로가기' ? '' : '기록하기'} arrow>
			<button
				type="button"
				className={`s:w-14 w-14 h-14 flex items-center justify-center ${
					alt === '위로가기' ? 'bg-light-ec4 dark:bg-dark-ec1' : ''
				} border-1 rounded-full text-6xl font-semibold absolute ${location} ${hidden}`}
				onClick={onClick}
			>
				<img className="w-8" src={src} alt={alt} aria-hidden />
			</button>
		</Tooltip>
	);
}

export default PlusButton;
