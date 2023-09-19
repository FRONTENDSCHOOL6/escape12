import { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';

function ThemeToggleButton() {
	const { theme, toggleTheme } = useContext(ThemeContext);

	return (
		<div className="flex justify-center">
			<button
				onClick={toggleTheme}
				className={`ml-2 w-12 h-6 rounded-full flex items-center justify-center text-white font-bold text-xl shadow ${theme === 'dark' ? 'bg-dark-ec1' : 'bg-light-ec4'
					}`}
			>
				{theme === 'dark' ? '🌞' : '🌚'}
			</button>
		</div>
	);
}

export default ThemeToggleButton;
