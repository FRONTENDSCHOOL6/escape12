import { string } from 'prop-types';

PhotoImage.propTypes = {
	src: string,
	alt: string,
};

function PhotoImage({ src, alt }) {
	return (
		<div className="flex flex-col gap-5 text-ec1 relative px-2">
			<p>사진</p>
			<div className="h-[140px] bg-opacity p-2 rounded-lg border-2 border-ec1">
				<img className="h-full" src={src} alt={alt} />
			</div>
		</div>
	);
}

export default PhotoImage;
