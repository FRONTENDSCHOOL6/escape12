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
		<div className="min-h-[400px] text-lg border-2 p-4 mb-4 rounded-xl flex flex-col m-auto">
			<div className="flex justify-between border-b-[1px] mb-4 pb-2">
				<p className="font-semibold" aria-label={'제목 ' + title} tabIndex="0">
					{title}
				</p>
				<div className="flex items-center">
					<img
						className="w-6 h-6 rounded-full mr-2"
						src={src}
						alt={alt}
						aria-hidden="true"
					/>
					<p
						className="break-all font-bold whitespace-nowrap"
						aria-label={'작성자 ' + author}
						tabIndex="0"
					>
						{author}
					</p>
				</div>
			</div>
			<p className="break-all" aria-label={'게시글 ' + content} tabIndex="0">
				{content}
			</p>
		</div>
	);
}

export default Post;
