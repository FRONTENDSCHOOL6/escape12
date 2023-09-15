import { string } from 'prop-types';

Sup.propTypes = {
	children: string,
	hidden: string,
};

function Sup({ children, hidden = 'text-red' }) {
	return (
		<p>
			{children} <sup className={`${hidden} text-lg`}> *</sup>
		</p>
	);
}

export default Sup;
