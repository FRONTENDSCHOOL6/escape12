import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
	const navigate = useNavigate();

	useEffect(() => {
		const time = setTimeout(() => {
			navigate('/login');
		}, 1000);

		return () => {
			clearTimeout(time);
		};
	}, [navigate]);

	return <div>Home</div>;
}

export default Home;
