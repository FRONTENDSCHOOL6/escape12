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
			<div className="flex gap-2">
				<img className="w-8 h-8 rounded-full" src={src} alt={alt} />
				<span
					className={`font-bold ${nickName === '탈퇴회원' ? 'text-gray' : ''}`}
				>
					{nickName}
				</span>
			</div>
			<span className="pb-2 flex-1">{comment}</span>
			{(userId === `${userUId?.model.id}` || userUId?.model.admin) && (
				<button type="button" onClick={onClick}>
					X
				</button>
			)}
		</>
	);
}

export default CommentItem;
