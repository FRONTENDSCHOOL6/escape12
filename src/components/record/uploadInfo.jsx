import { number, func } from 'prop-types';

uploadInfo.propTypes = {
	grade: number,
	hour: number,
	minute: number,
	onClick: func,
	likeUpdate: number,
};

function uploadInfo({ grade, hour, minute, onClick, likeUpdate }) {
	return (
		<ul className="flex justify-between pb-4 font-semibold">
			<li aria-label="즐겨찾기" tabIndex="0">
				⭐{grade}
			</li>
			<li aria-label="남은시간 " tabIndex="0">
				{hour}
				<span className="px-2">:</span>
				<span className="pr-2">{minute}</span>
				LEFT
			</li>
			<li>
				<button
					type="button"
					onClick={onClick}
					className="bg-heartlike bg-no-repeat w-fit pl-7 bg-[left_top_0.3rem]"
					aria-label="좋아요"
				>
					좋아요 {likeUpdate}
				</button>
			</li>
		</ul>
	);
}

export default uploadInfo;
