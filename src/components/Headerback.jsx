import { string, func } from 'prop-types';

Headerback.propTypes = {
	children: string,
	onClick: func,
};

function Headerback({ onClick = '', children }) {
	return (
		<div>
			<header className="py-3 text-center bg-ec4 text-ec1 text-2xl font-bold leading-2">
				<div className="max-w-screen-md mx-auto flex items-center">
					<button className="ml-2" onClick={onClick}>
						&lt;
					</button>
					<div className="mx-auto flex-grow">{children}</div>
				</div>
			</header>
		</div>
	);
}

export default Headerback;
