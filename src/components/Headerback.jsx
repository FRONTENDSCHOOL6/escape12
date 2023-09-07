import { string } from 'prop-types';
import { Link } from 'react-router-dom';

Headerback.propTypes = {
  path: string,
  children: string,
};

function Headerback({ path = "", children }) {
  return (
    <div>
      <header className="py-3 text-center bg-ec4 text-ec1 text-2xl sm:text-xl font-bold leading-2">
        <div className="absolute left-4 top-7 mx-auto max-w-screen-md flex">
          <Link to={path}>
            <button className='transform -translate-y-1/2 bg-transparent border-none '>
              &lt;
            </button>
          </Link>
          <div className="mx-auto">{children}</div>
        </div>
      </header>
    </div>
  );
}

export default Headerback;
