import { string, number } from 'prop-types';
import { useState } from 'react';
import HeartButton from './Heart';
import Span from './Span';
import { Link } from 'react-router-dom';

ThemeItem.propTypes = {
	store: string,
	point: string,
	theme: string,
	grade: number,
	level: number,
	image: string,
	link: string,
};

function ThemeItem({ store, point, theme, grade, level, image, link }) {
	const [heart, setHeart] = useState(false);

	const isClicked = () => {
		heart === false ? setHeart(true) : setHeart(false);
	};

	return (
		<figure className="my-4 border-2 border-ec1 p-6 s:p-3 rounded-xl flex gap-3 text-ec1 text-lg s:text-base relative max-h-[180px]">
			<div className=" bg-ec4 flex w-[25%]">
				<img src={image} alt={theme} aria-hidden className="w-full" />
			</div>
			<figcaption className="flex flex-col justify-between">
				<section className="flex items-end gap-2 s:gap-2">
					<h2 className="s:max-w-[90px] max-w-[170px] whitespace-nowrap overflow-hidden text-ellipsis text-2xl s:text-lg font-semibold">
						{theme}
					</h2>
					<Span>평점 ⭐{grade}</Span>
				</section>
				<section className="flex gap-3">
					<h3>{store}</h3>
					<Span>{point}</Span>
				</section>
				<section className="flex gap-7 s:gap-2">
					<Span>난이도 {level}</Span>
					<Span>기록하기</Span>
					<Link to={link} target="_blank">
						<Span>예약하기</Span>
					</Link>
				</section>
			</figcaption>
			<HeartButton
				onClick={isClicked}
				checked={!heart ? 'bg-heartfalse' : 'bg-hearttrue'}
			/>
		</figure>
	);
}

export default ThemeItem;
