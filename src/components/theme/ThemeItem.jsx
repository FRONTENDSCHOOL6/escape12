import { string, number } from 'prop-types';
import { useState } from 'react';
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
};

function ThemeItem({ store, point, theme, grade, level, image, link }) {
	const [heart, setHeart] = useState(false);

	const isClicked = () => {
		heart === false ? setHeart(true) : setHeart(false);
	};

	return (
		<div className="w-full px-20 s:px-12 my-4">
			<figure className="border-2 border-ec1 p-6 s:p-3 rounded-xl flex gap-3 text-ec1 text-lg s:text-base relative">
				<div className="w-1/3 bg-ec4 flex">
					<img src={image} alt={theme} aria-hidden className="max-h-fit" />
				</div>
				<figcaption className="flex flex-col justify">
					<section className="flex items-end gap-5 s:gap-2">
						<h2 className="s:max-w-[90px] max-w-[170px] whitespace-nowrap overflow-hidden text-ellipsis text-2xl font-semibold s:text-2xl hover:text-ec5">
							{theme}
						</h2>
						<Span>{grade}</Span>
					</section>
					<section className="flex py-10 gap-3">
						<h3>{store}</h3>
						<Span>{point}</Span>
					</section>
					<section className="flex gap-7 s:gap-2">
						<Span>{level}</Span>
						<Span>기록하기</Span>
						<a href={link}>
							<Span>예약하기</Span>
						</a>
					</section>
				</figcaption>
				<HeartButton
					onClick={isClicked}
					checked={!heart ? 'bg-heartfalse' : 'bg-hearttrue'}
				/>
			</figure>
		</div>
	);
}

export default ThemeItem;
