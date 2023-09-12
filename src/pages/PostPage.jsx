import { useState, useEffect } from 'react';
import PostList from '@/components/post/PostList';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Nav from '@/components/Nav';
import SearchInput from '@/components/SearchInput';
import pb from '@/api/pockethost';

pb.autoCancellation(false);

function PostPage() {
	const [posts, setPosts] = useState([]);
	const [search, setSearch] = useState('');
	const [IsLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const Snslist = async () => {
			const communitypost = await pb.collection('community').getList(1, 200, {
				expand: 'comment,author',
			});
			setIsLoading(true);

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

				<Nav />
			</div>
		</>
	);
}

export default PostPage;
