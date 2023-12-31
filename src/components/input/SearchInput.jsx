import { string, func } from 'prop-types';
import SmallButton from '../button/SmallButton';

SearchInput.propTypes = {
	placeholder: string,
	children: string,
	value: string,
	onChange: func,
	type: string,
	text: string,
	onSubmit: func,
};

function SearchInput({
	placeholder,
	children,
	type = 'text',
	value = '',
	onChange,
	text = '',
	onSubmit = null,
}) {
	return (
		<form
			onSubmit={onSubmit}
			className={`flex gap-4 w-full justify-center text-lg pb-4 ${text}`}
		>
			<input
				name="search"
				type={type}
				placeholder={placeholder}
				onChange={onChange}
				maxLength={35}
				defaultValue={value}
				required
				autoComplete="off"
				className="pl-3 py-1 rounded-full focus:outline-none grow text-light-ec4 dark:text-dark-ec4"
			/>
			<SmallButton type="submit">{children}</SmallButton>
		</form>
	);
}

export default SearchInput;
