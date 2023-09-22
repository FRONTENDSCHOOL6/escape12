import { string } from 'prop-types';

ChatItem.propTypes = {
	src: string,
	alt: string,
	author: string,
	content: string,
	reverse: string,
	bg: string,
};

function ChatItem({
	src,
	alt,
	author,
	content,
	reverse = '',
	bg = 'dark:bg-dark-kakaoline bg-light-white',
}) {
	return (
		<div className={`flex gap-2 mb-3 ${reverse}`}>
			<img src={src} alt={alt} className="w-8 h-8 rounded-full" />
			<div className={`flex flex-col p-2 rounded-xl ${bg}`}>
				<span className="text-xs">{author}</span>
				<span>{content}</span>
			</div>
		</div>
	);
}

export default ChatItem;
