import { string } from 'prop-types';

Header.propTypes = {
  children: string.isRequired,
};

function Header({ children }) {
  return (
    <header className="max-w-[600px] min-w-[600px] py-3 text-center bg-ec4 text-ec1 text-2xl font-bold leading-2">
      {children}
    </header>
  );
}

export default Header;