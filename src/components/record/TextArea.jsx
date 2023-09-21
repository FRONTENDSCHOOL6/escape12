import { func, string, number } from 'prop-types';

TextArea.propTypes = {
	value: string,
	onChange: func,
	style: string,
	children: number,
};

function TextArea({
	value,
	onChange = null,
	style = 'text-ec4 h-40',
	children,
	...restProps
}) {
	return (
		<div className="relative px-2">
			<label htmlFor="review" hidden>
				후기
			</label>
			<textarea
				id="review"
				value={value}
				onChange={onChange}
				className={`w-full p-4 rounded-lg dark:text-dark-ec4 ${style}`}
				maxLength={250}
				required
				{...restProps}
			/>
			<p className="text-right absolute -bottom-5 right-2 ">{children}/ 250</p>
		</div>
	);
}

export default TextArea;
