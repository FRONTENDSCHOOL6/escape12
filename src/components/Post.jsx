import { useState } from 'react';
import PropTypes from 'prop-types';

Post.propTypes = {
	title: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	onDelete: PropTypes.func.isRequired,
};

function Post({ title, author, date, onDelete }) {
	const [isClicked, setIsClicked] = useState(true);
	const handleDelete = () => {
		onDelete();
	};

	return (
		<div className="post max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex justify-around items-center h-screen m-auto">
			<h2 className="post-title" onClick={() => setIsClicked(!isClicked)}>
				{title}
			</h2>
			<p className="post-author">{author}</p>
			<p className="post-date">{date}</p>
			{isClicked && <p className="">게시글 내용 작성.재밌어요!</p>}
			<button
				onClick={handleDelete}
				className="px-2 py-1 bg-ec3 text-ec1 rounded hover:text-ec5"
			>
				삭제
			</button>
		</div>
	);
}

export default Post;
