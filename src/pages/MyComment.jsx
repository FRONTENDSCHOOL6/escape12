import pb from '@/api/pockethost';
import Headerback from '@/components/header/Headerback';
import Nav from '@/components/nav/Nav';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import MyCommentItem from '@/components/mycomment/MyCommentItem';
import Spinner from '@/components/Spinner';
import { getUserInfoFromStorage } from '@/api/getUserInfo';
import toast from 'react-hot-toast';

function MyCommentPage() {
	const userUId = getUserInfoFromStorage();
	const navigate = useNavigate();
	const [comment, setComment] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const MyComment = async () => {
			const CommentList = await pb.collection('comment').getList(1, 200, {
				filter: `author="${userUId?.model.id}"`,
				expand: 'author , community , record',
				sort: '-created',
			});
			try {
				if (CommentList.items.length > 0) {
					setComment(CommentList.items);
					setIsLoading(true);
				}
			} catch (err) {
				console.log(`데이터 불러오기 에러 : ${err}`);
			}
		};

		MyComment();
	}, [userUId?.model.id]);

	return (
		<>
			<Helmet>
				<title>나의 댓글 목록</title>
				<meta name="description" content="방탈러 홈페이지-나의 댓글 목록" />
				<meta property="og:title" content="방탈러 나의 댓글 목록" />
				<meta
					property="og:description"
					content="방탈러 나의 댓글 목록 페이지"
				/>
				<meta
					property="og:url"
					content="https://escape12.netlify.app/mycomment"
				/>
			</Helmet>

			<div className="w-full max-w-[600px] min-w-[320px] text-lg bg-light-ec1 dark:bg-dark-ec4 text-light-ec4 dark:text-dark-ec1 py-20 bg-ec4 flex flex-col items-center min-h-[100vh] m-auto gap-14">
				<Headerback
					onClick={() => {
						navigate(-1);
					}}
				>
					내 댓글 목록
				</Headerback>

				{!isLoading && (
					<div className="absolute top-1/2 -translate-y-1/2">
						<Spinner />
					</div>
				)}
				<div className="s:px-12 w-full px-20">
					<div className="flex justify-between pb-6">
						<span>📕 커뮤니티 댓글</span>
						<span>🎫 기록 댓글</span>
					</div>
					<ul>
						{isLoading &&
							comment.map((item) => {
								const handleDeletecomment = async () => {
									const deleteConfirm = confirm('정말로 삭제하시겠습니까?');
									try {
										if (deleteConfirm) {
											toast('삭제되었습니다', {
												icon: '🗑️',
												duration: 800,
											});

											await pb.collection('comment').delete(`${item.id}`);

											const againCommentList = await pb
												.collection('comment')
												.getList(1, 200, {
													filter: `author="${userUId?.model.id}"`,
													expand: 'author , community , record',
													sort: '-created',
												});

											setComment(againCommentList.items);
										}
									} catch (err) {
										console.log(`삭제 에러: ${err}`);
									}
								};
								return (
									<li key={item.id}>
										<MyCommentItem
											id={item.id}
											src={`https://refresh.pockethost.io/api/files/${item.expand?.author?.collectionId}/${item.expand?.author?.id}/${item.expand?.author?.avatar}`}
											alt={item.expand?.author?.nickName}
											nickName={item.expand?.author?.nickName}
											comment={item.content}
											postId={item.community || item.record}
											postTitle={
												item.expand?.community?.title ||
												item.expand?.record?.theme
											}
											postType={item.community ? 'community' : 'record'}
											onClick={handleDeletecomment}
										/>
									</li>
								);
							})}
					</ul>
				</div>
			</div>
			<Nav />
		</>
	);
}

export default MyCommentPage;
