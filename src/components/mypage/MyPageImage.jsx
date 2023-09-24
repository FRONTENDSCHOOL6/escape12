
import { string } from 'prop-types';

MypageImage.propTypes = {
  src: string,
  alt: string,
}

function MypageImage({ src, alt }) {

  return (
    <div className="w-40 h-40">
      <img
        src={
          src
        }
        alt={alt}
        aria-hidden="true"
        className="w-full h-full rounded-full"
      ></img>
    </div>
  )
}


export default MypageImage;
