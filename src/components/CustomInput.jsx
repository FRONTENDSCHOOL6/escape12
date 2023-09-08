import { string } from 'prop-types';

CustomInput.propTypes = {
	type: string,
	name: string,
	children: string,
	className: string, // className prop type 추가
};

function CustomInput({ children, type, name, className }) {
	return (
		<>
			<fieldset className="flex justify-between">
				<label htmlFor={name} className="text-ec4">
					{children}
				</label>
				<input
					type={type}
					className={`w-[400px] ${className}`} // 이름 추가
					name={name}
					id={name}
				/>
			</fieldset>
		</>
	);
}

export default CustomInput;
