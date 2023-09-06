import { string } from 'prop-types';

Header.propTypes = {
  children: string.isRequired,
};

function Header({ children }) {
  return (
    <header className="max-w-[600px] py-3 text-center bg-ec2 text-ec1 text-3xl font-bold flex justify-center items-center">
      {children}
    </header>
  );
}

export default Header;