import { string, shape, number, arrayOf } from 'prop-types';
import Post from './Post';

PostList.propTypes = {
	posts: arrayOf(
		shape({
			id: number,
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
