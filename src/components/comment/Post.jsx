import { string } from 'prop-types';

Post.propTypes = {
	title: string,
	author: string,
	content: string,
};

function Post({ title, author, content }) {
	return (
		<div className="text-[15px] min-h-[400px] text-ec1 border-2 p-4 mb-4 rounded-xl flex flex-col m-auto">
			<div className="flex justify-between border-b-[1px] mb-4 pb-2">
				<p>{title}</p>
				<p className="font-bold">{author}</p>
			</div>
			<p className="break-all">{content}</p>
		</div>
	);
}

export default Post;
