import pb from '@/api/pockethost';
import KeyLogo from '@/components/KeyLogo';
import LoginSeleteButton from '@/components/loginsignup/LoginSeleteButton';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

function LoginSelete() {
	const navigate = useNavigate();
	const containerRef = useRef(null);

	useEffect(() => {
		gsap.fromTo(
			containerRef.current,
			{ opacity: 0 },
			{ opacity: 1, duration: 0.5 }
		);
	}, []);

	const handleKakaoLogin = async () => {
		const kakao = await pb
			.collection('users')
			.authWithOAuth2({ provider: 'kakao' });

		const { username: name, email, avatarUrl } = kakao.meta;

		const updateUser = {
			username: email.split('@')[0],
			nickName: name,
			emailVisibility: true,
			social: avatarUrl,
		};

		await pb.collection('users').update(kakao.record.id, updateUser);
		try {
			if (kakao.record.nickName && kakao.record.nickName !== '') {
				toast(`${kakao.record.nickName}님 환영합니다`, {
					icon: '🧸',
					duration: 2000,
				});
			} else {
				toast(`로그인되었습니다`, {
					icon: '🧸',
					duration: 2000,
				});
			}

			navigate('/theme');
		} catch (err) {
			console.log(`카카오톡 에러: ${err}`);

			toast('로그인에 실패하셨습니다.', {
				icon: '😭',
				duration: 2000,
			});
		}
	};

	const handleGoogleLogin = async () => {
		const google = await pb
			.collection('users')
			.authWithOAuth2({ provider: 'google' });

		const { name, email, avatarUrl } = google.meta;

		const updateUserGoogle = {
			username: email.split('@')[0],
			nickName: name,
			emailVisibility: true,
			social: avatarUrl,
		};

		await pb.collection('users').update(google.record.id, updateUserGoogle);

		try {
			if (google.record.nickName && google.record.nickName !== '') {
				toast(`${google.record.nickName}님 환영합니다`, {
					icon: '🌍',
					duration: 2000,
				});
			} else {
				toast(`로그인되었습니다`, {
					icon: '🌍',
					duration: 2000,
				});
			}

			navigate('/theme');
		} catch (err) {
			console.log(`카카오톡 에러: ${err}`);

			toast('로그인에 실패하셨습니다.', {
				icon: '😭',
				duration: 2000,
			});
		}
	};

	return (
		<>
			<Helmet>
				<title>로그인 선택</title>
				<meta name="description" content="방탈러 홈페이지-로그인 선택" />
				<meta property="og:title" content="방탈러 로그인 선택" />
				<meta property="og:description" content="방탈러 로그인 선택 페이지" />
				<meta
					property="og:url"
					content="https://escape12.netlify.app/loginselete"
				/>
			</Helmet>
			<div
				ref={containerRef}
				className="max-w-[600px] min-w-[320px] flex flex-col items-center h-screen m-auto bg-light-ec1 dark:bg-dark-ec4 text-light-ec4 dark:text-dark-ec1 text-lg"
			>
				<KeyLogo />
				<div className="flex flex-col gap-7 mt-[20%] l:mt-[25%]">
					<LoginSeleteButton
						line="dark:border-dark-kakaoline"
						text="dark:text-dark-kakaoline dark:bg-dark-opacity bg-light-kakaoline"
						img="bg-kakao"
						onClick={handleKakaoLogin}
					>
						카카오 로그인
					</LoginSeleteButton>
					<LoginSeleteButton
						line="dark:border-dark-googleline"
						text="dark:text-dark-googleline dark:bg-dark-opacity bg-light-googleline"
						img="bg-google"
						onClick={handleGoogleLogin}
					>
						구글 로그인
					</LoginSeleteButton>
					<Link to="/login">
						<LoginSeleteButton
							line="dark:border-dark-white"
							text="text-light-ec4 dark:bg-dark-opacity dark:text-dark-white"
							img="bg-key"
						>
							이메일 로그인
						</LoginSeleteButton>
					</Link>
				</div>
				<Link to="/signup" className="text-lg mt-8">
					회원가입
				</Link>
			</div>
		</>
	);
}

export default LoginSelete;
