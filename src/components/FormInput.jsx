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
			<fieldset className="flex gap-5 justify-between text-ec1">
				<label htmlFor={name} className="w-32 s:w-28">
					{children}
				</label>
				<input
					type={type}
					className="w-[300px] s:w-[200px] pl-2 bg-ec4 border-b-2 border-ec1 focus:outline-none webkit"
					name={name}
					id={name}
					onChange={onChange}
					required
					autoComplete="off"
					{...restProps}
				/>
			</fieldset>
		</>
	);
}

export default FormInput;
