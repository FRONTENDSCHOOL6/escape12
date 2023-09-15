import { string } from 'prop-types';
import Sup from './Sup';

PhotoImage.propTypes = {
	src: string,
	alt: string,
};

function PhotoImage({ src, alt }) {
	return (
		<div className="flex flex-col gap-5 text-ec1 relative px-2">
			<label htmlFor="image">
				<Sup>사진</Sup>
			</label>
			<div className="h-[140px] bg-opacity p-2 rounded-lg border-2 border-ec1">
				<img className="h-full" src={src} alt={alt} />
			</div>
		</div>
	);
}

export default PhotoImage;
