import ProtectRoute from '@/components/ProtectRoute';
import Empty from '@/layout/Empty';
import Escape from '@/layout/Escape';
import AddCommunity from '@/pages/AddCommunity';
import BookMark from '@/pages/BookMark';
import CommentPage from '@/pages/CommentPage';
import Editpage from '@/pages/Editpage';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import LoginSelete from '@/pages/LoginSelete';
import MyComment from '@/pages/MyComment';
import MyCommunity from '@/pages/MyCommunity';
import MyRecord from '@/pages/MyRecord';
import Mypage from '@/pages/Mypage';
import NotePage from '@/pages/NotePage';
import PostPage from '@/pages/PostPage';
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
			{ path: '/theme/:dataId', element: <ThemeRecord /> },
			{ path: '/Mycommunity', element: <MyCommunity /> },
			{ path: '/MyComment', element: <MyComment /> },
			{ path: '/notepage', element: <NotePage /> },
			{ path: '/upload/:dataId', element: <UploadRecord /> },
			{ path: '/mypage', element: <Mypage /> },
			{ path: '/postpage', element: <PostPage /> },
			{ path: '/addcommunity', element: <AddCommunity /> },
			{ path: '/editpage', element: <Editpage /> },
			{ path: '/postpage/:dataId', element: <CommentPage /> },
			{ path: '/myrecord', element: <MyRecord /> },
			{ path: '/bookmark', element: <BookMark /> },
		],
	},
]);

//             <Route path="/emptypage" element={<EmptyPage />} />
//             <Route path="/createtheme" element={<CreateTheme />} />

export default router;
