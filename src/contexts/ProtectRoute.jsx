import { useAuth } from '@/contexts/Auth';
import { element } from 'prop-types';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

function ProtectRoute({ children }) {
	const { isAuth } = useAuth();
	const navigate = useNavigate();

	const { pathname, search, hash } = useLocation();

	const [isLoading, setIsLoading] = useState(true);

	const wishLocationPath = `${pathname}${search}${hash}`;

	useEffect(() => {
		if (!isLoading && !isAuth) {
			import.meta.env.MODE === 'development' && toast.dismiss();

			toast('로그인 된 사용자만 이용 가능한 페이지입니다', {
				position: 'top-center',
				icon: '🚨',
				duration: 2000,
				ariaProps: {
					role: 'alert',
					'aria-live': 'polite',
				},
			});

			return navigate('/login', { state: { wishLocationPath } });
		}

		const cleanup = setTimeout(() => setIsLoading(false));

		return () => {
			clearTimeout(cleanup);
		};
	}, [isLoading, isAuth, navigate, wishLocationPath]);

	if (isLoading) {
		return <Spinner size={200} />;
	}

	return children;
}

ProtectRoute.propTypes = {
	children: element,
};

export default ProtectRoute;
