import { Outlet } from 'react-router-dom';

function Empty() {
	return (
		<div>
			<p>안녕</p>
			<Outlet />
		</div>
	);
}

export default Empty;
