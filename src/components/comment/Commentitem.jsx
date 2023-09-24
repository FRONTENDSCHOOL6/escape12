import { getUserInfoFromStorage } from '@/api/getUserInfo';
import { func, string } from 'prop-types';

CommentItem.propTypes = {
	src: string,
	alt: string,
	nickName: string,
	comment: string,
	userId: string,
	onClick: func,
};

function CommentItem({
	src,
	alt,
	nickName,
	comment,
	userId = '',
	onClick = null,
}) {
	const userUId = getUserInfoFromStorage();

	return (
		<>
			<div className="flex gap-2 justify-between">
				<img className="w-8 h-8 rounded-full" src={src} alt={alt} />
				<span
					className={`font-bold whitespace-nowrap`}
					aria-label={'작성자 ' + nickName}
					tabIndex="0"
				>
					{nickName}
				</span>
			</div>
			<span className="pb-2 flex-1" aria-label={'댓글 ' + comment} tabIndex="0">
				{comment}
			</span>
			{(userId === `${userUId?.model.id}` || userUId?.model.admin) && (
				<button type="button" onClick={onClick}>
					X
				</button>
			)}
		</>
	);
}

export default CommentItem;
