import { Tooltip } from '@mui/material';
import PropTypes, { string } from 'prop-types';

Span.propTypes = {
	text: string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
};

function Span({ children, text = '' }) {
	return (
		<Tooltip
			title={
				children === '🌸꽃길'
					? '평점 8~10점'
					: children === '🌿풀길'
					? '평점 4~7점'
					: children === '😱흙길'
					? '평점 0~3점'
					: ''
			}
			placement="right-end"
			arrow
		>
			<span className={`whitespace-nowrap ${text}`}>{children}</span>
		</Tooltip>
	);
}

export default Span;
