import Sup from './Sup';
import { func, string, object } from 'prop-types';

UploadImage.propTypes = {
	inputRef: object,
	onChange: func,
	imgRef: object,
	src: string,
	alt: string,
};

function UploadImage({ inputRef, onChange, imgRef, src, alt }) {
	return (
		<div className="flex flex-col gap-5 text-ec1 relative px-2">
			<label htmlFor="image">
				<Sup>사진</Sup>
			</label>
			<input
				ref={inputRef}
				onChange={onChange}
				className="cursor-pointer absolute w-full h-full opacity-0"
				type="file"
				name="image"
				id="image"
				accept="*.jpg,*.png,*.webp,*.avif"
			/>
			<div className="h-[140px] bg-opacity p-2 rounded-lg border border-ec1">
				<img ref={imgRef} className="h-full" src={src} alt={alt} />
			</div>
		</div>
	);
}

export default UploadImage;
