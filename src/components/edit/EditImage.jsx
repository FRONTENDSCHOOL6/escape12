import { func, object, string } from 'prop-types';

EditImage.propTypes = {
	inputRef: object,
	onChange: func,
	imgRef: object,
	src: string,
	alt: string,
};

function EditImage({ inputRef, onChange, imgRef, src, alt }) {
	return (
		<div className="flex flex-col gap-5 relative">
			<label 
				htmlFor="image"
				className="sr-only"
				aria-label="프로필 사진 변경"
			>
				프로필 사진 변경
			</label>
			<input
				ref={inputRef}
				onChange={onChange}
				className="cursor-pointer absolute w-40 h-40 rounded-full bg-opacity text-opacity"
				type="file"
				name="image"
				id="image"
				accept="*.jpg,*.png,*.webp,*.avif"
			/>
			<img
				aria-label="개인 프로필 이미지"
				ref={imgRef}
				className="rounded-full w-40 h-40"
				src={src}
				alt={alt}
			/>
		</div>
	);
}

export default EditImage;
