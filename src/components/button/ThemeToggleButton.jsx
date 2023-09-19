import { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';

function ThemeToggleButton() {
	const { theme, toggleTheme } = useContext(ThemeContext);

	return (
		<button
			onClick={toggleTheme}
			className={`w-12 h-6 rounded-full flex items-center justify-center text-white font-bold text-xl shadow ${
				theme === 'dark' ? 'bg-dark-ec4' : 'bg-light-ec4'
			}`}
		>
			{theme === 'dark' ? '🌞' : '🌚'}
		</button>
	);
}

export default ThemeToggleButton;
