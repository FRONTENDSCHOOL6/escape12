import { string, func } from 'prop-types';
import Sup from './Sup';

Date.propTypes = {
	dateValue: string,
	onChange: func,
};

function Date({ dateValue, onChange }) {
	return (
		<div className="flex text-ec1 px-2 gap-5 s:gap-9">
			<label htmlFor="date" className="w-32 s:min-w-fit">
				<Sup>날짜</Sup>
			</label>
			<input
				tabIndex="0"
				type="date"
				id="date"
				defaultValue={dateValue}
				onChange={onChange}
				required
				className="w-[200px] s:w-[90%] text-ec4 text-center dark:text-dark-ec4"
			/>
		</div>
	);
}

export default Date;
