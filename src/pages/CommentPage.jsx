import { Helmet } from 'react-helmet-async';
import Button from '@/components/Button';
import Nav from '@/components/Nav';
// import Header from '@/components/Header';
import CustomInput from '@/components/CustomInput';
import CommentList from '@/components/CommentList';
import Headerback from '@/components/Headerback';

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
				<div className="max-w-[600px] min-w-[320px] m-auto fixed top-0 left-0 right-0">
					<Headerback>게시글</Headerback>
				</div>
				{/* 게시글 내용 박스 */}
				<div>
					<div className="break-all text-[15px] w-full border p-4 rounded-xl min-w-[320px] items-center justify-center min-h-[200px] max-w-[320px]">
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
					<CustomInput
						type="text"
						name="text"
						className="flex items-center rounded-lg bg-ec1 text-ec4 h-8"
						placeholder="example@naver.com"
					></CustomInput>
				</fieldset>
				<Button type="submit" bg="bg-ec1" text="text-ec4">
					등록
				</Button>

				{/* 댓글 리스트 */}

				<div className="">
					{/* 각각의 댓글을 컴포넌트 보여주는 코드 (서버연결?)*/}
					<CommentList comments={dummyComments} />
				</div>

				<div className="max-w-[600px] min-w-[320px] m-auto fixed bottom-0 left-0 right-0">
					<Nav></Nav>
				</div>
			</div>
		</>
	);
}

export default CommentPage;
