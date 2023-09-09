// import { useState } from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';

Post.propTypes = {
	title: string,
	author: string,
	date: string,
	id: string,
	content: string,
	// onDelete: PropTypes.func.isRequired,
};

function Post({ id, title, author, content /*onDelete*/ }) {
	const shortContent =
		content.length > 85 ? `${content.substring(0, 85)}...` : content;
	// const [isClicked, setIsClicked] = useState(false);
	// const handleDelete = () => {
	// 	onDelete();
	// };

	return (
		<Link to={`/post/${id}`}>
			<div className="break-all text-[15px] h-[130px] border p-4 mb-4 rounded-xl min-w-[320px] max-w-[400px] flex flex-col m-auto">
				<div>
					<div className="flex justify-between border-b-[1px] mb-4 pb-2">
						<p className="text-[15px]">{title}</p>
						<p className="break-all font-bold text-[15px] ">{author}</p>
					</div>
					<p className="break-all">{shortContent}</p>
				</div>
				{/* {isClicked && <p className="">.재밌어요!</p>} */}
			</div>
		</Link>
	);
}

export default Post;
