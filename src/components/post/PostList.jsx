import { string, shape, arrayOf } from 'prop-types';
import Post from './PostItem';

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
					author={post.expand?.author?.nickName}
					date={post.date}
					content={post.content}
					src={`https://refresh.pockethost.io/api/files/${post.expand?.author?.collectionId}/${post.expand?.author?.id}/${post.expand?.author?.avatar}`}
					alt={post.expand?.author?.nickName}
				/>
			))}
		</div>
	);
}

export default PostList;
