import { Helmet } from 'react-helmet-async';
import Nav from '@/components/Nav';
import Post from '@/components/comment/Post';
import Headerback from '@/components/Headerback';
import SmallButton from '@/components/SmallButton';
import { useRef } from 'react';
import pb from '@/api/pockethost';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Commentitem from '@/components/comment/Commentitem';

function CommentPage() {
	const [data, setData] = useState([]);
	const { dataId } = useParams();
	const [comment, setComment] = useState([]);
	const [nickName, setNickName] = useState(null);
	const formRef = useRef(null);
	const authorRef = useRef(null);
	const contentRef = useRef(null);

	// // const [author, setAuthor] = useState([]);
	// const [content, setContent] = useState([]);

	// // 서버에서 불러오기
	const handleComment = async (e) => {
		e.preventDefault();

		const authorValue = authorRef.current.value;
		const contentValue = contentRef.current.value;
		const formData = new FormData();

		formData.append('author', authorValue);
		formData.append('content', contentValue);

		try {
			await pb.collection('comment').create(formData);
		} catch (error) {
			console.error(error);
		}
	};

	//게시글 불러오기
	//게시글 및 댓글 정보 불러오기
	useEffect(() => {
		const dataList = async () => {
			const record = await pb.collection('community').getOne(`${dataId}`, {
				expand: 'author,commentid',
			});
			console.log(record);
			try {
				setData(record);
				setComment(record?.expand?.commentid);
				setNickName(record?.expand?.author);
			} catch (err) {
				console.log(`에러 내용: ${err}`);
			}
		};
		dataList();
	}, [dataId]);

	console.log(data);
	const handleReset = () => {
		authorRef.current.value = '';
		contentRef.current.value = '';
		// setFileImages([]);
	};
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
					{data && (
						<Post
							title={data.title}
							author={data.expand?.author?.nickName}
							content={data.content}
						/>
					)}
					{/* <Post
						title={data.title}
						author={data.expand?.author.nickName}
						content={data.content}
					/> */}
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
				<form
					className="flex gap-4 w-full my-5 px-20 justify-center text-lg pb-4"
					ref={formRef}
					onSubmit={handleComment}
					onReset={handleReset}
				>
					<input
						type="text"
						placeholder="댓글을 입력해주세요😀"
						ref={contentRef}
						className="pl-3 py-1 rounded-full focus:outline-none flex-1"
					/>
					<button
						className="min-w-fit bg-ec1 rounded-lg px-2 font-semibold leading-7"
						type="submit"
					>
						등록
					</button>
				</form>
				{/* 댓글 리스트 */}

				{data && (
					<div className="w-full flex flex-col pt-10 px-[15%]">
						{comment.map((item) => {
							return (
								<Commentitem
									key={item.id}
									author={nickName?.nickName}
									content={item?.content}
								/>
							);
						})}
					</div>
				)}

				<Nav />
			</div>
		</>
	);
}

export default CommentPage;

//data.comment && data.comment.length !== 0 &&
