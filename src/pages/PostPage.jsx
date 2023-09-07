import { useState } from 'react';
import PostList from '@/components/PostList';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Nav from '@/components/Nav';

function PostPage() {
	const [posts] = useState([
		{ id: 1, title: 'First post', author: 'skawls', date: '2023-09-01' },
		{ id: 2, title: 'Second post', author: 'rjswn', date: '2023-09-02' },
		{ id: 2, title: 'Third post', author: 'tndus', date: '2023-09-03' },
		// 추가적으로(?)
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
			<div className="w-full max-w-[600px] min-w-[320px] bg-ec4  text-ec1 flex flex-col items-center h-screen m-auto gap-14">
				<Header>게시글 목록</Header>
				<div className="text-[15px]">
					<PostList posts={posts} />
				</div>
				<div className="max-w-[600px] min-w-[320px] m-auto fixed bottom-0 left-0 right-0">
					<Nav></Nav>
				</div>
			</div>
		</>
	);
}

export default PostPage;
