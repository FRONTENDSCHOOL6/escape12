import { string } from 'prop-types';
import { Link } from 'react-router-dom';

PostItem.propTypes = {
	title: string,
	author: string,
	date: string,
	id: string,
	content: string,
	src: string,
	alt: string,
	theme: string,
};

function PostItem({ id, title, author, content, src, theme }) {
	const shortContent =
		content.length > 85 ? `${content.substring(0, 85)}...` : content;

	return (
		<Link to={`/postpage/${id}`}>
			<div className="border-2 max-h-[105px] p-4 mb-6 rounded-xl flex flex-col m-auto transition-transform duration-500 ease-in-out transform hover:scale-105">
				<div className="flex justify-between border-b-[1px] mb-4 pb-0.5">
					<p className="whitespace-nowrap overflow-hidden text-ellipsis font-semibold">
						{title}
					</p>
					<div className="flex items-center">
						<img className="w-6 h-6 rounded-full mr-2" src={src} alt={theme} />
						<p
							className={`break-all font-bold whitespace-normal ${
								author === '탈퇴회원'
									? 'dark:text-dark-gray text-light-gray'
									: ''
							}`}
						>
							{author}
						</p>
					</div>
				</div>
				<p className="break-all whitespace-nowrap overflow-hidden text-ellipsis">
					{shortContent}
				</p>
			</div>
		</Link>
	);
}

export default PostItem;
