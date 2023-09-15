import { Link } from 'react-router-dom';
import Span from '../theme/Span';
import Button from '../button/Button';

function MyRecordItem() {
	return (
		<Link to="">
			<figure className="my-1 border-2 border-ec1 p-6 s:p-3 rounded-xl flex gap-3 text-ec1 text-lg s:text-base relative h-[180px]">
				<div className=" bg-ec4 flex w-[25%]">
					<img
						src="https://blog.kakaocdn.net/dn/N7Dgj/btrHVz75l25/offKewdp8ZCnb9uqM7SuV0/img.png"
						alt="사그행부"
						aria-hidden
						className="w-full"
					/>
				</div>
				<figcaption className="flex flex-col justify-between s:justify-around">
					<section className="flex items-end justify-between">
						<h2 className="s:max-w-[90px] max-w-[170px] whitespace-nowrap overflow-hidden text-ellipsis text-2xl s:text-lg font-semibold">
							사람들은 그것을 행복이라고 부르기로 했다
						</h2>
						<Span>평점 ⭐9</Span>
					</section>
					<section className="flex justify-between">
						<h3 className="whitespace-nowrap">
							키이스케이프 <Span>홍대점</Span>
						</h3>
						<Span>난이도 8</Span>
					</section>
					<section className="mx-auto">
						<Button bg="bg-ec1" text="text-ec4">
							보러가기
						</Button>
					</section>
				</figcaption>
			</figure>
		</Link>
	);
}

export default MyRecordItem;
