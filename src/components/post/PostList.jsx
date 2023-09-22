import { string, shape, arrayOf } from 'prop-types';
import noImage from '@/assets/noImage.png';
import noImageLight from '@/assets/noImageLight.png';
import social from '@/assets/socialImg.png';
import { ThemeContext } from '@/contexts/ThemeContext';
import { useContext } from 'react';
import PostItem from './PostItem';

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
	const { theme } = useContext(ThemeContext);

	return (
		<div className="s:px-12 w-full px-20">
			{posts.map((post) => (
				<PostItem
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
							: post.expand?.author?.social ===
								'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg'
								? `${social}`
								: post.expand?.author?.social
									? post.expand?.author?.social
									: theme === 'dark'
										? `${noImageLight}`
										: `${noImage}`
					}
					alt={
						post.expand?.author?.nickName && post.expand?.author?.id
							? post.expand?.author?.nickName
							: post.expand?.author?.id
								? '소셜계정'
								: '탈퇴회원'
					}
				/>
			))}
		</div>
	);
}

export default PostList;
