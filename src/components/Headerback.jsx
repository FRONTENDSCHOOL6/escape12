import { string } from 'prop-types';


Headerback.propTypes = {
  children: string.isRequired,
};

function Headerback({ children }) {
  return (
    <div>
      <header className="max-w-[600px] min-w-[600px] py-3 text-center bg-ec4 text-ec1 text-2xl font-bold relative leading-2">
        <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer">&lt;</button>

        <div className="mx-auto">{children}</div>
      </header>
    </div>
  );
}



export default Headerback;