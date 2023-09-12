import { string } from 'prop-types';
import cogiLogo from '@/assets/cogiLogo.png';

CogiLogo.propTypes = {
	width: string,
};

function CogiLogo({ width = 'w-72' }) {
	return (
		<img
			className={`${width}`}
			src={cogiLogo}
			alt="방탈러로고 - 웰시코기"
			aria-hidden
		/>
	);
}

export default CogiLogo;
