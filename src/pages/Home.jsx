import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

function Home() {
	const navigate = useNavigate();
	const containerRef = useRef(null);

	useEffect(() => {
		const timeline = gsap.timeline();

		timeline.to(containerRef.current, {
			opacity: 0,
			duration: 1,
			delay: 2,
			onComplete: () => {
				navigate('/login');
			},
		});

		return () => {
			timeline.kill();
		};
	}, [navigate]);

	return (
		<div
			ref={containerRef}
			className="max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-row-reverse justify-center items-center h-screen m-auto"
		>
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
