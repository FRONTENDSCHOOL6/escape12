import { string } from 'prop-types';

UploadInfoTitle.propTypes = {
	store: string,
	point: string,
	style: string,
	author: string,
	date: string,
};

function UploadInfoTitle({ store, point, style, author, date }) {
	return (
		<div className="flex flex-col gap-3 s:gap-1 whitespace-nowrap flex-1">
			<h3 className="text-2xl font-semibold" tabIndex="0" aria-label="테마명">
				{store}
				<span className="ml-3 s:ml-2">{point}</span>
			</h3>
			<div className="flex justify-between">
				<p
					className={`flex max-w-fit whitespace-nowrap overflow-hidden text-ellipsis ${style}`}
					tabIndex="0"
					aria-label="작성자"
				>
					{author}
				</p>
				<span tabIndex="0">{date}</span>
			</div>
		</div>
	);
}

export default UploadInfoTitle;
