import { object, string } from 'prop-types';

Span.propTypes = {
	children: string || object,
};

function Span({ children }) {
	console.log(typeof children);
	return <span className="whitespace-nowrap">{children}</span>;
}

export default Span;
