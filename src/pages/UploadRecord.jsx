import pb from '@/api/pockethost';
import userUId from '@/api/userUid';
import noImage from '@/assets/noImage.png';
import clover from '@/assets/upload-clover.png';
import Spinner from '@/components/Spinner';
import Button from '@/components/button/Button';
import CommentItem from '@/components/comment/Commentitem';
import Headerback from '@/components/header/Headerback';
import SubmitInput from '@/components/input/SubmitInput';
import Nav from '@/components/nav/Nav';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import debounce from './../utils/debounce';

function UploadRecord() {
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
				await pb.collection('record').delete(`${dataId}`);

				toast('삭제되었습니다', {
					icon: '🗑️',
					duration: 2000,
				});

				navigate('/theme');
			}
		} catch (err) {
			console.log(`삭제 에러: ${err}`);
		}
	};

	//수정 기능
	const handleEditRecord = () => {
		try {
			navigate(`/theme/edit/${dataId}`);
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
			record: `${dataId}`,
		};

		try {
			const resultCommentData = await pb
				.collection('comment')
				.create(commentData);

			const recordComment = {
				comment: [`${resultCommentData.id}`],
				commentAuthor: [`${userUId?.model.id}`],
			};

			await pb.collection('record').update(`${dataId}`, recordComment);

			toast('등록되었습니다 :)', {
				icon: '💛',
				duration: 2000,
			});

			setCommentInput('');
		} catch (err) {
			console.log(`댓글 등록 에러: ${err}`);
		}
	};

	//데이터 불러오기
	useEffect(() => {
		const handleRecordData = async () => {
			const recordData = await pb.collection('record').getOne(`${dataId}`, {
				expand: 'escapeList, author, comment, commentAuthor',
			});

			const commentData = await pb.collection('comment').getList(1, 200, {
				filter: `record = "${dataId}"`,
				expand: 'author, record',
			});

			try {
				setData(recordData);
				setComment(commentData.items);
				setIsLoading(true);
			} catch (err) {
				console.log(`에러 내용: ${err}`);
			}
		};

		handleRecordData();
	}, [dataId]);

	console.log(data);

	return (
		<div>
			<Helmet>
				<title>
					{`${!data.theme ? data.expand?.escapeList?.theme : data.theme} 기록`}
				</title>
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center justify-center min-h-[100vh] m-auto relative py-24 text-lg gap-5 px-20 s:px-12">
				<Headerback
					onClick={() => {
						navigate(-1);
					}}
				>
					{!isLoading
						? '로딩중'
						: !data.theme
						? data.expand?.escapeList?.theme
						: data.theme}
				</Headerback>
				{!isLoading && (
					<div className="absolute top-1/2 -translate-y-1/2">
						<Spinner />
					</div>
				)}
				{isLoading && data && (
					<>
						<section className="flex flex-row-reverse items-center gap-4 w-full">
							<div className="flex flex-col gap-3 s:gap-1 whitespace-nowrap flex-1">
								<h3 className="text-2xl">
									{!data.store ? data.expand?.escapeList?.store : data.store}
									<span className="ml-3 s:ml-2">
										{data.point
											? `${data.expand?.escapeList.point}점`
											: data.point}
									</span>
								</h3>
								<div className="flex justify-between">
									<p className="flex">
										{data.expand?.author?.nickName}
										<img
											className="w-6 mr-1"
											src={clover}
											alt="회원등급"
											aria-hidden
										/>
									</p>
									<span>
										{!data.date ? data.expand?.escapeList.created : data.date}
									</span>
								</div>
							</div>
							<div className="w-20 h-20">
								<img
									className="w-full h-full rounded-full"
									src={`https://refresh.pockethost.io/api/files/${data.expand?.author?.collectionId}/${data.expand?.author?.id}/${data.expand?.author?.avatar}`}
									alt={data.expand?.author?.nickName}
									aria-hidden
								/>
							</div>
						</section>
						<img
							className="w-[50%]"
							src={
								data.image
									? `https://refresh.pockethost.io/api/files/${data.collectionId}/${data.id}/${data.image}`
									: data.expand?.escapeList?.image || noImage
							}
							alt={data.expand?.escapeList?.theme}
						/>
						<section className="w-full">
							<ul className="flex justify-between pb-4 font-semibold">
								<li>
									⭐
									{!data.grade && data.grade !== 0
										? data.expand?.escapeList.grade
										: data.grade}
								</li>
								<li>
									{!data.hour ? '0' : data.hour}
									<span className="px-2">:</span>
									<span className="pr-2">
										{!data.minute ? '00' : data.minute}
									</span>
									LEFT
								</li>
							</ul>
							<div className="min-h-[160px] w-full bg-opacity border-2 p-4 rounded-lg">
								{data.content}
							</div>
						</section>
						<section className="w-full flex justify-between pb-3">
							<Button bg="bg-ec1" text="text-ec4" onClick={handleDeleteRecord}>
								삭제
							</Button>
							<Button bg="bg-ec1" text="text-ec4" onClick={handleEditRecord}>
								수정
							</Button>
						</section>
						<div className="w-full pt-4 border-t-2">
							<SubmitInput
								placeholder="댓글을 입력해주세요 ☺️"
								value={commentInput}
								onChange={handleComment}
								onSubmit={handleSubmitComment}
								text="text-ec4 my-4 px-0"
							>
								등록
							</SubmitInput>

							<ul className="flex flex-col gap-4 text-lg w-full">
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
					</>
				)}
			</div>
			<Nav />
		</div>
	);
}

export default UploadRecord;
