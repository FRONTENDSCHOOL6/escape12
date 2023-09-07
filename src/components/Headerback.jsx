import { string } from 'prop-types';
import { Link } from 'react-router-dom';

Headerback.propTypes = {
  path: string.isRequired,
  children: string.isRequired,
};

function Headerback({ path = "", children }) {
  return (
    <div>
      <header className="py-3 text-center bg-ec4 text-ec1 text-2xl sm:text-xl font-bold leading-2">
        <div className="relative">
          <Link to={path}>
            <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer">&lt;</button>
          </Link>
          <div className="mx-auto max-w-screen-md">{children}</div>
        </div>
      </header>
    </div>
  );
}

export default Headerback;