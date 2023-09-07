import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';
import Empty from '@/layout/Empty';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import LoginSelete from './pages/LoginSelete';
import Mypage from './pages/MyPage';
import Editpage from './pages/EditPage';
import PostPage from './pages/PostPage';
import SignUp from './pages/SignUp';
import AddCommunity from '@/pages/AddCommunity';
import PostClick from '@/pages/PostClick';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Empty />}>
			<Route index element={<Home />} />
			<Route path="/loginselete" element={<LoginSelete />} />
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<SignUp />} />
			<Route path="/mypage" element={<Mypage />} />
			<Route path="/editpage" element={<Editpage />} />
			<Route path="/PostPage" element={<PostPage />} />
			<Route path="/addcommunity" element={<AddCommunity />} />
			<Route path="/postpage" element={<PostPage />} />
			<Route path="/post/:id" element={<PostClick />} />
		</Route>
	)
);

export default router;
