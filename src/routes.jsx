import Empty from '@/layout/Empty';
import Escape from '@/layout/Escape';
import AddCommunity from '@/pages/AddCommunity';
import CommentPage from '@/pages/CommentPage';
import CreateTheme from '@/pages/CreateTheme';
import Editpage from '@/pages/EditPage';
import EmptyPage from '@/pages/EmptyPage';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import LoginSelete from '@/pages/LoginSelete';
import Mypage from '@/pages/MyPage';
import NotePage from '@/pages/NotePage';
import PostPage from '@/pages/PostPage';
import SignUp from '@/pages/SignUp';
import Theme from '@/pages/Theme';
import ThemeRecord from '@/pages/ThemeRecord';
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route element={<Empty />}>
				<Route index element={<Home />} />
				<Route path="/loginselete" element={<LoginSelete />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
			</Route>
			<Route element={<Escape />}>
				{/* 로그인 인증해야만 들어갈 수 있는 페이지 */}
				<Route path="/theme" element={<Theme />} />
				<Route path="/theme/:dataId" element={<ThemeRecord />} />
				<Route path="/mypage" element={<Mypage />} />
				<Route path="/editpage" element={<Editpage />} />
				<Route path="/postpage" element={<PostPage />} />
				<Route path="/addcommunity" element={<AddCommunity />} />
				<Route path="/post/:id" element={<CommentPage />} />
				<Route path="/notepage" element={<NotePage />} />
				<Route path="/emptypage" element={<EmptyPage />} />
				{/* 데이터 등록을 위한 임시페이지 */}
				<Route path="/createtheme" element={<CreateTheme />} />
			</Route>
		</>
	)
);

export default router;
