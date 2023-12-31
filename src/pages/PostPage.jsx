import pb from '@/api/pockethost';
import EmptyContents from '@/components/EmptyContents';
import Spinner from '@/components/Spinner';
import ChatModal from '@/components/chat/ChatModal';
import HeaderRecord from '@/components/header/HeaderRecord';
import SearchInput from '@/components/input/SearchInput';
import UpNav from '@/components/nav/UpNav';
import PostList from '@/components/post/PostList';
import usePostPage from '@/hooks/usePostPage';
import debounce from '@/utils/debounce';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

pb.autoCancellation(false);

function PostPage() {
	const [posts, setPosts] = useState([]);
	const [search, setSearch] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [showPlusNav, setShowPlusNav] = useState(false);
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

		try {
			const resultList = await pb.collection('community').getList(1, 200, {
				filter: `(nickName ~ "${e.target.value}" || content ~ "${e.target.value}" || title ~ "${e.target.value}")`,
				expand: 'author',
				sort: '-created',
			});

			const againCommunitypost = await pb
				.collection('community')
				.getList(1, 200, {
					expand: 'author',
					sort: '-created',
				});

			if (resultList.items.length > 0) {
				setPosts(resultList.items);
				setEmptyData(false);
				setIsLoading(true);
				setNoResult(false);
			} else if (e.target.value === '') {
				setPosts(againCommunitypost);
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

	const myPostPageData = usePostPage();

	useEffect(() => {
		if (myPostPageData.data) {
			setPosts(myPostPageData.data);
			setIsLoading(true);
		}
	}, [myPostPageData.data]);

	return (
		<>
			<Helmet>
				<title>커뮤니티 목록</title>
				<meta name="description" content="방탈러 홈페이지-커뮤니티 목록" />
				<meta property="og:title" content="방탈러 커뮤니티 목록" />
				<meta property="og:description" content="방탈러 커뮤니티 목록 페이지" />
				<meta
					property="og:url"
					content="https://escape12.netlify.app/postpage"
				/>
			</Helmet>
			{chat && <ChatModal onClick={() => setChat(false)} />}
			<div className="w-full max-w-[600px] min-w-[320px] text-lg py-20 bg-light-ec1 dark:bg-dark-ec4 text-light-ec4 dark:text-dark-ec1 flex flex-col items-center min-h-[100vh] m-auto gap-6">
				<HeaderRecord pencilClick={handleRecordButton}>
					커뮤니티 목록
				</HeaderRecord>
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
				{myPostPageData.isLoading ||
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

export default PostPage;
