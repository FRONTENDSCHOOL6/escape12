import { arrayOf, shape, number, string } from 'prop-types';
import Comment from '@/components/comment/Comment';

CommentList.propTypes = {
    comments: arrayOf(
        shape({
            id: number,
            author: string,
            content: string,
        })
    ).isRequired,
};

function CommentList({ comments }) {
    return (
        <div className="w-full s:px-12 px-20">
            {comments.map((comment) => (
                <Comment
                    key={comment.id}
                    author={comment.author}
                    content={comment.content}
                />
            ))}
        </div>
    );
}

export default CommentList;