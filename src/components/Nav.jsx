import { NavLink } from 'react-router-dom';

function Nav() {
	return (
		<nav className="max-w-[600px] text-center bg-ec2 text-ec1 text-base font-bold">
			<ul className="flex justify-around items-center py-5">
				<li className={'hover:text-ec3'}>
					<NavLink
						to="theme"
						className={({ isActive }) => {
							isActive ? 'text-ec1' : 'text-ec3';
						}}
					>
						테마
					</NavLink>
				</li>
				<li className={'hover:text-ec3'}>
					<NavLink
						to="record"
						className={({ isActive }) => {
							isActive ? 'text-ec1' : 'text-ec3';
						}}
					>
						기록
					</NavLink>
				</li>
				<li className={'hover:text-ec3'}>
					<NavLink
						to="community"
						className={({ isActive }) => {
							isActive ? 'text-ec1' : 'text-ec3';
						}}
					>
						커뮤니티
					</NavLink>
				</li>
				<li className={'hover:text-ec3'}>
					<NavLink
						to="my"
						className={({ isActive }) => {
							isActive ? 'text-ec1' : 'text-ec3';
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

{
	/* <NavLink to="/theme" className={({isActive})=>{ isActive ? ' text-ec1' : 'text-ec3'
}}>테마</NavLink>

const a = ({name}) => {name}

a({name:'tiger'}) */
}
