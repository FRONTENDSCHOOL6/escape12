import { Link } from 'react-router-dom';
import LoginSeleteButton from '@/components/loginsignup/LoginSeleteButton';
import KeyLogo from '@/components/KeyLogo';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import pb from '@/api/pockethost';
import { useNavigate } from 'react-router-dom';
import { getUserInfoFromStorage } from '@/api/getUserInfo';

function LoginSelete() {
	const navigate = useNavigate();
	const userUId = getUserInfoFromStorage();

	// 로그인기능 구현못했을때
	// const handleFindUserData = () => {
	// 	toast('이메일 로그인만 가능합니다', {
	// 		icon: '🔐',
	// 		duration: 2000,
	// 	});
	// };

	// 카카오톡 로그인
	const handleKakaoLogin = async () => {
		const kakao = await pb
			.collection('users')
			.authWithOAuth2({ provider: 'kakao' });

		try {
			toast('로그인에 성공하셨습니다.', {
				icon: '❤️',
				duration: 2000,
			});

			navigate('/theme');
		} catch (err) {
			console.log(`카카오톡 에러: ${err}`);

			toast('로그인에 실패하셨습니다.', {
				icon: '😭',
				duration: 2000,
			});
		} finally {
			console.log(kakao);
		}
	};

	// 구글로그인
	const handleGoogleLogin = async () => {
		const authData = await pb
			.collection('users')
			.authWithOAuth2({ provider: 'google' });
		try {
			toast('로그인에 성공하셨습니다.', {
				icon: '❤️',
				duration: 2000,
			});

			navigate('/theme');
		} catch (err) {
			console.log(`카카오톡 에러: ${err}`);

			toast('로그인에 실패하셨습니다.', {
				icon: '😭',
				duration: 2000,
			});
		} finally {
			console.log(authData);
		}
	};

	return (
		<>
			<Helmet>
				<title>로그인선택</title>
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center h-screen m-auto text-lg">
				<KeyLogo />
				<div className="flex flex-col gap-7 mt-[20%] l:mt-[25%]">
					<LoginSeleteButton
						line="border-kakaoline"
						text="text-kakaoline"
						img="bg-kakao"
						onClick={handleKakaoLogin}
					>
						카카오 로그인
					</LoginSeleteButton>
					<LoginSeleteButton
						line="border-googleline"
						text="text-googleline"
						img="bg-google"
						onClick={handleGoogleLogin}
					>
						구글 로그인
					</LoginSeleteButton>
					<Link to="/login">
						<LoginSeleteButton
							line="border-white"
							text="text-white"
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
