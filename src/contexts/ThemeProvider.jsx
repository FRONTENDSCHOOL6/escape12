import { useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';
import PropTypes from 'prop-types';

export function ThemeProvider({ children }) {
	const initialTheme = window.localStorage.getItem('theme') || 'dark';

	const [theme, setTheme] = useState(initialTheme);

	const toggleTheme = () => {
		setTheme((prev) => {
			const newTheme = prev === 'dark' ? 'light' : 'dark';
			window.localStorage.setItem('theme', newTheme);
			return newTheme;
		});
	};

	useEffect(() => {
		if (theme === 'dark') {
			document.body.classList.add('dark');
			document.body.classList.remove('light');
		} else {
			document.body.classList.add('light');
			document.body.classList.remove('dark');
		}

		window.localStorage.setItem('theme', theme);
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

ThemeProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
