import FormInput from '../loginsignup/FormInput';
import { string } from 'prop-types';

ValueThemeStore.propTypes = {
	theme: string,
	store: string,
};

function ValueThemeStore({ theme, store }) {
	return (
		<>
			<FormInput
				name="theme"
				value={theme}
				maxLength="20"
				hidden="text-opacity"
			>
				테마명
			</FormInput>
			<FormInput
				name="store"
				value={store}
				maxLength="20"
				hidden="text-opacity"
			>
				업체명
			</FormInput>
		</>
	);
}

export default ValueThemeStore;
