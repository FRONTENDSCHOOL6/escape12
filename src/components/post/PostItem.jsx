// import { useState } from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';

PostItem.propTypes = {
	title: string,
	author: string,
	date: string,
	id: string,
	content: string,
	// onDelete: PropTypes.func.isRequired,
};

function PostItem({ id, title, author, content /*onDelete*/ }) {
	const shortContent =
		content.length > 85 ? `${content.substring(0, 85)}...` : content;
	// const [isClicked, setIsClicked] = useState(false);
	// const handleDelete = () => {
	//     onDelete();
	// };

	return (
		<Link to={id}>
			<div className="text-ec1 border  max-h-[105px] p-4 mb-6 rounded-xl flex flex-col m-auto">
				<div className="flex justify-between border-b-[1px] mb-4 pb-2">
					<p className="whitespace-nowrap overflow-hidden text-ellipsis">
						{title}
					</p>
					<p className="break-all font-bold whitespace-nowrap">{author}</p>
				</div>
				<p className="break-all whitespace-nowrap overflow-hidden text-ellipsis">
					{shortContent}
				</p>
				{/* {isClicked && <p className="">.재밌어요!</p>} */}
			</div>
		</Link>
	);
}

export default PostItem;
