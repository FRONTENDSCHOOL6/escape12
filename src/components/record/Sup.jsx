import { string } from 'prop-types';

Sup.propTypes = {
	children: string,
	hidden: string,
};

function Sup({ children, hidden = 'dark:text-dark-red text-light-red' }) {
	return (
		<p>
			{children} <sup className={`${hidden} text-lg`}> *</sup>
		</p>
	);
}

export default Sup;
