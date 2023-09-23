import { string } from 'prop-types';
import { Link } from 'react-router-dom';

PostItem.propTypes = {
	title: string,
	author: string,
	id: string,
	content: string,
	src: string,
	alt: string,
};

function PostItem({ id, title, author, content, src, alt }) {
	const shortContent =
		content.length > 85 ? `${content.substring(0, 85)}...` : content;

	return (
		<Link to={`/postpage/${id}`}>
			<div className="border-2 max-h-[105px] p-4 mb-6 rounded-xl flex flex-col m-auto transition-transform duration-500 ease-in-out transform hover:scale-105">
				<div className="flex justify-between border-b-[1px] mb-4 pb-0.5">
					<p
						className="s:max-w-[100px] whitespace-nowrap overflow-hidden text-ellipsis font-semibold"
						aria-label={'제목 ' + title}
						tabIndex="0"
					>
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
							className={`break-all font-bold whitespace-normal`}
							aria-label={'작성자 ' + author}
							tabIndex="0"
						>
							{author}
						</p>
					</div>
				</div>
				<p
					className="break-all whitespace-nowrap overflow-hidden text-ellipsis"
					aria-label={'게시글 ' + shortContent}
					tabIndex="0"
				>
					{shortContent}
				</p>
			</div>
		</Link>
	);
}

export default PostItem;
