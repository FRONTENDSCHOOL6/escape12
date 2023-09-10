import { string } from 'prop-types';
import notCogi from '@/assets/notCogi.png';

NotCogi.propTypes = {
	width: string,
};

function NotCogi({ width = 'w-72' }) {
	return (
		<img className={`${width}`} src={notCogi} alt="게시글없음" aria-hidden />
	);
}

export default NotCogi;
