import pb from '@/api/pockethost';
import Headerback from '@/components/header/Headerback';
// import SmallButton from '@/components/button/SmallButton';
import Nav from '@/components/nav/Nav';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import userUId from '@/api/userUid';
import MyCommentItem from '@/components/mycomment/MyCommentItem';

function MyCommentPage() {
	// const { dataId } = useParams();
	const navigate = useNavigate();
	const [comment, setComments] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const MyComment = async () => {
			setIsLoading(true);

			const CommentList = await pb.collection('comment').getList(1, 200, {
				filter: `author="${userUId?.model.id}"`,
				expand: 'author',
				sort: '-created',
			});
			try {
				if (CommentList.items.length > 0) {
					setComments(CommentList.items);
				}
			} catch (err) {
				console.log(`데이터 불러오기 에러 : ${err}`);
			} finally {
				setIsLoading(false);
			}
		};

		MyComment();
	}, []);

	return (
		<>
			<Helmet>
				<title>내 댓글 목록</title>
			</Helmet>

			<div className="w-full max-w-[600px] min-w-[320px] py-20 bg-ec4 flex flex-col items-center min-h-[100vh] m-auto gap-14">
				<Headerback
					onClick={() => {
						navigate(-1);
					}}
				>
					내 댓글 목록
				</Headerback>

				<div className="s:px-12 w-full px-20">
					{!isLoading &&
						comment.map((item) => (
							<MyCommentItem
								key={item.id}
								src={`https://refresh.pockethost.io/api/files/${item.expand?.author?.collectionId}/${item.expand?.author?.id}/${item.expand?.author?.avatar}`}
								alt={item.expand.author.nickName}
								nickName={item.expand.author.nickName}
								comment={item.content}
							/>
						))}
				</div>

				<Nav />
			</div>
		</>
	);
}

export default MyCommentPage;
