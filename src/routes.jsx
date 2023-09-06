import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';
import Empty from '@/layout/Empty';
import Home from '@/pages/Home';
import Login from './pages/Login';
import Mypage from './pages/Mypage';
import Changepage from './pages/Changepage';
import Editpage from './pages/Editpage';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Empty />}>
			<Route index element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/mypage" element={<Mypage />} />
			<Route path="/changepage" element={<Changepage />} />
			<Route path="/editpage" element={<Editpage />} />

		</Route>
	)
);

export default router;
