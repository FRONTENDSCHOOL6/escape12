import { string } from 'prop-types';

FormInputValid.propTypes = {
	children: string,
	color: string,
	id: string.isRequired,
};
function FormInputValid({ children, color, id = '' }) {
	return (
		<p className={`${color} text-right h-6 s:text-sm`} id={id}>
			{children}
		</p>
	);
}

export default FormInputValid;
