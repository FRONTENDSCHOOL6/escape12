import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';
import Empty from '@/layout/Empty';
import Home from '@/pages/Home';
import Login from './pages/Login';
import PostPage from './pages/PostPage';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Empty />}>
			<Route index element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/PostPage" element={<PostPage />} />
		</Route>
	)
);

export default router;
