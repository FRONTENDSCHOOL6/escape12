import { string } from 'prop-types';

Comment.propTypes = {
	author: string,
	content: string,
};

function Comment({ author, content }) {
	return (
		<div className="text-[15px] border text-ec1 p-4 mb-2 rounded-xl flex flex-col m-auto">
			<p className="font-bold mb-2 pb-2 border-b-[1px]">{author}</p>
			<p>{content}</p>
		</div>
	);
}

export default Comment;
