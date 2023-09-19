import { string } from 'prop-types';
import ThemeToggleButton from '../button/ThemeToggleButton';

Header.propTypes = {
	children: string,
};

function Header({ children }) {
	return (
		<header className="max-w-[600px] min-w-[320px] m-auto fixed top-0 left-0 right-0 py-3 text-center bg-light-ec1 dark:bg-dark-ec1 text-light-ec4 dark:text-dark-ec4 text-2xl font-bold z-10">
			{children}
			<ThemeToggleButton />
		</header>
	);
}

export default Header;
