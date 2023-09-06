import { string, func } from 'prop-types';

LoginSeleteButton.propTypes = {
	children: string.isRequired,
	line: string.isRequired,
	text: string.isRequired,
	img: string.isRequired,
	onClick: func,
};

function LoginSeleteButton({ children, line, text, img, onClick = '' }) {
	const buttonLeft = {
		backgroundPosition: '10% 50%',
	};

	return (
		<button
			type="button"
			onClick={onClick}
			className={`text-center rounded-3xl border-2 ${line} font-semibold ${text} px-32 py-3 ${img} bg-no-repeat`}
			style={buttonLeft}
		>
			{children}
		</button>
	);
}

export default LoginSeleteButton;
