import PropTypes from 'prop-types';

Span.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
};

function Span({ children }) {
	return <span className="whitespace-nowrap">{children}</span>;
}

export default Span;
