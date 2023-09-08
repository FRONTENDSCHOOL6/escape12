import { useState } from 'react';
import PostList from '@/components/PostList';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Nav from '@/components/Nav';

function PostPage() {
	const [posts] = useState([
		{
			id: 1,
			title: '강남에 방탈출 카페 추천해주세요',
			author: '범쌤',
			date: '2023-09-01',
			content:
				'안녕하세요 주말에 여자친구랑 놀러 갈껀데 방탈출 카페 추천해주세요!',
		},
		{
			id: 2,
			title: '방탈러 ㅎㅇㅌ',
			author: '수연',
			date: '2023-09-02',
			content: '멋쟁이 사자 프론트엔드6기',
		},
		{
			id: 2,
			title: '방탈출 후기입니다!',
			author: '건주',
			date: '2023-09-03',
			content:
				'긴 게시글 만들기긴 게시글 만들기긴 게시글 ssssssssssssssssssssssssssssssssssssssssssssssssssssssssss만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기 긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기',
		},
		{
			id: 2,
			title: '방탈출 후기입니다!',
			author: '건주',
			date: '2023-09-03',
			content:
				'긴 게시글 만들기긴 게시글 만들기긴 게시글 ssssssssssssssssssssssssssssssssssssssssssssssssssssssssss만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기 긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기',
		},
		{
			id: 2,
			title: '방탈출 후기입니다!',
			author: '건주',
			date: '2023-09-03',
			content:
				'긴 게시글 만들기긴 게시글 만들기긴 게시글 ssssssssssssssssssssssssssssssssssssssssssssssssssssssssss만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기 긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기',
		},
		{
			id: 2,
			title: '방탈출 후기입니다!',
			author: '건주',
			date: '2023-09-03',
			content:
				'긴 게시글 만들기긴 게시글 만들기긴 게시글 ssssssssssssssssssssssssssssssssssssssssssssssssssssssssss만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기 긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기',
		},
		{
			id: 2,
			title: '방탈출 후기입니다!',
			author: '건주',
			date: '2023-09-03',
			content:
				'긴 게시글 만들기긴 게시글 만들기긴 게시글 ssssssssssssssssssssssssssssssssssssssssssssssssssssssssss만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기 긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기',
		},
		{
			id: 2,
			title: '방탈출 후기입니다!',
			author: '건주',
			date: '2023-09-03',
			content:
				'긴 게시글 만들기긴 게시글 만들기긴 게시글 ssssssssssssssssssssssssssssssssssssssssssssssssssssssssss만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기 긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기',
		},
		{
			id: 2,
			title: '방탈출 후기입니다!',
			author: '건주',
			date: '2023-09-03',
			content:
				'긴 게시글 만들기긴 게시글 만들기긴 게시글 ssssssssssssssssssssssssssssssssssssssssssssssssssssssssss만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기 긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기',
		},
		{
			id: 2,
			title: '방탈출 후기입니다!',
			author: '건주',
			date: '2023-09-03',
			content:
				'긴 게시글 만들기긴 게시글 만들기긴 게시글 ssssssssssssssssssssssssssssssssssssssssssssssssssssssssss만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기 긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기',
		},
		{
			id: 2,
			title: '방탈출 후기입니다!',
			author: '건주',
			date: '2023-09-03',
			content:
				'긴 게시글 만들기긴 게시글 만들기긴 게시글 ssssssssssssssssssssssssssssssssssssssssssssssssssssssssss만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기 긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기',
		},
		{
			id: 2,
			title: '방탈출 후기입니다!',
			author: '건주',
			date: '2023-09-03',
			content:
				'긴 게시글 만들기긴 게시글 만들기긴 게시글 ssssssssssssssssssssssssssssssssssssssssssssssssssssssssss만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기 긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기긴 게시글 만들기',
		},
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
			<div className="w-full max-w-[600px] min-w-[320px] py-20 bg-ec4 text-ec1 flex flex-col items-center h-full m-auto gap-14">
				<div className="max-w-[600px] min-w-[320px] m-auto fixed top-0 left-0 right-0">
					<Header>게시글 목록</Header>
				</div>
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
