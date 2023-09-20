import { string } from 'prop-types';
import DeleteButton from '../button/DeleteButton';
import toast from 'react-hot-toast';
import pb from '@/api/pockethost';
import { Link } from 'react-router-dom';

MyCommentItem.propTypes = {
	src: string,
	alt: string,
	nickName: string,
	comment: string,
	id: string,
	postId: string,
	postTitle: string,
	postType: string,
};

function MyCommentItem({ comment, id, postId, postTitle, postType }) {
	const maxLength = 27;
	const handleDeletecomment = async (e) => {
		e.preventDefault();
		const deleteConfirm = confirm('정말로 삭제하시겠습니까?');

		try {
			if (deleteConfirm) {
				await pb.collection('comment').delete(`${id}`);

				toast('삭제되었습니다', {
					icon: '🗑️',
					duration: 2000,
				});

				location.reload();
			}
		} catch (err) {
			console.log(`삭제 에러: ${err}`);
		}
	};

	return (
		<div className="text-ec1 border-2 justify-between max-h-[105px] items-center p-4 mb-6 rounded-xl flex m-auto transition-transform duration-500 ease-in-out transform hover:scale-105">
			<div className="flex-grow flex">
				<Link
					to={
						postType === 'community'
							? `/postpage/${postId}`
							: `/upload/${postId}`
					}
					className="flex-grow pr-4"
				>
					<h3 className="text-lg font-semibold mb-2 border-b-2">
						{postType === 'community' ? '📕' : '🎫'} {postTitle}
					</h3>
					<p className="break-all whitespace-nowrap overflow-hidden text-base max-w-full">
						{comment.length > maxLength
							? `${comment.substring(0, maxLength)}...`
							: comment}
					</p>
				</Link>
			</div>
			<DeleteButton className="ml-auto" onClick={handleDeletecomment}>
				삭제
			</DeleteButton>
		</div>
	);
}

export default MyCommentItem;
