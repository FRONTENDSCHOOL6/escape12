import { string, shape, arrayOf } from 'prop-types';
import Post from './PostItem';
import noImage from '@/assets/noImage.png';
import noImageLight from '@/assets/noImageLight.png';

PostList.propTypes = {
	posts: arrayOf(
		shape({
			id: string,
			title: string,
			author: string,
			date: string,
			content: string,
		})
	).isRequired,
};

function PostList({ posts }) {
	return (
		<div className="s:px-12 w-full px-20">
			{posts.map((post) => (
				<Post
					id={post.id}
					key={post.id}
					title={post.title}
					author={
						post.expand?.author?.nickName && post.expand?.author?.id
							? post.expand?.author?.nickName
							: post.expand?.author?.id
							? '소셜계정'
							: '탈퇴회원'
					}
					date={post.date}
					content={post.content}
					src={
						post.expand && post.expand.author && post.expand.author.avatar
							? `https://refresh.pockethost.io/api/files/${post.expand.author.collectionId}/${post.expand.author.id}/${post.expand.author.avatar}`
							: window.localStorage.getItem('theme') === 'dark'
							? `${noImage}`
							: window.localStorage.getItem('theme') === 'light'
							? `${noImageLight}`
							: ''
					}
					alt={post.expand?.author?.nickName || '탈퇴회원'}
				/>
			))}
		</div>
	);
}

export default PostList;
