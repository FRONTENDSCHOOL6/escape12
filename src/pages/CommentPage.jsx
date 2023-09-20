import pb from '@/api/pockethost';
import Post from '@/components/comment/Post';
import Headerback from '@/components/header/Headerback';
import SmallButton from '@/components/button/SmallButton';
import Nav from '@/components/nav/Nav';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import SubmitInput from '@/components/input/SubmitInput';
import CommentItem from '@/components/comment/Commentitem';
import Spinner from '@/components/Spinner';
import Button from '@/components/button/Button';
import noImage from '@/assets/noImage.png';
import { getUserInfoFromStorage } from '@/api/getUserInfo';

function CommentPage() {
	const userUId = getUserInfoFromStorage();
	const { dataId } = useParams();
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [comment, setComment] = useState([]);
	const [commentInput, setCommentInput] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [community, setCommunity] = useState([]);

	const handleDeleteRecord = async () => {
		const deleteConfirm = confirm('정말로 삭제하시겠습니까?');
		const currentUserID = userUId?.model.id;
		const postAuthorID = data.expand?.author?.id;

		if (
			deleteConfirm &&
			(currentUserID === postAuthorID || userUId?.model.admin)
		) {
			const array = community.filter(
				(i) => i !== `${data.expand?.community?.id}`
			);

			const updateCommunity = { escapeList: array };

			try {
				await pb.collection('community').delete(`${dataId}`);
				await pb
					.collection('users')
					.update(`${userUId.model.id}`, updateCommunity);

				comment.map(async (item) => {
					await pb.collection('comment').delete(`${item.id}`);
				});

				toast('삭제되었습니다', {
					icon: '🗑️',
					duration: 2000,
				});

				navigate('/postpage');
			} catch (err) {
				console.log(`삭제 에러: ${err}`);
			}
		}
	};

	const handleEditRecord = () => {
		const currentUserID = userUId?.model.id;
		const postAuthorID = data.expand?.author?.id;

		if (currentUserID === postAuthorID) {
			try {
				navigate(`/AddCommunity/edit/${dataId}`);
			} catch (err) {
				console.log(`수정 에러: ${err}`);
			}
		}
	};

	const handleComment = async (e) => {
		setCommentInput(e.target.value);
	};

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

	useEffect(() => {
		const handleUserCommunity = async () => {
			const userCommunityData = await pb
				.collection('users')
				.getOne(`${userUId.model.id}`);
			try {
				setCommunity(userCommunityData.community);
			} catch (err) {
				console.log(`userCommunity 불러오기 에러: ${err}`);
			}
		};

		handleUserCommunity();
	}, []);

	console.log(data);

	return (
		<div>
			<Helmet>
				<title>게시글 상세</title>
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] text-lg bg-ec4 flex flex-col gap-3 bg-light-ec1 dark:bg-dark-ec4 text-light-ec4 dark:text-dark-ec1 items-center min-h-[100vh] m-auto px-20 s:px-12 py-24 relative">
				<Headerback
					onClick={() => {
						navigate(-1);
					}}
				>
					게시글
				</Headerback>
				{!isLoading && (
					<div className="absolute top-1/2 -translate-y-1/2">
						<Spinner />
					</div>
				)}
				{isLoading && (
					<>
						<div className="min-w-[300px] w-full">
							<div className="text-right">
								<span className="text-ec1">
									{!data.created
										? data.community.created
										: data.created.slice(0, 10)}
								</span>
							</div>
							{data && (
								<>
									<Post
										src={
											data.expand?.author?.avatar
												? `https://refresh.pockethost.io/api/files/${data.expand?.author?.collectionId}/${data.expand?.author?.id}/${data.expand?.author?.avatar}`
												: `${noImage}`
										}
										alt={data.expand?.author?.nickName || '탈퇴회원'}
										title={data.title}
										author={data.expand?.author?.nickName || '탈퇴회원'}
										content={data.content}
									></Post>
								</>
							)}
							{userUId?.model.id === data.expand?.author?.id && (
								<div className="flex justify-between m-auto">
									<SmallButton
										bg="bg-ec3"
										text="text-ec1"
										onClick={handleEditRecord}
									>
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
							)}
							{userUId?.model.admin ? (
								<div className="w-full flex justify-center pb-3">
									<Button
										bg="bg-ec1"
										text="text-ec4"
										onClick={handleDeleteRecord}
									>
										삭제
									</Button>
								</div>
							) : (
								''
							)}
						</div>
						<div className="w-full border-t-2 pt-6 mt-2 border-ec1">
							<SubmitInput
								placeholder="댓글을 입력해주세요 😀"
								value={commentInput}
								onChange={handleComment}
								onSubmit={handleSubmitComment}
								text="px-0 dark:text-dark-ec4 my-4"
							>
								등록
							</SubmitInput>

							<ul className="flex flex-col gap-4 text-lg w-full text-ec1 ">
								{comment &&
									comment.map((item) => {
										// 댓글 삭제하기
										const handleDeleteComment = async () => {
											const result = confirm('댓글을 삭제하시겠습니까?');

											if (result) {
												await pb.collection('comment').delete(`${item.id}`);
												location.reload();
											}
										};

										return (
											<li key={item.id} className="w-full flex gap-3">
												<CommentItem
													src={`https://refresh.pockethost.io/api/files/${item.expand?.author?.collectionId}/${item.expand?.author?.id}/${item.expand?.author?.avatar}`}
													alt={item.expand?.author?.nickName}
													nickName={item.expand?.author?.nickName}
													comment={item.content}
													userId={item.expand?.author?.id}
													id={item.id}
													onClick={handleDeleteComment}
												/>
											</li>
										);
									})}
							</ul>
						</div>
						{''}
					</>
				)}
			</div>
			<Nav />
		</div>
	);
}

export default CommentPage;
