import { string } from 'prop-types';

ChatItem.propTypes = {
	src: string,
	alt: string,
	author: string,
	content: string,
	hour: string,
	minute: string,
	reverse: string,
	bg: string,
};

function ChatItem({
	src,
	alt,
	author,
	content,
	hour,
	minute,
	reverse = '',
	bg = 'dark:bg-dark-kakaoline bg-light-white',
}) {
	return (
		<div className={`flex items-end mb-3 ${reverse}`}>
			<img src={src} alt={alt} className="w-8 h-8 rounded-full mx-2" />
			<div className={`flex flex-col p-2 rounded-xl ${bg}`}>
				<span className="text-xs">{author}</span>
				<span>{content}</span>
			</div>
			<span className="text-xs px-1">
				{hour < 13
					? '오전 ' + hour.toString()
					: '오후 ' + (hour - 12).toString()}
				:
				{minute === 0
					? '00'
					: minute < 10
					? '0' + minute.toString()
					: minute.toString()}
			</span>
		</div>
	);
}

export default ChatItem;
