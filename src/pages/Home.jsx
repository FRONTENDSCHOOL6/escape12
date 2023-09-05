import Logo from '@/components/Logo';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
	const navigate = useNavigate();
	const containerRef = useRef(null);

	useEffect(() => {
		const timeline = gsap.timeline();

		timeline.to(containerRef.current, {
			opacity: 0,
			duration: 0.5,
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
			<Logo />
		</div>
	);
}

export default Home;
