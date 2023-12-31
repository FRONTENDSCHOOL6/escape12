import pb from '@/api/pockethost';
import { getUserInfoFromStorage } from '@/api/getUserInfo';
import EmptyContents from '@/components/EmptyContents';
import Spinner from '@/components/Spinner';
import HeaderBackRecord from '@/components/header/HeaderBackRecord';
import SearchInput from '@/components/input/SearchInput';
import UpNav from '@/components/nav/UpNav';
import PostList from '@/components/post/PostList';
import { debounce } from '@mui/material';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import ChatModal from '@/components/chat/ChatModal';
import useMyCommunity from '@/hooks/useMyCommunity';

pb.autoCancellation(false);

function MyCommunity() {
	const [posts, setPosts] = useState([]);
	const [search, setSearch] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [showPlusNav, setShowPlusNav] = useState(false);
	const userUId = getUserInfoFromStorage();
	const navigate = useNavigate();
	const [emptyData, setEmptyData] = useState(false);
	const [noResult, setNoResult] = useState(false);
	const [chat, setChat] = useState(false);

	const handleChat = () => {
		chat ? setChat(false) : setChat(true);
	};

	const handleRecordButton = () => {
		navigate('/addcommunity');
	};

	const handleTopButton = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

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

	const handleSearch = async (e) => {
		if (e.target.value.length !== 0) {
			setSearch(e.target.value);
		} else {
			setSearch('');
		}

		setIsLoading(false);

		const resultList = await pb.collection('community').getList(1, 200, {
			filter: `(author = "${userUId?.model.id}" && content ~ "${e.target.value}") || (author = "${userUId?.model.id}" && title ~ "${e.target.value}")`,
			expand: 'author',
			sort: '-created',
		});

		const againCommunity = await pb.collection('community').getFullList({
			filter: `author = "${userUId?.model.id}"`,
			expand: 'author',
			sort: '-created',
		});
		try {
			if (resultList.items.length > 0) {
				setPosts(resultList.items);
				setEmptyData(false);
				setIsLoading(true);
				setNoResult(false);
			} else if (e.target.value === '') {
				setPosts(againCommunity);
				setEmptyData(false);
				setIsLoading(true);
				setNoResult(false);
			} else {
				setPosts(resultList.items);
				setEmptyData(false);
				setIsLoading(true);
				setNoResult(false);
			}
		} catch (err) {
			console.log(`검색 에러 내용 : ${err}`);
		}
	};

	const debounceSearch = debounce((e) => handleSearch(e));

	const handleSubmitButton = (e) => {
		e.preventDefault();
	};

	const myCommunityData = useMyCommunity();

	useEffect(() => {
		if (myCommunityData.data) {
			setPosts(myCommunityData.data);
			setIsLoading(true);
		}
	}, [myCommunityData.data]);

	return (
		<>
			<Helmet>
				<title>나의 게시물 목록</title>
				<meta name="description" content="방탈러 홈페이지-나의 게시물 목록" />
				<meta property="og:title" content="방탈러 나의 게시물 목록" />
				<meta
					property="og:description"
					content="방탈러 나의 게시물 목록 페이지"
				/>
				<meta
					property="og:url"
					content="https://escape12.netlify.app/mycommunity"
				/>
			</Helmet>
			{chat && <ChatModal onClick={() => setChat(false)} />}
			<div className="w-full max-w-[600px] min-w-[320px] bg-light-ec1 dark:bg-dark-ec4 text-light-ec4 dark:text-dark-ec1 py-20 flex flex-col items-center min-h-[100vh] m-auto text-lg gap-6">
				<HeaderBackRecord
					pencilClick={handleRecordButton}
					onClick={() => {
						navigate(-1);
					}}
				>
					내 게시물 목록
				</HeaderBackRecord>

				<div className="w-full px-20 s:px-12">
					<SearchInput
						placeholder="검색어를 입력해주세요 😀"
						value={search}
						onChange={debounceSearch}
						onSubmit={handleSubmitButton}
					>
						검색
					</SearchInput>
				</div>

				{isLoading && posts && <PostList posts={posts} />}
				{isLoading && posts.length === 0 && !emptyData && !noResult && (
					<div className="translate-y-1/3">
						<EmptyContents>게시물이 없습니다 : &#40;</EmptyContents>
					</div>
				)}
				{myCommunityData.isLoading ||
					(!isLoading && (
						<div className="absolute top-1/2 -translate-y-1/2">
							<Spinner />
						</div>
					))}
			</div>
			<UpNav
				topClick={handleTopButton}
				hidden={!showPlusNav ? 'hidden' : ''}
				talkClick={handleChat}
			/>
		</>
	);
}

export default MyCommunity;
