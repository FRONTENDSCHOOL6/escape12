import { string } from 'prop-types';

CommentItem.propTypes = {
	src: string,
	alt: string,
	nickName: string,
	comment: string,
};

function CommentItem({ src, alt, nickName, comment }) {
	return (
		<>
			<div className="flex gap-2">
				<img className="w-8 h-8 rounded-full" src={src} alt={alt} />
				<span className="font-bold ">{nickName}</span>
			</div>
			<span className="pb-2 flex-1">{comment}</span>
		</>
	);
}

export default CommentItem;
