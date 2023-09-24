import { string, func } from 'prop-types';
import Sup from './Sup';

EditDate.propTypes = {
	value: string,
	onChange: func,
};

function EditDate({ value, onChange }) {
	return (
		<div className="flex text-ec1 px-2 gap-5">
			<label htmlFor="date" className="w-32 s:min-w-fit">
				<Sup>날짜</Sup>
			</label>
			<input
				type="date"
				id="date"
				value={value}
				onChange={onChange}
				required
				className="w-[200px] s:w-[90%] text-ec4 text-center dark:text-dark-ec4"
			/>
		</div>
	);
}

export default EditDate;
