import { string } from 'prop-types';
import SmallButton from '../button/SmallButton';

CommentItem.propTypes = {
	content: string,
};

function CommentItem({ content }) {
	const shortContent =
		content && content.length > 8 ? `${content.substring(0, 8)}...` : content;

	return (
		<div className="text-ec1 border-2 p-4 mb-2 rounded-xl flex items-center justify-between">
			<p className="w-[70%] whitespace-nowrap overflow-hidden text-ellipsis">
				<span>{shortContent}</span>
				댓글이 길어지면 쩜쩜쩜 쩜쩜댓글이 길어지면 쩜쩜쩜 쩜쩜댓글이 길어지면
				쩜쩜쩜 쩜쩜쩜쩜쩜 쩜쩜쩜쩜쩜 쩜쩜쩜쩜쩜 쩜쩜쩜쩜쩜 쩜쩜쩜쩜쩜 쩜쩜쩜쩜쩜
				쩜쩜
			</p>
			<div className="flex gap-3">
				<SmallButton>수정</SmallButton>
				<SmallButton>삭제</SmallButton>
			</div>
		</div>
	);
}

export default CommentItem;
