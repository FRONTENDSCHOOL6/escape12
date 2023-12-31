import { func, string } from 'prop-types';
import Select from './Select';

RemainingTime.propTypes = {
	hour: string,
	hourEvent: func,
	minute: string,
	minuteEvent: func,
};

function RemainingTime({ hour, hourEvent, minute, minuteEvent }) {
	return (
		<div className="flex gap-5 text-ec1 relative px-2 s:gap-0">
			<label htmlFor="clearTime" className="w-32 s:min-w-fit">
				남은 시간
			</label>
			<div className="flex gap-1">
				<Select
					label="시간"
					id="clearTime"
					name="hour"
					defaultValue={hour}
					onChange={hourEvent}
					max={1}
				/>
				<span>:</span>
				<Select
					label="분"
					id="clearMinute"
					name="minute"
					defaultValue={minute}
					onChange={minuteEvent}
					max={59}
				/>
				<span>LEFT</span>
			</div>
		</div>
	);
}

export default RemainingTime;
