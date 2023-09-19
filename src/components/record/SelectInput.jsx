import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { func, number, string } from 'prop-types';

SelectInput.propTypes = {
	label: string,
	id: string,
	name: string,
	onChange: func,
	max: number,
};

function SelectInput({ label, id, name, onChange, max, ...restProps }) {
	const options = [];
	for (let i = 0; i <= max; i++) {
		options.push(
			<MenuItem key={i} value={i}>
				{i}
			</MenuItem>
		);
	}

	return (
		<FormControl
			sx={{
				m: 1,
				minWidth: 80,
				height: 10,
				display: 'flex',
				justifyContent: 'start',
			}}
			size="small"
		>
			<InputLabel
				variant="standard"
				htmlFor="demo-select-small-label"
				style={{
					color: '#868e96',
					zIndex: 10,
				}}
			>
				{label}
			</InputLabel>
			<Select
				labelId="demo-select-small-label"
				id={`"demo-select-small-label" ${id}`}
				name={name}
				onChange={onChange}
				sx={{
					'&': {
						color: '#352F44',
						backgroundColor: '#Ffffff',
					},
					'& .MuiSelect-icon': {
						color: '#FAF0E6',
					},
				}}
				{...restProps}
			>
				<MenuItem value="">선택</MenuItem>
				{options}
			</Select>
		</FormControl>
	);
}

export default SelectInput;
