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
				<span aria-hidden="true">테마명</span>
			</FormInput>
			<FormInput
				name="store"
				placeholder="업체명"
				maxLength="20"
				defaultValue={store}
				onChange={storeEvent}
			>
				<span aria-hidden="true">업체명</span>
			</FormInput>
		</>
	);
}

export default DefaultThemeStore;
