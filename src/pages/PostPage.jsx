import { useState, useEffect } from 'react';
import PostList from '@/components/post/PostList';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/header/Header';
import SearchInput from '@/components/input/SearchInput';
import pb from '@/api/pockethost';
import PlusNav from '@/components/nav/PlusNav';
import { useNavigate } from 'react-router-dom';

pb.autoCancellation(false);

function PostPage() {
	const [posts, setPosts] = useState([]);
	const [search, setSearch] = useState('');
	const [IsLoading, setIsLoading] = useState(false);
	const [showPlusNav, setShowPlusNav] = useState(false);
	const navigate = useNavigate();

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
			setIsLoading(true);

			console.log(communitypost.items);
			try {
				setPosts(communitypost.items);
			} catch (err) {
				console.log(`에러 내용: ${err}`);
			} finally {
				setTimeout(() => {
					setIsLoading(false);
				}, 500);
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
				filter: `(author ~ "${e.target.value}" || content ~ "${e.target.value}")`,
			});

			if (resultList.items.length > 0) {
				setPosts(resultList.items);
			} else if (e.target.value === '') {
				const data = await pb.collection('community').getList(1, 200);

				setPosts(data.items);
			}
		} catch (err) {
			console.log(`검색 에러 내용 : ${err}`);
		} finally {
			setTimeout(() => {
				setIsLoading(false);
			}, 500);
		}
	};

	return (
		<>
			<Helmet>
				<title>게시글 목록</title>
			</Helmet>

			<div className="w-full max-w-[600px] min-w-[320px] py-20 bg-ec4 flex flex-col items-center min-h-[100vh] m-auto gap-14">
				<Header>게시글 목록</Header>

				<SearchInput
					placeholder="검색어를 입력해주세요😀"
					value={search}
					onChange={handleSearch}
				>
					검색
				</SearchInput>
				<PostList posts={posts} />
				{/* {!isLoading &&
					posts.map((post) => <PostList key={post.id} post={post} />)} */}

				<PlusNav
					topClick={handleTopButton}
					pencilClick={handleRecordButton}
					hidden={!showPlusNav ? 'hidden' : ''}
				/>
			</div>
		</>
	);
}

export default PostPage;
