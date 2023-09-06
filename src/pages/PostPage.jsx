import { useState } from 'react';
import PostList from '@/components/PostList';

function PostPage() {
	const [posts, setPosts] = useState([
		{ id: 1, title: 'First post', author: 'skawls', date: '2023-09-01' },
		{ id: 2, title: 'Second post', author: 'rjswn', date: '2023-09-02' },
		{ id: 2, title: 'third post', author: 'tndus', date: '2023-09-03' },
		// 추가적으로(?)
	]);

	const handleDeletePost = (postId) => {
		// 게시글 삭제 로직 구현
		// 삭제된 게시글을 제외한 새로운 게시글 목록 생성
		const updatedPosts = posts.filter((post) => post.id !== postId);

		// setPosts를 사용하여 상태 값 업데이트
		setPosts(updatedPosts);
	};

	return (
		<div>
			<h1>게시글 목록</h1>
			<PostList posts={posts} onDeletePost={handleDeletePost} />
		</div>
	);
}

export default PostPage;
