import { func, string } from 'prop-types';
import Select from './Select';

EditRemainingTime.propTypes = {
	hour: string,
	hourEvent: func,
	minute: string,
	minuteEvent: func,
};

function EditRemainingTime({ hour, hourEvent, minute, minuteEvent }) {
	return (
		<div className="flex gap-5 text-ec1 relative px-2">
			<label htmlFor="clearTime" className="w-32 s:min-w-fit">
				남은 시간
			</label>
			<div className="flex gap-2">
				<Select
					id="clearTime"
					name="hour"
					value={hour}
					onChange={hourEvent}
					max={1}
				/>
				:
				<Select
					id="clearTime"
					name="minute"
					value={minute}
					onChange={minuteEvent}
					max={59}
				/>
				LEFT
			</div>
		</div>
	);
}

export default EditRemainingTime;
