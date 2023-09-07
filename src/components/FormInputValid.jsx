import { string } from 'prop-types';

FormInputValid.propTypes = {
	children: string.isRequired,
};
function FormInputValid({ children }) {
	return <p className="text-red text-right">{children}</p>;
}

export default FormInputValid;
