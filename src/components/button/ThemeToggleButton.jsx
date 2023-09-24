import { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import offImage from '@/assets/header-lightoff.png';
import onImage from '@/assets/header-lighton.png';

function ThemeToggleButton() {
	const { theme, toggleTheme } = useContext(ThemeContext);

	return (
		<div className="flex justify-center">
			<button
				onClick={toggleTheme}
				className={`ml-2 w-12 h-6 rounded-full flex items-center justify-center text-white font-bold text-xl ${theme === 'dark' ? 'bg-dark-ec1' : 'bg-light-ec4'}`}>
				{theme === 'dark' ? (
					<img src={onImage}
						alt="lightmode"
						className="w-6 h-6"
					/>
				) : (
					<img src={offImage}
						alt="darkmode"
						className="w-6 h-6"
					/>
				)}
			</button>
		</div>
	);
}

export default ThemeToggleButton;