import { string } from 'prop-types';


Headerback.propTypes = {
  children: string.isRequired,
};

function Headerback({ children }) {
  return (
    <div>
      <header className="max-w-[600px] py-3 text-center bg-ec4 text-ec1 text-3xl font-bold relative flex items-center">
        <button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer">⭐</button>
        <div className="mx-auto">{children}</div>
      </header>
    </div>
  );
}



export default Headerback;