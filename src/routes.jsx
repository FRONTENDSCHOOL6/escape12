import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';
import Empty from '@/layout/Empty';
import Home from '@/pages/Home';
import Login from './pages/Login';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Empty />}>
			<Route index element={<Home />} />
			<Route path="/login" element={<Login />} />
		</Route>
	)
);

export default router;
