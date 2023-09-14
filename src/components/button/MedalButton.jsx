import medal from '@/assets/theme-medal.png';
import { string } from 'prop-types';

MedalButton.propTypes = {
	theme: string,
};

function MedalButton({ theme }) {
	return (
		<img className="h-[28px] m-auto" src={medal} alt={`${theme} 클리어 인증`} />
	);
}

export default MedalButton;
