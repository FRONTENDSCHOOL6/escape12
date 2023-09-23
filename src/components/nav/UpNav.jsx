import talk from '@/assets/plusbutton-talk.png';
import dark from '@/assets/plusbutton-talkDark.png';
import top from '@/assets/plusbutton-top.png';
import { ThemeContext } from '@/contexts/ThemeContext';
import { func, string } from 'prop-types';
import { useContext } from 'react';
import PlusButton from '../button/PlusButton';
import Nav from './Nav';

UpNav.propTypes = {
	topClick: func,
	hidden: string,
	talkClick: func,
};

function UpNav({ topClick, hidden, talkClick }) {
	const { theme } = useContext(ThemeContext);

	return (
		<div className="m-auto fixed bottom-0 left-0 right-0 max-w-[600px] min-w-[320px]">
			<PlusButton
				onClick={topClick}
				src={top}
				alt="위로가기"
				hidden={hidden}
				location="right-4 bottom-40"
			/>
			<PlusButton
				onClick={talkClick}
				src={theme === 'dark' ? talk : dark}
				alt="채팅하기"
				location="right-4 bottom-24"
			/>
			<Nav />
		</div>
	);
}

export default UpNav;
