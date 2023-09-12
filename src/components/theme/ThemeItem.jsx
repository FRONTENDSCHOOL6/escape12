import SmallButton from '@/components/SmallButton';
import { bool, func, number, string } from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import HeartButton from './Heart';
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
	onClick: func,
	checked: string,
	dataid: string,
	heart: bool,
	toggleHeart: func,
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
}) {
	const [heart, setHeart] = useState(false);

	const isClickHeart = () => {
		heart === false ? setHeart(true) : setHeart(false);
	};

	return (
		<figure className="my-4 border-2 border-ec1 p-6 s:p-3 rounded-xl flex gap-3 text-ec1 text-lg s:text-base relative h-[180px]">
			<div className=" bg-ec4 flex w-[25%]">
				<img src={image} alt={theme} aria-hidden className="w-full" />
			</div>
			<figcaption className="flex flex-col justify-between s:justify-around">
				<section className="flex items-end gap-4 s:gap-2">
					<h2 className="s:max-w-[90px] max-w-[170px] whitespace-nowrap overflow-hidden text-ellipsis text-2xl s:text-lg font-semibold">
						{theme}
					</h2>
					<Span>평점 ⭐{grade}</Span>
				</section>
				<section className="flex gap-3">
					<div className="flex gap-1">
						<h3>{store}</h3>
						<Span>{point}점</Span>
					</div>
					<Span>장르: {field}</Span>
				</section>
				<section className="flex gap-7 s:gap-2">
					<Span>난이도 {level}</Span>
					<Link to={dataid}>
						<SmallButton bg="bg-ec3" text="text-ec1">
							기록하기
						</SmallButton>
					</Link>
					<Link to={link} target="_blank">
						<SmallButton>예약하기</SmallButton>
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
