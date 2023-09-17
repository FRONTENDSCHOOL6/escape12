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
	recordId: string,
	postTitle: string,
};

function MyCommentItem({ comment, id, postId, recordId, postTitle }) {
	// console.log(postId);
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
		<div className="text-ec1 border-2 justify-between max-h-[105px] p-4 mb-6 rounded-xl flex m-auto transition-transform duration-500 ease-in-out transform hover:scale-105">
			<Link to={`/postpage/${postId}`}>
				<div className="">
					{/* <img className="w-8 h-8 rounded-full" src={src} alt={alt} /> */}
					{/* <span className="font-bold ">{nickName}</span> */}
					<h3 className="text-lg font-semibold mb-2 border-b-2">{postTitle}</h3>
					<p className="break-all whitespace-nowrap overflow-hidden text-ellipsis">
						{comment}
					</p>
				</div>
			</Link>
			<div className="flex gap-3">
				<DeleteButton onClick={handleDeletecomment}>삭제</DeleteButton>
			</div>
		</div>
	);
}

export default MyCommentItem;
