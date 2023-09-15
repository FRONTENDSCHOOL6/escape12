import { NavLink, useMatch } from 'react-router-dom';
import list1 from '@/assets/nav-list1.png';
import list2 from '@/assets/nav-list2.png';
import list3 from '@/assets/nav-list3.png';
import list4 from '@/assets/nav-list4.png';

function Nav() {
	const isThemeActive = useMatch('/theme');
	const isRecordPageActive = useMatch('/recordpage');
	const isThemeRecordActive = useMatch('/theme/:dataId');
	const isUploadRecordActive = useMatch('/upload/:dataId');
	const isPostPageActive = useMatch('/postpage');
	const isAddCommunityActive = useMatch('/addcommunity');
	const isCommentPageActive = useMatch('/postpage/:dataId');
	const isMyPageActive = useMatch('/mypage');
	const isMyPageEditActive = useMatch('/editpage');
	const isMyRecordActive = useMatch('/myrecord');
	const isMyCommunityActive = useMatch('/mycommunity');
	const isMyCommentActive = useMatch('/mycomment');
	const isBookMarkActive = useMatch('/bookmark');

	return (
		<nav className="text-center bg-ec3 text-ec1 font-bold pb-2 pt-1 max-w-[600px] min-w-[320px] m-auto fixed bottom-0 left-0 right-0">
			<ul className="flex justify-around items-center">
				<li>
					<NavLink
						to="/theme"
						className={`text-ec1 hover:text-ec5 ${
							isThemeActive ? 'text-ec5' : ''
						}`}
					>
						<img className="w-12" src={list4} alt="마이" />
						테마
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/recordpage"
						className={`text-ec1 hover:text-ec5 ${
							isRecordPageActive || isThemeRecordActive || isUploadRecordActive
								? 'text-ec5'
								: ''
						}`}
					>
						<img className="w-12" src={list3} alt="기록" />
						기록
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/postpage"
						className={`text-ec1 hover:text-ec5 ${
							isAddCommunityActive || isPostPageActive || isCommentPageActive
								? 'text-ec5'
								: ''
						}`}
					>
						<img className="w-12" src={list2} alt="커뮤니티" />
						커뮤니티
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/mypage"
						className={`text-ec1 hover:text-ec5 ${
							isMyPageActive ||
							isMyRecordActive ||
							isBookMarkActive ||
							isMyPageEditActive ||
							isMyCommunityActive ||
							isMyCommentActive
								? 'text-ec5'
								: ''
						}`}
					>
						<img className="w-12" src={list1} alt="테마" />
						마이
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default Nav;