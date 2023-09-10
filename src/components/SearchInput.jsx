import { string } from 'prop-types';

SearchInput.propTypes = {
	placeholder: string,
	children: string,
};

function SearchInput({ placeholder, children }) {
	return (
		<div className="flex gap-4 w-full px-20 justify-center text-lg pb-4 ">
			<input
				type="text"
				placeholder={placeholder}
				maxLength={35}
				className="pl-3 py-1 rounded-full focus:outline-none flex-1"
			/>
			<button type="button" className="text-ec1 min-w-fit">
				{children}
			</button>
		</div>
	);
}

export default SearchInput;
