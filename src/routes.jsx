import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';
import Empty from '@/layout/Empty';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import LoginSelete from '@/pages/LoginSelete';
import Mypage from '@/pages/MyPage';
import Editpage from '@/pages/EditPage';
import PostPage from '@/pages/PostPage';
import SignUp from '@/pages/SignUp';
import AddCommunity from '@/pages/AddCommunity';
import CommentPage from '@/pages/CommentPage';
import Theme from '@/pages/Theme';
import EmptyPage from '@/pages/EmptyPage';
import NotePage from '@/pages/NotePage';
import CreateTheme from '@/pages/CreateTheme';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Empty />}>
			<Route index element={<Home />} />
			<Route path="/loginselete" element={<LoginSelete />} />
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<SignUp />} />
			{/* 로그인 인증해야만 들어갈 수 있는 페이지 */}
			<Route path="/theme" element={<Theme />} />
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
	)
);

export default router;
