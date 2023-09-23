import pb from '@/api/pockethost';
import noImage from '@/assets/noImage.png';
import noImageLight from '@/assets/noImageLight.png';
import EmptyContents from '@/components/EmptyContents';
import Spinner from '@/components/Spinner';
import ChatModal from '@/components/chat/ChatModal';
import HeaderRecord from '@/components/header/HeaderRecord';
import SearchInput from '@/components/input/SearchInput';
import UpNav from '@/components/nav/UpNav';
import RecordCommunityItem from '@/components/record/RecordCommunityItem';
import { ThemeContext } from '@/contexts/ThemeContext';
import debounce from '@/utils/debounce';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

function RecordCommunity() {
	const navigate = useNavigate();
	const { theme } = useContext(ThemeContext);
	const [showPlusNav, setShowPlusNav] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [emptyData, setEmptyData] = useState(false);
	const [noResult, setNoResult] = useState(false);
	const [data, setData] = useState([]);
	const [search, setSearch] = useState('');
	const [chat, setChat] = useState(false);

	// 채팅하기 이벤트
	const handleChat = () => {
		chat ? setChat(false) : setChat(true);
	};

	//기록하기 버튼 이벤트
	const handleRecordButton = () => {
		navigate('/recordpage');
	};

	// 검색 버튼 누르기
	const handleSubmitButton = (e) => {
		e.preventDefault();
	};

	//스크롤탑 버튼 이벤트
	const handleTopButton = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	//스크롤 이벤트 감지
	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			if (
				(currentScrollY >= 500 && !showPlusNav) ||
				(currentScrollY < 500 && showPlusNav)
			) {
				setShowPlusNav(currentScrollY >= 500);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [showPlusNav]);

	// 검색 기능
	const handleSearch = useCallback((e) => {
		setIsLoading(false);
		if (e.target.value.length !== 0) {
			setSearch(e.target.value);
		} else {
			setSearch('');
		}

		// 테마명, 닉네임, 업체명, 평점으로 검색
		const recordSearch = async () => {
			const recordList = await pb.collection('record').getList(1, 200, {
				sort: '-created',
				expand: 'escapeList,author',
				filter: `theme ~ "${e.target.value}" || nickName = "${
					e.target.value
				}" || store ~ "${e.target.value}"|| grade = "${
					e.target.value === '꽃길'
						? 8 && 9 && 10
						: e.target.value === '풀길'
						? 4 && 5 && 6 && 7
						: e.target.value === '흙길'
						? 0 && 1 && 2 && 3
						: '없음'
				}" || grade = "${
					e.target.value === '꽃'
						? 8 && 9 && 10
						: e.target.value === '풀'
						? 4 && 5 && 6 && 7
						: e.target.value === '흙'
						? 0 && 1 && 2 && 3
						: '없음'
				}"`,
			});

			const records = await pb.collection('record').getFullList({
				sort: '-created',
				expand: 'author, escapeList',
			});

			try {
				if (recordList) {
					setData(recordList.items);
					setEmptyData(false);
					setIsLoading(true);
					setNoResult(false);
				} else if (e.target.value === 0) {
					setTimeout(() => {
						setData(records);
						setEmptyData(false);
						setIsLoading(true);
						setNoResult(false);
					});
				} else {
					setTimeout(() => {
						setEmptyData(true);
						setData([]);
						setIsLoading(true);
						setNoResult(true);
					});
				}
			} catch (err) {
				console.log(`검색 에러: ${err}`);
			}
		};

		recordSearch();
	}, []);
	const debounceSearch = useMemo(
		() => debounce((e) => handleSearch(e), 500),
		[handleSearch]
	);

	// 데이터 불러오기
	useEffect(() => {
		const allRecord = async () => {
			const records = await pb.collection('record').getFullList({
				sort: '-created',
				expand: 'author, escapeList',
			});

			try {
				setData(records);
				setIsLoading(true);
			} catch (err) {
				console.log(`에러 내용: ${err}`);
			}
		};

		allRecord();
	}, []);

	return (
		<div>
			<Helmet>
				<title>방탈러 기록</title>
				<meta name="description" content="방탈러 홈페이지-기록" />
				<meta property="og:title" content="방탈러 기록" />
				<meta property="og:description" content="방탈러 기록 페이지" />
				<meta
					property="og:url"
					content="https://escape12.netlify.app/recordcommunity"
				/>
			</Helmet>
			{chat && <ChatModal onClick={() => setChat(false)} />}
			<div className="max-w-[600px] min-w-[320px] flex flex-col items-center min-h-screen m-auto relative pt-20 pb-28 gap-2 bg-light-ec1 dark:bg-dark-ec4 text-light-ec4 dark:text-dark-ec1 text-lg">
				<HeaderRecord
					onClick={() => {
						navigate(-1);
					}}
					pencilClick={handleRecordButton}
				>
					방탈러 기록
				</HeaderRecord>
				<div className="w-full px-20">
					<SearchInput
						placeholder="검색어를 입력해주세요 😀"
						value={search}
						onChange={debounceSearch}
						text="text-ec4"
						onSubmit={handleSubmitButton}
					>
						검색
					</SearchInput>
				</div>
				<div className="flex flex-col items-center w-full">
					{isLoading && data.length === 0 && !emptyData && !noResult && (
						<div className="translate-y-1/2">
							<EmptyContents>기록이 없습니다 : &#40;</EmptyContents>
						</div>
					)}
					{!isLoading && (
						<div className="absolute top-1/2 -translate-y-1/2">
							<Spinner />
						</div>
					)}
					<ul className="w-full px-20 s:px-12">
						{!emptyData &&
							isLoading &&
							!noResult &&
							data.map((item) => {
								return (
									<li key={item.id} className="w-full">
										<RecordCommunityItem
											store={item.store}
											theme={item.theme}
											grade={Number(item.grade) * 2}
											image={
												item.image
													? `https://refresh.pockethost.io/api/files/${item.collectionId}/${item.id}/${item.image}`
													: item.expand?.escapeList?.images
													? `https://refresh.pockethost.io/api/files/${item.expand?.escapeList?.collectionId}/${item.expand?.escapeList?.id}/${item.expand?.escapeList?.images}`
													: theme === 'dark' &&
													  !item.image &&
													  !item.expand?.escapeList?.image
													? `${noImageLight}`
													: theme === 'light' &&
													  !item.image &&
													  !item.expand?.escapeList?.image
													? `${noImage}`
													: ''
											}
											author={
												item.expand?.author?.nickName && item.expand?.author?.id
													? item.expand?.author?.nickName
													: item.expand?.author?.id
													? '소셜계정'
													: '탈퇴회원'
											}
											link={item.id}
											record={item.expand?.author?.record}
										/>
									</li>
								);
							})}
					</ul>
				</div>
			</div>
			<UpNav
				topClick={handleTopButton}
				hidden={!showPlusNav ? 'hidden' : ''}
				talkClick={handleChat}
			/>
		</div>
	);
}

export default RecordCommunity;
