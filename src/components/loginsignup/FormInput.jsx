import { func, string, bool } from 'prop-types';
import PropTypes from 'prop-types';
import Sup from '../record/Sup';

FormInput.propTypes = {
	type: string,
	name: string,
	bg: string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
	onChange: func,
	onClick: func,
	bold: string,
	hidden: string,
	pwView: bool,
};

function FormInput({
	children,
	type,
	name,
	bg = 'hidden',
	onChange = null,
	onClick = null,
	hidden = 'dark:text-dark-red text-light-red',
	bold = '',
	pwView,
	...restProps
}) {
	return (
		<>
			<fieldset className="flex gap-5 justify-between relative px-2">
				<label htmlFor={name} className={`w-34 s:min-w-fit ${bold}`}>
					<Sup hidden={hidden}>{children}</Sup>
				</label>
				<input
					type={type}
					className="w-[300px] s:w-[60%] bg-light-opacity dark:bg-dark-opacity border-b-2 border-ec1 focus:outline-none text-light-ec4 dark:text-dark-ec1"
					name={name}
					id={name}
					onChange={onChange}
					required
					maxLength={30}
					autoComplete="off"
					{...restProps}
				/>
				<button
					type="button"
					className={`${bg} bg-cover w-5 h-5 absolute right-1 top-0`}
					onClick={onClick}
					aria-label={pwView ? '비밀번호 안보이기' : '비밀번호 보기'}
				/>
			</fieldset>
		</>
	);
}

export default FormInput;
