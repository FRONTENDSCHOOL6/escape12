import { string, func } from 'prop-types';
import Sup from './Sup';

Date.propTypes = {
	dateValue: string,
	onChange: func,
};

function Date({ dateValue, onChange }) {
	return (
		<div className="flex text-ec1 px-2 gap-5">
			<label htmlFor="date" className="w-32 s:min-w-fit">
				<Sup>날짜</Sup>
			</label>
			<input
				type="date"
				id="date"
				defaultValue={dateValue}
				onChange={onChange}
				required
				className="w-[200px] s:w-[90%] text-ec4 text-center"
			/>
		</div>
	);
}

export default Date;
