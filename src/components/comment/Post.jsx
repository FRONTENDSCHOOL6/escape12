import { string } from 'prop-types';

CommentPost.propTypes = {
	title: string,
	author: string,
	content: string,
};

function CommentPost({ title, author, content }) {
	return (
		<div className="text-[15px] min-h-[400px] text-ec1 border p-4 mb-4 rounded-xl flex flex-col m-auto">
			<div className="flex justify-between border-b-[1px] mb-4 pb-2">
				<p>{title}제목</p>
				<p className="font-bold">{author}작성자</p>
			</div>
			<p className="break-all">{content}</p>
		</div>
	);
}

export default CommentPost;
