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
	// onDeletePost: PropTypes.func.isRequired,
};

function PostList({ posts /*onDeletePost*/ }) {
	return (
		<div className="min-w-[300px] w-full s:px-12 px-20">
			{posts.map((post) => (
				<Post
					id={post.id}
					key={post.id}
					title={post.title}
					author={post.author}
					date={post.date}
					content={post.content}
					// onDelete={() => onDeletePost(post.id)}
				/>
			))}
		</div>
	);
}

export default PostList;
