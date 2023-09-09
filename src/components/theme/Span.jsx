import { object, string } from 'prop-types';

Span.propTypes = {
	children: object || string,
};

function Span({ children }) {
	return <span className="min-w-fit">{children}</span>;
}

export default Span;
