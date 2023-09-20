import { Rating } from '@mui/material';
import { func, string } from 'prop-types';
import Sup from './Sup';

Grade.propTypes = {
	onChange: func,
	grade: string,
};

function Grade({ grade, onChange }) {
	return (
		<div className="flex gap-5 text-ec1 relative px-2">
			<label htmlFor="grade" className="w-32 s:min-w-fit">
				<Sup>평점</Sup>
			</label>
			<Rating
				id="grade"
				name="half-rating"
				defaultValue={0}
				precision={0.5}
				onChange={onChange}
				value={grade}
				sx={{ '& .MuiRating-iconEmpty': { color: '#868e96' } }}
			/>
		</div>
	);
}

export default Grade;
