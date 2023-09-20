import { number, string } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';
import Span from '../theme/Span';

MyRecordItem.propTypes = {
	link: string,
	src: string,
	alt: string,
	theme: string,
	store: string,
	grade: number,
};

function MyRecordItem({ link, src, alt, theme, store, grade }) {
	const navigate = useNavigate();

	const handleLink = () => {
		navigate(`/upload/${link}`);
	};

	return (
		<figure className="mb-5 border-2 border-ec1 p-4 s:p-3 rounded-xl flex gap-3 text-ec1 text-lg s:text-base relative h-[180px]">
			<div className=" bg-ec4 flex w-[200px]">
				<img src={src} alt={alt} aria-hidden className="w-full" />
			</div>
			<figcaption className="flex flex-col justify-between s:justify-around w-full">
				<section className="flex justify-between">
					<h2 className="s:max-w-[90px] max-w-[170px] whitespace-nowrap overflow-hidden text-ellipsis text-2xl s:text-lg font-semibold">
						{theme}
					</h2>
					<Span text="font-semibold">
						{grade === 0 || grade === 1 || grade === 2 || grade === 3
							? '😱흙길'
							: grade === 4 || grade === 5 || grade === 6 || grade === 7
							? '🌿풀길'
							: '🌸꽃길'}
					</Span>
				</section>
				<section className="flex justify-between">
					<h3 className="whitespace-nowrap">{store}</h3>
				</section>
				<section className="text-right">
					<Button bg="bg-ec1" text="text-ec4" onClick={handleLink}>
						보러가기
					</Button>
				</section>
			</figcaption>
		</figure>
	);
}

export default MyRecordItem;
