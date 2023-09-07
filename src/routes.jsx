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

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Empty />}>
			<Route index element={<Home />} />
			<Route path="/loginselete" element={<LoginSelete />} />
			<Route path="/login" element={<Login />} />
			<Route path="/mypage" element={<Mypage />} />
			<Route path="/editpage" element={<Editpage />} />
			<Route path="/PostPage" element={<PostPage />} />
		</Route>
	)
);

export default router;
