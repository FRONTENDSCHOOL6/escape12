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
			<div className="text-[15px] min-h-[400px] text-ec1 border p-4 mb-4 rounded-xl flex flex-col m-auto">
				<div className="flex justify-between border-b-[1px] mb-4 pb-2">
					<p>{title}제목</p>
					<p className="font-bold">{author}작성자</p>
				</div>
				<p className="break-all">
					{content}갛사합니다
					건주님안ㄴ여하세요안ㄴ여하세요안ㄴ여하세요안ㄴ여하세요
				</p>
			</div>
		</Link>
	);
}

export default CommentPost;
