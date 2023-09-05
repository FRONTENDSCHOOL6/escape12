import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
	const navigate = useNavigate();
	useEffect(() => {
		const time = setTimeout(() => {
			navigate('/login');
		}, 2500);

		return () => {
			clearTimeout(time);
		};
	}, [navigate]);

	return (
		<div className="max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-row-reverse justify-center items-center h-screen m-auto">
			<h1 className="font-hob text-6xl">방탈러</h1>
			<img
				className="h-[90px] mr-5"
				src="/로고열쇠.svg"
				alt="방탈러로고이미지"
				aria-hidden
			/>
		</div>
	);
}

export default Home;
