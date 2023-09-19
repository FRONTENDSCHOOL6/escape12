import pb from '@/api/pockethost';
import Headerback from '@/components/header/Headerback';
// import SmallButton from '@/components/button/SmallButton';
import Nav from '@/components/nav/Nav';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import MyCommentItem from '@/components/mycomment/MyCommentItem';
import Spinner from '@/components/Spinner';
import { getUserInfoFromStorage } from '@/api/getUserInfo';

function MyCommentPage() {
	// const { dataId } = useParams();
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
	}, []);

	console.log(comment);
	return (
		<>
			<Helmet>
				<title>내 댓글 목록</title>
			</Helmet>

			<div className="w-full max-w-[600px] min-w-[320px] bg-light-ec1 dark:bg-dark-ec1 text-light-ec4 dark:text-dark-ec4 py-20 bg-ec4 flex flex-col items-center min-h-[100vh] m-auto gap-14">
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
					{isLoading &&
						comment.map((item) => (
							<MyCommentItem
								key={item.id}
								id={item.id}
								src={`https://refresh.pockethost.io/api/files/${item.expand?.author?.collectionId}/${item.expand?.author?.id}/${item.expand?.author?.avatar}`}
								alt={item.expand?.author?.nickName}
								nickName={item.expand?.author?.nickName}
								comment={item.content}
								postId={item.community || item.record}
								postTitle={
									item.expand?.community?.title || item.expand?.record?.theme
								}
								postType={item.community ? 'community' : 'record'}
							/>
						))}
				</div>

				<Nav />
			</div>
		</>
	);
}

export default MyCommentPage;
