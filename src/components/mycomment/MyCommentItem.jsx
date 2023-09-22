import { func, string } from 'prop-types';
import { Link } from 'react-router-dom';
import DeleteButton from '../button/DeleteButton';

MyCommentItem.propTypes = {
	src: string,
	alt: string,
	nickName: string,
	comment: string,
	id: string,
	postId: string,
	postTitle: string,
	postType: string,
	onClick: func,
};

function MyCommentItem({ comment, postId, postTitle, postType, onClick }) {
	const maxLength = 25;

	return (
		<div className="border-2 justify-between max-h-[105px] items-center p-4 mb-6 rounded-xl flex m-auto transition-transform duration-500 ease-in-out transform hover:scale-105">
			<div className="flex-grow flex">
				<Link
					to={
						postType === 'community'
							? `/postpage/${postId}`
							: `/upload/${postId}`
					}
					className="flex-grow pr-4"
				>
					<h3
						className="text-lg font-semibold mb-2 border-b-2 whitespace-nowrap overflow-hidden text-ellipsis s:max-w-[190px]"
						aria-label={'제목 ' + postTitle}
						tabIndex="0"
					>
						{postType === 'community' ? '📕' : '🎫'}{' '}
						{postTitle.length > maxLength
							? `${postTitle.substring(0, maxLength)}...`
							: postTitle}
					</h3>
					<p
						className="break-all whitespace-nowrap overflow-hidden text-ellipsis text-base s:max-w-[150px] max-w-full"
						aria-label={'댓글 ' + comment}
						tabIndex="0"
					>
						{comment.length > maxLength
							? `${comment.substring(0, maxLength)}...`
							: comment}
					</p>
				</Link>
			</div>
			<DeleteButton className="ml-auto" onClick={onClick}>
				삭제
			</DeleteButton>
		</div>
	);
}

export default MyCommentItem;
