import SmallButton from '@/components/button/SmallButton';
import { bool, func, number, string } from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Span from './Span';
import HeartButton from './HeartButton';
import MedalButton from '../button/MedalButton';

ThemeItem.propTypes = {
	store: string,
	point: string,
	theme: string,
	grade: number,
	level: number,
	image: string,
	link: string,
	field: string,
	onClick: func,
	checked: string,
	dataid: string,
	heart: bool,
	toggleHeart: func,
	clear: bool,
	record: string,
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

	const isClickHeart = () => {
		heart === false ? setHeart(true) : setHeart(false);
	};

	return (
		<figure className="my-4 border-2 border-ec1 p-6 s:p-3 rounded-xl flex gap-3 s:gap-[5%] text-ec1 text-lg s:text-base relative h-[180px]">
			<div className=" bg-ec4 flex min-w-[25%] s:min-w-0 s:max-w-[25%]">
				<img src={image} alt={theme} aria-hidden className="w-full" />
			</div>
			<figcaption className="flex flex-col justify-between s:justify-around">
				<section className="flex items-end gap-4 s:gap-2">
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
					<div className="flex gap-1">
						<h3>
							{store} <Span>{point}점</Span>
						</h3>
					</div>
					<Span>장르: {field}</Span>
				</section>
				<section className="flex gap-7 s:gap-[2%]">
					{level === 1 || level === 2 || level === 3 ? (
						<SmallButton bg="bg-googleline s:p-1 s:text-xs">♣ 쉬움</SmallButton>
					) : level === 4 || level === 5 || level === 6 || level === 7 ? (
						<SmallButton bg="bg-kakaoline s:p-1 s:text-xs">♣ 보통</SmallButton>
					) : (
						<SmallButton bg="bg-sweetred s:p-1 s:text-xs">♣ 어려움</SmallButton>
					)}
					{!clear ? (
						<Link to={dataid}>
							<SmallButton bg="bg-ec3" text="text-ec1 s:text-xs s:p-1">
								기록하기
							</SmallButton>
						</Link>
					) : (
						<Link to={`/upload/${record}`}>
							<MedalButton theme={theme} />
						</Link>
					)}
					<Link to={link} target="_blank" rel="noopenner noreferrer">
						<SmallButton bg="bg-ec1 s:text-xs s:p-1">예약하기</SmallButton>
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
