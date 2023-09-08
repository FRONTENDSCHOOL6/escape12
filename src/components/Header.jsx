import { string } from 'prop-types';

Header.propTypes = {
	children: string,
};

function Header({ children }) {
	return (
		<header className="max-w-[600px] min-w-[320px] m-auto fixed top-0 left-0 right-0 py-3 text-center bg-ec4 text-ec1 text-2xl font-bold z-10">
			{children}
		</header>
	);
}

export default Header;
