import { string, func } from 'prop-types';

FormInput.propTypes = {
	type: string,
	name: string,
	children: string,
	onChange: func,
};

function FormInput({ children, type, name, onChange = null, ...restProps }) {
	return (
		<>
			<fieldset className="flex gap-5 justify-between">
				<label htmlFor={name} className="text-ec1 w-32">
					{children}
				</label>
				<input
					type={type}
					className="w-[300px] pl-2"
					name={name}
					id={name}
					onChange={onChange}
					required
					{...restProps}
				/>
			</fieldset>
		</>
	);
}

export default FormInput;
