import { NavLink } from 'react-router-dom';

function Nav() {
	return (
		<nav className="max-w-[600px] min-w-[600px] text-center bg-ec3 text-ec1 text-base font-bold">
			<ul className="flex justify-around items-center py-5">
				<li className={'hover:text-ec5'}>
					<NavLink
						to="theme"
						className={({ isActive }) => {
							isActive ? 'text-ec1' : 'text-ec5';
						}}
					>
						테마
					</NavLink>
				</li>
				<li className={'hover:text-ec5'}>
					<NavLink
						to="record"
						className={({ isActive }) => {
							isActive ? 'text-ec1' : 'text-ec5';
						}}
					>
						기록
					</NavLink>
				</li>
				<li className={'hover:text-ec5'}>
					<NavLink
						to="community"
						className={({ isActive }) => {
							isActive ? 'text-ec1' : 'text-ec5';
						}}
					>
						커뮤니티
					</NavLink>
				</li>
				<li className={'hover:text-ec5'}>
					<NavLink
						to="my"
						className={({ isActive }) => {
							isActive ? 'text-ec1' : 'text-ec5';
						}}
					>
						마이
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default Nav;
