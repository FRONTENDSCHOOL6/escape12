import { string, node } from 'prop-types';

Sup.propTypes = {
	children: node,
	hidden: string,
};

function Sup({ children, hidden = 'dark:text-dark-red text-light-red' }) {
	return (
		<p>
			{children}
			<sup className={`${hidden} text-lg`} aria-hidden="true">
				*
			</sup>
		</p>
	);
}

export default Sup;
