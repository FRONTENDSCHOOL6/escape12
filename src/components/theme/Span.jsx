import { string } from 'prop-types';

Span.propTypes = {
	children: string,
};

function Span({ children }) {
	return <span className="whitespace-nowrap">{children}</span>;
}

export default Span;
