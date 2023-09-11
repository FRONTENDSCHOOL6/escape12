import { string, func } from 'prop-types';
import SmallButton from './SmallButton';

SearchInput.propTypes = {
	placeholder: string,
	children: string,
	value: string,
	onChange: func,
};

function SearchInput({ placeholder, children, value = '', onChange }) {
	return (
		<div className="flex gap-4 w-full px-20 justify-center text-lg pb-4 ">
			<input
				type="text"
				placeholder={placeholder}
				onChange={onChange}
				maxLength={35}
				defaultValue={value}
				className="pl-3 py-1 rounded-full focus:outline-none flex-1"
			/>
			<SmallButton>{children}</SmallButton>
		</div>
	);
}

export default SearchInput;
