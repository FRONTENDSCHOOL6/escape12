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
		<div className="relative">
			<textarea
				value={value}
				onChange={onChange}
				className={`w-full p-4 rounded-lg ${style}`}
				maxLength={250}
				required
				{...restProps}
			/>
			<p className="text-right absolute -bottom-5 right-0">{children}/ 250</p>
		</div>
	);
}

export default TextArea;
