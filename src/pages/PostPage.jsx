import pb from '@/api/pockethost';
import EmptyContents from '@/components/EmptyContents';
import Spinner from '@/components/Spinner';
import HeaderRecord from '@/components/header/HeaderRecord';
import SearchInput from '@/components/input/SearchInput';
import UpNav from '@/components/nav/UpNav';
import PostList from '@/components/post/PostList';
import debounce from '@/utils/debounce';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

pb.autoCancellation(false);

function PostPage() {
	const [posts, setPosts] = useState([]);
	const [search, setSearch] = useState('');
	const [IsLoading, setIsLoading] = useState(false);
	const [showPlusNav, setShowPlusNav] = useState(false);
	const navigate = useNavigate();
	const [emptyData, setEmptyData] = useState(false);
	const [noResult, setNoResult] = useState(false);

	//기록하기 버튼 이벤트
	const handleRecordButton = () => {
		navigate('/addcommunity');
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
	// 포켓호스트 가져오기
	useEffect(() => {
		const Snslist = async () => {
			const communitypost = await pb.collection('community').getList(1, 200, {
				expand: 'comment,author',
				sort: '-created',
			});

			console.log(communitypost.items);
			try {
				setPosts(communitypost.items);
				setIsLoading(true);
			} catch (err) {
				console.log(`에러 내용: ${err}`);
			}
		};

		Snslist();
	}, []);

	//검색 기능
	const handleSearch = async (e) => {
		if (e.target.value.length !== 0) {
			setSearch(e.target.value);
		} else {
			setSearch('');
		}

		setIsLoading(true);

		try {
			const resultList = await pb.collection('community').getList(1, 200, {
				filter: `(author ~ "${e.target.value}" || content ~ "${e.target.value}" || title ~ "${e.target.value}")`,
			});

			if (resultList.items.length > 0) {
				setPosts(resultList.items);
				setEmptyData(false);
				setIsLoading(true);
				setNoResult(false);
			} else if (e.target.value === '') {
				const data = await pb.collection('community').getList(1, 200);
				setPosts(data.items);
				setEmptyData(false);
				setIsLoading(true);
				setNoResult(false);
			}
		} catch (err) {
			console.log(`검색 에러 내용 : ${err}`);
		} finally {
			setTimeout(() => {
				setIsLoading(false);
			}, 500);
		}
	};

	const debounceSearch = debounce((e) => handleSearch(e));

	// 검색 버튼
	const handleSubmitButton = (e) => {
		e.preventDefault();
	};
	console.log(posts);
	return (
		<>
			<Helmet>
				<title>커뮤니티 목록</title>
			</Helmet>

			<div className="w-full max-w-[600px] min-w-[320px] py-20 bg-light-ec1 dark:bg-dark-ec1 text-light-ec4 dark:text-dark-ec4 flex flex-col items-center min-h-[100vh] m-auto gap-14">
				<HeaderRecord pencilClick={handleRecordButton}>
					커뮤니티 목록
				</HeaderRecord>

				<SearchInput
					placeholder="검색어를 입력해주세요😀"
					value={search}
					onChange={debounceSearch}
					onSubmit={handleSubmitButton}
				>
					검색
				</SearchInput>
				<PostList posts={posts} />
				{IsLoading && posts.length === 0 && !emptyData && !noResult && (
					<div className="translate-y-1/3">
						<EmptyContents>기록이 없습니다 : &#40;</EmptyContents>
					</div>
				)}
				{!IsLoading && (
					<div className="absolute top-1/2 -translate-y-1/2">
						<Spinner />
					</div>
				)}

				<UpNav
					topClick={handleTopButton}
					hidden={!showPlusNav ? 'hidden' : ''}
				/>
			</div>
		</>
	);
}

export default PostPage;
