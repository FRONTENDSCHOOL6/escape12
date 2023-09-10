import { Helmet } from 'react-helmet-async';
import Nav from '@/components/Nav';
// import Header from '@/components/Header';
import CommentList from '@/components/comment/CommentList';
import Headerback from '@/components/Headerback';
import SearchInput from '@/components/SearchInput';

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

			<div className="w-full max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center py-20 h-screen m-auto gap-10 overflow-y-auto h-[calc(100vh - 200px)]">
				<Headerback>게시글</Headerback>
				{/* 게시글 내용 박스 */}
				<div>
					<div className="break-all s:px-3 text-[15px] w-full border p-4 rounded-xl min-w-[320px] items-center justify-center min-h-[200px] max-w-[320px]">
						<p className="font-bold  mb-2 pb-2 border-b-2">프로필 사진+id값</p>
						<p>게시글 내용 너무 재밌어요~~</p>
					</div>
					{/*수정 삭제 버튼 */}
					<div className="flex items-center w-[320px] justify-between mt-2">
						<button
							className="bg-ec3 text-[15px] w-[40px] h-8 hover:text-ec5 rounded-lg text-ec1"
							type="button"
						>
							수정
						</button>
						<button
							className="bg-ec3 text-[15px] w-[40px] h-8 hover:text-ec5 rounded-lg text-ec1"
							type="button"
						>
							삭제
						</button>
					</div>
				</div>
				{/* 댓글 작성창 */}
				<fieldset className="flex flex-col justify-between  items-center text-ec4">
					<SearchInput placeholder="댓글을 입력해주세요😀">등록</SearchInput>
				</fieldset>
				{/* 댓글 리스트 */}

				<div className="">
					{/* 각각의 댓글을 컴포넌트 보여주는 코드 (서버연결?)*/}
					<CommentList comments={dummyComments} />
				</div>
				<Nav />
			</div>
		</>
	);
}

export default CommentPage;
