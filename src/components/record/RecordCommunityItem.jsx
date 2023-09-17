import { number, string, array } from 'prop-types';
import Button from '../button/Button';
import Span from '../theme/Span';
import { useNavigate } from 'react-router-dom';

RecordCommunityItem.propTypes = {
	store: string,
	theme: string,
	grade: number,
	image: string,
	author: string,
	link: string,
	record: array,
};

function RecordCommunityItem({
	store,
	theme,
	grade,
	image,
	author,
	link,
	record = [],
}) {
	const navigate = useNavigate();

	const handleLink = () => {
		navigate(`/upload/${link}`);
	};
	return (
		<figure className="my-4 border-2 border-ec1 p-4 s:p-3 rounded-xl flex gap-3 s:gap-[5%] text-ec1 text-lg s:text-base relative h-[180px]">
			<div className=" bg-ec4 flex w-[50%]">
				<img src={image} alt={theme} aria-hidden className="w-full" />
			</div>
			<figcaption className="flex flex-col justify-between s:justify-around w-full">
				<section className="flex w-full justify-between">
					<h2 className="s:max-w-[90px] max-w-[170px] whitespace-nowrap overflow-hidden text-ellipsis text-2xl s:text-lg font-semibold">
						{theme}
					</h2>
					<Span>
						{grade === 0 || grade === 1 || grade === 2 || grade === 3
							? '😱흙길'
							: grade === 4 || grade === 5 || grade === 6 || grade === 7
							? '🌿풀길'
							: '🌸꽃길'}
					</Span>
				</section>
				<section className="flex gap-3">
					<h3>{store}</h3>
				</section>
				<section className="flex justify-between">
					<span className={`${author === '탈퇴회원' ? 'text-gray' : ''}`}>
						{record.length < 6 && record.length > 0
							? `🥚${author}`
							: record.length > 5 && record.length < 11
							? `🐤${author}`
							: record.length > 10
							? `🐔${author}`
							: `${author}`}
					</span>
					<Button bg="bg-ec1" text="text-ec4" onClick={handleLink}>
						보러가기
					</Button>
				</section>
			</figcaption>
		</figure>
	);
}

export default RecordCommunityItem;
