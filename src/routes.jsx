import ProtectRoute from '@/contexts/ProtectRoute';
import Empty from '@/layout/Empty';
import Escape from '@/layout/Escape';
import AddCommunity from '@/pages/AddCommunity';
import BookMark from '@/pages/BookMark';
import CommentPage from '@/pages/CommentPage';
import EditRecord from '@/pages/EditRecord';
import Editpage from '@/pages/Editpage';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import LoginSelete from '@/pages/LoginSelete';
import MyComment from '@/pages/MyComment';
import MyCommunity from '@/pages/MyCommunity';
import MyRecord from '@/pages/MyRecord';
import Mypage from '@/pages/Mypage';
import PostPage from '@/pages/PostPage';
import RecordCommunity from '@/pages/RecordCommunity';
import RecordPage from '@/pages/RecordPage';
import SignUp from '@/pages/SignUp';
import Theme from '@/pages/Theme';
import ThemeRecord from '@/pages/ThemeRecord';
import UploadRecord from '@/pages/UploadRecord';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
	{
		path: '',
		element: <Empty />,
		children: [
			{ path: '', element: <Home /> },
			{ path: '/loginselete', element: <LoginSelete /> },
			{ path: '/login', element: <Login /> },
			{ path: '/signup', element: <SignUp /> },
		],
	},
	{
		path: '',
		element: (
			<ProtectRoute>
				<Escape />
			</ProtectRoute>
		),
		children: [
			{ path: '/theme', element: <Theme /> },
			{ path: '/recordpage', element: <RecordPage /> },
			{ path: '/theme/:dataId', element: <ThemeRecord /> },
			{ path: '/upload/:dataId', element: <UploadRecord /> },
			{ path: '/theme/edit/:dataId', element: <EditRecord /> },
			{ path: '/recordcommunity', element: <RecordCommunity /> },
			{ path: '/postpage', element: <PostPage /> },
			{ path: '/addcommunity', element: <AddCommunity /> },
			{ path: '/postpage/:dataId', element: <CommentPage /> },
			{ path: '/mypage', element: <Mypage /> },
			{ path: '/editpage', element: <Editpage /> },
			{ path: '/myrecord', element: <MyRecord /> },
			{ path: '/mycommunity', element: <MyCommunity /> },
			{ path: '/mycomment', element: <MyComment /> },
			{ path: '/bookmark', element: <BookMark /> },
		],
	},
]);

export default router;
