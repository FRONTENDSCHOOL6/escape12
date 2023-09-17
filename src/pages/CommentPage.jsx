import pb from '@/api/pockethost';
import Post from '@/components/comment/Post';
import Headerback from '@/components/header/Headerback';
import SmallButton from '@/components/button/SmallButton';
import Nav from '@/components/nav/Nav';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import debounce from './../utils/debounce';
import SubmitInput from '@/components/input/SubmitInput';
import userUId from '@/api/userUid';
import CommentItem from '@/components/comment/Commentitem';
import Spinner from '@/components/Spinner';

function CommentPage() {
	const { dataId } = useParams();
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [comment, setComment] = useState([]);
	const [commentInput, setCommentInput] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	//삭제 기능
	const handleDeleteRecord = async () => {
		const deleteConfirm = confirm('정말로 삭제하시겠습니까?');

		try {
			if (deleteConfirm) {
				await pb.collection('community').delete(`${dataId}`);

				toast('삭제되었습니다', {
					icon: '🗑️',
					duration: 2000,
				});

				navigate('/postpage');
			}
		} catch (err) {
			console.log(`삭제 에러: ${err}`);
		}
	};

	//수정 기능
	const handleEditRecord = () => {
		try {
			navigate(`/AddCommunity/edit/${dataId}`);
		} catch (err) {
			console.log(`수정 에러: ${err}`);
		}
	};

	// 댓글 입력하기
	const handleComment = async (e) => {
		setCommentInput(e.target.value);
		debounce((e) => e.target.value);
	};

	// 등록 버튼
	const handleSubmitComment = async (e) => {
		e.preventDefault();
		const commentData = {
			content: commentInput,
			author: `${userUId?.model.id}`,
			community: `${dataId}`,
		};

		try {
			await pb.collection('comment').create(commentData);
			console.log(commentData);
			toast('등록되었습니다 :)', {
				icon: '💛',
				duration: 2000,
			});
			location.reload();

			setCommentInput('');
		} catch (err) {
			console.log(`댓글 등록 에러: ${err}`);
		}
	};

	//게시글 불러오기
	//게시글 및 댓글 정보 불러오기
	useEffect(() => {
		const dataList = async () => {
			const record = await pb.collection('community').getOne(`${dataId}`, {
				expand: 'author,comment',
			});
			const commentData = await pb.collection('comment').getList(1, 200, {
				filter: `community = "${dataId}"`,
				expand: 'author, community',
				sort: '-created',
			});
			try {
				setData(record);
				setComment(commentData.items);
				setIsLoading(true);
			} catch (err) {
				console.log(`에러 내용: ${err}`);
			}
		};
		dataList();
	}, [dataId]);

	console.log(comment);
	return (
		<div>
			<Helmet>
				<title>게시글 상세</title>
			</Helmet>
			{/* 전체 페이지 */}

			<div className="max-w-[600px] min-w-[320px] bg-ec4 flex flex-col items-center min-h-[100vh] m-auto px-20 s:px-12 py-24 gap-10 relative">
				<Headerback
					onClick={() => {
						navigate(-1);
					}}
				>
					게시글
				</Headerback>
				<div className="min-w-[300px] w-full">
					{/* 게시글 내용 박스 */}
					{data && (
						<Post
							title={data.title}
							author={data.expand?.author?.nickName}
							content={data.content}
						/>
					)}

					<div className="flex justify-between m-auto">
						<SmallButton bg="bg-ec3" text="text-ec1" onClick={handleEditRecord}>
							수정
						</SmallButton>
						<SmallButton
							bg="bg-ec3"
							text="text-ec1"
							onClick={handleDeleteRecord}
						>
							삭제
						</SmallButton>
					</div>
				</div>

				{/* 댓글 작성창 */}
				<div className="w-full border-t-2 pt-6 border-ec1">
					<SubmitInput
						placeholder="댓글을 입력해주세요 😀"
						value={commentInput}
						onChange={handleComment}
						onSubmit={handleSubmitComment}
						text="px-0 text-ec4 my-4"
					>
						등록
					</SubmitInput>

					{/* 댓글 리스트 */}

					{!isLoading && (
						<div className="absolute top-1/2 -translate-y-1/2">
							<Spinner />
						</div>
					)}
					<ul className="flex flex-col gap-4 text-lg w-full text-ec1">
						{isLoading &&
							comment &&
							comment.map((item) => {
								return (
									<li key={item.id} className="w-full flex gap-3">
										<CommentItem
											src={`https://refresh.pockethost.io/api/files/${item.expand?.author?.collectionId}/${item.expand?.author?.id}/${item.expand?.author?.avatar}`}
											alt={item.expand?.author?.nickName}
											nickName={item.expand?.author?.nickName}
											comment={item.content}
										/>
									</li>
								);
							})}
					</ul>
				</div>
				<Nav />
			</div>
		</div>
	);
}

export default CommentPage;
