import { getUserInfoFromStorage } from '@/api/getUserInfo';
import pb from '@/api/pockethost';
import noImage from '@/assets/noImage.png';
import noImageLight from '@/assets/noImageLight.png';
import social from '@/assets/socialImg.png';
import { ThemeContext } from '@/contexts/ThemeContext';
import useChat from '@/hooks/useChat';
import { useContext, useEffect, useRef, useState } from 'react';
import EmptyContents from '../EmptyContents';
import Spinner from '../Spinner';
import ChatInput from './ChanInput';
import ChatItem from './ChatItem';

function ChatModal() {
	const { theme } = useContext(ThemeContext);
	const userUId = getUserInfoFromStorage();
	const [chat, setChat] = useState(null);
	const [text, setText] = useState('');
	const chatListRef = useRef(null);

	// 채팅 쓰기 이벤트
	const handleChangeChat = (e) => {
		setText(e.target.value);
	};

	// 채팅 보내기 이벤트
	const handleSubmitChat = async (e) => {
		e.preventDefault();
		const data = {
			content: text,
			author: `${userUId?.model.id}`,
		};

		try {
			setText('');

			await pb.collection('chat').create(data);

			const resultChat = await pb.collection('chat').getFullList({
				sort: 'created',
				expand: 'author',
			});

			setChat(resultChat);
		} catch (err) {
			console.log(`채팅보내기: ${err}`);
		}
	};

	// 스크린위치 가장 아래 고정
	useEffect(() => {
		if (chatListRef.current) {
			chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
		}
	}, [chat]);

	// 데이터가져오기
	const chatData = useChat();

	// 데이터 가져온 후, data 업데이트
	useEffect(() => {
		if (chatData.data) {
			setChat(chatData.data);
		}
	}, [chatData.data]);

	return (
		<div className="fixed top-1/2 z-50 left-1/2 -translate-y-1/2 -translate-x-1/2 dark:bg-dark-ec1 dark:text-dark-ec4 text-light-ec4 bg-light-ec4 w-[500px] h-[600px] rounded-2xl s:hidden">
			<ul
				className="w-full h-[90%] overflow-y-scroll p-5 chatModal"
				ref={chatListRef}
			>
				{chat && chat.length === 0 && (
					<div className="flex flex-col items-center translate-y-1/4">
						<EmptyContents text="text-light-ec1 dark:text-dark-ec4">
							채팅을 시작해주세요 : &#41;
						</EmptyContents>
					</div>
				)}
				{chatData.isLoading && (
					<div className="flex flex-col items-center translate-y-1/2">
						<Spinner />
					</div>
				)}
				{chat &&
					chat.map((item) => {
						return (
							<li key={item.id}>
								<ChatItem
									src={
										item.expand?.author?.id && item.expand?.author?.avatar
											? `https://refresh.pockethost.io/api/files/${item.expand?.author?.collectionId}/${item.expand?.author?.id}/${item.expand?.author?.avatar}`
											: item.expand?.author?.social ===
											  'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg'
											? `${social}`
											: item.expand?.author?.social
											? item.expand?.author?.social
											: theme == 'dark'
											? `${noImageLight}`
											: `${noImage}`
									}
									alt={item.expand?.author?.nickName}
									author={item.expand?.author?.nickName}
									content={item.content}
									reverse={
										item.expand?.author?.id === `${userUId?.model.id}`
											? 'flex-row-reverse'
											: ''
									}
									bg={
										item.expand?.author?.id === `${userUId?.model.id}`
											? 'dark:bg-dark-sweetred bg-light-kakaoline'
											: 'dark:bg-dark-kakaoline bg-light-white'
									}
								/>
							</li>
						);
					})}
			</ul>

			<ChatInput
				value={text}
				onSubmit={handleSubmitChat}
				onChange={handleChangeChat}
			>
				등록
			</ChatInput>
		</div>
	);
}

export default ChatModal;
