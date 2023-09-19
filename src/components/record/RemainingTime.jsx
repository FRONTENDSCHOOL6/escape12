import { func, string } from 'prop-types';
import SelectInput from './SelectInput';

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
			<div className="flex items-start">
				<SelectInput
					label="시간"
					id="clearTime"
					name="hour"
					defaultValue={hour}
					onChange={hourEvent}
					max={1}
				/>
				<span className="translate-y-1/2">:</span>
				<SelectInput
					label="분"
					id="clearTime"
					name="minute"
					defaultValue={minute}
					onChange={minuteEvent}
					max={59}
				/>
				<span className="translate-y-1/2">LEFT</span>
			</div>
		</div>
	);
}

export default RemainingTime;
