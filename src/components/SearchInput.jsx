function SearchInput() {
	return (
		<div className="flex gap-4 w-full px-20 justify-center text-lg pb-4 s:px-12">
			<input
				type="text"
				placeholder="방탈출"
				maxLength={35}
				className="pl-3 py-1 rounded-full focus:outline-none flex-1"
			/>
			<button type="button" className="text-ec1 min-w-fit">
				검색
			</button>
		</div>
	);
}

export default SearchInput;
