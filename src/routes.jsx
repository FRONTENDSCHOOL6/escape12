import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home';
import LoginSelete from '@/pages/LoginSelete';
import Empty from '@/layout/Empty';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import Theme from '@/pages/Theme';
import Escape from '@/layout/Escape';
import ThemeRecord from '@/pages/ThemeRecord';
import Mypage from '@/pages/Mypage';
import Editpage from '@/pages/Editpage';
import PostPage from '@/pages/PostPage';
import RecordPage from '@/pages/RecordPage';
import CommentPage from '@/pages/CommentPage';
import ProtectRoute from '@/components/ProtectRoute';
import AddCommunity from '@/pages/AddCommunity';

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
            { path: '/mypage', element: <Mypage /> },
            { path: '/postpage', element: <PostPage /> },
            { path: '/addcommunity', element: <AddCommunity /> },
            { path: '/editpage', element: <Editpage /> },
            { path: '/post/:dataId', element: <CommentPage /> },
            { path: '/recordpage', element: <RecordPage/> },
        ],
    },
]);

//             <Route path="/emptypage" element={<EmptyPage />} />
//             <Route path="/createtheme" element={<CreateTheme />} />

export default router;