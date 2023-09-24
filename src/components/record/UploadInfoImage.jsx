import { string } from 'prop-types';

UploadInfoImage.propTypes = {
	src: string,
	alt: string,
};

function UploadInfoImage({ src, alt }) {
	return <img className="w-[50%]" src={src} alt={alt} />;
}

export default UploadInfoImage;
