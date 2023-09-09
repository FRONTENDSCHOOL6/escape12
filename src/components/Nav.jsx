import { NavLink, useMatch } from 'react-router-dom';

function Nav() {
	const isPostPageActive = useMatch('/postpage');
	const isNotePageActive = useMatch('/notepage');
	const isAddCommunityActive = useMatch('/addcommunity');
	const isMyPageActive = useMatch('/mypage');

	return (
		<nav className="text-center bg-ec3 text-base font-bold">
			<ul className="flex justify-around items-center py-5">
				<li>
					<NavLink
						to="/postpage"
						activeClassName="text-ec5"
						className={`text-ec1 hover:text-ec5 ${
							isPostPageActive ? 'text-ec5' : ''
						}`}
					>
						테마
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/notepage"
						activeClassName="text-ec5"
						className={`text-ec1 hover:text-ec5 ${
							isNotePageActive ? 'text-ec5' : ''
						}`}
					>
						기록
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/addcommunity"
						activeClassName="text-ec5"
						className={`text-ec1 hover:text-ec5 ${
							isAddCommunityActive ? 'text-ec5' : ''
						}`}
					>
						커뮤니티
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/mypage"
						activeClassName="text-ec5"
						className={`text-ec1 hover:text-ec5 ${
							isMyPageActive ? 'text-ec5' : ''
						}`}
					>
						마이
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default Nav;
