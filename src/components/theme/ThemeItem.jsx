import { useState } from 'react';
import HeartButton from './Heart';
import Span from './Span';

function ThemeItem() {
	const [heart, setHeart] = useState(false);

	const isClicked = () => {
		heart === false ? setHeart(true) : setHeart(false);
	};

	return (
		<div className="w-full px-20 s:px-12 my-4">
			<figure className="border-2 border-ec1 p-6 s:p-3 rounded-xl flex gap-3 text-ec1 text-lg s:text-base relative">
				<div className="w-1/3 bg-ec4 flex">
					<img
						src="https://mblogthumb-phinf.pstatic.net/MjAyMTAzMTRfMjkw/MDAxNjE1NjQ4NDczMzc5.W5ncEzzylu4jd4vKZ98Ub0WmdnOBoiB0d_FMcKkBoIQg.iCaugZtjaQ4lbLBEGwXt2VoQBT9kkeLz8h6qdf8N0u8g.JPEG.rabbit4411/MIT12X6jhQHiFEousyiBFHCWOBe7huNeHMhH6cdU.jpg?type=w800"
						alt="DONE"
						aria-hidden
						className="max-h-fit"
					/>
				</div>
				<figcaption className="flex flex-col justify">
					<section className="flex items-end gap-5 s:gap-2">
						<h2 className="text-4xl font-semibold s:text-2xl hover:text-ec5">
							DONE
						</h2>
						<Span>별점</Span>
					</section>
					<section className="flex py-10 gap-3">
						<h3>제로월드</h3>
						<Span>강남점</Span>
					</section>
					<section className="flex gap-7 s:gap-2">
						<Span>난이도</Span>
						<Span>기록하기</Span>
						<Span>예약하기</Span>
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
