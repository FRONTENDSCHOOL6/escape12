import { func, string } from 'prop-types';
import FormInput from '../loginsignup/FormInput';

DefaultThemeStore.propTypes = {
	theme: string,
	themeEvent: func,
	store: string,
	storeEvent: func,
};

function DefaultThemeStore({ theme, themeEvent, store, storeEvent }) {
	return (
		<>
			<FormInput
				name="theme"
				placeholder="테마명"
				maxLength="20"
				defaultValue={theme}
				onChange={themeEvent}
			>
				테마명
			</FormInput>
			<FormInput
				name="store"
				placeholder="업체명"
				maxLength="20"
				defaultValue={store}
				onChange={storeEvent}
			>
				업체명
			</FormInput>
		</>
	);
}

export default DefaultThemeStore;
