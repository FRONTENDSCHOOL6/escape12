import { string } from 'prop-types';

CustomInput.propTypes = {
	type: string,
	name: string,
	children: string,
	className: string,

function CustomInput({ children, type, name, className }) {
	return (
		<>
			<fieldset className="flex justify-between text-ec1">
				<label htmlFor={name} className="text-ec4">
					{children}
				</label>
				<input
					type={type}
					placeholder="댓글을 입력하세요😀"
					className={`w-[320px] ${className}`}
					name={name}
					id={name}
				/>
			</fieldset>
		</>
	);
}

export default CustomInput;
