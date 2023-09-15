import { func, string } from 'prop-types';
import Select from './Select';
import Sup from './Sup';

Grade.propTypes = {
	grade: string,
	onChange: func,
};

function Grade({ grade, onChange }) {
	return (
		<div className="flex gap-5 text-ec1 relative px-2">
			<label htmlFor="grade" className="w-32 s:min-w-fit">
				<Sup>평점</Sup>
			</label>
			<Select
				id="grade"
				name="grade"
				onChange={onChange}
				max={10}
				defaultValue={grade}
				required
			/>
			<span className="s:min-w-fit">/ 10</span>
		</div>
	);
}

export default Grade;
