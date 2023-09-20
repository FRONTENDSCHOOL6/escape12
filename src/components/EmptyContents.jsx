import NotCogi from './NotCogi';
import { string } from 'prop-types';

EmptyContents.propTypes = {
	children: string,
};

function EmptyContents({ children }) {
	return (
		<>
			<NotCogi alt="검색결과가 없습니다" />
			<p className="text-center text-[30px] text-xl mt-6">{children}</p>
		</>
	);
}

export default EmptyContents;
