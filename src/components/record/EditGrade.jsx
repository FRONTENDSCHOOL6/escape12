import { Rating } from '@mui/material';
import { func, string } from 'prop-types';
import Sup from './Sup';

EditGrade.propTypes = {
	grade: string,
	onChange: func,
};

function EditGrade({ grade, onChange }) {
	return (
		<div className="flex gap-5 text-ec1 relative px-2">
			<label htmlFor="grade" className="w-32 s:min-w-fit">
				<Sup>평점</Sup>
			</label>
			<Rating
				id="grade"
				onChange={onChange}
				max={5}
				value={grade}
				name="half-rating grade"
				defaultValue={5}
				precision={0.5}
				required
				sx={{ '& .MuiRating-iconEmpty': { color: '#868e96' } }}
			/>
		</div>
	);
}

export default EditGrade;
