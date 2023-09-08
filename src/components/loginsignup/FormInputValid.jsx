import { string } from 'prop-types';

FormInputValid.propTypes = {
	children: string,
	color: string,
};
function FormInputValid({ children, color }) {
	return <p className={`${color} text-right h-6`}>{children}</p>;
}

export default FormInputValid;
