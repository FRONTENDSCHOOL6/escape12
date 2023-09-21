import medal from '@/assets/theme-medal.png';
import { Tooltip } from '@mui/material';
import { string } from 'prop-types';

MedalButton.propTypes = {
	theme: string,
};

function MedalButton({ theme }) {
	return (
		<Tooltip title="기록보러가기" arrow>
			<img
				className="h-[28px] m-auto"
				src={medal}
				alt={`${theme} 클리어 인증`}
			/>
		</Tooltip>
	);
}

export default MedalButton;
