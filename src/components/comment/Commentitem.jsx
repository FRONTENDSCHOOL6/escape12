import { string } from 'prop-types';

Commentitem.propTypes = {
	author: string,
	content: string,
};

function Commentitem({ author, content }) {
	return (
		<div className="text-lg w-full border-2 text-ec1 p-4 mb-2 rounded-xl flex flex-col m-auto">
			<p className="font-bold mb-2 pb-2 border-b-[1px]">{author}</p>
			<p>{content}</p>
		</div>
	);
}

export default Commentitem;
