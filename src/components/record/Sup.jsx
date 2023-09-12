import { string } from 'prop-types';

Sup.propTypes = {
	children: string,
};

function Sup({ children }) {
	return (
		<p>
			{children} <sup className="text-red text-lg"> *</sup>
		</p>
	);
}

export default Sup;
