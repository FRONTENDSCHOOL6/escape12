import { string } from 'prop-types';

Header.propTypes = {
  children: string,
};

function Header({ children }) {
  return (
    <header className='py-3 text-center bg-ec4 text-ec1 text-2xl font-bold leading-2'>
      {children}
    </header>
  );
}

export default Header;