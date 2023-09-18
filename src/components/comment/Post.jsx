import { string } from 'prop-types';

Post.propTypes = {
	title: string,
	author: string,
	content: string,
	src: string,
	alt: string,
};

function Post({ title, author, content, src, alt }) {
	return (
		<div className="text-[15px] min-h-[400px] text-lg text-ec1 border-2 p-4 mb-4 rounded-xl flex flex-col m-auto">
			<div className="flex justify-between border-b-[1px] mb-4 pb-2">
				<p>{title}</p>
				<div className="flex items-center">
					<img className="w-6 h-6 rounded-full mr-2" src={src} alt={alt} />
					<p className="break-all font-bold whitespace-normal">{author}</p>
				</div>
			</div>
			<p className="break-all">{content}</p>
		</div>
	);
}

export default Post;
