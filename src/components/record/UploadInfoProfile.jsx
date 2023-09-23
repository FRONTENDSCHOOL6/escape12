import { string } from 'prop-types';

UploadInfoProfile.propTypes = {
	src: string,
	alt: string,
};

function UploadInfoProfile({ src, alt }) {
	return (
		<div className="w-20 h-20 s:w-14 s:h-14">
			<img
				className="w-full h-full rounded-full"
				src={src}
				alt={alt}
				aria-hidden
			/>
		</div>
	);
}

export default UploadInfoProfile;
