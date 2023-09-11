import { Helmet } from 'react-helmet-async';
import Nav from '@/components/Nav';
import CommentList from '@/components/CommentList';
import Headerback from '@/components/Headerback';
import SearchInput from '@/components/SearchInput';
import CommentPost from '@/components/CommentPost';
import SmallButton from '@/components/SmallButton';

function CommentPage() {
	// 서버에서 불러오기
	const dummyComments = [
		{ id: 1, author: '작성자1', content: '댓글 내용1' },
		{ id: 2, author: '작성자2', content: '댓글 내용2' },
	];

	return (
		<>
			<Helmet>
				<title>게시글 상세</title>
			</Helmet>
			{/* 전체 페이지 */}

			<div className="max-w-[600px] min-w-[320px] text-ec1 bg-ec4 flex flex-col items-center min-h-[100vh] m-auto py-20 gap-10 relative">
				<Headerback>게시글</Headerback>
				<div className="min-w-[300px] w-full s:px-12 px-20">
					{/* 게시글 내용 박스 */}
					<CommentPost />
					{/*수정 삭제 버튼 */}
					<div className="flex justify-between m-auto">
						<SmallButton bg="bg-ec3" text="text-ec1">
							수정
						</SmallButton>
						<SmallButton bg="bg-ec3" text="text-ec1">
							삭제
						</SmallButton>
					</div>
				</div>

				{/* 댓글 작성창 */}
				<SearchInput placeholder="댓글을 입력해주세요😀">등록</SearchInput>

				{/* 댓글 리스트 */}
				{/* 각각의 댓글을 컴포넌트 보여주는 코드 (서버연결?)*/}
				<CommentList comments={dummyComments} />
				<Nav />
			</div>
		</>
	);
}

export default CommentPage;
