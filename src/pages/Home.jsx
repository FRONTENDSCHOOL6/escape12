import CogiLogo from '@/components/CogiLogo';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
	const navigate = useNavigate();
	const containerRef = useRef(null);

	useEffect(() => {
		const tween = gsap.to(containerRef.current, {
			opacity: 0,
			duration: 0.5,
			delay: 2,
			onComplete: () => {
				navigate('/loginselete');
			},
		});

		return () => {
			tween.kill();
		};
	}, [navigate]);

	return (
		<div
			ref={containerRef}
			className="max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center h-screen m-auto pt-60"
		>
			<h1 className="font-hob text-7xl">방탈러</h1>
			<CogiLogo width={250} />
		</div>
	);
}

export default Home;
