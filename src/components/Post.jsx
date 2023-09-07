// import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

Post.propTypes = {
	title: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	// onDelete: PropTypes.func.isRequired,
};

function Post({ id, title, author, date /*onDelete*/ }) {
	// const [isClicked, setIsClicked] = useState(false);
	// const handleDelete = () => {
	// 	onDelete();
	// };

	return (
		<div className="post max-w-[600px] min-w-[320px] bg-ec1 text-ec4 p-4 mb-4 rounded border flex flex-col justify-between ">
			<div className="flex justify-between items-center">
				<Link to={`/post/${id}`} className="post-title">
					{title}
				</Link>
				<button
					// onClick={handleDelete}
					className="px-2 py-1 bg-ec3 text-ec1 rounded hover:text-ec5"
				>
					삭제
				</button>
			</div>
			{/* {isClicked && <p className="">.재밌어요!</p>} */}
			<div className="flex justify-between items-center mt-2">
				<p className="post-author text-ec4 mb-1 mt-2">{author}</p>
				<p className="post-date text-ec4">{date}</p>
			</div>
		</div>
	);
}

export default Post;
