import { Rating } from '@mui/material';
import { func } from 'prop-types';
import Sup from './Sup';

Grade.propTypes = {
	onChange: func,
};

function Grade({ onChange }) {
	return (
		<div className="flex gap-5 text-ec1 relative px-2">
			<label htmlFor="grade" className="w-32 s:min-w-fit">
				<Sup>평점</Sup>
			</label>
			<Rating
				name="half-rating"
				defaultValue={5}
				precision={0.5}
				onChange={onChange}
				sx={{ '& .MuiRating-iconEmpty': { color: '#868e96' } }}
			/>
		</div>
	);
}

export default Grade;
