import PropTypes from 'prop-types';
import Post from './Post';

PostList.propTypes = {
	posts: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired,
			author: PropTypes.string.isRequired,
			date: PropTypes.string.isRequired,
		})
	).isRequired,
	onDeletePost: PropTypes.func.isRequired,
};

function PostList({ posts, onDeletePost }) {
	return (
		<div className="">
			{posts.map((post) => (
				<Post
					key={post.id}
					title={post.title}
					author={post.author}
					date={post.date}
					onDelete={() => onDeletePost(post.id)}
				/>
			))}
		</div>
	);
}

export default PostList;
