import { string } from 'prop-types';
import notCogi from '@/assets/notCogi.png';

NotCogi.propTypes = {
	width: string,
	alt: string,
};

function NotCogi({ width = 'w-72', alt = '' }) {
	return <img className={`${width}`} src={notCogi} alt={alt} aria-hidden />;
}

export default NotCogi;
