import NotCogi from './NotCogi';
import { string } from 'prop-types';

EmptyContents.propTypes = {
	children: string,
	text: string,
};

function EmptyContents({
	children,
	text = 'text-light-ec4 dark:text-dark-ec1',
}) {
	return (
		<>
			<NotCogi alt="검색결과가 없습니다" />
			<p className={`text-center text-[30px] text-xl mt-6 ${text}`}>
				{children}
			</p>
		</>
	);
}

export default EmptyContents;
