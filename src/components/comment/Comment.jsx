import { string } from 'prop-types';

Comment.propTypes = {
	author: string,
	content: string,
};

function Comment({ author, content }) {
	return (
		<div className="break-all whitespace-normal overflow-hidden text-ellipsis text-[15px] border p-4 mb-2 rounded-xl max-w-[400px] flex flex-col m-auto">
			<p className="break-all font-bold mb-2 pb-2 text-left text-[15px] border-b-[1px]">
				{author}
			</p>
			<p className="self-center">{content}</p>
		</div>
	);
}

export default Comment;
