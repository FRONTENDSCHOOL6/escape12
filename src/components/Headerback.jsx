import { string, func } from 'prop-types';

Headerback.propTypes = {
	children: string,
	onClick: func,
};

function Headerback({ onClick = '', children }) {
	return (
		<header className="max-w-[600px] min-w-[320px] m-auto fixed top-0 left-0 right-0 py-3 text-center bg-ec4 text-ec1 text-2xl font-bold z-10">
			<div className="max-w-screen-md mx-auto flex items-center">
				<button className="ml-2" onClick={onClick}>
					&lt;
				</button>
				<div className="mx-auto flex-grow">{children}</div>
			</div>
		</header>
	);
}

export default Headerback;
