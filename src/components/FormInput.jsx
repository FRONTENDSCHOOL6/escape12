import { string } from 'prop-types';

FormInput.propTypes = {
	type: string.isRequired,
	name: string.isRequired,
	children: string.isRequired,
};

function FormInput({ children, type, name }) {
	return (
		<>
			<fieldset className="flex gap-5 justify-between">
				<label htmlFor={name} className="text-ec1">
					{children}
				</label>
				<input type={type} className="w-[300px]" name={name} id={name} />
			</fieldset>
		</>
	);
}

export default FormInput;
