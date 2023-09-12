import { string, number, func } from 'prop-types';

Select.propTypes = {
	id: string,
	name: string,
	onChange: func,
	max: number,
};

function Select({ id, name, onChange, max, ...restProps }) {
	const options = [];
	for (let i = 0; i <= max; i++) {
		options.push(
			<option key={i} value={i}>
				{i}
			</option>
		);
	}

	return (
		<select
			name={name}
			id={id}
			onChange={onChange}
			className="w-[100px] s:w-[50%] text-ec4 text-center"
			{...restProps}
		>
			<option value="">선택</option>
			{options}
		</select>
	);
}

export default Select;
