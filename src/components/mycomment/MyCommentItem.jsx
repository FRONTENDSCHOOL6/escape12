import { string } from 'prop-types';
import SmallButton from '../button/SmallButton';

MyCommentItem.propTypes = {
	src: string,
	alt: string,
	nickName: string,
	comment: string,
};

function MyCommentItem({ comment }) {
	return (
		<>
			<div className="text-ec1 border-2 justify-between max-h-[105px] p-4 mb-6 rounded-xl flex m-auto">
				<div className="">
					{/* <img className="w-8 h-8 rounded-full" src={src} alt={alt} /> */}
					{/* <span className="font-bold ">{nickName}</span> */}
					<p className="break-all whitespace-nowrap overflow-hidden text-ellipsis">
						{comment}
					</p>
				</div>
				<div className="flex gap-3">
					<SmallButton>수정</SmallButton>
					<SmallButton>삭제</SmallButton>
				</div>
			</div>
		</>
	);
}

export default MyCommentItem;
