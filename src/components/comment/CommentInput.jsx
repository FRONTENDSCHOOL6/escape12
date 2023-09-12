import { string } from 'prop-types';

CommentInput.propTypes = {
	placeholder: string,

	type: string,
	children: string,
};

function CommentInput({
	placeholder,
	children,
	type,

	...restProps
}) {
	return (
		<div className="flex gap-4 w-full px-20 justify-center text-lg pb-4 ">
			<label className="hidden" htmlFor={type}>
				{children}
			</label>
			<input
				id={type}
				className="pl-3 py-1 rounded-full focus:outline-none flex-1"
				type={type}
				placeholder={placeholder}
				{...restProps}
			></input>
		</div>
	);
}

export default CommentInput;
