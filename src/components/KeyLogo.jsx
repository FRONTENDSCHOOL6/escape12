import { Link } from 'react-router-dom';
import key from '/public/keyLogo.png';
import { string } from 'prop-types';

KeyLogo.propTypes = {
	path: string,
};

function KeyLogo({ path = '' }) {
	return (
		<Link to={path} className="w-20 pt-[10%]">
			<img src={key} alt="방탈러 로고" aria-hidden />
		</Link>
	);
}

export default KeyLogo;
