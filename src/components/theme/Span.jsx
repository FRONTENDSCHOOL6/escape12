import PropTypes from 'prop-types';
import { string } from 'prop-types';

Span.propTypes = {
	text: string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
};

function Span({ children, text = '' }) {
	return <span className={`whitespace-nowrap ${text}`}>{children}</span>;
}

export default Span;
