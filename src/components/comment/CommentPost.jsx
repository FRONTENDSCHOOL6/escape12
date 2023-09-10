import { string } from 'prop-types';
import { Link } from 'react-router-dom';

CommentPost.propTypes = {
	title: string,
	author: string,
	date: string,
	id: string,
	content: string,
};

function CommentPost({ id, title, author, content }) {
	return (
		<Link to={`/post/${id}`}>
			<div className="break-all whitespace-normal overflow-hidden text-ellipsis text-[15px] min-h-[400px] border p-4 mb-4 rounded-xl w-[320px] s:w-[300px] flex flex-col m-auto">
				<div className="flex justify-between border-b-[1px] mb-4 pb-2">
					<p className="text-[15px]">{title}</p>
					<p className="break-all font-bold text-[15px] ">{author}</p>
				</div>
				<p className="break-all">{content}갛사합니다 건주님</p>
			</div>
		</Link>
	);
}

export default CommentPost;
