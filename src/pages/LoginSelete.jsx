import { Link } from 'react-router-dom';
import LoginSeleteButton from './../components/LoginSeleteButton';
import KeyLogo from '@/components/KeyLogo';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';

function LoginSelete() {
	const handleFindUserData = () => {
		toast('이메일 로그인만 가능합니다', {
			icon: '🔐',
		});
	};

	return (
		<>
			<Helmet>
				<title>방탈러-로그인선택</title>
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center h-screen m-auto">
				<KeyLogo />
				<div className="flex flex-col gap-7 mt-[20%] l:mt-[25%]">
					<LoginSeleteButton
						line="border-kakaoline"
						text="text-kakaoline"
						img="bg-kakao"
						onClick={handleFindUserData}
					>
						카카오 로그인
					</LoginSeleteButton>
					<LoginSeleteButton
						line="border-googleline"
						text="text-googleline"
						img="bg-google"
						onClick={handleFindUserData}
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
