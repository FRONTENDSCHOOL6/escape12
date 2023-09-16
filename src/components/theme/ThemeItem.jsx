import pb from '@/api/pockethost';
import userUId from '@/api/userUid';
import SmallButton from '@/components/button/SmallButton';
import { array, number, string } from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MedalButton from '../button/MedalButton';
import HeartButton from './HeartButton';
import Span from './Span';

ThemeItem.propTypes = {
	store: string,
	point: string,
	theme: string,
	grade: number,
	level: number,
	image: string,
	link: string,
	field: string,
	dataid: string,
	clear: array,
	record: array,
};

function ThemeItem({
	store,
	point,
	theme,
	grade,
	level,
	image,
	link,
	field,
	dataid,
	clear,
	record,
}) {
	const [heart, setHeart] = useState(false);
	const [user, setUser] = useState([]);

	// 좋아요 버튼 이벤트
	const isClickHeart = () => {
		// 하트 boolean 값
		heart === false ? setHeart(true) : setHeart(false);

		// 좋아요 기능
		const userBookMark = async () => {
			// 좋아요 True
			try {
				if (!heart) {
					const bookMarkId = { bookmark: [`${dataid}`] };
					await pb
						.collection('users')
						.update(`${userUId.model.id}`, bookMarkId);

					setUser([...user, `${dataid}`]);
					console.log('좋아요!');

					// 좋아요 False
				} else {
					const arr = user.filter((i) => i !== `${dataid}`);
          const updateBookMark = {bookmark: arr}
          await pb
					.collection('users')
					.update(`${userUId.model.id}`, updateBookMark);

					console.log('좋아요 취소!');
				}
			} catch (err) {
				console.log(`좋아요 에러: ${err}`);
			}
		};
		userBookMark();
	};

	return (
		<figure className="my-4 border-2 border-ec1 p-4 s:p-3 rounded-xl flex gap-3 s:gap-[5%] text-ec1 text-lg s:text-base relative h-[180px] w-full">
			<div className=" bg-ec4 flex w-[25%] s:min-w-[25%]">
				<img src={image} alt={theme} aria-hidden className="w-full" />
			</div>
			<figcaption className="flex flex-col justify-between s:justify-around w-[80%]">
				<section className="flex items-end gap-4 s:gap-2 w-full">
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
				<section className="flex s:justify-between">
					<div className="flex gap-1">
						<h3>
							{store} <Span>{point}점</Span>
						</h3>
					</div>
					<Span>장르: {field}</Span>
				</section>
				<section className="flex justify-between s:justify-around">
					{level === 1 || level === 2 || level === 3 ? (
						<SmallButton bg="bg-googleline">♣ 쉬움</SmallButton>
					) : level === 4 || level === 5 || level === 6 || level === 7 ? (
						<SmallButton bg="bg-kakaoline">♣ 보통</SmallButton>
					) : (
						<SmallButton bg="bg-sweetred">♣ 어려움</SmallButton>
					)}
					{clear && clear.findIndex((item) => item.id === `${dataid}`) >= 0 && (
						<Link to={`/upload/${record}`}>
							<MedalButton theme={theme} />
						</Link>
					)}

					{clear && clear.findIndex((item) => item.id === `${dataid}`) < 0 && (
						<Link to={dataid}>
							<SmallButton bg="bg-ec3" text="text-ec1">
								기록하기
							</SmallButton>
						</Link>
					)}

					{!clear && (
						<Link to={dataid}>
							<SmallButton bg="bg-ec3" text="text-ec1">
								기록하기
							</SmallButton>
						</Link>
					)}

					<Link to={link} target="_blank" rel="noopenner noreferrer">
						<SmallButton bg="bg-ec1">예약하기</SmallButton>
					</Link>
				</section>
			</figcaption>
			<HeartButton
				onClick={isClickHeart}
				checked={!heart ? 'bg-heartfalse' : 'bg-hearttrue'}
			/>
		</figure>
	);
}

export default ThemeItem;
