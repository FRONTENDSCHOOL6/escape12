import { func, string, object, number } from 'prop-types';

FormInput.propTypes = {
	type: string,
	name: string,
	bg: string,
	value: string || number,
	children: object,
	onChange: func,
	onClick: func,
};

function FormInput({
	children,
	type = 'text',
	name,
	bg = 'hidden',
	value = '',
	onChange = () => {},
	onClick = () => {},
	...restProps
}) {
	return (
		<>
			<div className="flex gap-5 justify-between text-ec1 relative px-2">
				<label htmlFor={name} className="w-32 s:min-w-fit">
					{children}
				</label>
				<input
					type={type}
					className="w-[300px] s:w-[90%] bg-opacity border-b-2 border-ec1 focus:outline-none"
					name={name}
					id={name}
					onChange={onChange}
					required
					maxLength={30}
					autoComplete="off"
					value={value}
					{...restProps}
				/>
				<button
					type="button"
					className={`${bg} bg-cover w-5 h-5 absolute right-0 top-0`}
					onClick={onClick}
				/>
			</div>
		</>
	);
}

export default FormInput;
