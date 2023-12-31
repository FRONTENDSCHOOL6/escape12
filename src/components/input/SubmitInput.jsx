import { string, func } from 'prop-types';
import SmallButton from '../button/SmallButton';

SubmitInput.propTypes = {
	placeholder: string,
	children: string,
	value: string,
	onChange: func,
	type: string,
	text: string,
	onSubmit: func,
};

function SubmitInput({
	placeholder,
	children,
	type = 'text',
	value = '',
	onChange,
	text = '',
	onSubmit = null,
}) {
	return (
		<form
			onSubmit={onSubmit}
			className={`flex gap-4 w-full justify-center text-lg pb-4 ${text}`}
		>
			<input
				autoComplete="off"
				type={type}
				name="comment"
				placeholder={placeholder}
				onChange={onChange}
				maxLength={35}
				value={value}
				required
				className="px-3 py-1 grow rounded-full focus:outline-none"
			/>
			<SmallButton type="submit">{children}</SmallButton>
		</form>
	);
}

export default SubmitInput;
