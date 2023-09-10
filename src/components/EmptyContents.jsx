import NotCogi from './NotCogi';
import { string } from 'prop-types';

EmptyContents.propTypes = {
	children: string,
};

function EmptyContents({ children }) {
	return (
		<>
			<NotCogi />
			<p className="text-center text-[30px] text-ec1 text-xl mt-6">
				{children}
			</p>
		</>
	);
}

export default EmptyContents;
