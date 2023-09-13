import { Helmet } from 'react-helmet-async';
import Nav from '@/components/Nav';
// import CommentList from '@/components/CommentList';
import CommentList from '@/components/comment/CommentList';
import Post from '@/components/comment/Post';
import Headerback from '@/components/Headerback';
import SearchInput from '@/components/SearchInput';
import SmallButton from '@/components/SmallButton';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import pb from '@/api/pockethost';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CommentPage() {
	const [data, setData] = useState([]);
	const { dataId } = useParams();

	// const formRef = useRef(null);
	// const authorRef = useRef(null);
	// const contentRef = useRef(null);

	// // const [author, setAuthor] = useState([]);
	// // const [content, setContent] = useState([]);

	// // 서버에서 불러오기
	// const handleComment = async (e) => {
	// 	e.preventDefault();

	// 	// const authorValue = authorRef.current.value;
	// 	const contentValue = contentRef.current.value;

	// 	// if (!authorValue && contentValue) {
	// 	// 	toast('작성자, 댓글을 입력해주세요😀', {
	// 	// 		icon: '📢',
	// 	// 		// 	ariaProps: {
	// 	// 		// 		role: 'status',
	// 	// 		// 		'aria-live': 'polite',
	// 	// 		//   },
	// 	// 	});

	// 	// return;
	// 	// }

	// 	const formData = new FormData();

	// 	// formData.append('author', authorValue);
	// 	formData.append('content', contentValue);

	// 	try {
	// 		await pb.collection('comment').create(formData);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	// const handleReset = () => {
	// 	authorRef.current.value = '';
	// 	contentRef.current.value = '';
	// 	// setFileImages([]);
	// };

	//게시글 불러오기
	useEffect(() => {
		const dataList = async () => {
			try {
				const record = await pb.collection('community').getOne(`${dataId}`, {
					expand: 'comment,author',
				});

				setData(record);
			} catch (err) {
				console.log(`에러 내용: ${err}`);
			}
		};
		dataList();
	}, [dataId]);

	return (
		<>
			<Helmet>
				<title>게시글 상세</title>
			</Helmet>
			{/* 전체 페이지 */}

			<div className="max-w-[600px] min-w-[320px] bg-ec4 flex flex-col items-center min-h-[100vh] m-auto py-20 gap-10 relative">
				<Headerback>게시글</Headerback>
				<div className="min-w-[300px] w-full s:px-12 px-20">
					{/* 게시글 내용 박스 */}
					<Post
						title={data.title}
						author={data.author}
						content={data.content}
					/>
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
				{/* <form ref={formRef} onSubmit={handleComment} onReset={handleReset}>
					<input
						type="text"
						placeholder="댓글을 입력해주세요😀"
						ref={contentRef}
					/> */}
				{/* <button type="submit">등록</button>
				</form> */}
				{/* 댓글 리스트 */}
				{/* 각각의 댓글을 컴포넌트 보여주는 코드 (서버연결?)*/}
				{/* <CommentList comments={data} /> */}
				<Nav />
			</div>
		</>
	);
}

export default CommentPage;
