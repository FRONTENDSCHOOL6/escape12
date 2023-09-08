import { string } from 'prop-types';

Span.propTypes = {
	children: string,
};

function Span({ children }) {
	return <span className="min-w-fit">{children}</span>;
}

export default Span;
