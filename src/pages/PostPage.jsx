import { useState } from 'react';
import PostList from '@/components/post/PostList';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Nav from '@/components/Nav';
import SearchInput from '@/components/SearchInput';

function PostPage() {
	const [posts] = useState([
		{
			id: 1,
			title: '강남에 방탈출 카페 추천해주세요',
			author: '범쌤',
			date: '2023-09-01',
			content:
				'안녕하세요 주말에 여자친구랑 놀러 갈껀데 추천해주세요추천해주세요추천해주세요추천해주세요추천해주세요추천해주세요!!',
		},
		{
			id: 2,
			title: '방탈러 ㅎㅇㅌ',
			author: '수연',
			date: '2023-09-02',
			content: '멋쟁이 사자 프론트엔드6기',
		},
	]);

	/*const handleDeletePost = (postId) => {
		게시글 삭제 로직 구현
		삭제된 게시글을 제외한 새로운 게시글 목록 생성
		const updatedPosts = posts.filter((post) => post.id !== postId);

		setPosts를 사용하여 상태 값 업데이트
		setPosts(updatedPosts);
	};*/

	return (
		<>
			<Helmet>
				<title>게시글 목록</title>
			</Helmet>
			<div className="w-full max-w-[600px] min-w-[320px] py-20 bg-ec4 flex flex-col items-center min-h-[100vh] m-auto gap-14">
				<Header>게시글 목록</Header>
				<SearchInput placeholder="검색어를 입력해주세요😀">검색</SearchInput>
				<PostList posts={posts} />
				<Nav />
			</div>
		</>
	);
}

export default PostPage;
