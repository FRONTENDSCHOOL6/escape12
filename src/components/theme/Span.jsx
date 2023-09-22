import { Tooltip } from '@mui/material';
import PropTypes, { string } from 'prop-types';

Span.propTypes = {
	text: string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
	ariaLabel: string,
};

function Span({ children, text = '', ariaLabel }) {
	return (
		<Tooltip
			title={
				children === '🌸꽃길'
					? '평점 8~10점'
					: children === '🌿풀길'
					? '평점 4~7점'
					: children === '😱흙길'
					? '평점 0~3점'
					: children === '?'
					? '장르 미정'
					: children === '스토리'
					? '장르'
					: children === 'SF'
					? '장르'
					: children === '감성'
					? '장르'
					: children === '게임'
					? '장르'
					: children === '공포'
					? '장르'
					: children === '모험'
					? '장르'
					: children === '스릴러'
					? '장르'
					: children === '잠입'
					? '장르'
					: children === '추리'
					? '장르'
					: children === '코믹'
					? '장르'
					: children === '판타지'
					? '장르'
					: children === '활동'
					? '장르'
					: ''
			}
			placement="right-end"
			arrow
		>
			<span
				tabIndex="0"
				aria-label={ariaLabel}
				className={`whitespace-nowrap ${text}`}
			>
				{children}
			</span>
		</Tooltip>
	);
}

export default Span;
