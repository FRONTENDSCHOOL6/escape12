import { string, func } from 'prop-types';

LoginSeleteButton.propTypes = {
	children: string,
	line: string,
	text: string,
	img: string,
	onClick: func,
};

function LoginSeleteButton({ children, line, text, img, onClick = null }) {
	const buttonLeft = {
		backgroundPosition: '10% 50%',
	};

	return (
		<button
			type="button"
			onClick={onClick}
			className={`text-center rounded-3xl border-2 ${line} font-semibold ${text} px-32 s:px-24 py-3 ${img} bg-no-repeat`}
			style={buttonLeft}
		>
			{children}
		</button>
	);
}

export default LoginSeleteButton;
